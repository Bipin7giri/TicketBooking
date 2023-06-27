import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from '../../AllEntites/index'; // replace with your entity name
@Injectable()
export class EntityNameService {
  // replace with your service name
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleRepository: Repository<Role>,
  ) {}
}
