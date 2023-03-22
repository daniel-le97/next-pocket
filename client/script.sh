#!/bin/bash
export $(grep -v '^#' .env | grep -v '^$' | xargs)
npx pocketbase-typegen --url $NEXT_PUBLIC_POCKET_URL --email $POCKET_EMAIL --password $POCKET_PASS --out PocketBaseTypes/pocketbase-types.ts