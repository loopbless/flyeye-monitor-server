import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import * as argon2 from 'argon2';
import { UserEntity } from './user.entity';
import { LoginDto, UserDto } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async find({username, password}: LoginDto) {
    const user = await this.findUserName(username);
    if (!!user && await argon2.verify(user.password, password)) {
      return user;
    }
    return null;
  }

  async findUserName(username: string) {
    const user = await this.userRepository.findOne({username});
    if(user) {
      const {id, password, avatar, mobile, email} = user;
      return {id, username, password, avatar, mobile, email}
    } else {
      throw new HttpException('用户名或密码不正确！', HttpStatus.BAD_REQUEST);
    }
  }

  async insert(userDto: UserDto) {
    const {username, email, mobile} = userDto;
    const qb = await getRepository(UserEntity)
    .createQueryBuilder('user')
    .where('user.username = :username', { username })
    .orWhere('user.email = :email', { email })
    .orWhere('user.mobile = :mobile', { mobile });
    const user = await qb.getOne();
    if (user) {
      const errors = {username: 'Username and email must be unique.'};
      throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.insert(new UserEntity(userDto));
  }
}
