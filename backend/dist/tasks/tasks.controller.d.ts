import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTasks(res: any): Promise<any>;
    getTask(res: any, id: string): Promise<any>;
    addTask(res: any, createTaskDto: CreateTaskDto): Promise<any>;
    updateTask(id: string, res: any, updateTaskDto: UpdateTaskDto): Promise<any>;
    deleteTask(id: string, res: any): Promise<any>;
}
