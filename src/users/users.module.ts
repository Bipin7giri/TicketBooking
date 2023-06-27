import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from '../AllEntites/index';
import { HashService } from 'src/helper/hash.services';
// import { AuthService } from 'src/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from 'src/auth/local.strategy';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserCredential } from './entities/UserCredential.entities';
import { MulterModule } from '@nestjs/platform-express';
import { ImageUploadSerive } from 'src/imageupload.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserCredential]),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    HashService,
    AuthService,
    JwtService,
    LocalStrategy,
    JwtStrategy,
    ImageUploadSerive,
  ],
})
export class UsersModule {}
