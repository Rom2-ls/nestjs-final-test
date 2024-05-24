import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { User } from '../entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Task]),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
