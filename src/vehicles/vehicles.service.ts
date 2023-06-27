import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { FilterSuffix } from 'nestjs-paginate/lib/operator';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}
  create(createVehicleDto: CreateVehicleDto, imageUrl: string) {
    return this.vehicleRepository.save({
      ...createVehicleDto,
      image: imageUrl,
    });
  }

  findAll(query: PaginateQuery): Promise<Paginated<Vehicle>> {
    return paginate(query, this.vehicleRepository, {
      sortableColumns: [
        'id',
        'name',
        'color',
        'availabilityStatus',
        'rentalRatePerDay',
      ],
      where: { deleted: false },
      select: [
        'availabilityStatus',
        'color',
        'year',
        'make',
        'name',
        'rentalRatePerDay',
      ],
      relations: ['categoryId'],
      nullSort: 'last',
      searchableColumns: ['name', 'color'],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        rentalRatePerDay: [
          FilterOperator.GTE,
          FilterOperator.EQ,
          FilterOperator.LTE,
          FilterSuffix.NOT,
        ],
      },
    });
  }
  findActive(query: PaginateQuery): Promise<Paginated<Vehicle>> {
    return paginate(query, this.vehicleRepository, {
      sortableColumns: [
        'id',
        'name',
        'color',
        'availabilityStatus',
        'rentalRatePerDay',
      ],
      where: { deleted: false, availabilityStatus: false },
      select: [
        'availabilityStatus',
        'color',
        'year',
        'make',
        'name',
        'rentalRatePerDay',
      ],
      relations: ['categoryId'],
      nullSort: 'last',
      searchableColumns: ['name', 'color'],
      defaultSortBy: [['id', 'DESC']],
      filterableColumns: {
        rentalRatePerDay: [
          FilterOperator.GTE,
          FilterOperator.EQ,
          FilterOperator.LTE,
          FilterSuffix.NOT,
        ],
      },
    });
  }

  findOne(id: number) {
    return this.vehicleRepository.findOne({
      where: {
        id: id,
      },
      relations: ['categoryId'],
    });
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto, imageUrl?: any) {
    if (imageUrl) {
      return this.vehicleRepository.update(+id, {
        image: imageUrl,
      });
    }
    return this.vehicleRepository.update(id, updateVehicleDto);
  }

  updateImage(id: number, imageUrl: any) {
    return this.vehicleRepository.update(id, {
      image: imageUrl,
    });
  }

  remove(id: number) {
    return this.vehicleRepository.update(id, { deleted: true });
  }
}
