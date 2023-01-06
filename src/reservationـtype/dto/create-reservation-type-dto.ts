export class CreateReservationTypeDto {
    name: string;
    description: string;
    price: number;
    usdPrice: number;
    priceType: PriceType;
    placeId: number;
    amenityIds: number[];
}


export enum PriceType {
    PERNIGHT = 'PERNIGHT',
    PERHOUR = 'PERHOUR'
}