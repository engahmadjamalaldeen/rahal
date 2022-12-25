import { PlaceType } from "src/places/dto/create-place-dto";

export class CreateReservationDto {
    type: PlaceType;
    fromDate: string;
    toDate: string;
    customerId: number;
    placeId: number;
    roomId: number
}