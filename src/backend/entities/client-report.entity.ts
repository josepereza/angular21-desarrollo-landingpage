import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity({ name: 'client_reports' })
export class ClientReportEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'client_id', type: 'int' })
  clientId!: number;

  @ManyToOne(() => ClientEntity, (client) => client.reports, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client!: ClientEntity;

  @Column({ name: 'report_text', type: 'text' })
  reportText!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
