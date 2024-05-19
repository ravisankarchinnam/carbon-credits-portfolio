import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PortfolioService } from './portfolio.service';
import { GeneratePortfolioDto } from './dto/generate-portfolio.dto';
import { Response } from 'express';

@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Post('generate')
  @ApiOperation({
    summary: 'generates portfolio for carbon credits',
  })
  async generatePortfolio(
    @Body() generatePortfolioDto: GeneratePortfolioDto,
    @Res() response: Response,
  ) {
    const data =
      await this.portfolioService.generatePortfolio(generatePortfolioDto);
    response.json({ data, success: true });
  }
}
