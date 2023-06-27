import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User, UserCredential } from 'src/AllEntites';
import { MulterModule } from '@nestjs/platform-express';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/helper/hash.services';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ImageUploadSerive } from 'src/imageupload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserCredential]),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    UsersService,
    HashService,
    AuthService,
    JwtService,
    LocalStrategy,
    JwtStrategy,
    ImageUploadSerive,
  ],
})
export class AdminModule {}
