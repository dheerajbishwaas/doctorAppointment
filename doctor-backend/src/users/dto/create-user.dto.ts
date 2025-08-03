import { IsEmail, IsNotEmpty, IsString, MinLength,ValidateIf, IsArray,IsUUID, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty({ message: 'role_id is required' })
  @IsNumber()
  role_id: number;

  @ValidateIf(o => o.role_id === 2)
  @IsArray()
  @IsNotEmpty({ each: true })
  specialization_ids: number[];
}
