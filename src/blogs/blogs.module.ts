import { Module } from '@nestjs/common';
import { CityRepository } from 'src/cities/city.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { BlogRepository } from './blog.repository';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BlogRepository, CityRepository]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
