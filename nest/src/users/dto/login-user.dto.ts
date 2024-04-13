import { UserType } from '@prisma/client';
export class LoginUserDto {
  email: string;
  password: string;
  user_type: UserType;
}