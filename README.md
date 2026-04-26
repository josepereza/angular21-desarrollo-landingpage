# Goldwert Landingpages

Landing Page profesional en Angular 21 con SSR, frontend en alemán y backend integrado con Express, TypeORM, PostgreSQL, OpenAI y envío de correos con Gmail.

## Desarrollo local

Instalar dependencias:

```bash
npm install
```

Levantar el proyecto en local:

```bash
npm start
```

## Variables de entorno

Parte de la plantilla incluida en [.env.example](./.env.example):

```bash
PORT=4000
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
npm run start:prod
```

## Despliegue en VPS

Archivos incluidos:

- `ecosystem.config.cjs`: configuración para `pm2`
- `deploy/goldwert-landingpages.service`: servicio `systemd`
- `deploy/nginx.goldwert-landingpages.conf`: reverse proxy para Nginx
- `deploy/deploy.sh`: script básico de despliegue

Flujo recomendado con `pm2`:

```bash
sudo npm install -g pm2
cp .env.example .env
npm ci
npm run build:prod
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup
```

Flujo recomendado con `systemd`:

```bash
sudo cp deploy/goldwert-landingpages.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable goldwert-landingpages
sudo systemctl start goldwert-landingpages
```

## Verificación

Compilación del proyecto:

```bash
npx ng build
```
# angular21-desarrollo-landingpage
