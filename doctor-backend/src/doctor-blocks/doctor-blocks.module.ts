import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorBlocksService } from './doctor-blocks.service';
import { DoctorBlocksController } from './doctor-blocks.controller';
import { DoctorBlockGroup } from './entities/doctor-block-group.entity';
import { DoctorBlockDate } from './entities/doctor-block-date.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorBlockGroup, DoctorBlockDate])],
  controllers: [DoctorBlocksController],
  providers: [DoctorBlocksService],
})
export class DoctorBlocksModule {}
