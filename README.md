# OsteoSpot

Marketing website for Annachiara Villa (osteopath, Palma de Mallorca).

## Requirements

- **Node.js** `24.18.0` (see `.nvmrc`)
- **pnpm** (recommended package manager)

```bash
nvm use
node -v   # should print v24.18.0
```

## Setup

```bash
pnpm install --shamefully-hoist
```

## Development

```bash
pnpm dev
```

Open http://localhost:3000

## Production

```bash
pnpm build
pnpm preview
```

## Deployment (Netlify)

- Node version: `24.18.0` (configured in `netlify.toml`)
- Build command: `pnpm build`
- Publish directory: `.output/public`
- Server API env vars: `MAILHOST`, `MAILPORT`, `MAILUSER`, `MAILPASSWORD`, `CONTACTMAIL`

## Stack

- Nuxt 3.21.x, Vue 3, Nitro
- i18n: vue-i18n (locales `es`, `en`)
- Contact form: `POST /api/contact` (nodemailer)
