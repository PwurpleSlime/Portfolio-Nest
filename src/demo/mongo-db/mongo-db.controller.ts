import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { MongoDbService } from './mongo-db.service';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles/roles.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { mongoItemDTO } from './dto/item.dto';

@Controller('mongo-db')
@ApiTags('Demo', 'Mongo Db')
export class MongoDbController {
  constructor(
    private readonly mongoDbService: MongoDbService,
    @InjectModel('Item') private itemModel: Model<any>,
  ) {}

  @Get('/status')
  @Public()
  async confirmCollectionInit() {
    if (this.itemModel.db.db) {
      const admin = this.itemModel.db.db.admin();
      const dbs = await admin.listDatabases();
      return dbs.databases.some(db => db.name === 'portfolioTest');
    }else {
      throw new HttpException('this.itemModel.db.db is undefined', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  @Get('/getAll')
  @Public()
  getCollection() {
    return this.mongoDbService.getAll()
  }
  @Get('/getSingleItemByOrField')
  @Public()
  getItemSingleByOr() {
    return this.mongoDbService.getSingleItemByOr()
  }
  @Get('/getSingleItemByAndField')
  @Public()
  getItemSingleByAnd() {
    return this.mongoDbService.getSingleItemByAnd()
  }
  @Post('/upsert')
  @ApiQuery( {name: 'id', type: 'String', description: "Auto Generated Mongo ObejectId", required: false})
  @ApiBody({ type: mongoItemDTO})
  @ApiBearerAuth('access-token')
  @Roles('owner')
  upsertMongoItem(
    @Body() body: mongoItemDTO,
    @Query('id') id?: string | undefined,
  ) {    
    return this.mongoDbService.upsertById(id, body)
  }
  @Delete('/delete/:id')
  @ApiParam( {name: 'id', type: 'String', description: "Auto Generated Mongo ObejectId"})
  @ApiBearerAuth('access-token')
  @Roles('owner')
  deleteMongoItem(@Param() id: string) {
    return this.mongoDbService.deleteById(id)
  }
  @Public()
  @Get()
  async createUser() {
    console.log(process.env.MONGO_USERNAME, process.env.MONGO_PASSWORD, process.env.MONGO_COLLECTION)
    const user = new this.itemModel({ name: 'John', num: 17 });
    return user.save();
  }
/**
 * $or: [
 *  {thingOne: checkValue1 },
 *  {thingTwo: checkValue2 }
 * ]
 * 
 * $and: [
 *  {thingOne: checkValue1 },
 *  {thingTwo: checkValue2 }
 * ]
 */
}
