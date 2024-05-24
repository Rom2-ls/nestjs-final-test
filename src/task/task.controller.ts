import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    getTasks(@Body('name') name: string): Promise<Task> {
        return this.taskService.getTaskByName(name);
    }

    @Get('user/:userId')
    getUserTasks(@Param('userId') userId: string): Promise<Task[]> {
        return this.taskService.getUserTasks(userId);
    }

    @Get('all')
    getAllTasks(): Promise<Task[]> {
        return this.taskService.getTasks();
    }

    @Post()
    addTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        const { name, userId, priority } = createTaskDto;

        return this.taskService.addTask(name, userId, priority);
    }
}
