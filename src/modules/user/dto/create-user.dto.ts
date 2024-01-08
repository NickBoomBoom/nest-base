import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';
import { BaseDTO } from '../../../common/dto/base.dto';
export class CreateUserDTO extends BaseDTO {
  @ApiProperty({
    description: '邮箱',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '密码',
  })
  @Length(5, 16)
  password: string;
}
