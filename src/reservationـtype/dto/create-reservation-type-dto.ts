export class CreateReservationTypeDto {
    name: string;
    description: string;
    price: number;
    priceType: PriceType;
    placeId: number;
    amenityIds: number[];
}


export enum PriceType {
    PERNIGHT = 'PERNIGHT',
    PERHOUR = 'PERHOUR'
}