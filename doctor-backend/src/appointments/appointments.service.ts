import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { DoctorAvailabilitiesService } from '../doctor-availabilities/doctor-availabilities.service';
import { DoctorBlocksService } from '../doctor-blocks/doctor-blocks.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepo: Repository<Appointment>,

    private doctorAvailabilitiesService: DoctorAvailabilitiesService,
    private doctorBlocksService: DoctorBlocksService,
  ) { }

  private timeStringToMinutes(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  async createAppointment(createDto: CreateAppointmentDto, patient: any) {
    // Step 1: Get Doctor Availability Time (from DB or ENV)
    const availability = await this.doctorAvailabilitiesService.getDoctorAvailability(createDto.doctor_id);
    const doctorStart = availability.start_time;  // e.g., "08:00"
    const doctorEnd = availability.end_time;      // e.g., "20:00"

    const minDuration = parseInt(process.env.MIN_APPOINTMENT_DURATION_MINUTES || '15', 10);

    const [startHour, startMinute] = createDto.start_time.split(':').map(Number);
    const [endHour, endMinute] = createDto.end_time.split(':').map(Number);

    const startTotalMin = startHour * 60 + startMinute;
    const endTotalMin = endHour * 60 + endMinute;

    if ((endTotalMin - startTotalMin) < minDuration) {
      throw new BadRequestException(`Appointment duration must be at least ${minDuration} minutes`);
    }

    const appointmentStartMin = this.timeStringToMinutes(createDto.start_time);
    const appointmentEndMin = this.timeStringToMinutes(createDto.end_time);
    const doctorStartMin = this.timeStringToMinutes(doctorStart);
    const doctorEndMin = this.timeStringToMinutes(doctorEnd);

    if (appointmentStartMin < doctorStartMin || appointmentEndMin > doctorEndMin) {
      throw new BadRequestException(`Doctor is only available from ${doctorStart} to ${doctorEnd}`);
    }

    // Step 2: Check if selected date is blocked
    const isBlocked = await this.doctorBlocksService.isDateBlocked(createDto.doctor_id, createDto.appointment_date);
    if (isBlocked) {
      throw new BadRequestException('Doctor is not available on the selected date');
    }

    // Step 3: Check if doctor already has an appointment at this time
    const overlapDoctor = await this.appointmentsRepo
      .createQueryBuilder('appointment')
      .where('appointment.doctor_id = :doctor_id', { doctor_id: createDto.doctor_id })
      .andWhere('appointment.appointment_date = :date', { date: createDto.appointment_date })
      .andWhere('appointment.status = :status', { status: 'booked' })
      .andWhere(`
    (appointment.start_time < :end_time AND appointment.end_time > :start_time)
  `, {
        start_time: createDto.start_time,
        end_time: createDto.end_time,
      })
      .getOne();

    if (overlapDoctor) {
      throw new BadRequestException('Doctor is already booked for this time slot');
    }

    // Step 4: Check if patient already has ANY appointment at this time
    const overlapPatient1 = await this.appointmentsRepo
      .createQueryBuilder('appointment')
      .where('appointment.user_id = :user_id', { user_id: patient.userId })
      .andWhere('appointment.appointment_date = :date', { date: createDto.appointment_date })
      .andWhere('appointment.status = :status', { status: 'booked' })
      .andWhere(`
    (appointment.start_time < :end_time AND appointment.end_time > :start_time)
  `, {
        start_time: createDto.start_time,
        end_time: createDto.end_time,
      })
      .getOne();

    if (overlapPatient1) {
      throw new BadRequestException('You already have an appointment during this time');
    }

    // Step 5: Book the Appointment
    const appointment = this.appointmentsRepo.create({
      doctor_id: createDto.doctor_id,
      user_id: patient.userId,
      appointment_date: createDto.appointment_date,
      start_time: createDto.start_time,
      end_time: createDto.end_time,
      booking_completed_at: new Date(),
      status: 'booked',
    });

    return this.appointmentsRepo.save(appointment);
  }
}
