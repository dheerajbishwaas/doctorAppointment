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
  ) {}

  async createAppointment(createDto: CreateAppointmentDto, patient: any) {
    // Step 1: Get Doctor Availability Time
    const availability = await this.doctorAvailabilitiesService.getDoctorAvailability(createDto.doctor_id);
    const doctorStart = availability.start_time;
    const doctorEnd = availability.end_time;

    // Check if appointment time is within availability
    if (createDto.start_time < doctorStart || createDto.end_time > doctorEnd) {
      throw new BadRequestException(`Doctor is only available from ${doctorStart} to ${doctorEnd}`);
    }

    // Step 2: Check if selected date is blocked
    const isBlocked = await this.doctorBlocksService.isDateBlocked(createDto.doctor_id, createDto.appointment_date);
    if (isBlocked) {
      throw new BadRequestException('Doctor is not available on the selected date');
    }

    // Step 3: Check if doctor is already booked for the selected slot
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

    // Step 4: Check if patient already has an appointment at this time with the same doctor
    const overlapPatient = await this.appointmentsRepo
      .createQueryBuilder('appointment')
      .where('appointment.user_id = :user_id', { user_id: patient.userId })
      .andWhere('appointment.doctor_id = :doctor_id', { doctor_id: createDto.doctor_id })
      .andWhere('appointment.appointment_date = :date', { date: createDto.appointment_date })
      .andWhere('appointment.status = :status', { status: 'booked' })
      .andWhere(`
        (appointment.start_time < :end_time AND appointment.end_time > :start_time)
      `, {
        start_time: createDto.start_time,
        end_time: createDto.end_time,
      })
      .getOne();

    if (overlapPatient) {
      throw new BadRequestException('You already have an appointment at this time with this doctor');
    }

    // Step 5: Book Appointment
    const appointment = this.appointmentsRepo.create({
      doctor_id: createDto.doctor_id,
      user_id: patient.userId,
      appointment_date: createDto.appointment_date,
      start_time: createDto.start_time,
      end_time: createDto.end_time,
      booking_completed_at: new Date(),
    });

    return this.appointmentsRepo.save(appointment);
  }
}
