import { PlaceType } from "src/places/dto/create-place-dto";
export declare class CreateClientReservationDto {
    type: PlaceType;
    status: Status;
    fromDate: string;
    toDate: string;
    customerId: number;
    placeId: number;
    reservationTypeId: number;
}
export declare enum Operation {
    EQUALS = "EQUALS",
    BIGGER = "BIGGER",
    SMALLER = "SMALLER",
    SMALLER_OR_EQUALS = "SMALLER_OR_EQUALS",
    BIGGER_OR_EQUALS = "BIGGER_OR_EQUALS"
}
export declare enum Status {
    pending = "pending",
    confirmed = "confirmed"
}
