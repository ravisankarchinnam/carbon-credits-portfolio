import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const url = configService.get<string>('MONGODB_URI');
        console.log('******************************', url);
        return {
          uri:
            configService.get<string>('NODE_ENV') === 'test'
              ? configService.get<string>('MONGODB_URI_TEST')
              : configService.get<string>('MONGODB_URI'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
