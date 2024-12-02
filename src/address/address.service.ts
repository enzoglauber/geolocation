import { Injectable } from '@nestjs/common'
import { Address, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAddressDto): Promise<Address> {
    const query = Prisma.sql`INSERT INTO "Address" (name, location, "userId", "createdAt", "updatedAt")
                           VALUES ($1, ST_GeomFromText($2, 4326), $3, NOW(), NOW())
                           RETURNING *`
    const result = await this.prisma.$queryRaw<Address>(query, data.name, data.location, data.userId)
    return result[0]
  }

  async findAll(): Promise<Address[]> {
    return await this.prisma.address.findMany({
      // include: {
      //   addresses: true
      // }
    })
  }

  async findOne(id: number): Promise<Address> {
    return await this.prisma.address.findFirst({
      where: {
        id
      }
    })
  }

  async update(id: number, { id: _id, ...data }: UpdateAddressDto): Promise<Address> {
    return this.prisma.address.update({
      where: {
        id
      },
      data
    })
  }

  async remove(id: number): Promise<Address> {
    return this.prisma.address.delete({
      where: {
        id
      }
    })
  }
}
