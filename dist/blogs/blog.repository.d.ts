import { CityRepository } from "src/cities/city.repository";
import { Repository } from "typeorm";
import { Blog } from "./blog.entity";
import { CreateBlogDto } from "./dto/create-blog-dto";
export declare class BlogRepository extends Repository<Blog> {
    addBlog(createBlogDto: CreateBlogDto, cityRepository: CityRepository): Promise<Blog>;
}
