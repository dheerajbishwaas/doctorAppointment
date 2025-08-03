import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { DoctorBlocksService } from './doctor-blocks.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('doctor-blocks')
export class DoctorBlocksController {
  constructor(private readonly doctorBlocksService: DoctorBlocksService) {}

  @UseGuards(JwtAuthGuard)
  @Post('block-days')
  async createBlockDays(@Body() createBlockDto: CreateBlockDto, @Request() req) {
    return this.doctorBlocksService.createBlockDays(createBlockDto, req.user);
  }
}
