import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { DoctorBlockDate } from './doctor-block-date.entity';

@Entity('doctor_block_groups')
export class DoctorBlockGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  block_type: string; // weekly, monthly, yearly

  @Column({ default: 'active' })
  status: string;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => DoctorBlockDate, date => date.block_group, { cascade: true })
  dates: DoctorBlockDate[];
}
