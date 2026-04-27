# AGENTS.md

## Project Structure
- **Frontend**: Angular 21 SSR in `src/` (entry: `main.ts`, server entry: `main.server.ts`)
- **Backend**: Express + TypeORM + PostgreSQL in `src/backend/` (compiled to `dist/backend/`)
- **Public assets**: `public/` folder

## Developer Commands
```bash
npm run build:prod    # Build frontend (Angular) + backend (tsc)
npm run start:frontend  # SSR dev server on PORT=4000
npm run start:backend  # Express API on PORT=4001
npm run build:backend  # Compile only backend (TypeScript)
npm test              # Run Karma tests
```

**Order matters**: Start backend AFTER frontend for correct proxy/config loading.
**Build required**: Full build (`ng build`) needed before start scripts work - dist/ must exist.

## Database Setup
```bash
psql "$DATABASE_URL" -f database/schema.sql
```
Requires PostgreSQL running on localhost:5432.

## Environment Variables
See `.env.example`. Key vars:
- `PORT=4000` - Frontend SSR port
- `DATABASE_URL` - PostgreSQL connection
- `GMAIL_USER`, `GMAIL_APP_PASSWORD` - Gmail SMTP (requires App Password, not regular password)

## Deployment
Uses PM2 with `ecosystem.config.cjs`. Two processes:
- `goldwert-frontend` - Angular SSR
- `goldwert-backend` - Express API

Run: `pm2 start ecosystem.config.cjs --env production`

## Testing
Uses Karma + Jasmine (not Jest). Run with `ng test` or `npm test`.

## Known Quirks
- Backend compiled to CommonJS (`tsconfig.backend.json`), different from Angular's ES modules
- Angular v21 uses Signals by default (see `.agents/skills/angular-developer/` for refs)
- Frontend in German language (German landing pages)