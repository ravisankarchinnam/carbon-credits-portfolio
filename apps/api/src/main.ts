import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(Number(process.env.PORT) || 4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
