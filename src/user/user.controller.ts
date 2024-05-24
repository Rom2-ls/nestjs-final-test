import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUser(@Body('email') email: string): Promise<User> {
        return this.userService.getUser(email);
    }

    @Get('all')
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get(':userId')
    getUserById(@Body('userId') userId: string): Promise<User> {
        return this.userService.getUserById(userId);
    }

    @Post()
    addUser(@Body('email') email: string): Promise<User> {
        return this.userService.addUser(email);
    }
}
