import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DoctorBlocksModule } from './doctor-blocks/doctor-blocks.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { DoctorAvailabilitiesModule } from './doctor-availabilities/doctor-availabilities.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,AuthModule,DoctorBlocksModule,AppointmentsModule,DoctorAvailabilitiesModule
  ],
})
export class AppModule {}
