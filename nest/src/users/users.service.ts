import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.prisma.user.findFirst({ where: { email: createUserDto.email } });
    if (userExist) {
      throw new ConflictException(`User already registered`);
    }

    return this.prisma.user.create({ data: createUserDto});
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const userExist = await this.prisma.user.findFirst({
      where: { email: loginUserDto.email },
    });
    if (!userExist) {
      throw new NotFoundException('User not found');
    }
    
    if (userExist.password !== loginUserDto.password) {
      throw new ConflictException('Invalid credentials');
    }
    console.log(userExist.user_type);
    return userExist;
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.prisma.user.update({ where: { id: userId }, data: updateUserDto });
  }

  



  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
