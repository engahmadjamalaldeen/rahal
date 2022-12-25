import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Blog } from './blog.entity';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog-dto';

@Controller('blogs')
export class BlogsController {
    constructor(private blogsService: BlogsService){}


    @Get('')
    getBlogs(): Promise<Blog[]> {
        return this.blogsService.getBlogs();
    }

    @Post()
    @UsePipes(ValidationPipe)
    addBlog(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
        return this.blogsService.addBlog(createBlogDto);
    }

    @Get('/:id')
    getBlogById(@Param('id', ParseIntPipe) id: number): Promise<Blog> {
        return this.blogsService.getBlogById(id);
    }
}
