# awal-rebh
Awal Rebh - Premium reward platform with luxury dark theme, minimal navbar, and profile system

## Tech stack
React 19 + TypeScript, Vite, Tailwind CSS 3, lucide-react icons.

## Getting started
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## Configuration
Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your backend. When unset, auth requests
(`src/lib/auth.ts`) are simulated so the UI can be developed standalone. Expected endpoints:
`POST /auth/login`, `POST /auth/signup`, and `GET /auth/oauth/{google|apple|facebook}` (OAuth redirect).

## Internationalization
English is the default. Translations live in `src/i18n/translations.ts` (EN, AR, RU, DE). The selected
language is persisted in `localStorage`, and `<html lang/dir>` is updated automatically (Arabic switches to RTL).
