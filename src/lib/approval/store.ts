import type { ApprovalAuditEntry, ApprovalRecord } from "./types";

export interface ApprovalTx {
  getApproval(objectType: string, objectId: string): Promise<ApprovalRecord | null>;
  /** Upserts the latest decision and appends the audit line. */
  writeDecision(args: { record: ApprovalRecord; audit: ApprovalAuditEntry }): Promise<void>;
}

/** The port the service depends on, so its rules are tested without a database. */
export interface ApprovalStore {
  getApproval(objectType: string, objectId: string): Promise<ApprovalRecord | null>;
  list(objectType: string): Promise<ApprovalRecord[]>;
  listApproved(objectType: string): Promise<ApprovalRecord[]>;
  /** Runs `fn` so that concurrent decisions on one object cannot interleave. */
  withObjectLock<T>(objectType: string, objectId: string, fn: (tx: ApprovalTx) => Promise<T>): Promise<T>;
}

/** Test double. Same contract as PrismaApprovalStore. */
export class InMemoryApprovalStore implements ApprovalStore {
  private records = new Map<string, ApprovalRecord>();
  readonly audit: ApprovalAuditEntry[] = [];

  async getApproval(objectType: string, objectId: string) {
    return this.records.get(`${objectType}::${objectId}`) ?? null;
  }
  async list(objectType: string) {
    return [...this.records.values()].filter((r) => r.objectType === objectType);
  }
  async listApproved(objectType: string) {
    return (await this.list(objectType)).filter((r) => r.state === "approved");
  }
  async withObjectLock<T>(_type: string, _id: string, fn: (tx: ApprovalTx) => Promise<T>) {
    return fn({
      getApproval: (t, i) => this.getApproval(t, i),
      writeDecision: async ({ record, audit }) => {
        this.records.set(`${record.objectType}::${record.objectId}`, record);
        this.audit.push(audit);
      },
    });
  }
}
