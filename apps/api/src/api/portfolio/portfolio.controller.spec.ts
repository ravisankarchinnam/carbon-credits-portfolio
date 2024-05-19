import { Response } from 'express';
import { Test, TestingModule } from '@nestjs/testing';
import { MockResponse, createResponse } from 'node-mocks-http';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { CreateProjectDto } from '../projects/dto/create-project.dto';

const createProjectDto: CreateProjectDto = {
  name: 'EverGreen CarbonScape',
  country: 'Germany',
  image:
    'https://ceezer-public-assets.s3.eu-central-1.amazonaws.com/project_type_sample_images/Fugitives/38bb530f5caf513be9f2a41f2d909f47-min.jpeg',
  price_per_ton: 650,
  offered_volume_in_tons: 15,
  distribution_weight: 0.05,
  supplier_name: 'Klom',
  earliest_delivery: '2023-09-01',
  description:
    'The "EverGreen CarbonScape" project is dedicated to combatting climate change by restoring and preserving vital forest ecosystems.\nThrough reforestation, afforestation, and sustainable forest management, we aim to create robust carbon sinks while promoting biodiversity, engaging local communities, and preventing deforestation.',
};

describe('PortfolioController', () => {
  let controller: PortfolioController;
  let service: PortfolioService;
  const mockRequest = { volume: 60 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioController],
      providers: [
        {
          provide: PortfolioService,
          useValue: {
            generatePortfolio: jest.fn().mockResolvedValue([createProjectDto]),
          },
        },
      ],
    }).compile();

    controller = module.get<PortfolioController>(PortfolioController);
    service = module.get<PortfolioService>(PortfolioService);
  });

  it('should return data', async () => {
    const mockResponse: MockResponse<Response> = createResponse();
    mockResponse.json = jest.fn();

    await controller.generatePortfolio(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: [createProjectDto],
      success: true,
    });
  });

  it("should call the service's generatePortfolio method", async () => {
    const mockResponse: MockResponse<Response> = createResponse();
    mockResponse.json = jest.fn();
    const generatePortfolioSpy = jest.spyOn(service, 'generatePortfolio');
    await controller.generatePortfolio(mockRequest, mockResponse);
    expect(generatePortfolioSpy).toHaveBeenCalledWith({ volume: 60 });
  });
});
