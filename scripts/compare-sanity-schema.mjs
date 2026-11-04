#!/usr/bin/env node
/**
 * Compares this site's post schema with JurisLPO's, field by field.
 *   npm run schema:compare -- [path to JurisLPO's sanity/schemas/post.ts]
 * Exits 1 only for a difference not listed in EXPECTED, so a new drift gets noticed.
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const OURS = "src/sanity/schemas/post.ts";
const THEIRS = process.argv[2] ?? "../JurisLPO/sanity/schemas/post.ts";

/** Records rule calls, so `required` can be read off a validation function. */
function ruleCalls(validation) {
  if (typeof validation !== "function") return [];
  const calls = [];
  const rule = new Proxy({}, { get: (_, name) => (...args) => (calls.push({ name, args }), rule) });
  validation(rule);
  return calls;
}

function load(path) {
  const js = ts.transpileModule(readFileSync(resolve(path), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const identity = (x) => x;
  // Only the schema's shape matters. Other imports are used only inside validators.
  const stub = (name) => (name === "sanity" ? { defineField: identity, defineType: identity, defineArrayMember: identity } : new Proxy({}, { get: () => () => true }));
  const loaded = { exports: {} };
  new Function("module", "exports", "require", js)(loaded, loaded.exports, stub);
  return loaded.exports.post;
}

const names = (list) => (list ?? []).map((x) => x.value ?? x.name ?? x.type);

function describeField(f) {
  const out = { type: f.type, required: ruleCalls(f.validation).some((c) => c.name === "required"), readOnly: f.readOnly === true };
  if (f.initialValue !== undefined) out.initialValue = f.initialValue;
  if (f.fields) out.subfields = names(f.fields);
  if (f.options?.list) out.options = names(f.options.list);
  if (f.options?.layout) out.layout = f.options.layout;
  if (f.of) {
    out.members = f.of.map((m) => m.name ?? m.type);
    const block = f.of.find((m) => m.type === "block");
    if (block) {
      out.styles = names(block.styles);
      out.lists = names(block.lists);
      out.decorators = names(block.marks?.decorators);
      out.annotations = names(block.marks?.annotations);
      const href = block.marks?.annotations?.[0]?.fields?.[0];
      out.linkSchemes = ruleCalls(href?.validation).find((c) => c.name === "uri")?.args[0]?.scheme;
      out.linkRelative = ruleCalls(href?.validation).find((c) => c.name === "uri")?.args[0]?.allowRelative;
    }
    const image = f.of.find((m) => m.type === "image");
    if (image) out.imageFields = names(image.fields);
    const item = f.of.find((m) => m.fields && m.type === "object");
    if (item) out.itemFields = item.fields.map((x) => `${x.name}${ruleCalls(x.validation).some((c) => c.name === "required") ? "*" : ""}`);
  }
  return out;
}

const ours = load(OURS);
const theirs = load(THEIRS);
const ourFields = new Map(ours.fields.map((f) => [f.name, describeField(f)]));
const theirFields = new Map(theirs.fields.map((f) => [f.name, describeField(f)]));

/** Differences the brief asks for. Anything else fails the script. */
const EXPECTED = {
  "reviewFeedback: only here": "Briefed workflow field; JurisLPO keeps this state elsewhere.",
  "deletionRequested: only here": "Briefed workflow field.",
  "subtitle: only here": "Kept: this site's pages display it.",
  "readTime: only here": "Kept: this site's pages display it.",
  "trending: only here": "Kept: this site's “Most trending articles” uses it.",
  "body.required: here true, JurisLPO false": "The brief says body is required.",
};

const differences = [];
for (const name of new Set([...ourFields.keys(), ...theirFields.keys()])) {
  const a = ourFields.get(name);
  const b = theirFields.get(name);
  if (!b) differences.push(`${name}: only here`);
  else if (!a) differences.push(`${name}: only in JurisLPO`);
  else
    for (const key of new Set([...Object.keys(a), ...Object.keys(b)]))
      if (JSON.stringify(a[key]) !== JSON.stringify(b[key]))
        differences.push(`${name}.${key}: here ${JSON.stringify(a[key])}, JurisLPO ${JSON.stringify(b[key])}`);
}

const shared = (order) => order.filter((n) => ourFields.has(n) && theirFields.has(n));
const orderMatches = JSON.stringify(shared([...ourFields.keys()])) === JSON.stringify(shared([...theirFields.keys()]));
if (!orderMatches) differences.push("order of shared fields differs");

const previewMatches = JSON.stringify(ours.preview.select) === JSON.stringify(theirs.preview.select);
if (!previewMatches) differences.push("list preview differs");

console.log(`Reference: ${THEIRS}`);
console.log(`Fields: ${ourFields.size} here, ${theirFields.size} in JurisLPO. Shared fields in the same order: ${orderMatches ? "yes" : "NO"}. List preview same: ${previewMatches ? "yes" : "NO"}.\n`);
const unexpected = differences.filter((d) => !(d in EXPECTED));
for (const d of differences) console.log(`${d in EXPECTED ? "expected  " : "UNEXPECTED"}  ${d}${d in EXPECTED ? `  (${EXPECTED[d]})` : ""}`);
console.log(`\n${differences.length} differences, ${unexpected.length} unexpected.`);
process.exit(unexpected.length ? 1 : 0);
