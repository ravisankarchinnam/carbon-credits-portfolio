import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { DatabaseModule } from '../src/database/database.module';
import { ProjectModule } from '../src/api/projects/project.module';
import { PortfolioModule } from '../src/api/portfolio/portfolio.module';
import { ProjectService } from '../src/api/projects/project.service';
import { Project } from '../src/api/projects/schemas/project.schema';
import { CreateProjectDto } from '../src/api/projects/dto/create-project.dto';
import { DatabaseService } from '../src/database/database.service';

const projectObj: CreateProjectDto = {
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

describe('Portfolio (e2e)', () => {
  let app: INestApplication;
  let dbConnection: mongoose.Connection;
  let httpServer;

  let project: Project & { allowed_volume_in_tons: number };

  const projectService = { findAll: () => [projectObj] };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        ProjectModule,
        PortfolioModule,
      ],
    })
      .overrideProvider(ProjectService)
      .useValue(projectService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await dbConnection.destroy();
    await app.close();
  });

  describe('POST /portfolio/generate', () => {
    it('should generate a portfolio', async () => {
      const response = await request(httpServer)
        .post('/portfolio/generate')
        .send({ volume: 60 });

      const {
        body: { data },
        statusCode,
      } = response;
      project = data[0];

      expect(statusCode).toBe(201);
      expect(project.name).toBe(projectObj.name);
      expect(project.country).toBe(projectObj.country);
      expect(project.allowed_volume_in_tons).toBe(3);
    });
  });
});
