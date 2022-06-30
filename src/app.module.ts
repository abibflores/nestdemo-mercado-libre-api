import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchController } from './controllers/search.controller';
import { SearchService } from './services/search.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, SearchController],
  providers: [AppService, SearchService],
})
export class AppModule {}
