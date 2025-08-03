import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('doctor_availabilities')
export class DoctorAvailability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;  // FK to users.id (doctor)

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
