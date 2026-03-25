import { Module } from '@nestjs/common';
import { MongoDbService } from './mongo-db.service';
import { MongoDbController } from './mongo-db.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schema/item.schema';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/${process.env.MONGO_COLLECTION}?authSource=admin`),
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema}
    ])
  ],
  controllers: [MongoDbController],
  providers: [MongoDbService],
})
export class MongoDbModule {}
