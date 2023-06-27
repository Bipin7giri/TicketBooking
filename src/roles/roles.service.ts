import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto);
  }

  findAll(query: PaginateQuery) {
    return paginate(query, this.roleRepository, {
      sortableColumns: ['id', 'name'],
      // relations: ['userId'],
      nullSort: 'last',
      searchableColumns: ['name'],
      defaultSortBy: [['id', 'DESC']],
      where: {
        deleted: false,
      },
      // filterableColumns: {
      //   : [FilterOperator.GTE, FilterOperator.LTE],
      // },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }

  remove(id: number) {
    return this.roleRepository.update(id, { deleted: true });
  }
}
