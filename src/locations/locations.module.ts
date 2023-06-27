import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { location } from './entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([location])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
