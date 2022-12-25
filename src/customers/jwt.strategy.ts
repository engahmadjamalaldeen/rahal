import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Customer } from "./customer.entity";
import { CustomerRepository } from "./customer.repository";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(CustomerRepository)
        private customerRepository: CustomerRepository

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51'
        });
    }

    async validate(payload: JwtPayload): Promise<Customer> {
        const { phone } = payload;
        const user = await this.customerRepository.findOne({where : {phone: phone}});

        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}