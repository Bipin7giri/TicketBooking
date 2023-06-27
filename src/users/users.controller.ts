import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  UnauthorizedException,
  UseInterceptors,
  UploadedFile,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AdminAuto,
  CreateUserDto,
  LoginDto,
} from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
// import { Role } from './entities/user.entity';
import { Role } from '../constants/roles.enum';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { ImageUploadSerive } from 'src/imageupload.service';
import { UpdateUserDto } from './dto/update-user.dto';
cloudinary.config({
  cloud_name: 'dr54a7gze',
  api_key: '868275163814591',
  api_secret: 'U0-E-H34SF1Dl1vpyroUU361AUQ',
});
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
    private imageUploadService: ImageUploadSerive,
  ) {}

  @HasRoles(Role.SuperAdmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/all')
  getUsers(@Paginate() query: PaginateQuery, @Request() req) {
    return this.userService.findAll(query);
  }

  // @HasRoles(Role.SuperAdmin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/register')
  @UseInterceptors(FileInterceptor('avatar'))
  @UsePipes(ValidationPipe)
  async create(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    console.log(file);
    const imageuploadUrl = await this.imageUploadService.uploadImage(
      file?.path,
    );
    return this.userService.createUser(createUserDto, imageuploadUrl);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  getUser(@CurrentUser() user: any) {
    return this.userService.findUsersById(user.userId);
  }

  @HasRoles(Role.SuperAdmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('block/:id')
  async blockUser(@Param('id') id: string) {
    const response = await this.userService.blockUserById(+id);
    console.log(response);
    if (response === null) {
      throw new UnauthorizedException('User not found');
    } else {
      return response;
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('SuperAdmin/login')
  @UsePipes(ValidationPipe)
  async loginSuperAdmin(@Request() req, @Body() loginDto: LoginDto) {
    const result = await this.authService.login(req.user);
    if (result.roleId.name === Role.SuperAdmin) {
      const access_token = { access_token: result.access_token };
      return access_token;
    } else {
      throw new UnauthorizedException('Sorry Unauthorized ');
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @UsePipes(ValidationPipe)
  async login(@Request() req, @Body() loginDto: LoginDto) {
    const result = await this.authService.login(req.user);
    const accessToken = {
      access_token: result.access_token,
    };
    return accessToken;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/me')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateUserMe(
    @CurrentUser() currentUser: any,
    @Body() updateUser: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    const imageuploadUrl = await this.imageUploadService.uploadImage(
      file?.path,
    );
    updateUser.avatar = imageuploadUrl;
    const { userId } = currentUser;
    return this.userService.pathUserById(userId, updateUser);
  }

  @Post('/automigrate')
  async RunScript(@Body() autoMigrate: AdminAuto): Promise<any> {
    const key = 123456;
    if (autoMigrate.key === key) {
      await this.userService.scriptDb();
    } else {
      throw new UnauthorizedException();
    }
  }
}
