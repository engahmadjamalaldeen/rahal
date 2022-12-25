"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const RoleGuard = (role) => {
    class RoleGuardMixin {
        canActivate(context) {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            return user === null || user === void 0 ? void 0 : user.role.includes(role);
        }
    }
    return (0, common_1.mixin)(RoleGuardMixin);
};
exports.default = RoleGuard;
//# sourceMappingURL=roles.guard.js.map