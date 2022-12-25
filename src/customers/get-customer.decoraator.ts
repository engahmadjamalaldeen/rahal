import { createParamDecorator } from '@nestjs/common';
import { Customer } from './customer.entity';

export const GetCustomer = createParamDecorator((data, req): Customer => {
    const request = req.switchToHttp().getRequest();
    return request.user;
});