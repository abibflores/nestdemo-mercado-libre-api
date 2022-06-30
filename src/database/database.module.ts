import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { name, user, password } = configService.database;
        const uri = `mongodb+srv://cluster0.8tksinr.mongodb.net/?authMechanism=DEFAULT`;
        return {
          uri,
          user,
          pass: password,
          dbName: name,
        };
      },
      inject: [config.KEY],
    }),
  ],
})
export class DatabaseModule {}
