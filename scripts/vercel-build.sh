#!/bin/sh
# Vercel build entry point (vercel.json -> buildCommand -> npm run vercel-build).
#
# Production builds apply pending migrations before building; a failed migration
# fails the build, so the current deployment stays live. Preview builds never
# migrate: they may share a database with production.
set -eu

prisma generate

if [ "${VERCEL_ENV:-}" = "production" ]; then
  # DIRECT_URL wins. Otherwise derive it: Supabase's transaction pooler (6543)
  # hangs `migrate deploy`, and the session pooler is the same host on 5432.
  MIGRATE_URL=${DIRECT_URL:-$(printf '%s' "$DATABASE_URL" | sed \
    -e 's#:6543/#:5432/#' \
    -e 's#?pgbouncer=true&#?#' \
    -e 's#[?&]pgbouncer=true##')}

  # Bounded, so a stuck connection fails in minutes rather than at Vercel's limit.
  T=""
  if command -v timeout >/dev/null 2>&1; then T="timeout 300"; fi

  DATABASE_URL="$MIGRATE_URL" $T prisma migrate deploy
fi

next build
