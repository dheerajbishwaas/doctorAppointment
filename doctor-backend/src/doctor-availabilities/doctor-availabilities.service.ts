import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorAvailability } from './entities/doctor-availability.entity';

@Injectable()
export class DoctorAvailabilitiesService {
  constructor(
    @InjectRepository(DoctorAvailability)
    private availabilityRepo: Repository<DoctorAvailability>,
  ) {}

  async getDoctorAvailability(user_id: string) {
    const availability = await this.availabilityRepo.findOne({
      where: { user_id, is_deleted: false },
    });

    if (availability) {
      return {
        start_time: availability.start_time,
        end_time: availability.end_time,
      };
    }

    // Fallback to default ENV time
    return {
      start_time: process.env.DOCTOR_AVILABE_STARTTIME || '08:00AM',
      end_time: process.env.DOCTOR_AVILABE_ENDTIME || '08:00PM',
    };
  }
}
