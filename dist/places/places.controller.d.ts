import { Reservation } from 'src/reservation/reservation.entity';
import { CreatePlaceDto, PlaceType } from './dto/create-place-dto';
import { Place } from './place.entity';
import { PlacesService } from './places.service';
export declare class PlacesController {
    private placesService;
    constructor(placesService: PlacesService);
    getPlaces(offset: number, limit: number): Promise<{
        places: Place[];
        prev: string;
        next: string;
    }>;
    getPlacesByFilters(id: number, type: PlaceType, cityId: number): Promise<Place[]>;
    searchPlacesAndCiteies(query: string): Promise<{
        Places: any[];
        Citeies: any[];
    }>;
    getMembershipPlaces(): Promise<Place[]>;
    getTopVisitedPlaces(): Promise<any>;
    getPlaceById(id: number): Promise<Place>;
    editPlaceById(id: number, createPlaceDto: CreatePlaceDto): Promise<Place>;
    addPlace(createPlaceDto: CreatePlaceDto): Promise<Place>;
    deletePlaceById(id: number): Promise<boolean>;
    getPlaceReservations(id: number): Promise<Reservation[]>;
    getPlaceReviews(id: number, offset: number, limit: number): Promise<{
        reviews: import("../reviews/review.entity").Review[];
        prev: string;
        next: string;
    }>;
    getPlaceReservationTypes(id: number): Promise<import("../reservation\u0640type/reservation\u0640type.entity").ReservationType[]>;
}
