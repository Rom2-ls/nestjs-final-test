import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import { Task } from './entities/task.entity';

@Module({
    imports: [
        AppRoutingModule,
        ConfigurationModule,
        DatabaseModule,
        UserModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'nestjs-final-test-db',
            entities: [User, Task],
            synchronize: true,
        }),
    ],
})
export class AppModule {}
