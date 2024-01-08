import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from './dto/update-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { Public } from '../../common/decorator/public.decorator';
import { Status } from './entities/user.entity';

@Controller('user')
@ApiTags('用户管理')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '注册' })
  async create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() loginUserDto: LoginUserDTO) {
    return this.usersService.login(loginUserDto);
  }

  @Public()
  @Get('check/email/:email')
  @ApiOperation({ summary: '检测email' })
  async checkEmail(@Param('email') email: string) {
    return this.usersService.checkEmail(email);
  }

  @Get()
  @ApiOperation({ summary: '获取当前用户信息' })
  async get(@Request() request) {
    const {
      user: { id },
    } = request;
    return this.usersService.findOne(+id);
  }

  @Patch()
  @ApiOperation({ summary: '修改用户信息' })
  async update(@Request() request, @Body() updateUserDto: UpdateUserDTO) {
    const {
      user: { id },
    } = request;
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户信息' })
  async remove(@Param('id') id: string, @Request() request) {
    const {
      user: { id: loginUserId },
    } = request;
    if (+id !== loginUserId) {
      throw new Error('登录用户和删除用户id不匹配,你在干什么???');
    }
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new Error('用户不存在');
    }
    user.status = Status.DISABLED;
    return await this.usersService.update(+id, user);
  }
}
