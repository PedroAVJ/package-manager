---
name: schedules
description: Define, create, update, and audit native recurring schedules as thin wrappers around installed owning skills. Use for schedules, automations, recurring routines, cadence, or preparation before a user-specified time.
---

# Schedules

Own schedule construction and verification. The invoked skill owns source discovery, its bounded event window, behavior, idempotency, and side-effect boundaries. Keep each user's schedule catalog and time preferences outside the plugin.

## Construction

- Follow the host's current automation contract and the user's requested runtime. Use a thread follow-up for continuing the current task when supported; use a standalone scheduled task when the user requests independent work. Do not override a host's required automation tool with raw configuration edits.
- Keep prompts as concise owning-skill invocations with the context the scheduler requires. Do not duplicate the entire skill. An explicitly requested unified, read-only cross-source hygiene review can invoke several owning skills together while retaining independent windows and permissions.
- Source-processing skills must accept a source-event time span. Preserve an explicit span. When a source skill defines a default, use it; do not interpret a daily cadence as permission to read all history. Exact source IDs are already bounded.
- Repeated reads may overlap intentionally. Any downstream write must enforce its own idempotency. Do not add a processed cursor or checkpoint without a requirement for it.
- Preserve the scheduler's project or folder context. Do not put plugin-cache paths or guessed project IDs in prompts.
- Read time zones and preparation deadlines from the user's request or authorized private preferences. A regional time-zone identifier does not establish the user's physical location. Start preparation with enough lead time for its requested deadline.
- For monitors, preserve notification intent and stay quiet on unchanged or non-actionable state unless periodic reports were requested.
- Use the native client's authoritative scheduler API or supported UI. Treat exported scheduler files as evidence, not a mutation interface.

## Private catalog

If the user already keeps a desired schedule catalog, read it from `PACKAGE_MANAGER_SCHEDULES_PATH` or, by default, `~/.config/package-manager/schedules.md`. It is optional. Never infer that a saved catalog proves a schedule is live. Do not generate or persist a new catalog without a request to do so.

For example, a user may request one review invoking `$gmail:review-inbox-hygiene`, `$whatsapp:review-inbox-hygiene`, and `$messages:review-inbox-hygiene`. Each source can use its previous 24 hours by received/message time when its own contract defines that default. This is an example, not an installed schedule or a universal daily routine.

## Mutate and verify

1. Inspect the authoritative scheduler and resolve matching existing entries by ID.
2. Update in place when the identity remains the same. Preserve fields the user did not ask to change. Recreate only when the runtime kind requires it.
3. Set the exact prompt, cadence, context, execution environment, and supported model settings from the request and host contract.
4. Pause or remove superseded duplicates only after the replacement exists and the requested change warrants it.
5. Read back the kind, active status, cadence, project, prompt, notification behavior, and next run. A generated file alone is not verification.

Do not combine independent workflows unless the user requests it. Report a narrow blocker without claiming a schedule was created or changed when the host has not confirmed it.
