import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Product } from 'src/entities/product.entity';

@Schema()
export class Search extends Document {
  @Prop()
  name: string;
  @Prop()
  total: number;
  @Prop()
  results: Product[];
}

export const SearchSchema = SchemaFactory.createForClass(Search);
