import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { DoctorSpecialization } from '../doctor-specializations/entities/doctor-specialization.entity';
import { Specialization } from '../specializations/entities/specialization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, DoctorSpecialization, Specialization])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}
