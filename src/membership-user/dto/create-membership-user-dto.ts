import { IsString, MinLength } from "@nestjs/class-validator";

export class CreateMembershipUserDto {
    @IsString()
    @MinLength(4)
    username: string;

    @IsString()
    @MinLength(4)
    password: string;
    
    membershipId: number;

    role: Role;
}

export enum Role {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    RECEPTIONIST = 'RECEPTIONIST'
}