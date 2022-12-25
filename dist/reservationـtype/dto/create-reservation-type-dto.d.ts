export declare class CreateReservationTypeDto {
    name: string;
    description: string;
    price: number;
    priceType: PriceType;
    placeId: number;
    amenityIds: number[];
}
export declare enum PriceType {
    PERNIGHT = "PERNIGHT",
    PERHOUR = "PERHOUR"
}
