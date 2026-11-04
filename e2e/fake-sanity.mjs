/**
 * A local stand-in for Sanity's Content Lake, for the workflow tests only. It runs
 * real GROQ (groq-js) and applies transactions atomically, but it is NOT Sanity:
 * passing against it does not prove the behaviour of the real service.
 */
import { randomBytes } from "node:crypto";
import http from "node:http";
import { evaluate, parse } from "groq-js";

const PORT = Number(process.env.FAKE_SANITY_PORT ?? 4599);
let docs = new Map();
let failMutations = false;
const seen = { mutations: [] };

const rev = () => randomBytes(8).toString("hex");
const stamp = (doc, prev) => {
  const now = new Date().toISOString();
  return { ...doc, _rev: rev(), _createdAt: prev?._createdAt ?? now, _updatedAt: now };
};
const fail = (message, statusCode = 409) => Object.assign(new Error(message), { statusCode });

function apply(store, m) {
  if (m.create) {
    if (store.has(m.create._id)) throw fail("exists");
    store.set(m.create._id, stamp(m.create));
  } else if (m.createOrReplace) {
    store.set(m.createOrReplace._id, stamp(m.createOrReplace, store.get(m.createOrReplace._id)));
  } else if (m.delete) {
    store.delete(m.delete.id);
  } else if (m.patch) {
    const prev = store.get(m.patch.id);
    if (!prev) throw fail("patch target missing", 404);
    if (m.patch.ifRevisionID && prev._rev !== m.patch.ifRevisionID) throw fail("revision mismatch");
    const next = { ...prev, ...m.patch.set };
    for (const key of m.patch.unset ?? []) delete next[key];
    store.set(m.patch.id, stamp(next, prev));
  } else {
    throw fail(`unsupported mutation ${JSON.stringify(m)}`, 400);
  }
}

async function runQuery(url) {
  const query = url.searchParams.get("query");
  const params = {};
  for (const [key, value] of url.searchParams) if (key.startsWith("$")) params[key.slice(1)] = JSON.parse(value);
  const perspective = url.searchParams.get("perspective") ?? "raw";
  const all = [...docs.values()];
  const dataset = perspective === "published" ? all.filter((d) => !d._id.startsWith("drafts.")) : all;
  const result = await (await evaluate(parse(query, { params }), { dataset, params })).get();
  return { result, query, ms: 1 };
}

http
  .createServer(async (req, res) => {
    const send = (code, body) => {
      res.writeHead(code, { "content-type": "application/json" });
      res.end(JSON.stringify(body));
    };
    try {
      const url = new URL(req.url, `http://localhost:${PORT}`);
      let raw = "";
      for await (const chunk of req) raw += chunk;
      const body = raw ? JSON.parse(raw) : {};

      if (url.pathname === "/__control") {
        if ("failMutations" in body) failMutations = body.failMutations;
        return send(200, { failMutations, mutations: seen.mutations.length });
      }
      if (url.pathname.includes("/data/doc/")) {
        const doc = docs.get(decodeURIComponent(url.pathname.split("/").pop()));
        return send(200, { documents: doc ? [doc] : [], omitted: [] });
      }
      if (url.pathname.includes("/data/query/")) return send(200, await runQuery(url));
      if (url.pathname.includes("/data/mutate/")) {
        if (!req.headers.authorization) return send(401, { message: "no token" });
        if (failMutations) return send(500, { message: "simulated Sanity failure" });
        const copy = new Map(docs);
        for (const m of body.mutations) apply(copy, m);
        docs = copy;
        seen.mutations.push(body.mutations);
        return send(200, { transactionId: rev(), results: body.mutations.map(() => ({ operation: "ok" })) });
      }
      send(404, { message: `unhandled ${url.pathname}` });
    } catch (error) {
      send(error.statusCode ?? 500, { message: error.message });
    }
  })
  .listen(PORT, () => console.log(`fake sanity on ${PORT}`));
