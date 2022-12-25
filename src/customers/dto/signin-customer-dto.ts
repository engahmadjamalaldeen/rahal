import { IsString, Matches, MinLength } from "@nestjs/class-validator";

export class SignInCustomerDto {
    @IsString()
    @MinLength(9)
    phone: string;

    @IsString()
    @MinLength(4)
    password: string;
}