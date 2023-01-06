import { PlaceType } from "src/places/dto/create-place-dto";
export declare class CreateReservationDto {
    type: PlaceType;
    status: Status;
    fromDate: string;
    usdPrice: number;
    toDate: string;
    customerId: number;
    placeId: number;
    roomId: number;
}
export declare enum Status {
    pending = "pending",
    confirmed = "confirmed",
    done = "done",
    canceled = "canceled"
}
