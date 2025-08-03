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

async isDateBlocked(doctor_id: string, date: string): Promise<boolean> {
  const blockGroups = await this.blockGroupRepo.find({
    where: { user_id: doctor_id, is_deleted: false, status: 'active' },
    relations: ['dates'],  // Relation name 'dates'
  });

  const targetDate = new Date(date);
  const dayName = targetDate.toLocaleString('en-US', { weekday: 'long' });
  const dayOfMonth = targetDate.getDate();
  const month = targetDate.getMonth() + 1;

  // ---------------------------- LOOP START ----------------------------
  for (const group of blockGroups) {
  for (const block of group.dates) {
    // Weekly Block Check
    if (group.block_type === 'weekly' && block.recurring_day === dayName) {
      return true;
    }

    // Monthly Block Check
    if (group.block_type === 'monthly' && block.recurring_date === dayOfMonth) {
      return true;
    }

    // Yearly Block Check
    if (group.block_type === 'yearly' && block.recurring_date === dayOfMonth && block.recurring_month === month) {
      return true;
    }

    // Specific Date Block (String to Date conversion)
    if (block.block_date && new Date(block.block_date).toISOString().split('T')[0] === date) {
      return true;
    }
  }
}

  // ---------------------------- LOOP END ----------------------------

  return false;  // Not Blocked
}

}
