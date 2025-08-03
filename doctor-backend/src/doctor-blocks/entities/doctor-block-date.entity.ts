import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DoctorBlockGroup } from './doctor-block-group.entity';

@Entity('doctor_block_dates')
export class DoctorBlockDate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', nullable: true })
  block_date: string;

  @Column({ nullable: true })
  recurring_day: string;

  @Column({ nullable: true })
  recurring_date: number;

  @Column({ nullable: true })
  recurring_month: number;

  @Column({ default: false })
  is_emergency_available: boolean;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => DoctorBlockGroup, group => group.dates)
  block_group: DoctorBlockGroup;
}
