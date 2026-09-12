---
name: release
description: Create, release, or install plugins through the appropriate public or private marketplace while preserving Git-backed source, dependencies, stable plugin names, categories, tracked program icons, remote integrity, and safe dual-client cutovers. Use when the user asks to make, create, publish, release, or install a plugin.
---

# Release the user's Programs

Release source first. Refresh clients only when the agent-loadable plugin
surface changed. A native app, web app, service, or deployment that happens to
share the plugin repository is a separate product release, not automatically a
plugin release. Never edit installed caches as source.

## Catalog model

The repository-root [`MARKETPLACES.md`](../../MARKETPLACES.md) is the
canonical category map.

Every program lives in its own Git repository. `PedroAVJ/package-manager`
catalogs general-purpose publicly installable plugins for both clients.
`PedroAVJ/apps` is the private marketplace for named applications, platforms,
and services. `PedroAVJ/agents` is the private marketplace for named AI
employee role plugins. Keep Apps and Agents listings out of the public catalog:

- `.agents/plugins/marketplace.json` is the Codex and ChatGPT catalog.
- `.claude-plugin/marketplace.json` is the Claude catalog.
- `category` groups entries as Productivity, Developer Tools, AI, Communication,
  Media, Finance, Shopping, Utilities, Health & Fitness, or Memory.
- Public installation identities use `plugin@package-manager`. Private Apps and
  Agents installations use `plugin@apps` and `plugin@agents` respectively.

Each catalog entry points to the program's external plugin repository rather
than copying its implementation into the marketplace.

## Classify and create new plugins

An ordinary request to make or create a plugin means a complete Git-backed
plugin. Resolve the owner and visibility from the task and existing repository.
An existing public plugin stays public; proprietary source and personal records
stay private. If visibility is not authorized or clear, prepare privately until
it is settled. Unless the user asks for a temporary local-only plugin:

1. Create a dedicated repository under the verified owner and author the
   plugin in a task-specific clone. Use the generic system plugin creator only
   for repository-local structure or validation when useful.
2. Do not create or register `~/plugins/<plugin>`,
   `~/.agents/plugins/marketplace.json`, a `personal` marketplace, or any other
   ad hoc marketplace namespace. Never publish the plugin as `plugin@personal`.
3. Classify the plugin before adding it to a catalog. A named application,
   platform, or service belongs in Apps; a named AI employee role belongs in
   Agents; a general-purpose public capability belongs in Package Manager under
   its semantic category. Use both client manifests unless a Codex-only
   constraint is explicitly proven.
4. Publish source first, verify the remote default-branch commit, publish the
   catalog, then install and verify the fully qualified identity in the requested clients.

A local scaffold is only an implementation draft. It is not a completed plugin
until the Git source, both catalog entries, and requested client installations
have passed read-back verification.

## Source and installation locations

The repository's authoritative remote default branch is canonical source. Do
not require or maintain a permanent `~/Developer/<repository>` checkout. Create
an independent task-specific ephemeral clone when authoring or releasing a
change, then remove it after its exact `HEAD` is safely published and verified.

Codex and Claude install released plugins into their own versioned caches.
Those installed cache copies are immutable runtime artifacts, not editable
source. Never copy changes out of a cache and call them source history.

Ignored repository environments are disposable projections, not source or the
secret store. Fetch them inside the active task clone from the system that owns
the project: Vercel Environment Variables, Expo EAS Environment Variables, or
the applicable Azure secret/configuration service. Prefer provider commands
that inject variables without writing a file. Never keep an environment file in
a plugin cache, remote branch, or permanent checkout.

The category describes the primary job the plugin performs. Use a familiar job
name and prefer established App Store terminology when it fits. Introduce a
custom category only when the existing vocabulary does not describe that job.
Vendor, platform, and implementation method do not determine membership. A CLI,
API, connector, local database, or UI bridge belongs inside the program it operates.

Use the exact names and membership in `MARKETPLACES.md`, with one primary
category per plugin. A new or moved entry requires an explicit comparison with
those category purposes; review its actual skills before assigning membership.
Split a category when its meaning becomes unclear, not at a fixed member count.
Update the canonical map, both catalogs, the owning Codex manifest, and category
checks together. Run `npm test` to reject unknown categories, duplicate or missing
memberships, and drift between the documented map and either client catalog.
These checks enforce the approved map; the job-based naming decision still
requires review of the plugin's purpose.

## Before editing

Use `toolchain:resource-hygiene` for cleanup eligibility and
`toolchain:isolate-repository-work` for the task lifecycle. Resolve the
authoritative provider, remote URL, and default branch, then read the plugin repository's root
`README.md` and `AGENTS.md` plus this catalog's root `README.md` and `AGENTS.md`.
Confirm both clients use full catalog checkouts so they receive manifest changes.

## Release impact gate

Run this gate before changing a plugin manifest, package version, catalog entry,
installed client, or stable shim:

1. Resolve the exact baseline and inspect the complete tracked task diff with
   `git diff --name-status <baseline>`, plus `git status --short` for untracked
   paths. The baseline must be the remote commit from which the task branch was
   created, not an installed cache.
2. Classify the changed behavior by what Codex or Claude actually loads:
   - **Plugin release:** skills, commands, agents, hooks, MCP registration or
     server behavior, agent-facing CLI/front-door behavior, plugin manifests,
     dependencies used by those surfaces, or assets, templates, documentation,
     and scripts they load or reference at runtime.
   - **Product-only release:** native or web application code, app-only tests and
     documentation, signing/project files, app assets, infrastructure, or
     deployment workflows that do not change an agent-loaded surface.
   - **Mixed or ambiguous release:** trace the changed files from the manifests,
     skills, and front doors. If reachability remains ambiguous, use the plugin
     release path; do not guess from directory names alone.
3. Record the classification and the paths that justify it before publishing.

The plugin version identifies the agent-loadable contract. App Store,
TestFlight, native build, web deployment, and service release identities remain
separate. Repository co-location and a new Git commit are not reasons to bump a
plugin version.

For a product-only release:

- preserve the Codex and Claude plugin manifests, package plugin version, and
  Claude catalog-entry version;
- do not refresh marketplaces, reinstall either client plugin, or repoint a
  plugin CLI shim;
- publish and verify the owning product through its own deployment contract;
- report source, deployment, device, and real-world acceptance independently.

Only continue through the catalog and client sections below when the gate finds
a plugin release.

## Change contract

1. Patch source in the plugin's own ephemeral clone.
2. When the release impact gate finds a plugin release, bump changed Codex and
   Claude plugin manifests together, plus any package plugin version and the
   matching Claude catalog-entry version. Preserve all of them for a
   product-only release.
3. For plugin releases, keep the two catalog manifests synchronized with the
   external plugin repository and the clients it actually supports. The catalog
   owns discovery metadata and category membership, never product deployment
   state or plugin behavior.
4. Preserve clean plugin names and skill namespaces. Do not encode categories
   in marketplace names.
5. Fully qualify every Claude dependency with its actual marketplace. Public plugins must not require a private plugin or private repository to install.
6. Before moving or removing an identity, find and release all dependents
   against its replacement.
7. Update documentation, tests, stable command shims, and native schedules when
   their invoked identity or cache path changes.
8. Preserve credential service IDs, LaunchAgent labels, cache identities, and
   other durable runtime state unless a separately planned migration changes
   them.
9. Keep private repositories and private marketplace listings private. Before public release, verify the complete candidate payload, licensing, reachable history, and repository metadata for credentials, personal records, and proprietary material.

Before retiring a checkout, audit ignored paths as well as Git status. Compare
environment-variable names with the provider without printing values. Migrate a
missing value only when it is durable and still required; do not preserve
task-scoped database branch metadata or OIDC tokens. Personal operator
credentials belong in the owning CLI's credential store or, as a last resort,
macOS Keychain. Disposable build output and Finder metadata need no preservation.

## Program icon contract

A new program is not fully releasable merely because it appears in both client
plugin lists:

1. Commit a production-quality icon under `assets/` in the program's own
   repository, or directly reuse an existing tracked first-party app icon when
   that file is already the product's canonical artwork. Do not create a
   divergent copy. Record its source and any relevant attribution in
   `ICON-SOURCES.md`.
2. Reference that tracked asset from `.codex-plugin/plugin.json` as both
   `interface.composerIcon` and `interface.logo`, set an intentional
   `interface.brandColor`, and test that the referenced file exists and is not
   empty.
3. Verify Git tracks the icon asset, its provenance note, and both manifest
   references. The committed asset is the only required icon source of truth;
   no persistent Finder folder or machine-local resource fork is required.

Use CLI metadata for routine release verification. Do not open Finder or invoke
Computer Use solely to inspect a rendered icon. Visual inspection is user
acceptance, not a release blocker.

## Validate and publish

Run the source repository's full suite and focused tests for every release.
For a plugin release, also run:

```bash
npm test
git diff --check
claude plugin validate .
```

Stage only intended files, commit, and push the source repository first. Verify
the remote default branch resolves to the exact local commit.

For a product-only release, run its owning deployment and verification path,
then stop: do not update the selected marketplace catalog or either installed plugin.

For a plugin release, update the entry version in its selected marketplace,
validate both client catalogs, and push the catalog before changing either
client.

If work is legitimate but not ready for the default branch, publish it to a
clearly named remote `wip/` or `archive/` branch and verify the exact remote SHA.
Never discard an unpublished clone merely to finish a release. Do not push private audit notes or pre-sanitization branches to a public repository. A public-release cleanup must account for pull-request refs and cached historical views as well as branch history; retain private recovery and use a fresh independent public repository when a clean rewrite cannot remove those exposures.

## Install-first cutover

This section applies only when the release impact gate found a plugin release.

Add the selected marketplace before installing moved plugins. Install
dependencies before dependents, then verify the replacement identity before
removing the old one. For Apps or Agents, substitute that repository and
marketplace name in the same commands:

```bash
codex plugin marketplace add PedroAVJ/package-manager --ref main
codex plugin marketplace upgrade
codex plugin add <plugin>@package-manager

claude plugin marketplace add PedroAVJ/package-manager
claude plugin marketplace update package-manager
claude plugin install <plugin>@package-manager
```

Do not leave a dependent plugin pointing at a removed marketplace. During a
namespace move, keep the old installation live until the replacement, its
dependencies, and any stable front door have passed read-back verification.

`claude@package-manager` installs in both clients as one namespace. Its design
guidance and read-only Claude Design connector are host-neutral. Its `ask`,
`explain`, and `oracle` model-delegation lanes run from Codex; inside Claude
Code they must answer directly or refuse self-consultation without spawning a
nested Claude CLI. Preserve the stable `com.pedro.claude-remote-control`
service identity, support path, Claude Design MCP identity, credential path,
and Fable relay state path when releasing or renaming Claude. A plugin supports both clients unless its catalogs and manifests
explicitly prove otherwise.

## Remove released task clones

After source, catalog, and client verification, apply
`toolchain:isolate-repository-work` closeout independently to the plugin clone
and Package Manager clone. Read back the exact remote refs and commit SHAs,
require clean status and no active process, then remove only the verified task
clone paths. There is no canonical local read copy to synchronize.

If a clone contains unpublished, dirty, or uncertain state, leave it in place
and report the blocker. Running tasks do not hot-load changed skills, hooks, MCP
servers, or app connectors, so a newly released contract applies to fresh tasks.

## Verification boundary

For plugin releases, read back `codex plugin list`, `claude plugin list`,
installed manifest versions, resolved cache paths, exact source and catalog
remote SHAs, and release-clone cleanup. Stale cache directories are not
installation proof.

For product-only releases, verify the source and the owning deployment without
mutating the catalog or installed plugins. A read-only before/after plugin
version check can prove that no plugin release occurred.

Keep routine release verification non-GUI. Do not launch or foreground an app,
open Finder, or invoke Computer Use solely for verification. Only operate a UI
when the user explicitly asks to see or test it.

Repoint affected `~/.local/bin` shims only to verified released caches, never to
editable repositories. Run a safe read-only smoke command through each changed
front door.

Native schedules need no change when the namespaced skill invocation is
unchanged. A renamed plugin or scheduled skill requires updating the
authoritative scheduler entry in the same cutover. New registered tools require
a fresh task.

## Retiring an obsolete marketplace

Only after every replacement identity passes verification:

1. Remove the obsolete marketplace from both clients.
2. Confirm its old plugin identities are no longer installed.
3. Archive the obsolete catalog repository on GitHub.
4. After every legitimate commit is verified on its authoritative remote,
   permanently remove only an exact checkout proven obsolete and explicitly
   authorized for disposal. Preserve uncertain state in place.
5. Keep retained private archives and proprietary repositories private. Public catalogs may list only public, installable sources.

## Closeout

Report the release-impact classification and supporting paths first. For plugin
releases, report source and catalog commits, validation results, exact installed
identities and versions, cache paths, the tracked icon asset, privacy
verification, task-clone cleanup, required fresh tasks, and any old identity
intentionally retained during migration. For product-only releases, report the
product deployment and acceptance boundaries plus the deliberately unchanged
plugin and catalog versions.
