import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorBlockGroup } from './entities/doctor-block-group.entity';
import { DoctorBlockDate } from './entities/doctor-block-date.entity';
import { CreateBlockDto } from './dto/create-block.dto';

@Injectable()
export class DoctorBlocksService {
  constructor(
    @InjectRepository(DoctorBlockGroup)
    private blockGroupRepo: Repository<DoctorBlockGroup>,

    @InjectRepository(DoctorBlockDate)
    private blockDateRepo: Repository<DoctorBlockDate>,
  ) {}

  async createBlockDays(createBlockDto: CreateBlockDto, user: any) {
    // Only Doctors can block days
    if (user.role_id !== 2) {
      throw new ForbiddenException('Only doctors can block days');
    }

    const blockGroup = this.blockGroupRepo.create({
      user_id: user.userId,
      block_type: createBlockDto.block_type,
    });

    blockGroup.dates = createBlockDto.dates.map(date => this.blockDateRepo.create(date));

    return this.blockGroupRepo.save(blockGroup);
  }
}
