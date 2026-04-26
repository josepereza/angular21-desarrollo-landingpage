# Goldwert Landingpages

Landing Page profesional en Angular 21 con SSR, frontend en alemán y backend separado con Express, TypeORM, PostgreSQL, OpenAI y envío de correos con Gmail.

## Desarrollo local

Instalar dependencias:

```bash
npm install
```

Levantar el frontend y el backend:

```bash
npm run build:prod
npm run start:frontend
npm run start:backend
```

## Variables de entorno

Parte de la plantilla incluida en [.env.example](./.env.example):

```bash
PORT=4000
BACKEND_BASE_URL=http://127.0.0.1:4001
APP_BASE_URL=http://localhost:4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/goldwert_landingpages
GMAIL_USER=tu-cuenta@gmail.com
GMAIL_APP_PASSWORD=tu-app-password-de-gmail
AGENCY_INBOX=tu-cuenta@gmail.com
OPENAI_API_KEY=tu-api-key
OPENAI_MODEL=gpt-4.1-mini
```

Para Gmail debes usar una `App Password`.

## Base de datos

Crear las tablas ejecutando:

```bash
psql "$DATABASE_URL" -f database/schema.sql
```

## Build de producción

```bash
npm run build:prod
```

## Despliegue en VPS

Archivos incluidos:

- `ecosystem.config.cjs`: configuración para `pm2`
- `deploy/nginx.goldwert-landingpages.conf`: reverse proxy para Nginx
- `deploy/deploy.sh`: script básico de despliegue

Flujo recomendado con `pm2`:

```bash
sudo npm install -g pm2
cp .env.example .env
npm ci --include=dev
npm run build:prod
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup
```

## Verificación

Compilación del proyecto:

```bash
npx ng build
```

Si aparece `sh: 1: ng: not found`, significa que faltan las `devDependencies` y no se instaló `@angular/cli`. En el VPS usa `npm ci --include=dev` antes de compilar; después de generar `dist/`, el proceso en producción ya no necesita `ng`.

Con PM2 quedarán dos procesos:

```bash
pm2 list
pm2 logs goldwert-frontend
pm2 logs goldwert-backend
```
