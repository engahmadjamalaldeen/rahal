import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CustomerRepository } from './customer.repository';
import { JwtStrategy } from './jwt.strategy';
import { CityRepository } from 'src/cities/city.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { PlaceRepository } from 'src/places/place.repository';
import { BlogRepository } from 'src/blogs/blog.repository';
import { ReviewRepository } from 'src/reviews/review.repository';
import { InterestRepository } from 'src/interests/interest.repository';
import { CategoryRepository } from 'src/categories/category.repository';
import { ReservationRepository } from 'src/reservation/reservation.repository';
@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CustomerRepository, ReservationRepository, CityRepository, PlaceRepository, BlogRepository, ReviewRepository, InterestRepository, CategoryRepository]),
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
  providers: [CustomersService, JwtStrategy],
  controllers: [CustomersController],
  exports: [JwtStrategy, PassportModule]
})
export class CustomersModule {}
