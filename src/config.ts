import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const database: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3302,
  username: 'root',
  password: 'root',
  logging: false,
  database: 'bt_monitor',
  entities: [
      __dirname + '/**/*.entity{.ts,.js}',
  ],
  synchronize: true,
};

export const jwtConfig = {
  secret: '!.abstcomjklfdmsa.bt_secret',
  expiresIn: '1h',
};

export const aes = {
  key: '0vApxLk5G3PAsJrM',
  iv: 'FnJL7EAzVqWjcaY7',
};
