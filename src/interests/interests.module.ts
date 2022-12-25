import { Module } from '@nestjs/common';
import { CustomerRepository } from 'src/customers/customer.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { PlaceRepository } from 'src/places/place.repository';
import { InterestRepository } from './interest.repository';
import { InterestsController } from './interests.controller';
import { InterestsService } from './interests.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([InterestRepository, CustomerRepository, PlaceRepository]),
  ],
  controllers: [InterestsController],
  providers: [InterestsService]
})
export class InterestsModule {}
