import { ApiProperty } from "@nestjs/swagger";

export class addItemDTO {
    @ApiProperty()
    id: number
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string
    @ApiProperty()
    completed: boolean
    @ApiProperty()
    createdDate: Date
}