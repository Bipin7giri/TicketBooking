import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Request,
  UploadedFile,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadSerive } from 'src/imageupload.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import path from 'path';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private imageUploadService: ImageUploadSerive,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ValidationPipe)
  async create(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    const imageUploadUrl = await this.imageUploadService.uploadImage(
      file?.path,
    );
    console.log(imageUploadUrl);
    return this.vehiclesService.create(createVehicleDto, imageUploadUrl);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery, @Request() req) {
    return this.vehiclesService.findAll(query);
  }

  @Get('/active')
  findActive(@Paginate() query: PaginateQuery, @Request() req) {
    return this.vehiclesService.findActive(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') @Request() req,
  //   @UploadedFile() file: Express.Multer.File,
  //   id: string,
  //   @Body() updateVehicleDto: UpdateVehicleDto,
  // ) {
  //   console.log(req.file);
  //   const imageUploadUrl = await this.imageUploadService.uploadImage(
  //     file?.path,
  //   );
  //   return this.vehiclesService.update(+id, updateVehicleDto, imageUploadUrl);
  // }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('img'))
  @UsePipes(ValidationPipe)
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    let imageuploadUrl: string;
    if (file) {
      imageuploadUrl = await this.imageUploadService.uploadImage(file?.path);
    }
    return this.vehiclesService.update(+id, updateVehicleDto, imageuploadUrl);
  }

  @Patch('image/:id')
  @UseInterceptors(FileInterceptor('img'))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageuploadUrl: any = await this.imageUploadService.uploadImage(
      file?.path,
    );
    console.log(file);
    return this.vehiclesService.updateImage(
      +id,

      imageuploadUrl,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}
