import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Amenity } from './amenities.entity';
import { AmenitiesService } from './amenities.service';
import { AddAmenitiesToReservationType } from './dto/add-amenities-to-reservation-type-dto';
import { CreateAmenityDto } from './dto/create-amenitie-dto';

@Controller('amenities')
export class AmenitiesController {
    constructor(private amenitiesService: AmenitiesService){}


    @Get('')
    getAmenities(): Promise<Amenity[]> {
        return this.amenitiesService.getAmenities();
    }

    @Post()
    @UsePipes(ValidationPipe)
    addAmenity(@Body() createAmenityDto: CreateAmenityDto): Promise<Amenity> {
        return this.amenitiesService.addAmenity(createAmenityDto);
    }

    @Get('/:id')
    getAmenityById(@Param('id', ParseIntPipe) id: number): Promise<Amenity> {
        return this.amenitiesService.getAmenityById(id);
    }

    @Put('/addAmenitiesToReservationType')
    addAmenitiesToReservationType(@Body() addAmenitiesToReservationType: AddAmenitiesToReservationType){
        return this.amenitiesService.addAmenitiesToReservationType(addAmenitiesToReservationType);
    }

    @Put('/:id')
    editAmenityById(@Param('id', ParseIntPipe) id: number, @Body() createAmenityDto: CreateAmenityDto): Promise<Amenity> {
        return this.amenitiesService.editAmenityById(id, createAmenityDto);
    }

    @Delete('/:id')
    deleteAmenityById(@Param('id', ParseIntPipe) id: number) : Promise<boolean>{
        return this.amenitiesService.deleteAmenityById(id);
    }
}
