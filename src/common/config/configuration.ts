export default () => ({
  // 服务基本配置
  base: {
    port: +process.env.PORT,
  },
  // 数据库配置
  mysql: {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES,
    },
  },
});
