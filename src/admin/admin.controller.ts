import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/constants/roles.enum';
import { LoginDto } from 'src/users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private authService: AuthService,
  ) {}

  @Post('sub_admin/register')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
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

  @HasRoles(Role.SuperAdmin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/all')
  getUsers(@Paginate() query: PaginateQuery, @Request() req) {
    return this.adminService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
