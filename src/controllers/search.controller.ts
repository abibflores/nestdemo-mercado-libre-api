import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

import { SearchService } from '../services/search.service';

@Controller('api/search')
export class SearchController {
  constructor(private searchService: SearchService) {}
  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getSearch(@Query('query') query: string): Promise<Product[]> {
    return this.searchService.findOne(query);
  }
}
