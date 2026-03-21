import { Body, Controller, Delete, Get, Param, Post, Version } from '@nestjs/common';
import { SqliteTaskManagerService } from './sqlite-task-manager.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';
import { Public } from '../../auth/decorators/public.decorator';
import { addItemDTO } from './dto/addItem.dto';

@ApiTags('Sqlite Task Manager')
@Controller('sqlite-task-manager')
export class SqliteTaskManagerController {
  constructor(private readonly sqliteTaskManagerService: SqliteTaskManagerService) {}

  @Public()
  @ApiResponse({
    status: 200
  })
  @Get('')
  @Version('1')
  getDatabase() {
    return this.sqliteTaskManagerService.getAllItems()
  }

  @Roles('user')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200
  })
  @Version('1')
  @Post('/startDatabase')
  startDatabase() {
    return this.sqliteTaskManagerService.startDatabase()
  }

  @Roles('user')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200
  })
  @Version('1')
  @Post('/addItem')
  @ApiBody({
    type: addItemDTO
  })
  addItem(
    @Body() addItemDTO: addItemDTO
  ) {
    return this.sqliteTaskManagerService.addItem(addItemDTO)
  }

  @Roles('user')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200
  })
  @ApiParam({ name: 'uid', type: 'string', description: 'User ID' })
  @Version('1')
  @Post('/toggleItemCompletion/:uid')
  finishItem(
    @Param('uid') uid: number,
  ) {
    return this.sqliteTaskManagerService.toggleCompleted(uid)
  }

  @Roles('user')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200
  })
  @ApiParam({ name: 'uid', type: 'string', description: 'User ID' })
  @Version('1')
  @Delete('deleteItem/:uid')
  deleteItem(
    @Param('uid') uid: number,
  ) {
    return this.sqliteTaskManagerService.deleteTodoItem(uid)
  }
}
