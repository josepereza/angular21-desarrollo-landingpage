import { Router } from 'express';
import { DataSource } from 'typeorm';
import { AiReportService } from '../services/ai-report.service';
import { ClientService } from '../services/client.service';
import { EmailService } from '../services/email.service';

interface ClientPayload {
  name?: unknown;
  email?: unknown;
  website?: unknown;
  description?: unknown;
}

export function createClientRouter(dataSource: DataSource): Router {
  const router = Router();
  const clientService = new ClientService(dataSource, new AiReportService(), new EmailService());

  router.post('/clients', async (req, res) => {
    const validation = validatePayload(req.body as ClientPayload);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    try {
      const result = await clientService.createClient(validation.data);
      return res.status(201).json({
        success: true,
        message: 'Vielen Dank. Ihre Anfrage wurde erfolgreich übermittelt.',
        reportSummary: summarizeReport(result.reportText),
      });
    } catch (error) {
      console.error('Fehler beim Verarbeiten der Kundenanfrage:', error);
      return res.status(500).json({
        success: false,
        message: 'Die Anfrage konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.',
      });
    }
  });

  return router;
}

function validatePayload(payload: ClientPayload):
  | {
      valid: true;
      data: {
        name: string;
        email: string;
        website: string | null;
        description: string;
      };
    }
  | {
      valid: false;
      message: string;
    } {
  const name = asTrimmedString(payload.name);
  const email = asTrimmedString(payload.email);
  const website = asTrimmedString(payload.website);
  const description = asTrimmedString(payload.description);

  if (!name) {
    return { valid: false, message: 'Bitte geben Sie einen Namen an.' };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email)) {
    return { valid: false, message: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' };
  }

  if (website && !/^https?:\/\/[\w.-]+\.[a-z]{2,}(?:[/?#].*)?$/i.test(website)) {
    return { valid: false, message: 'Bitte geben Sie eine gültige Website-URL an.' };
  }

  if (!description || description.length < 20) {
    return {
      valid: false,
      message: 'Bitte beschreiben Sie Ihr Projekt mit mindestens 20 Zeichen.',
    };
  }

  return {
    valid: true,
    data: {
      name,
      email,
      website: website || null,
      description,
    },
  };
}

function asTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function summarizeReport(reportText: string): string {
  const normalized = reportText.replace(/\s+/g, ' ').trim();
  return normalized.length > 220 ? `${normalized.slice(0, 217)}...` : normalized;
}
