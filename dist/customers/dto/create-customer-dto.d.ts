export declare class CreateCustomerDto {
    id: number;
    phone: string;
    fullName: string;
    password: string;
    email: string;
    cityId: number;
    gender: Gender;
    status: Status;
    numOfKids: number;
    interests: number[];
}
export declare enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}
export declare enum Status {
    SINGLE = "SINGLE",
    MARRIED = "MARRIED"
}
