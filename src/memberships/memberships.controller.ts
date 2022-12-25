import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership-dto';
import { Membership } from './membership.entity';
import { MembershipsService } from './memberships.service';

@Controller('memberships')
export class MembershipsController {
    constructor(private membershipsService: MembershipsService){}


    @Get('')
    getCities(): Promise<Membership[]> {
        return this.membershipsService.getMemberships();
    }

    @Post('/addMembership')
    @UsePipes(ValidationPipe)
    addCity(@Body() createMembershipDto: CreateMembershipDto): Promise<Membership> {
        return this.membershipsService.addMembership(createMembershipDto);
    }

    @Get('/:id')
    getCityById(@Param('id', ParseIntPipe) id: number): Promise<Membership> {
        return this.membershipsService.getMembershipById(id);
    }

    @Delete('/:id')
    deleteMembershipById(@Param('id', ParseIntPipe) id: number) : Promise<boolean>{
        return this.membershipsService.deleteMembershipById(id);
    }
}
