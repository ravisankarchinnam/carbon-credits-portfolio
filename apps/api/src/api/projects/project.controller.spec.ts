import { Response } from 'express';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { MockResponse, createResponse } from 'node-mocks-http';

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

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        {
          provide: ProjectService,
          useValue: {
            create: jest.fn().mockResolvedValue(createProjectDto),
            findAll: jest.fn().mockResolvedValue(createProjectDto),
          },
        },
      ],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });

  describe('create()', () => {
    it('should create a new project', async () => {
      const response: MockResponse<Response> = createResponse();
      response.json = jest.fn();
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(createProjectDto);
      await controller.create(createProjectDto);
      expect(createSpy).toHaveBeenCalledWith(createProjectDto);
    });
  });

  describe('findAll()', () => {
    it('should return an list of projects', async () => {
      const response: MockResponse<Response> = createResponse();
      response.json = jest.fn();
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([createProjectDto]);
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
