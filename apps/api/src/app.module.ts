import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/mongoose.module';
import {
  HttpExceptionFilter,
  RequestLoggerMiddleware,
  ResponseLoggerInterceptor,
} from './common';
import { ProjectModule } from './api/projects/project.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ProjectModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseLoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
