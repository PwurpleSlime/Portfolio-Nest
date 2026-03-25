import { Injectable } from '@nestjs/common';
import { mongoItemDTO } from './dto/item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MongoDbService {
    constructor(
        @InjectModel('Item') private itemModel: Model<any>,
    ){}
    getAll() {
        return []
    }

    getSingleItemByOr() {
        return {"name":"john","num":"-1"}
    }

    getSingleItemByAnd() {
        return {"name":"john","num":"-1"}
    }

    async upsertById(id: string | undefined, item: mongoItemDTO) {
        console.log('-----------')
        console.log(id)
        console.log('-----------')
        if (!id) {
            console.log('here')
            return this.itemModel.create(item);
        }
        console.log('there')
        return this.itemModel.findByIdAndUpdate(
            id,
            { $set: item },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        );
    }

    deleteById(id: string) {
        return true
    }
}

