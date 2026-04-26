import OpenAI from 'openai';
import { getEnvironment } from '../config/env';
import { ClientEntity } from '../entities/client.entity';

export class AiReportService {
  private readonly env = getEnvironment();
  private readonly client = this.env.openAiApiKey
    ? new OpenAI({ apiKey: this.env.openAiApiKey })
    : null;

  async buildGermanReport(client: ClientEntity): Promise<string> {
    if (!this.client) {
      return this.buildFallbackReport(client);
    }

    try {
      const completion = await this.client.responses.create({
        model: this.env.openAiModel,
        input: [
          {
            role: 'system',
            content: [
              {
                type: 'input_text',
                text:
                  'Du bist ein Senior-Berater für Conversion-orientierte Landingpages. Antworte ausschließlich auf Deutsch in professionellem Ton. Bewerte, ob eine bestehende Website modernisiert werden kann oder ob ein neuer Aufbau sinnvoller ist. Erstelle eine klare, kurze fachliche Einschätzung mit den Abschnitten "Ausgangslage", "Einschätzung" und "Empfehlung".',
              },
            ],
          },
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: `Name: ${client.name}
E-Mail: ${client.email}
Bestehende Website: ${client.website ?? 'Keine Website angegeben'}
Projektbeschreibung: ${client.description}`,
              },
            ],
          },
        ],
      });

      const text = completion.output_text.trim();
      return text || this.buildFallbackReport(client);
    } catch {
      return this.buildFallbackReport(client);
    }
  }

  private buildFallbackReport(client: ClientEntity): string {
    const hasWebsite = Boolean(client.website);
    const modernization = hasWebsite
      ? 'Eine Modernisierung der vorhandenen Website erscheint grundsätzlich realistisch, sofern Struktur, Inhalte und Technik gezielt überarbeitet werden.'
      : 'Da aktuell keine Website genannt wurde, ist eine fokussierte Landingpage als schneller und wirksamer Einstieg besonders sinnvoll.';

    return [
      'Ausgangslage:',
      hasWebsite
        ? `Es wurde eine bestehende Website angegeben (${client.website}).`
        : 'Es wurde keine bestehende Website angegeben.',
      '',
      'Einschätzung:',
      modernization,
      'Die Projektbeschreibung deutet darauf hin, dass ein klarer, vertriebsorientierter Auftritt mit deutlicher Nutzenkommunikation und starker Kontaktführung erforderlich ist.',
      '',
      'Empfehlung:',
      'Empfohlen wird eine moderne, mobile-first Landingpage mit präziser Leistungsdarstellung, vertrauensbildenden Inhalten und einem klaren Anfrageprozess.',
    ].join('\n');
  }
}
