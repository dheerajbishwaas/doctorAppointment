import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Specialization } from '../../specializations/entities/specialization.entity';

@Entity('doctor_specializations')
export class DoctorSpecialization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.specializations, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Specialization, { eager: true })
  specialization: Specialization;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
