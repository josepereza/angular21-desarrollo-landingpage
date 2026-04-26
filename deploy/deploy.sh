#!/usr/bin/env bash
set -euo pipefail

# Script básico de despliegue para VPS.
# Requiere que el proyecto ya exista en /var/www/goldwert-landingpages/current
# y que las variables estén en /var/www/goldwert-landingpages/shared/.env

APP_DIR="/var/www/goldwert-landingpages/current"

cd "$APP_DIR"

npm ci
npm run build:prod

if command -v pm2 >/dev/null 2>&1; then
  pm2 startOrReload ecosystem.config.cjs --env production
  pm2 save
else
  systemctl restart goldwert-landingpages
fi
