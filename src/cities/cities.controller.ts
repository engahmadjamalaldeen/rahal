import { Body, Controller, Delete, Get, Header, Param, ParseIntPipe, Post, Query, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Request, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { existsSync, fstat, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path'
import { CitiesService } from './cities.service';
import { City } from './city.entity';
import { CreateCityDto } from './dto/create-city-dto';
import * as multerGoogleStorage from 'multer-google-storage';
import { Bucket, Storage, UploadCallback } from '@google-cloud/storage';

@Controller('cities')
// @UseGuards(AuthGuard())
export class CitiesController {
    constructor(private citiesService: CitiesService){}


    @Get('')
    getCities(): Promise<City[]> {
        return this.citiesService.getCities();
    }

    @Post()
    @UsePipes(ValidationPipe)
    addCity(@Body() createCityDto: CreateCityDto): Promise<City> {
        return this.citiesService.addCity(createCityDto);
    }

    // @Post('/uploadImages')
    // @Header('Content-Type', 'image/png')
    // @UseInterceptors(AnyFilesInterceptor())
    // async uploadFile(@UploadedFiles() file: Express.Multer.File, @Query('cityId') cityId: number, @Req() req: Request, @Query('fileName') fileName: string){
    //     const gc = new Storage({
    //         projectId: 'freshchat-test-4e8cb',
    //         keyFilename: 'freshchat-test-4e8cb-firebase-adminsdk-yv9vt-39d630e9be.json',
    //     });

    //     gc.getBuckets();

    //     const bucket = gc.bucket("freshchat-test-4e8cb.appspot.com");
    //     // console.log(file);
    //     // console.log(file[0].originalname);
    //     const blob = bucket.file(file[0].originalname);
        
    //     const metadata = {
    //         metadata: {
    //         //   // This line is very important. It's to create a download token.
    //         //   firebaseStorageDownloadTokens: uuid()
    
    //         },
    //         contentType: 'image/png',
    //         cacheControl: 'public, max-age=31536000',
    //       };

    //       console.log(blob);

    //     bucket.upload(file[0].originalname, {
    //         gzip: true,
    //         metadata: metadata,
    //     });

    //     const blobStream = blob.createWriteStream({
    //         metadata: {
    //             contentType: file[0].mimetype,
    //             size: file[0].size,
    //         },
    //         resumable: false
    //     });


    //     blobStream.on('finish', () => {
    //         const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    //         // console.log(publicUrl);

    //         blob.makePublic().then(() => {
    //             // res.status(200).send(`Success!\n Image uploaded to ${publicUrl}`);
    //         })
    //     })

    //     blobStream.end();

    //     const urls = [];

    //     // for(let i = 0; i < file.length; i++){
    //         urls.push(`${bucket.name}/${blob.name}`);
    //     // }


    //     return this.citiesService.addImages(urls, cityId);
    // }

    // @Post('/uploadImages')
    // // @Header('Content-Type', 'image/png')
    // @UseInterceptors(FilesInterceptor('file', 4, {
    //     storage: multerGoogleStorage.storageEngine({
    //         projectId: 'freshchat-test-4e8cb',
    //         keyFilename: 'freshchat-test-4e8cb-firebase-adminsdk-yv9vt-39d630e9be.json',
    //         bucket: "freshchat-test-4e8cb.appspot.com",
    //         filename: (req, file, cb) => {
    //             const fileName: string = path.parse(file.originalname).name.replace(/\s/g,'');
    //             const extension: string = path.parse(file.originalname).ext;

    //             cb(null, `${fileName}${extension}`);
    //         }
    //     })
    // }))
    // uploadFile(@UploadedFiles() file: Array<Express.Multer.File>, @Query('cityId') cityId: number): Promise<City> {
    //     const urls = [];

    //     for(let i = 0; i < file.length; i++){
    //         urls.push(file[0].path.split('.com/')[1]);
    //     }
    //     return this.citiesService.addImages(urls, cityId);
    // }
///////////////////////////////////////
    // @Post('/uploadImages')
    // @UseInterceptors(FilesInterceptor('file', 4, {
    //     storage: diskStorage({
    //         destination: (req, file, cb) => {
    //             const directory = `./uploads/cities/${req.query.cityId}/images`;
    //             if (!existsSync(directory)) {
    //                 mkdirSync(directory, { recursive: true });
    //             }
    //             cb(null, directory);
    //         },
    //         filename: (req, file, cb) => {
    //             const fileName: string = path.parse(file.originalname).name.replace(/\s/g,'');
    //             const extension: string = path.parse(file.originalname).ext;

    //             cb(null, `${fileName}${extension}`);
    //         }
    //     })
    // }))
    // uploadFile(@UploadedFiles() file: Array<Express.Multer.File>, @Query('cityId') cityId: number): Promise<City> {
    //     const urls = [];
    //     for(let i = 0; i < file.length; i++){
    //         urls.push(file[i].path);
    //     }
    //     return this.citiesService.addImages(urls, cityId);
    // }

    @Get('/:id')
    getCityById(@Param('id', ParseIntPipe) id: number): Promise<City> {
        return this.citiesService.getCityById(id);
    }

    @Put('/:id')
    editCityById(@Param('id', ParseIntPipe) id: number, @Body() createCityDto: CreateCityDto) {
        return this.citiesService.editCityById(id, createCityDto);
    }

    @Delete('/:id')
    deleteCityById(@Param('id', ParseIntPipe) id: number) : Promise<boolean>{
        return this.citiesService.deleteCityById(id);
    }
}
