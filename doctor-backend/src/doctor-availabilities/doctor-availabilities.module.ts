import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorAvailability } from './entities/doctor-availability.entity';
import { DoctorAvailabilitiesService } from './doctor-availabilities.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorAvailability])],
  providers: [DoctorAvailabilitiesService],
  exports: [DoctorAvailabilitiesService],  // Important to export for other modules (Appointments)
})
export class DoctorAvailabilitiesModule {}
