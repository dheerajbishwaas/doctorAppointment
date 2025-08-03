import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { DoctorSpecialization } from '../doctor-specializations/entities/doctor-specialization.entity';
import { Specialization } from '../specializations/entities/specialization.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(DoctorSpecialization)
    private doctorSpecializationRepo: Repository<DoctorSpecialization>,

    @InjectRepository(Specialization)
    private specializationRepo: Repository<Specialization>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Validate Specializations if Doctor
    if (createUserDto.role_id === 2) {
      if (!createUserDto.specialization_ids || createUserDto.specialization_ids.length === 0) {
        throw new BadRequestException('Specializations are required for doctor registration');
      }

      const specializations = await this.specializationRepo.findByIds(createUserDto.specialization_ids);
      if (specializations.length !== createUserDto.specialization_ids.length) {
        throw new BadRequestException('Invalid specialization IDs provided');
      }
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create User
    const user = this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      role_id: createUserDto.role_id,
    });

    const savedUser = await this.usersRepository.save(user);

    // If Doctor, Insert into doctor_specializations table
    if (createUserDto.role_id === 2) {
      const doctorSpecializations = createUserDto.specialization_ids.map((specId) => {
        const docSpec = new DoctorSpecialization();
        docSpec.user = savedUser;
        docSpec.specialization = { id: specId } as Specialization; // Minimal Object Link
        return docSpec;
      });

      await this.doctorSpecializationRepo.save(doctorSpecializations);
    }

    return savedUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user ?? undefined;
  }



}
