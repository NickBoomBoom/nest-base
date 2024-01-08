import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptions/transform.interception';
import * as morgan from 'morgan';
import { HttpExceptionFilter } from './common/filters/http-execption.filters';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // ! 开发时使用 查看接口文档; /api   /api-json
  // const config = new DocumentBuilder()
  //   .setTitle('接口文档')
  //   .setDescription('The API description')
  //   .setVersion('1.0')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  // 使用 morgan 中间件来记录 HTTP 请求
  app.use(morgan('combined'));
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(configService.get('base.port'));
}
bootstrap();
