import "server-only";

import { getDb } from "@/lib/db";
import type { ApprovalState as DbState } from "@/generated/prisma/client";
import type { ApprovalStore } from "./store";
import type { ApprovalRecord, ApprovalState } from "./types";

const toDb = (s: ApprovalState) => s.toUpperCase() as DbState;

type Row = {
  objectType: string;
  objectId: string;
  objectRevision: string;
  state: DbState;
  decidedBy: string;
  decidedAt: Date;
  reason: string | null;
  objectTitle: string | null;
  objectSlug: string | null;
};

const toRecord = (row: Row): ApprovalRecord => ({
  ...row,
  state: row.state.toLowerCase() as ApprovalState,
  decidedAt: row.decidedAt.toISOString(),
});

export class PrismaApprovalStore implements ApprovalStore {
  async getApproval(objectType: string, objectId: string) {
    const row = await getDb().approval.findUnique({ where: { objectType_objectId: { objectType, objectId } } });
    return row ? toRecord(row) : null;
  }

  async list(objectType: string) {
    return (await getDb().approval.findMany({ where: { objectType } })).map(toRecord);
  }

  async listApproved(objectType: string) {
    return (await getDb().approval.findMany({ where: { objectType, state: "APPROVED" } })).map(toRecord);
  }

  /** The advisory lock serialises two checkers deciding the same post at once. It
   *  is transaction-scoped, so it also works through a transaction pooler. */
  withObjectLock<T>(objectType: string, objectId: string, fn: Parameters<ApprovalStore["withObjectLock"]>[2]) {
    return getDb().$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`${objectType}::${objectId}`}))`;
      return fn({
        getApproval: async (t, i) => {
          const row = await tx.approval.findUnique({ where: { objectType_objectId: { objectType: t, objectId: i } } });
          return row ? toRecord(row) : null;
        },
        writeDecision: async ({ record, audit }) => {
          const decision = {
            objectRevision: record.objectRevision,
            state: toDb(record.state),
            decidedBy: record.decidedBy,
            decidedAt: new Date(record.decidedAt),
            reason: record.reason,
            objectTitle: record.objectTitle,
            objectSlug: record.objectSlug,
          };
          await tx.approval.upsert({
            where: { objectType_objectId: { objectType: record.objectType, objectId: record.objectId } },
            create: { objectType: record.objectType, objectId: record.objectId, ...decision },
            update: decision,
          });
          await tx.approvalAudit.create({
            data: { ...audit, fromState: toDb(audit.fromState), toState: toDb(audit.toState), at: new Date(audit.at) },
          });
        },
      });
    }) as Promise<T>;
  }
}
