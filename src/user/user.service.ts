import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data
    })
  }

  async findById(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      // include: {
      //   addresses: true
      // }
    })
  }

  // async findAll({ skip = 0, take = 10 }: Pagination): Promise<[User[], number]> {
  //   const [payload, total] = await Promise.all([
  //     this.prisma.user.findMany({
  //       skip,
  //       take,
  //       include: {
  //         escort: true
  //       }
  //     }),
  //     this.prisma.user.count()
  //   ])

  //   return [payload, total]
  // }

  async findOne(id: number): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        id
      }
    })
  }

  async search(term: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        name: {
          contains: term,
          mode: 'insensitive'
        }
      }
    })
  }

  async update(id: number, { id: _id, ...data }: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: {
        id
      },
      data
    })
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id
      }
    })
  }
}
