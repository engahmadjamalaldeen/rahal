import { CityRepository } from 'src/cities/city.repository';
import { InterestRepository } from 'src/interests/interest.repository';
import { MembershipRepository } from 'src/memberships/membership.repository';
import { Reservation } from 'src/reservation/reservation.entity';
import { ReservationTypeRepository } from 'src/reservationـtype/reservation.type.repository';
import { ReservationType } from 'src/reservationـtype/reservationـtype.entity';
import { ReviewRepository } from 'src/reviews/review.repository';
import { CreatePlaceDto, PlaceType } from './dto/create-place-dto';
import { Place } from './place.entity';
import { PlaceRepository } from './place.repository';
export declare class PlacesService {
    private placeRepository;
    private cityRepository;
    private reviewRepository;
    private interestRepository;
    private reservationTypeRepository;
    private membershipRepository;
    constructor(placeRepository: PlaceRepository, cityRepository: CityRepository, reviewRepository: ReviewRepository, interestRepository: InterestRepository, reservationTypeRepository: ReservationTypeRepository, membershipRepository: MembershipRepository);
    getPlaces(offset: number, limit: number): Promise<{
        places: Place[];
        prev: string;
        next: string;
    }>;
    getPlaceById(id: number): Promise<Place>;
    editPlaceById(id: number, createPlaceDto: CreatePlaceDto): Promise<Place>;
    getMembershipPlaces(): Promise<Place[]>;
    getTopVisitedPlaces(): Promise<any>;
    addPlace(createPlaceDto: CreatePlaceDto): Promise<Place>;
    searchPlacesAndCiteies(query: string): Promise<{
        Places: any[];
        Citeies: any[];
    }>;
    getPlacesByFilters(id: number, type: PlaceType, cityId: number): Promise<Place[]>;
    deletePlaceById(id: number): Promise<boolean>;
    getPlaceReservations(id: number): Promise<Reservation[]>;
    getPlaceReviews(id: number, offset: number, limit: number): Promise<{
        reviews: import("../reviews/review.entity").Review[];
        prev: string;
        next: string;
    }>;
    getPlaceReservationTypes(id: number): Promise<ReservationType[]>;
}
