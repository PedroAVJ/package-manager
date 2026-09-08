---
name: agent-skills
description: Discover, vet, audit, package, install, update, or remove agent skills while preserving the user's plugin-first distribution model. Use when the user asks whether a skill exists, wants to borrow or author one, wants to inspect provenance or installed state, or needs to clean up a loose skill.
---

# Agent Skills

Treat a versioned plugin as the normal unit of distribution. Use the `skills`
CLI (`npx skills`, vercel-labs/skills) for discovery, provenance inspection,
content preview, installed-state audits, and orphan cleanup. Do not use a loose
`skills add` installation as the final delivery state for anything the user
authors or adopts.

System-provided skills are the exception: keep the skills shipped and managed
by Codex, Claude, or another client in their provider-owned system layer. Do
not copy them into the user's plugins merely to make them plugin-shaped.

## Pick the Right Delivery Mechanism First

Three things get installed into agents and they are not interchangeable.
Getting this wrong is the most common mistake, and it is usually made at
authoring time, not install time.

| Mechanism | Carries | Installed by | Lives in |
| --- | --- | --- | --- |
| **Skill** | Procedure and knowledge. No code of its own. | `skills` CLI | `~/.agents/skills/<name>/` |
| **MCP server** | Tools the model can call. | `add-mcp` CLI | each agent's own config |
| **Plugin** | A bundle: skills + scripts + CLIs + MCP config + assets, versioned and released together. | each agent's plugin marketplace | per-agent plugin cache |

Choose the plugin's primary real-world domain before authoring:

- **AI** — assistants, model routing, speech, and model services.
- **Cloud** — cloud platforms and infrastructure.
- **Communication** — messaging and correspondence.
- **Developer Tools** — software construction, inspection, and operation.
- **Productivity** — organization, capture, documents, and work management.
- **Media** — playback, consumption, and curation.
- **Shopping** — purchasing and consumer commerce.
- **Health** — health information and health-related systems.
- **Drivers** — physical machines and devices.
- **System** — agent runtime and package infrastructure.

Choose the domain a person would use to describe the program, not whether its transport is a CLI, API, connector, MCP server, or local database.

Borrowed third-party material needs a provenance, license, and behavior review.
Adapt or reimplement it under `plugins/<owner>/`, retain required attribution,
test the owning plugin, and release it to both primary clients unless the
content genuinely depends on one client.

Keep changing personal facts, credentials, message history, records, and
secrets out of plugins. A plugin may carry stable procedures, schemas, system
identities, scripts, CLIs, MCP configuration, assets, and tests.

Use the system `plugin-creator` skill when a new plugin is needed and the
system `skill-creator` skill for each skill authored inside it. See
`package-manager:release` for publication and client reconciliation, and
`package-manager:mcp-servers` for MCP capabilities.

## Choosing Agent Targets

`-a/--agent` is repeatable and takes agent identifiers. If the user explicitly
requests a temporary standalone install, the default target set is **both
primary agents**:

```bash
npx skills add <source> --skill <name> -a codex -a claude-code -g -y
```

Narrow the target set when the skill is genuinely client-specific — and only
then. A skill belongs to one agent when its *content* would be wrong
elsewhere, not when it merely happens to be used there more often:

- **Codex-only** — procedure written against Codex's own surfaces: its
  config at `~/.codex/config.toml`, `codex plugin`/`codex mcp` subcommands,
  the desktop app bundle, `[apps.*]` brokered integrations.
- **Claude-only** — procedure written against Claude Code's surfaces:
  hooks and `settings.json`, subagents, output styles, Claude plugin
  marketplaces, `~/.claude.json`.
- **Both** — everything else. Tool knowledge, repo conventions, engineering
  doctrine, and any CLI that both agents can shell out to. This is the
  common case; prefer it when unsure, because a skill installed to an agent
  that never triggers it costs nothing but a skill missing where it is
  needed costs a whole session.

The identifiers that matter here are `codex`, `claude-code`, and `universal`
— the last one being the canonical `~/.agents/skills/` directory itself,
which most agents read natively. The CLI supports roughly seventy more
(`cursor`, `zed`, `amp`, `opencode`, `windsurf`, `gemini-cli`, `goose`,
`aider`, `crush`, and so on). Do not assert that a given target exists from
memory; pass a deliberately invalid `-a` value and the CLI prints its full
current list, or drop `-y` for the interactive picker.

`--all` is shorthand for `--skill '*' --agent '*' -y`. Never use it against a
repo you have not listed first.

## Where Installs Land

One canonical copy in `~/.agents/skills/<name>/`, read natively by Codex and
most agents, plus per-agent bridges — Claude Code gets a symlink into
`~/.claude/skills/<name>` because it does not read the agents directory
itself. The lockfile at `~/.agents/.skill-lock.json` records each skill's
source repo, path, folder hash, and install time; read it to answer "where
did this skill come from" and to check provenance before touching anything.

These directories are **install targets, not sources of truth**. Never edit a
skill in place there — the change is invisible to the source repo and the
next `update` silently reverts it. Edit upstream, push, then update.

## Find Before Installing

```bash
npx skills find <query>              # interactive search
npx skills find <query> --owner <gh> # scope to one GitHub owner
npx skills add <source> --list       # enumerate skills in a repo, install nothing
```

Search order that avoids duplicate work:

1. **Already installed?** `npx skills list -g`. The most common outcome of
   "find me a skill for X" is that X is installed and simply did not trigger,
   which is a description problem, not a missing-skill problem.
2. **In an installed plugin?** Check `claude plugin list`, `codex plugin list`,
   and the skills exposed by the installed plugins.
3. **The wider ecosystem** — `npx skills find`, and the skills.sh leaderboard
   for a popularity read.

## Try Before Installing

```bash
npx skills use <source>@<skill>
```

Prints the skill as a prompt without installing it. Use this to evaluate a
third-party skill's actual content before it becomes part of every session.
Prefer it over installing-then-removing.

## Vetting

Read `SKILL.md` before installing, always. A skill is instructions that will
be injected into future sessions, so it carries the same trust as anything
else that steers an agent.

- **Read the whole file**, not the description. The description is what
  triggers it; the body is what it does.
- **Check what it executes.** Bundled `scripts/` and any command the body
  tells the agent to run are the real surface area. `curl | sh`, credential
  reads, and writes outside the working tree are disqualifying without a
  specific reason.
- **Install counts are popularity, not review.** They say a skill did not
  visibly break for many people. They say nothing about whether it is right
  for this setup, and a well-reviewed 50-install skill beats a vague
  50,000-install one.
- **Overbroad descriptions are a real cost.** A skill that claims to trigger
  on "any coding task" will fire constantly and crowd out sharper skills.
  Prefer narrow triggers.

## Standalone Install, Update, Remove

Use this surface only for provider-managed skills, an explicitly requested
temporary evaluation, or cleanup of pre-existing loose installs. Promotion
into the user's durable setup means moving the capability into its owning plugin
and then removing the standalone copy.

```bash
# Install one named skill, both primary agents, user-level
npx skills add <source> --skill <name> -a codex -a claude-code -g -y

# Update everything tracked in the lockfile from its source
npx skills update -g

# Update named skills only
npx skills update <name> -g

# Remove
npx skills remove <name> -g -a universal -a codex -a claude-code
```

**`remove` under-reports.** It prints "Successfully removed N skill(s)" after
unlinking only the per-agent bridges it was pointed at; the canonical copy in
`~/.agents/skills/<name>/` and the `~/.agents/.skill-lock.json` entry survive.
`-a '*'` is rejected outright by `remove` despite the help text advertising
it. Include `-a universal` to reach the canonical directory, then verify
rather than trusting the exit message:

```bash
npx skills list -g | grep <name>          # should print nothing
ls ~/.agents/skills/ | grep <name>        # should print nothing
```

If either still shows the skill, delete the directory and drop its lockfile
key by hand. A leftover entry is not cosmetic: it points `update` at a source
path that may no longer exist, and the stale copy keeps loading into every
session.

Removing a standalone skill that has since moved into a plugin is exactly
this case — the lockfile still references the old `skills/<name>/` path, so
clear it or the plugin copy and the orphan will both be live.

Always install by explicit `--skill <name>`. Against a repo that carries
plugins, `-s '*'` / `--all` walks the whole tree, discovers plugin-internal
`SKILL.md` files under `plugins/*/skills/`, and double-installs them as
standalone skills — they then diverge from the plugin that owns them and
update from the wrong place.

`--copy` writes real files instead of symlinks. Use it only when an agent
cannot follow symlinks; the default keeps one canonical copy and is what the
lockfile assumes.

Agents read skills at startup. Restart the target agent and confirm the skill
actually appears before reporting an install as done.
