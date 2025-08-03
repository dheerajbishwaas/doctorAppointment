import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsUUID()
  doctor_id: string;

  @IsNotEmpty()
  @IsString()
  appointment_date: string;  // YYYY-MM-DD

  @IsNotEmpty()
  @IsString()
  start_time: string;  // HH:MM (24h)

  @IsNotEmpty()
  @IsString()
  end_time: string;  // HH:MM (24h)
}
