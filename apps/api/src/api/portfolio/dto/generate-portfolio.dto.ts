import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class GeneratePortfolioDto {
  @ApiProperty({
    example: 60,
    description: 'Please provide the target volume in tons',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  volume: number;
}
