// src/interception/transform.interception.ts

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 直接返回结果
const NO_TRANSFORM_URL = [];
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const url = request.url; // 获取请求的URL
    const method = request.method; // 获取HTTP方法
    const key = `${method}:${url}`;
    if (NO_TRANSFORM_URL.includes(key)) {
      return next.handle();
    }
    return next.handle().pipe(
      map((data) => ({
        code: 200,
        data,
        message: 'success',
      })),
    );
  }
}
