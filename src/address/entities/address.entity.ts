import { ApiProperty } from '@nestjs/swagger'
import { Address } from '@prisma/client'

export class AddressEntity implements Address {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  // @ApiProperty()
  // street: string

  // @ApiProperty()
  // city: string

  // @ApiProperty()
  // state: string

  // @ApiProperty()
  // zipCode: string

  @ApiProperty({ required: false, nullable: true })
  userId: number | null

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
