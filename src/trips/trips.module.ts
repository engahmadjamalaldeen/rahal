import { Module } from '@nestjs/common';
import { CustomerRepository } from 'src/customers/customer.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { TripRepository } from './trip.repository';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([TripRepository, CustomerRepository]),
  ],
  controllers: [TripsController],
  providers: [TripsService]
})
export class TripsModule {}
