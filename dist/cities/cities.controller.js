"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitiesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const cities_service_1 = require("./cities.service");
const create_city_dto_1 = require("./dto/create-city-dto");
const storage_1 = require("@google-cloud/storage");
let CitiesController = class CitiesController {
    constructor(citiesService) {
        this.citiesService = citiesService;
    }
    getCities() {
        return this.citiesService.getCities();
    }
    addCity(createCityDto) {
        return this.citiesService.addCity(createCityDto);
    }
    async uploadFile(file, cityId, req, fileName) {
        const gc = new storage_1.Storage({
            projectId: 'freshchat-test-4e8cb',
            keyFilename: 'freshchat-test-4e8cb-firebase-adminsdk-yv9vt-39d630e9be.json',
        });
        gc.getBuckets();
        const bucket = gc.bucket("freshchat-test-4e8cb.appspot.com");
        const blob = bucket.file(file[0].originalname);
        const metadata = {
            metadata: {},
            contentType: 'image/png',
            cacheControl: 'public, max-age=31536000',
        };
        console.log(blob);
        bucket.upload(file[0].originalname, {
            gzip: true,
            metadata: metadata,
        });
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file[0].mimetype,
                size: file[0].size,
            },
            resumable: false
        });
        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            blob.makePublic().then(() => {
            });
        });
        blobStream.end();
        const urls = [];
        urls.push(`${bucket.name}/${blob.name}`);
        return this.citiesService.addImages(urls, cityId);
    }
    getCityById(id) {
        return this.citiesService.getCityById(id);
    }
    editCityById(id, createCityDto) {
        return this.citiesService.editCityById(id, createCityDto);
    }
    deleteCityById(id) {
        return this.citiesService.deleteCityById(id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CitiesController.prototype, "getCities", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_city_dto_1.CreateCityDto]),
    __metadata("design:returntype", Promise)
], CitiesController.prototype, "addCity", null);
__decorate([
    (0, common_1.Post)('/uploadImages'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Query)('cityId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Query)('fileName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object, String]),
    __metadata("design:returntype", Promise)
], CitiesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CitiesController.prototype, "getCityById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_city_dto_1.CreateCityDto]),
    __metadata("design:returntype", void 0)
], CitiesController.prototype, "editCityById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CitiesController.prototype, "deleteCityById", null);
CitiesController = __decorate([
    (0, common_1.Controller)('cities'),
    __metadata("design:paramtypes", [cities_service_1.CitiesService])
], CitiesController);
exports.CitiesController = CitiesController;
//# sourceMappingURL=cities.controller.js.map