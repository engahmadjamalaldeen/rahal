import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category-dto';
export declare class CategoriesService {
    private categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    getCategories(): Promise<Category[]>;
    getCategoriesByPage(page: string): Promise<Category[]>;
    addCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    editCategoryActivityById(id: number): Promise<boolean>;
}
