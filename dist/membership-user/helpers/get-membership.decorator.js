"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMembership = void 0;
const common_1 = require("@nestjs/common");
exports.GetMembership = (0, common_1.createParamDecorator)((data, req) => {
    const request = req.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=get-membership.decorator.js.map