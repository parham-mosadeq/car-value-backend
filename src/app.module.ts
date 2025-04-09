import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { ReportsController } from './reports/reports.controller';

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      // * Will be filled later
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [UsersController, ReportsController],
})
export class AppModule {}
