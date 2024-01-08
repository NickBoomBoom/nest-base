import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';
export class LoginUserDTO {
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
