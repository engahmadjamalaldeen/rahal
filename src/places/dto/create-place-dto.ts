export class CreatePlaceDto {
    name: string;
    description: string;
    nameAR: string;
    descriptionAR: string;
    price: string;
    usdPrice: number;
    type: PlaceType;
    cityId: number;
    interestsIds: number[];
}

export enum PlaceType {
    RESTURANT = 'RESTURANT',
    HOTEL = 'HOTEL',
    SITE = 'SITE'
}