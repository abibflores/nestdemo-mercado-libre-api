import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
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
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { name, user, password } = configService.database;
        const uri = `mongodb+srv://${user}:${password}@cluster0.8tksinr.mongodb.net/?authMechanism=DEFAULT`;
        console.log(uri, 'uri');
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(name);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}
