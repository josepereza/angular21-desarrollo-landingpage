module.exports = {
  apps: [
    {
      name: 'goldwert-landingpages',
      script: 'dist/angular21-desarrollo-landingpage/server/server.mjs',
      cwd: '/var/www/goldwert-landingpages/current',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
      env_file: '.env',
    },
  ],
};
