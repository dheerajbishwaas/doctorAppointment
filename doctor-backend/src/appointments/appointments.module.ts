import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { DoctorAvailabilitiesModule } from '../doctor-availabilities/doctor-availabilities.module';
import { DoctorBlocksModule } from '../doctor-blocks/doctor-blocks.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    DoctorAvailabilitiesModule,
    DoctorBlocksModule  
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
