"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_repository_1 = require("./category.repository");
let CategoriesService = class CategoriesService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async getCategories() {
        const found = await this.categoryRepository.find();
        return found;
    }
    async getCategoriesByPage(page) {
        const found = await this.categoryRepository.createQueryBuilder("Category")
            .where({ page: page })
            .getMany();
        return found;
    }
    async addCategory(createCategoryDto) {
        return this.categoryRepository.addCategory(createCategoryDto);
    }
    async editCategoryActivityById(id) {
        const found = await this.categoryRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Category with ID ${id} not found`);
        }
        let updated = this.categoryRepository.createQueryBuilder()
            .update(found)
            .set({ isActive: !found.isActive })
            .where("id = :id", { id: found.id })
            .execute();
        return true;
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_repository_1.CategoryRepository)),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map