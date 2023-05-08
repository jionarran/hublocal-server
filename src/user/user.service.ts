import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const data = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      };

      //@ts-ignore
      const createdUser = await this.prisma.user.create({ data });

      return { ...createdUser, password: undefined };
    } catch (e) {
      throw new Error('Ocorreu um erro ao criar usuário');
    }
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email: email } });
  }
}
