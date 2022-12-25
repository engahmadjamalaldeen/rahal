import { CityRepository } from 'src/cities/city.repository';
import { Blog } from './blog.entity';
import { BlogRepository } from './blog.repository';
import { CreateBlogDto } from './dto/create-blog-dto';
export declare class BlogsService {
    private blogRepository;
    private cityRepository;
    constructor(blogRepository: BlogRepository, cityRepository: CityRepository);
    getBlogs(): Promise<Blog[]>;
    addBlog(createBlogDto: CreateBlogDto): Promise<Blog>;
    getBlogById(id: number): Promise<Blog>;
}
