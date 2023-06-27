import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookings } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { User } from 'src/AllEntites';
interface UserDecode {
  userId: number;
}
@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Bookings)
    private readonly bookingRepository: Repository<Bookings>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createBookingDto: CreateBookingDto, user: any): Promise<any> {
    const vehicleId: any = createBookingDto.vehicleId;
    const costPerDay: any = await this.vehicleRepository.findOne({
      where: {
        id: vehicleId,
        deleted: false,
      },
      select: {
        rentalRatePerDay: true,
      },
    });
    await this.vehicleRepository.update(vehicleId, {
      availabilityStatus: true,
    });
    const rentalStartDate = new Date(createBookingDto.rentalStartDate);
    const rentalEndDate = new Date(createBookingDto.rentalEndDate);
    rentalStartDate.setHours(0, 0, 0, 0);
    rentalEndDate.setHours(0, 0, 0, 0);
    const timeDiff = rentalEndDate.getTime() - rentalStartDate.getTime();
    const remainingDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    const totalCost: any = costPerDay.rentalRatePerDay * remainingDays;
    await this.bookingRepository.save({
      ...createBookingDto,
      totalCost: totalCost === 0 && costPerDay.rentalRatePerDay,
      customerId: user.userId,
    });
    return 'saved';
  }

  findAll() {
    return this.bookingRepository.find();
  }

  findOne(id: number): Promise<Bookings> {
    return this.bookingRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findMine(user: any): Promise<any> {
    const bookings = await this.bookingRepository.find({
      where: {
        customerId: {
          id: user.userId,
        },
      },
    });
    return bookings;
  }
  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return this.bookingRepository.update(id, { deleted: true });
  }
}
