import nodemailer from 'nodemailer';
import { getEnvironment } from '../config/env';
import { ClientEntity } from '../entities/client.entity';

export interface SentEmailRecord {
  subject: string;
  body: string;
}

export class EmailService {
  private readonly env = getEnvironment();
  private readonly transporter =
    this.env.gmailUser && this.env.gmailAppPassword
      ? nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: this.env.gmailUser,
            pass: this.env.gmailAppPassword,
          },
        })
      : null;

  async sendAcknowledgement(client: ClientEntity): Promise<SentEmailRecord> {
    const subject = 'Vielen Dank für Ihre Anfrage';
    const body = [
      `Guten Tag ${client.name},`,
      '',
      'vielen Dank für Ihre Anfrage und Ihr Interesse an unseren Landingpage-Leistungen.',
      'Wir haben Ihre Angaben erhalten und prüfen aktuell, wie wir Ihr Projekt am sinnvollsten umsetzen können.',
      '',
      'Wir melden uns zeitnah persönlich bei Ihnen, um die nächsten Schritte zu besprechen.',
      '',
      'Freundliche Grüße',
      'Goldwert Landingpages',
    ].join('\n');

    if (!this.transporter) {
      return { subject, body };
    }

    await this.transporter.sendMail({
      from: `"Goldwert Landingpages" <${this.env.gmailUser}>`,
      to: client.email,
      replyTo: this.env.agencyInbox || this.env.gmailUser,
      subject,
      text: body,
    });

    return { subject, body };
  }
}
