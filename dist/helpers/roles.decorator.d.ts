import { Role } from 'src/membership-user/dto/create-membership-user-dto';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
