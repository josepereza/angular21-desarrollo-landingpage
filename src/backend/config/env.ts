export interface AppEnvironment {
  port: number;
  backendBaseUrl: string;
  databaseUrl: string;
  gmailUser: string;
  gmailAppPassword: string;
  agencyInbox: string;
  openAiApiKey: string;
  openAiModel: string;
  appBaseUrl: string;
}

export function getEnvironment(): AppEnvironment {
  return {
    port: Number(process.env['PORT'] ?? 4000),
    backendBaseUrl: process.env['BACKEND_BASE_URL'] ?? 'http://127.0.0.1:4001',
    databaseUrl:
      process.env['DATABASE_URL'] ??
      'postgresql://postgres:postgres@localhost:5432/goldwert_landingpages',
    gmailUser: process.env['GMAIL_USER'] ?? '',
    gmailAppPassword: process.env['GMAIL_APP_PASSWORD'] ?? '',
    agencyInbox: process.env['AGENCY_INBOX'] ?? process.env['GMAIL_USER'] ?? '',
    openAiApiKey: process.env['OPENAI_API_KEY'] ?? '',
    openAiModel: process.env['OPENAI_MODEL'] ?? 'gpt-4.1-mini',
    appBaseUrl: process.env['APP_BASE_URL'] ?? 'http://localhost:4000',
  };
}
