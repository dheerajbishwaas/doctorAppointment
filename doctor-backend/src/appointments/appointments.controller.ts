import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('book')
  async bookAppointment(@Body() createDto: CreateAppointmentDto, @Request() req) {
    return this.appointmentsService.createAppointment(createDto, req.user);
  }
}
