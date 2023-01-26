import { Strategy } from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { MembershipUserRepository } from "../membership-user.repository";
import { MembershipUser } from "../membership-user.entity";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private membershipUserRepository;
    constructor(membershipUserRepository: MembershipUserRepository);
    validate(payload: JwtPayload): Promise<MembershipUser>;
}
export {};
