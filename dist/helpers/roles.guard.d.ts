import { CanActivate, Type } from '@nestjs/common';
import { Role } from 'src/membership-user/dto/create-membership-user-dto';
declare const RoleGuard: (role: Role) => Type<CanActivate>;
export default RoleGuard;
