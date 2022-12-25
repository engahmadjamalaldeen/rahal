export declare class CreateMembershipUserDto {
    username: string;
    password: string;
    membershipId: number;
    role: Role;
}
export declare enum Role {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    RECEPTIONIST = "RECEPTIONIST"
}
