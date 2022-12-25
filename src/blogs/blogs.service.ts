import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityRepository } from 'src/cities/city.repository';
import { Blog } from './blog.entity';
import { BlogRepository } from './blog.repository';
import { CreateBlogDto } from './dto/create-blog-dto';

@Injectable()
export class BlogsService {
    constructor(
        @InjectRepository(BlogRepository)
        private blogRepository: BlogRepository,
        @InjectRepository(CityRepository)
        private cityRepository: CityRepository
    ) { }


    async getBlogs(): Promise<Blog[]> {
        const found = await this.blogRepository.find();

        return found;
    }

    async addBlog(createBlogDto: CreateBlogDto): Promise<Blog> {
        return this.blogRepository.addBlog(createBlogDto, this.cityRepository);
    }

    async getBlogById(id: number): Promise<Blog> {
        const found = await this.blogRepository.findOne({ where: { id: id } });

        if (!found) {
            throw new NotFoundException(`Blog with ID ${id} not found`);
        }

        return found;
    }
}
