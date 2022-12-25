import { IsString, Matches, MinLength } from "@nestjs/class-validator";

export class SignInMembershipUserDto {
    @IsString()
    @MinLength(4)
    username: string;

    @IsString()
    @MinLength(4)
    password: string;
}