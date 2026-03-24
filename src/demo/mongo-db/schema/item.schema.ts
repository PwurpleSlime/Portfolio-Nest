import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";

export type ItemDocument = Item & Document

@Schema()
export class Item {
    @Prop()
    name: String
    @Prop()
    num: Number
    @Prop( { default: 'Defaulty'})
    default: String
}
export const ItemSchema = SchemaFactory.createForClass(Item)