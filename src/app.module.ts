import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [UsersModule, ReportsModule],
  controllers: [UsersController, ReportsModule],
})
export class AppModule {}
