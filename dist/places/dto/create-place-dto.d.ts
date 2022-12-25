export declare class CreatePlaceDto {
    name: string;
    description: string;
    price: string;
    type: PlaceType;
    cityId: number;
    interestsIds: number[];
}
export declare enum PlaceType {
    RESTURANT = "RESTURANT",
    HOTEL = "HOTEL",
    SITE = "SITE"
}
