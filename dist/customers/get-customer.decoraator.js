"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCustomer = void 0;
const common_1 = require("@nestjs/common");
exports.GetCustomer = (0, common_1.createParamDecorator)((data, req) => {
    const request = req.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=get-customer.decoraator.js.map