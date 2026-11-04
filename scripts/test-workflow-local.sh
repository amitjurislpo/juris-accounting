#!/bin/sh
# Rebuilds a throwaway local database and a production build pointed at the fake
# Sanity, then runs the workflow spec. Needs a local Postgres. Touches nothing remote.
set -eu
DB=juris_blog_test
export DATABASE_URL="postgresql://$(whoami)@localhost:5432/$DB"
export DIRECT_URL="$DATABASE_URL"
export NEXT_PUBLIC_SANITY_PROJECT_ID=e2etest
export NEXT_PUBLIC_SANITY_DATASET=production
export SANITY_TEST_API_HOST=http://localhost:4599
export SANITY_API_WRITE_TOKEN=fake-write-token
export SANITY_API_READ_TOKEN=fake-read-token
export NEXT_PUBLIC_SITE_URL=https://www.juriscfo.com
export WORKFLOW_FAKE_SANITY=1
dropdb --if-exists "$DB"
createdb "$DB"
npx prisma migrate deploy
npx prisma migrate deploy
npx next build
npx playwright test --config playwright.workflow.config.ts "$@"
