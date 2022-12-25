import { Module } from '@nestjs/common';
import { CustomerRepository } from 'src/customers/customer.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { PlaceRepository } from 'src/places/place.repository';
import { ReviewRepository } from './review.repository';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ReviewRepository, CustomerRepository, PlaceRepository]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService]
})
export class ReviewsModule {}
