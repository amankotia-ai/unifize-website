# Self-hosted fonts

These variable `.woff2` files are vendored so the app never fetches fonts over
the network at build/compile time. `next/font/google` downloads font files from
Google during compilation; behind this environment's outbound proxy that fetch
is very slow and can hang the dev server outright (cold compiles stalled ~30s+,
sometimes wedged indefinitely at 0% CPU). Self-hosting removes that dependency —
cold compiles and `next build` no longer touch the network for fonts.

Wired up in `src/app/layout.tsx` via `next/font/local`, exposing the same CSS
variables `globals.css` already consumes: `--font-inter`, `--font-geist`,
`--font-jetbrains-mono`.

## Source (complete latin variable fonts, all weights via the `wght` axis)

| File                          | Family        | Source                                                                        |
| ----------------------------- | ------------- | ----------------------------------------------------------------------------- |
| `inter-variable.woff2`        | Inter         | `@fontsource-variable/inter` → `files/inter-latin-wght-normal.woff2`          |
| `geist-variable.woff2`        | Geist         | `@fontsource-variable/geist` → `files/geist-latin-wght-normal.woff2`          |
| `jetbrains-mono-variable.woff2` | JetBrains Mono | `@fontsource-variable/jetbrains-mono` → `files/jetbrains-mono-latin-wght-normal.woff2` |

To update, re-download from jsDelivr, e.g.:

```
curl -o inter-variable.woff2 \
  https://cdn.jsdelivr.net/npm/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2
```

The `latin` subset includes the general-punctuation block (em-dash, bullet, etc.)
used throughout the site copy.
