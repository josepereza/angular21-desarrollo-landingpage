import { DataSource } from 'typeorm';
import { ClientEmailEntity } from '../entities/client-email.entity';
import { ClientEntity } from '../entities/client.entity';
import { ClientReportEntity } from '../entities/client-report.entity';
import { AiReportService } from './ai-report.service';
import { EmailService } from './email.service';

export interface CreateClientInput {
  name: string;
  email: string;
  website: string | null;
  description: string;
}

export interface CreateClientResult {
  client: ClientEntity;
  reportText: string;
}

export class ClientService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly aiReportService: AiReportService,
    private readonly emailService: EmailService,
  ) {}

  async createClient(input: CreateClientInput): Promise<CreateClientResult> {
    const clientRepository = this.dataSource.getRepository(ClientEntity);
    const reportRepository = this.dataSource.getRepository(ClientReportEntity);
    const emailRepository = this.dataSource.getRepository(ClientEmailEntity);

    const client = await clientRepository.save(
      clientRepository.create({
        name: input.name,
        email: input.email,
        website: input.website,
        description: input.description,
      }),
    );

    const reportText = await this.aiReportService.buildGermanReport(client);

    await reportRepository.save(
      reportRepository.create({
        clientId: client.id,
        reportText,
      }),
    );

    const sentEmail = await this.emailService.sendAcknowledgement(client);

    await emailRepository.save(
      emailRepository.create({
        clientId: client.id,
        direction: 'sent',
        subject: sentEmail.subject,
        body: sentEmail.body,
      }),
    );

    return { client, reportText };
  }
}
