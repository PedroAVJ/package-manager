# Plugin catalog

Plugins are programs. Each is independently versioned in its own repository. The catalog version identifies the agent-loadable plugin contract. Product-only releases preserve the plugin version and do not refresh installed clients.

Package Manager is the public marketplace at `PedroAVJ/package-manager`. Its two client catalogs use external sources. Categories are metadata inside the catalog, not separate marketplaces. Qualified public identities use `plugin@package-manager`.

Private work marketplaces stay inside their private product repositories. A public plugin must not require one to install. Near supports separately configured private context; it ships no person's records or default private repository.

| Category | Plugins |
| --- | --- |
| **AI** | `chatgpt`, `claude`, `elevenlabs`, `openrouter` |
| **Cloud** | `azure`, `google-cloud`, `icloud`, `neon` |
| **Communication** | `contacts`, `gmail`, `messages`, `telcel`, `whatsapp` |
| **Developer Tools** | `codex`, `ios`, `sentry` |
| **Drivers** | `macbook` |
| **Finance** | `bbva`, `sat` |
| **Health** | `near`, `rp-strength` |
| **Media** | `youtube`, `youtube-music` |
| **Productivity** | `apple-passwords`, `calendar`, `google-docs`, `notes`, `reminders`, `samsung-tv`, `voice-memos` |
| **Shopping** | `amazon`, `rappi` |
| **System** | `package-manager`, `toolchain`, `writing` |

35 public plugins in 11 categories. Native apps and services within a plugin repository are not counted as separate plugins.
