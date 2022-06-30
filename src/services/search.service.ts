import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Product } from '../dtos/product.dtos';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

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
}
