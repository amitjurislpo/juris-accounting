CREATE TYPE "ApprovalState" AS ENUM ('SUBMITTED', 'APPROVED', 'REJECTED');

CREATE TABLE "Approval" (
    "objectType" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "objectRevision" TEXT NOT NULL,
    "state" "ApprovalState" NOT NULL,
    "decidedBy" TEXT NOT NULL,
    "decidedAt" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "objectTitle" TEXT,
    "objectSlug" TEXT,
    CONSTRAINT "Approval_pkey" PRIMARY KEY ("objectType","objectId")
);
CREATE INDEX "Approval_objectType_state_idx" ON "Approval"("objectType", "state");

CREATE TABLE "ApprovalAudit" (
    "id" TEXT NOT NULL,
    "objectType" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "objectRevision" TEXT NOT NULL,
    "fromState" "ApprovalState" NOT NULL,
    "toState" "ApprovalState" NOT NULL,
    "actor" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    CONSTRAINT "ApprovalAudit_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "ApprovalAudit_objectType_objectId_at_idx" ON "ApprovalAudit"("objectType", "objectId", "at");

-- Append-only, enforced by the database, so the trail cannot be rewritten even
-- through the app's own connection.
CREATE FUNCTION approval_audit_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'ApprovalAudit is append-only: % is not permitted', TG_OP;
END $$;
CREATE TRIGGER approval_audit_no_update_delete
  BEFORE UPDATE OR DELETE ON "ApprovalAudit"
  FOR EACH ROW EXECUTE FUNCTION approval_audit_immutable();
-- TRUNCATE skips row triggers, so it needs its own.
CREATE TRIGGER approval_audit_no_truncate
  BEFORE TRUNCATE ON "ApprovalAudit"
  FOR EACH STATEMENT EXECUTE FUNCTION approval_audit_immutable();

CREATE TABLE "BlogChecker" (
    "email" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BlogChecker_pkey" PRIMARY KEY ("email"),
    CONSTRAINT "BlogChecker_email_lowercase" CHECK ("email" = lower("email"))
);

CREATE TABLE "AdminUser" (
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "setupTokenHash" TEXT,
    "setupExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("email"),
    CONSTRAINT "AdminUser_email_lowercase" CHECK ("email" = lower("email"))
);
CREATE UNIQUE INDEX "AdminUser_setupTokenHash_key" ON "AdminUser"("setupTokenHash");

CREATE TABLE "AdminSession" (
    "tokenHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("tokenHash"),
    CONSTRAINT "AdminSession_email_fkey" FOREIGN KEY ("email") REFERENCES "AdminUser"("email") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "AdminSession_email_idx" ON "AdminSession"("email");

CREATE TABLE "AdminLoginFailure" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AdminLoginFailure_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "AdminLoginFailure_email_at_idx" ON "AdminLoginFailure"("email", "at");

-- Initial checkers, each with an admin account that has no password until they
-- use a setup link (scripts/admin-invite.mjs). Safe to run twice.
INSERT INTO "BlogChecker" ("email", "note") VALUES
  ('gopal@jurislpo.com', 'initial checker'),
  ('ritz@jurislpo.com', 'initial checker'),
  ('amit@jurislpo.com', 'initial checker')
ON CONFLICT ("email") DO NOTHING;
INSERT INTO "AdminUser" ("email") VALUES
  ('gopal@jurislpo.com'),
  ('ritz@jurislpo.com'),
  ('amit@jurislpo.com')
ON CONFLICT ("email") DO NOTHING;
