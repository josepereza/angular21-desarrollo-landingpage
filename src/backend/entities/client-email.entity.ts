import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity({ name: 'client_emails' })
@Check(`"direction" IN ('sent', 'received')`)
export class ClientEmailEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'client_id', type: 'int' })
  clientId!: number;

  @ManyToOne(() => ClientEntity, (client) => client.emails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client!: ClientEntity;

  @Column({ type: 'varchar', length: 12 })
  direction!: 'sent' | 'received';

  @Column({ type: 'varchar', length: 220 })
  subject!: string;

  @Column({ type: 'text' })
  body!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
