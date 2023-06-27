import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/helper/hash.services';
import { UsersService } from '../users/users.service';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const checkIfCorrectPassword = await this.hashService.comparePassword(
        pass,
        user.userCredentialId.password,
      );
      if (!checkIfCorrectPassword) {
        throw new UnauthorizedException('Incorrect password');
      }
      const { userCredentialId, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Email not found');
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      roleId: user.roleId,
    };
    return {
      access_token: this.jwtService.sign(payload, { secret: 'test' }),
      roleId: user.roleId,
    };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }

  async decodeJWT(token: string) {
    return this.jwtService.decode(token);
  }
}
