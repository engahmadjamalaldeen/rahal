import { createParamDecorator } from '@nestjs/common';
import { MembershipUser } from '../membership-user.entity';

export const GetMembership = createParamDecorator((data, req): MembershipUser => {
    const request = req.switchToHttp().getRequest();
    return request.user;
});