import { Blog } from './blog.entity';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog-dto';
export declare class BlogsController {
    private blogsService;
    constructor(blogsService: BlogsService);
    getBlogs(): Promise<Blog[]>;
    addBlog(createBlogDto: CreateBlogDto): Promise<Blog>;
    getBlogById(id: number): Promise<Blog>;
}
