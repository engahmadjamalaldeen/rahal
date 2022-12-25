import { Module } from '@nestjs/common';
import { CityImagesService } from './city.images.service';
import { CityImagesController } from './city.images.controller';
import { CityImageRepository } from './city.image.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CityImageRepository]),
  ],
  providers: [CityImagesService],
  controllers: [CityImagesController]
})
export class CityImagesModule {}
