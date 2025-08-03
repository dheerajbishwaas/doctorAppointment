import { IsNotEmpty, IsString, IsUUID, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class BlockDateDto {
  @IsOptional()
  block_date?: string;

  @IsOptional()
  recurring_day?: string;

  @IsOptional()
  recurring_date?: number;

  @IsOptional()
  recurring_month?: number;

  @IsOptional()
  is_emergency_available?: boolean;
}

export class CreateBlockDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  block_type: string; // weekly, monthly, yearly, one-time

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDateDto)
  dates: BlockDateDto[];
}
