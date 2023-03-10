"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_ex_module_1 = require("../database/typeorm-ex.module");
const categories_controller_1 = require("./categories.controller");
const categories_service_1 = require("./categories.service");
const category_repository_1 = require("./category.repository");
let CategoriesModule = class CategoriesModule {
};
CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([category_repository_1.CategoryRepository]),
        ],
        controllers: [categories_controller_1.CategoriesController],
        providers: [categories_service_1.CategoriesService]
    })
], CategoriesModule);
exports.CategoriesModule = CategoriesModule;
//# sourceMappingURL=categories.module.js.map