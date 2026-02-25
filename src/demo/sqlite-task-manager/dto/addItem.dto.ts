import { ApiProperty } from "@nestjs/swagger";

export class addItemDTO {
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string
}