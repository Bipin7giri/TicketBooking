import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ImageUploadSerive } from 'src/imageupload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    MulterModule.register({
      dest: './files',
    }),
  ],

  controllers: [VehiclesController],
  providers: [VehiclesService, ImageUploadSerive],
})
export class VehiclesModule {}
