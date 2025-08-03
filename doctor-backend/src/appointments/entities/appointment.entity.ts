import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  doctor_id: string;

  @Column()
  user_id: string;  // patient_id

  @Column({ type: 'date' })
  appointment_date: string;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column({ type: 'timestamp', nullable: true })
  booking_completed_at: Date;

  @Column({ default: 'booked' })
  status: string;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
