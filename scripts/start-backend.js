const fs = require('fs');
const path = require('path');
const Module = require('module');

const envPath = path.join(__dirname, '..', '.env');

try {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const equalIndex = trimmed.indexOf('=');
      const key = trimmed.substring(0, equalIndex);
      let value = trimmed.substring(equalIndex + 1);
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      if (key && value) {
        process.env[key] = value;
      }
    }
  }
} catch {
  console.warn('.env not found, using defaults');
}

if (!process.env.PORT) {
  process.env.PORT = '4001';
}

require('../dist/backend/server.js');