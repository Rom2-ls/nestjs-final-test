import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async addUser(email: string): Promise<User> {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail) {
            throw new BadRequestException('Invalid email');
        }

        const existingUser = await this.getUser(email);
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const newUser = new User();
        newUser.email = email;

        const errors = await validate(newUser);
        if (errors.length > 0) {
            throw new Error('Invalid user object');
        }

        return this.usersRepository.save(newUser);
    }

    async getUser(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { email },
            relations: ['tasks'],
        });

        return user;
    }

    getUserById(userId: string): Promise<User> {
        return this.usersRepository.findOne({
            where: { id: userId },
        });
    }

    getAllUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    resetData(): Promise<DeleteResult> {
        return this.usersRepository.delete({});
    }
}
