import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './schemas/project.schema';

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

describe('ProjectService', () => {
  let service: ProjectService;
  let model: Model<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getModelToken('Project'),
          useValue: {
            new: jest.fn().mockResolvedValue(createProjectDto),
            constructor: jest.fn().mockResolvedValue(createProjectDto),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    model = module.get<Model<Project>>(getModelToken('Project'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all projects list', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      lean: jest.fn().mockResolvedValueOnce([createProjectDto]),
    } as any);
    const project = await service.findAll();
    expect(project).toEqual([createProjectDto]);
  });

  it('should insert a new project into database', async () => {
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(createProjectDto as any));
    const newProject = await service.create(createProjectDto);
    expect(newProject).toEqual(createProjectDto);
  });
});
