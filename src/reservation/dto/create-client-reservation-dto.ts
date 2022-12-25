import { PlaceType } from "src/places/dto/create-place-dto";

export class CreateClientReservationDto {
    type: PlaceType;
    fromDate: string;
    toDate: string;
    customerId: number;
    placeId: number;
    reservationTypeId: number
}


export enum Operation {
    EQUALS = 'EQUALS',
    BIGGER = 'BIGGER',
    SMALLER = 'SMALLER',
    SMALLER_OR_EQUALS = 'SMALLER_OR_EQUALS',
    BIGGER_OR_EQUALS = 'BIGGER_OR_EQUALS'
}