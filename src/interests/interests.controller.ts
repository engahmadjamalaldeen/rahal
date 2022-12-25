import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddInterestsToCustomerDto } from './dto/add-interests-to-customer-dto';
import { AddInterestsToPlaceDto } from './dto/add-interests-to-place-dto';
import { CreateInterestDto } from './dto/create-interest-dto';
import { Interest } from './interest.entity';
import { InterestsService } from './interests.service';

@Controller('interests')
export class InterestsController {
    constructor(private interestsService: InterestsService){}


    @Get('')
    getInterests(): Promise<Interest[]> {
        return this.interestsService.getInterests();
    }

    @Get('/getPlaceByInterest')
    getPlacesByInterestName(@Query('interestName') interestName: string, @Query('cityId') cityId: number) {
        return this.interestsService.getPlacesByInterestName(interestName, cityId);
    }

    @Post()
    @UsePipes(ValidationPipe)
    addInterest(@Body() createInterestDto: CreateInterestDto): Promise<Interest> {
        return this.interestsService.addInterest(createInterestDto);
    }

    @Get('/:id')
    getInterestById(@Param('id', ParseIntPipe) id: number): Promise<Interest> {
        return this.interestsService.getInterestById(id);
    }

    @Put('/addInterestsToCustomer')
    addInterestsToCustomer(@Body() addInterestsToCustomerDto: AddInterestsToCustomerDto) {
        return this.interestsService.addInterestsToCustomer(addInterestsToCustomerDto);
    }

    @Put('/addInterestsToPlace')
    addInterestsToPlace(@Body() addInterestsToPlaceDto: AddInterestsToPlaceDto) {
        return this.interestsService.addInterestsToPlace(addInterestsToPlaceDto);
    }

    @Put('/:id')
    editInterestById(@Param('id', ParseIntPipe) id: number, @Body() createInterestDto: CreateInterestDto): Promise<Interest> {
        return this.interestsService.editInterestById(id, createInterestDto);
    }

    @Delete('/:id')
    deleteInterestById(@Param('id', ParseIntPipe) id: number) : Promise<boolean>{
        return this.interestsService.deleteInterestById(id);
    }
}
