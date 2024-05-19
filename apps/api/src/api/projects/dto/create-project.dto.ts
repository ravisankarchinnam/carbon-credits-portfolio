import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  country: string;

  @IsNotEmpty()
  @ApiProperty()
  image: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  price_per_ton: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  offered_volume_in_tons: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  distribution_weight: number;

  @IsNotEmpty()
  @ApiProperty()
  supplier_name: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  earliest_delivery: Date;

  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
