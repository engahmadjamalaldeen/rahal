import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category-dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryRepository)
        private categoryRepository: CategoryRepository
    ) { }


    async getCategories(): Promise<Category[]> {
        const found = await this.categoryRepository.find();

        return found;
    }
    async getCategoriesByPage(page: string) {

        const found = await this.categoryRepository.createQueryBuilder("Category")
        .where({page: page})
        .getMany();

        return found;
    }
    async addCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryRepository.addCategory(createCategoryDto);
    }

    async editCategoryActivityById(id: number): Promise<boolean> {
        const found = await this.categoryRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        let updated = this.categoryRepository.createQueryBuilder()
            .update(found)
            .set({ isActive: !found.isActive })
            .where("id = :id", { id: found.id })
            .execute();

        return true;
    }
}
