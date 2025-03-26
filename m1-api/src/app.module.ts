import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'm1-api/src/entities';
import { ControllerModule } from 'm1-api/src/controllers/controller.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities,
      synchronize: true,
    }),
    ControllerModule,
  ],
})
export class AppModule {}
