import { Model } from 'mongoose';
import { TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private readonly taskModel;
    constructor(taskModel: Model<TaskDocument>);
    getTasks(): Promise<TaskDocument[]>;
    getTask(id: string): Promise<TaskDocument>;
    addTask(createTaskDto: CreateTaskDto): Promise<TaskDocument>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskDocument>;
    deleteTask(id: string): Promise<any>;
}
