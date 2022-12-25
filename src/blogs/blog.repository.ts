import { NotFoundException } from "@nestjs/common";
import { CityRepository } from "src/cities/city.repository";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Blog } from "./blog.entity";
import { CreateBlogDto } from "./dto/create-blog-dto";

@CustomRepository(Blog)
export class BlogRepository extends Repository<Blog> {
    async addBlog(createBlogDto: CreateBlogDto, cityRepository: CityRepository): Promise<Blog> {
        const { title, description, cityId } = createBlogDto;
        
        const blog = new Blog();
        blog.title = title;
        blog.description = description;
        const found = await cityRepository.findOne({ where: { id: cityId } });
        if(found){
            blog.cityId = cityId;
            await this.save(blog);
        }
        else {
            throw new NotFoundException("City Id not found");
        }

        return blog;
    }
}