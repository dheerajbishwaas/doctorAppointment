import { Entity, PrimaryGeneratedColumn, Column,OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DoctorSpecialization } from '../../doctor-specializations/entities/doctor-specialization.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role_id: number;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => DoctorSpecialization, (docSpec) => docSpec.user)
  specializations: DoctorSpecialization[];
}
