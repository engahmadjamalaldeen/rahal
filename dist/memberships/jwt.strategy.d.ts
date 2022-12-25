import { Strategy } from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { Membership } from "./membership.entity";
import { MembershipRepository } from "./membership.repository";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private membershipRepository;
    constructor(membershipRepository: MembershipRepository);
    validate(payload: JwtPayload): Promise<Membership>;
}
export {};
