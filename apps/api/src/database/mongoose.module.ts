import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        try {
          return {
            uri:
              process.env.NODE_ENV === 'test'
                ? process.env.MONGODB_URI_TEST
                : process.env.MONGODB_URI,
          };
        } catch (error) {
          console.log(error);
          console.error('Mongoose connection error:', error);
          throw new Error('Mongoose connection error');
        }
      },
    }),
  ],
})
export class DatabaseModule {}
