# Edge functions

Mirror of the Edge Functions deployed to the Supabase project
`bcbbwomddlrurazmhivc`. Kept here for version control and review — the
Supabase dashboard holds no history, so without this directory the only
copy of each function is the running one.

**This directory is not a deploy pipeline.** Nothing here is applied
automatically. Editing a file changes nothing until the function is
redeployed. Equally, a change made in the dashboard will not appear here
on its own, so update both together or this mirror quietly goes stale.

## What runs, and when

Schedules live in `cron.job` in the database, not in this repo. All times
are **UTC**. Inspect them with `select jobname, schedule, active from cron.job;`

| Function | Schedule | Job name | Purpose |
|---|---|---|---|
| `send-outbox` | every minute | `send-outbox-every-minute` | Sends queued rows from `email_outbox` via Resend. |
| `sync-catalogue` | `40 3 * * *` | `sync-catalogue-nightly` | Pulls the N3D catalogue into `designs`. |
| `backfill-names-de` | `50 3 * * *` | `backfill-names-de-nightly` | Fills `designs.name_de` from PokeAPI. Runs ten minutes after the sync so a new drop is named the same night. |
| `weekly-backup` | `0 4 * * 0` | `weekly-backup-sunday` | Emails a full CSV + JSON snapshot. Supabase's free tier keeps no backups. |
| `download-ams-proxy` | on demand | — | Temporary AMS `.3mf` download helper. See below. |
| `n3d-test-download` | — | — | Retired stub. Safe to delete. |
| `probe-n3d-download` | — | — | Retired stub. Safe to delete. |

Each scheduled job fires through `net.http_post` with the project's anon
JWT as a bearer token; the functions themselves have `verify_jwt` on.

Runs are recorded in the `sync_log` table. A `backfill-names-de` entry
carries a `job` key; a `sync-catalogue` entry does not.

## Secrets

Functions read credentials from the environment
(`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `AMS_PROXY_SECRET`); the
N3D API key comes from the vault via `get_n3d_key()`. **This repository is
public** — it serves the storefront through GitHub Pages, so every file
here is fetchable over the web. Never commit a key, token or shared secret
into this directory.

`download-ams-proxy` currently violates that rule *in its deployed form*:
it has a shared secret written in as a string literal and runs with
`verify_jwt` off. The committed copy reads `AMS_PROXY_SECRET` from the
environment instead and refuses every request when that is unset, so the
two have diverged on purpose. The AMS backfill it was written for is
essentially finished (238 of 240 entitled designs stored), so deleting the
function outright is the better fix.
