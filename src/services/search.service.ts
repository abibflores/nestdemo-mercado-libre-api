import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Product } from '../dtos/product.dtos';
import { lastValueFrom, map } from 'rxjs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Search } from 'src/entities/search.entity';
@Injectable()
export class SearchService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Search.name) private searchModule: Model<Search>,
  ) {}

  filterProperties(data: Product[]) {
    return data.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        currency_id: product.currency_id,
        available_quantity: product.available_quantity,
        thumbnail: product.thumbnail,
        condition: product.condition,
      };
    });
  }

  async findOne(query: string): Promise<Product[]> {
    const response = await lastValueFrom(
      this.httpService
        .get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
        .pipe(map((response) => response.data?.results)),
    );
    const productList = this.filterProperties(response);
    return productList;
  }

  async getSearch(query: string) {
    const bdResult = await this.searchModule.findOne({ name: query }).exec();
    if (bdResult) {
      return bdResult;
    }
    const mlResult = await this.findOne(query);

    const data = {
      name: query,
      total: mlResult.length,
      results: mlResult,
    };

    const newSearch = new this.searchModule(data);
    return newSearch.save();
  }
}
