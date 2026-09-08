# Plugin catalog

Plugins are programs. Each is independently versioned in its own repository. The catalog version identifies the agent-loadable plugin contract. Product-only releases preserve the plugin version and do not refresh installed clients.

Package Manager is the public marketplace at `PedroAVJ/package-manager`. Its two client catalogs use external sources. Categories are metadata inside the catalog, not separate marketplaces. Qualified public identities use `plugin@package-manager`.

Private work marketplaces stay inside their private product repositories. A public plugin must not require one to install. Near supports separately configured private context; it ships no person's records or default private repository.

## Category naming rule

Use a familiar name for the primary job the plugin performs. Prefer established App Store terminology when it fits; introduce a custom category only when the existing vocabulary does not describe the job. Vendor, platform, and implementation method do not determine membership.

Assign one primary category after reviewing the plugin's actual skills. Compare a new entry with the purposes below before adding a category. Split a category when its meaning becomes unclear, not when it reaches a fixed member count. Display names and stable plugin identifiers are separate from category membership.

| Category | Count | Plugins |
| --- | ---: | --- |
| **Productivity** | 7 | `calendar`, `reminders`, `notes`, `voice-memos`, `google-docs`, `icloud`, `writing` |
| **Developer Tools** | 7 | `ios`, `sentry`, `neon`, `azure`, `google-cloud`, `toolchain`, `package-manager` |
| **AI** | 5 | `chatgpt`, `claude`, `codex`, `elevenlabs`, `openrouter` |
| **Communication** | 5 | `contacts`, `gmail`, `messages`, `whatsapp`, `telcel` |
| **Media** | 3 | `youtube`, `youtube-music`, `samsung-tv` |
| **Finance** | 2 | `bbva`, `sat` |
| **Shopping** | 2 | `amazon`, `rappi` |
| **Utilities** | 2 | `macbook`, `apple-passwords` |
| **Health & Fitness** | 1 | `rp-strength` |
| **Memory** | 1 | `near` |

35 public plugins in 10 categories. Native apps and services within a plugin repository are not counted as separate plugins. The table uses stable installation identifiers; `azure`, `macbook`, and `apple-passwords` display as Azure, macOS, and Passwords.

## Category purposes

- **Productivity:** organize time, documents, files, notes, and written work. iCloud belongs here because the plugin operates personal files.
- **Developer Tools:** build, operate, diagnose, and release software and its infrastructure. Azure, Google Cloud, and Neon belong here because of the development work their plugins perform.
- **AI:** use, generate with, or operate AI assistants and models. Codex belongs here even though software development is a common use.
- **Communication:** manage people, messages, mail, and mobile communications.
- **Media:** manage playback and media libraries, including educational content and work-session audio. Samsung TV belongs here because playback is its primary job.
- **Finance:** manage banking and tax work.
- **Shopping:** prepare purchases and orders.
- **Utilities:** operate the host environment and credentials. The macOS and Passwords plugins belong here because they provide general system utilities.
- **Health & Fitness:** manage training and fitness work.
- **Memory:** retrieve and maintain separately configured personal context. Near's placement describes its current context-repository scope and should be reviewed if that scope changes.

## Keep the map consistent

A category change updates this map, both client catalogs, the owning Codex plugin manifest, and the category checks in the same release. `npm test` checks exact membership, allowed category names, uniqueness, counts, and agreement between this document and both catalogs. It enforces the approved map; reviewing the primary job remains the author and reviewer's responsibility.
