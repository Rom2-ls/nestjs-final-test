import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async addTask(
        name: string,
        userId: string,
        priority: number,
    ): Promise<Task> {
        if (!this.validateUUID(userId)) {
            throw new BadRequestException('Invalid UUID');
        }

        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new BadRequestException('User does not exist');
        }

        return this.tasksRepository.save({ name, user, priority });
    }

    getTaskByName(name: string): Promise<Task> {
        return this.tasksRepository.findOne({
            where: { name },
        });
    }

    getTasks(): Promise<Task[]> {
        return this.tasksRepository.find({
            relations: ['user'],
        });
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        if (!this.validateUUID(userId)) {
            throw new BadRequestException('Invalid UUID');
        }

        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new BadRequestException('User does not exist');
        }

        return this.tasksRepository.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });
    }

    resetData(): Promise<DeleteResult> {
        return this.tasksRepository.delete({});
    }

    validateUUID(uuid: string): boolean {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            uuid,
        );
    }
}
