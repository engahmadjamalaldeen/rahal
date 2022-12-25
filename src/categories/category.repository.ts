import { CityRepository } from "src/cities/city.repository";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto/create-category-dto";

@CustomRepository(Category)
export class CategoryRepository extends Repository<Category> {
    async addCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { name, page, endPoint, isActive } = createCategoryDto;
        
        const category = new Category();
        category.name = name;
        category.page = page;
        category.endPoint = endPoint;
        category.isActive = isActive;
        
        await this.save(category);

        return category;
    }
}