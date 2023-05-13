import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  //get all tasks
  async getTasks(): Promise<TaskDocument[]> {
    return await this.taskModel.find().exec();
  }

  //get specific task
  async getTask(id: string): Promise<TaskDocument> {
    return await this.taskModel.findById(id).exec();
  }

  //create task
  async addTask(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    const createdTask = await new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  //update task
  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument> {
    return await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }

  //delete task
  async deleteTask(id: string): Promise<any> {
    return await this.taskModel.findByIdAndDelete(id).exec();
  }
}
