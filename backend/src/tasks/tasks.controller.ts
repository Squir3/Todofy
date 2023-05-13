import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(@Res() res) {
    const tasks = await this.tasksService.getTasks();
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Get(':id')
  async getTask(@Res() res, @Param('id') id: string) {
    const task = await this.tasksService.getTask(id);
    if (!task) throw new NotFoundException('Task does not exist!');
    return res.status(HttpStatus.OK).json(task);
  }

  @Post()
  async addTask(@Res() res, @Body() createTaskDto: CreateTaskDto) {
    const newTask = await this.tasksService.addTask(createTaskDto);
    return res.status(HttpStatus.OK).json({
      message: 'Task has been submitted successfully!',
      task: newTask,
    });
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Res() res,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const editedTask = await this.tasksService.updateTask(id, updateTaskDto);
    if (!editedTask) throw new NotFoundException('Task does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Task has been successfully updated',
      task: editedTask,
    });
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string, @Res() res) {
    const deletedTask = await this.tasksService.deleteTask(id);
    if (!deletedTask) throw new NotFoundException('Task does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Task has been deleted!',
      task: deletedTask,
    });
  }
}
