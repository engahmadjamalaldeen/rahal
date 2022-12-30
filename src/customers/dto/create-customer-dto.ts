export class CreateCustomerDto {
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

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export enum Status {
    SINGLE = 'SINGLE',
    MARRIED = 'MARRIED'
}