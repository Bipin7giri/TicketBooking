import {
  Injectable,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Role } from 'src/AllEntites';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { HashService } from 'src/helper/hash.services';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';
import { UserCredential } from './entities/UserCredential.entities';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(UserCredential)
    private readonly userCredential: Repository<UserCredential>,
    private hashService: HashService,
  ) {}

  public findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['id', 'username', 'email'],
      relations: ['roleId', 'userCredentialId'],
      nullSort: 'last',
      searchableColumns: ['username'],
      defaultSortBy: [['id', 'DESC']],
      // filterableColumns: {
      //   : [FilterOperator.GTE, FilterOperator.LTE],
      // },
    });
  }

  async registerUser(createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto);
      const hashPassword = await this.hashService.hashPassword(
        createUserDto.password,
      );
      const roles = await this.roleRepository.findOne({
        where: {
          name: 'user',
        },
      });
      const userCredentialId: any = await this.userCredential.save({
        password: hashPassword,
      });
      const response = await this.userRepository.save({
        userCredentialId: userCredentialId,
        roles: roles,
        email: createUserDto.email,
      });
      return 'user registred';
    } catch (err) {
      throw new UnprocessableEntityException('email must be unique');
      console.log(err);
    }
  }

  getUserByEmail(param) {
    return this.userRepository.findOne(param.email);
  }

  findOne(email: string) {
    return this.userRepository.findOne({
      where: {
        email: email,
        isBlocked: false,
      },
      relations: {
        userCredentialId: true,
        roleId: true,
      },
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

  findUsersById(id: number) {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  pathUserById(id: number, payload: UpdateUserDto) {
    return this.userRepository.update(id, payload);
  }

  // create a new user by admin
  async createUser(
    createUserDto: CreateUserDto,
    avatarUrl: string,
  ): Promise<any> {
    const roleId = await this.roleRepository.findOne({
      where: {
        name: 'employee',
      },
    });
    const hashPassword = await this.hashService.hashPassword(
      createUserDto.password,
    );
    const userCredentialId = await this.userCredential.save({
      password: hashPassword,
    });
    const checkIfEmailAlreadyexist = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (checkIfEmailAlreadyexist) {
      throw new UnprocessableEntityException('Email already exist');
    }
    await this.userRepository.save({
      userCredentialId: userCredentialId,
      fullName: createUserDto.fullName,
      gender: createUserDto.gender,
      location: createUserDto.location,
      email: createUserDto.email,
      roleId: roleId,
      avatar: avatarUrl,
    });
    return 'User created';
  }

  async scriptDb() {
    const countIfuser = await this.roleRepository.count();
    console.log(countIfuser);
    if (countIfuser === 0) {
      const admin = new Role();
      admin.name = 'superAdmin';
      admin.roles = ['superAdmin'];
      const roles: any = await this.roleRepository.save({
        name: 'superAdmin',
        roles: ['superAdmin'],
      });
      await this.roleRepository.save({
        name: 'subAdmin',
        roles: ['subAdmin'],
      });
      await this.roleRepository.save({
        name: 'users',
        roles: ['user'],
      });
      console.log(roles);
      const userCredentialId = await this.userCredential.save({
        password:
          '$2a$12$DzW7DBrHUTYFRie7ycF8ouIubkmsrKzNcZs2bZ6mtWpY4FDYoTwhm',
      });
      const adminCreated = await this.userRepository.save({
        name: 'admin',
        email: 'admin@example.com',
        roleId: roles,
        userCredentialId: userCredentialId,
      });
      console.log(adminCreated);
      return adminCreated;
    } else {
      throw new UnprocessableEntityException('Admin alreay exist');
    }
  }
}
