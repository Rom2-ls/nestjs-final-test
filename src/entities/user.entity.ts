import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from './task.entity';
import { IsString } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false })
    @IsString()
    email: string;

    @OneToMany(() => Task, (task) => task.user, { cascade: true })
    tasks: Task[];
}
