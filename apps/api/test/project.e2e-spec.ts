import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { DatabaseModule } from '../src/database/database.module';
import { ProjectModule } from '../src/api/projects/project.module';
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

describe('Project (e2e)', () => {
  let app: INestApplication;
  let dbConnection: mongoose.Connection;
  let httpServer;

  let project: Project;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ProjectModule,
        DatabaseModule,
      ],
    }).compile();

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

  describe('POST /project', () => {
    it('should create a project', async () => {
      const response = await request(httpServer)
        .post('/project')
        .send(projectObj);

      const { body, statusCode } = response;
      project = body;

      expect(statusCode).toBe(201);
      expect(project.name).toBe(projectObj.name);
      expect(project.country).toBe(projectObj.country);
    });
  });

  describe('GET /project', () => {
    it('should return list of projects', async () => {
      const response = await request(httpServer).get(`/project`);

      const { statusCode } = response;
      const body = response.body as Project[];

      expect(statusCode).toBe(200);
      expect(body.length).toBeGreaterThan(0);
      expect(body[0].name).toBe(projectObj.name);
    });
  });
});
