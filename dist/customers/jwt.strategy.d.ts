import { Customer } from "./customer.entity";
import { CustomerRepository } from "./customer.repository";
import { JwtPayload } from "./jwt-payload.interface";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private customerRepository;
    constructor(customerRepository: CustomerRepository);
    validate(payload: JwtPayload): Promise<Customer>;
}
export {};
