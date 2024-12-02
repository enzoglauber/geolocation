import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'

export class UserEntity implements User {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  // @ApiProperty({ required: false, nullable: true })
  // password: string | null

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
