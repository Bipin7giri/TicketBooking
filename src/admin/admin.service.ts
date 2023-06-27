import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User, UserCredential } from 'src/AllEntites';
import { Repository } from 'typeorm';
import { HashService } from 'src/helper/hash.services';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(UserCredential)
    private readonly userCredential: Repository<UserCredential>,
    private hashService: HashService,
  ) {}
  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  public findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['id', 'username', 'email'],
      relations: ['roleId'],
      nullSort: 'last',
      searchableColumns: ['username'],
      defaultSortBy: [['id', 'DESC']],
      // filterableColumns: {
      //   : [FilterOperator.GTE, FilterOperator.LTE],
      // },
    });
  }

  async blockUserById(id: number) {
    try {
      const checkIfUserExist = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      if (checkIfUserExist) {
        return this.userRepository.update(id, {
          isBlocked: true,
        });
      } else {
        return null;
      }
    } catch (err) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
