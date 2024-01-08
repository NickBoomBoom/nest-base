import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDTO } from './dto/login-response.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 新增
  async create(createUserDto: CreateUserDTO): Promise<LoginResponseDTO> {
    const user = await this.usersRepository.save(createUserDto);

    const { email, password } = await this.update(user.id, {
      updateAt: new Date(),
    });

    return await this.login({
      email,
      password,
    });
  }

  // 根据id查询信息
  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  // 更新
  async update(userId: number, updateUserDto: UpdateUserDTO): Promise<User> {
    await this.usersRepository.update(userId, updateUserDto);
    return await this.findOne(userId);
  }

  async login(loginUserDto: LoginUserDTO): Promise<LoginResponseDTO> {
    const { email, password } = loginUserDto;
    const isExist = await this.checkEmail(loginUserDto.email);
    if (isExist) {
      const user = await this.usersRepository.findOne({
        where: {
          email,
          password,
        },
      });

      if (!user) {
        throw new Error('账号或密码错误');
      }
      const loginInfo = await this.certificate(user);
      const res = {
        user,
        ...loginInfo,
      };
      return res;
    } else {
      return await this.create(loginUserDto as CreateUserDTO);
    }
  }

  certificate(user: User): {
    token: string;
    expires: number;
  } {
    const { id, email } = user;
    const payload = {
      id,
      email,
    };
    const token = this.jwtService.sign(payload);
    return {
      token: `Bearer ${token}`,
      expires: 7,
    };
  }

  async checkEmail(email: string): Promise<boolean> {
    const count = await this.usersRepository.count({
      where: {
        email,
      },
    });
    return !!count;
  }
}
