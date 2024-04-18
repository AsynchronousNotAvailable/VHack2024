import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { user } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(createuserDto: CreateUserDto): Promise<user> {
    const userExist = await this.prisma.user.findFirst({ where: { email: createuserDto.email } });
    if (userExist) {
      throw new ConflictException(`user already registered`);
    }

    return this.prisma.user.create({ data: createuserDto});
  }

  async login(loginuserDto: LoginUserDto): Promise<user> {
    const userExist = await this.prisma.user.findFirst({
      where: { email: loginuserDto.email },
    });
    if (!userExist) {
      throw new NotFoundException('user not found');
    }
    
    if (userExist.password !== loginuserDto.password) {
      throw new ConflictException('Invalid credentials');
    }
    console.log(userExist.user_type);
    return userExist;
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  async findOne(id: number): Promise<user> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  async updateUser(userId: number, updateuserDto: UpdateUserDto): Promise<user> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`user with ID ${userId} not found`);
    }

    return this.prisma.user.update({ where: { id: userId }, data: updateuserDto });
  }

  



  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
