import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const database: MysqlConnectionOptions = {
  type: 'mysql',
  host: '172.0.0.1',
  port: 3302,
  username: 'root',
  password: 'root',
  logging: true,
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