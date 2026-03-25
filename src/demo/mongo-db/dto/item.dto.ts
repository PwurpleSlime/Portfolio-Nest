import { ApiProperty } from "@nestjs/swagger";

export class mongoItemDTO {
    @ApiProperty()
    name: String
    @ApiProperty()
    num: Number
}
