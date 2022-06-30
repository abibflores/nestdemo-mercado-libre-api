import { enviroments } from './enviroments';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchController } from './controllers/search.controller';
import { SearchService } from './services/search.service';
import { DatabaseModule } from './database/database.module';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { Search, SearchSchema } from './entities/search.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
    }),
    HttpModule,
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: Search.name,
        schema: SearchSchema,
      },
    ]),
  ],
  controllers: [AppController, SearchController],
  providers: [AppService, SearchService],
})
export class AppModule {}
