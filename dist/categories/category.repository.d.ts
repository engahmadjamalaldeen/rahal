import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto/create-category-dto";
export declare class CategoryRepository extends Repository<Category> {
    addCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
}
