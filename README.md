# Package Manager

A public catalog of independently versioned plugins for Codex and Claude Code. The repository also contains the Package Manager plugin for discovering, packaging, scheduling, and releasing agent capabilities.

Most listed plugins have public source. `linear`, `notion`, and `near` install from private repositories, so installing them requires GitHub access to PedroAVJ's private repositories; the rest are public. Account access and private user data remain in the owning service or local configuration, never in a plugin. Named AI employee role plugins use the separate private `PedroAVJ/agents` marketplace. The former `PedroAVJ/apps` marketplace is retired; its plugins moved here or were removed.

## Install

```bash
codex plugin marketplace add PedroAVJ/package-manager --ref main
codex plugin add writing@package-manager

claude plugin marketplace add PedroAVJ/package-manager
claude plugin install writing@package-manager
```

Use the same `plugin@package-manager` identity for other entries. See [the catalog](MARKETPLACES.md) for categories and capabilities.

## Package Manager skills

- `package-manager:agent-skills` discovers and reviews skills, provenance, and packaging.
- `package-manager:mcp-servers` packages and reconciles MCP capabilities.
- `package-manager:release` validates and publishes plugins with verified client cutovers.
- `package-manager:schedules` creates thin native schedules through the host's supported automation surface.
- `package-manager:sqlite-cache-cli-pattern` designs durable local adapters owned by the corresponding plugin.

A repository may contain an application alongside its plugin. The catalog version identifies only what the agent loads. Product-only releases keep that version unchanged. Larger product repositories expose a self-contained plugin through `git-subdir`.

## Contributing and licensing

Author changes in the owning repository, validate its source, and update this catalog after publication. Public repositories must preserve upstream licenses and contain no private records or proprietary source; a private source must be named as private in [the catalog](MARKETPLACES.md). First-party Package Manager code and guidance are MIT licensed; see [icon provenance](ICON-SOURCES.md) for third-party artwork.
