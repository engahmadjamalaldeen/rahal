import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { PlaceRepository } from 'src/places/place.repository';
import { MembershipRepository } from './membership.repository';
import { MembershipsController } from './memberships.controller';
import { MembershipsService } from './memberships.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([MembershipRepository, PlaceRepository])
  ],
  controllers: [MembershipsController],
  providers: [MembershipsService]
})
export class MembershipsModule { }
