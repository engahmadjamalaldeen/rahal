import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CategoryRepository]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
