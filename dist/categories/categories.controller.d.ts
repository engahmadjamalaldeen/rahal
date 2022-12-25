import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category-dto';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<Category[]>;
    getCategoriesByPage(page: string): Promise<Category[]>;
    addCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    editCategoryActivityById(id: number): Promise<boolean>;
}
