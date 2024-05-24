import { IsString, IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsNumber()
    priority: number;
}
