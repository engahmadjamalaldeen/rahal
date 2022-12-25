import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CityRepository } from 'src/cities/city.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { CityImageRepository } from 'src/city_images/city.image.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CityRepository, CityImageRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      }
    })
  ],
  controllers: [CitiesController],
  providers: [CitiesService]
})
export class CitiesModule {}
