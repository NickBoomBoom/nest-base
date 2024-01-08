import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * @两种策略模式:1.jwt认证
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(public configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 请求被拒默认返回401未经授权的错误码
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: any) {
    return {
      id: +payload.id,
      email: payload.email,
    };
  }
}
