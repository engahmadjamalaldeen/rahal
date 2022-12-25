import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { MembershipUserRepository } from "../membership-user.repository";
import { MembershipUser } from "../membership-user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(MembershipUserRepository)
        private membershipUserRepository: MembershipUserRepository

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51'
        });
    }

    async validate(payload: JwtPayload): Promise<MembershipUser> {
        const { username } = payload;
        const user = await this.membershipUserRepository.findOne({where : {username: username}});

        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}