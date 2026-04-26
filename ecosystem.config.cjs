module.exports = {
  apps: [
    {
      name: 'goldwert-frontend',
      script: 'scripts/start-frontend.mjs',
      cwd: '/var/www/goldwert-landingpages/current',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
        BACKEND_BASE_URL: 'http://127.0.0.1:4001',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000,
        BACKEND_BASE_URL: 'http://127.0.0.1:4001',
      },
      env_file: '.env',
    },
    {
      name: 'goldwert-backend',
      script: 'dist/backend/server.js',
      cwd: '/var/www/goldwert-landingpages/current',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 4001,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4001,
      },
      env_file: '.env',
    },
  ],
};
