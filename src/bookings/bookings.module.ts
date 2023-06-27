import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookings } from './entities/booking.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { User } from 'src/AllEntites';

@Module({
  imports: [TypeOrmModule.forFeature([Bookings, Vehicle, User])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
