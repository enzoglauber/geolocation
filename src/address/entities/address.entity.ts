import { ApiProperty } from '@nestjs/swagger'
import { Address } from '@prisma/client'
import { UserEntity } from 'src/user/entities/user.entity'

export class AddressEntity implements Address {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty({
    description: 'Location as [longitude, latitude]',
    example: [-46.5244254, -23.5356837]
  })
  location?: [number, number] | string

  @ApiProperty({ required: false, nullable: true })
  userId: number | null

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty({ required: false, type: UserEntity })
  user?: UserEntity

  constructor({ location, user, ...data }: Partial<AddressEntity>) {
    Object.assign(this, data)
    this.location = typeof location === 'string' ? this.parseLocation(location) : location

    if (user) {
      this.user = new UserEntity(user)
    }
  }

  /**
   * Parse WKT location (e.g., 'POINT(-46.5244254 -23.5356837)') to [longitude, latitude]
   */
  private parseLocation(wkt: string): [number, number] {
    const coords = wkt.replace('POINT(', '').replace(')', '').split(' ')
    return [parseFloat(coords[0]), parseFloat(coords[1])]
  }

  /**
   * Converts [longitude, latitude] to WKT format
   */
  public static toWkt(location: [number, number]): string {
    return `POINT(${location[0]} ${location[1]})`
  }
}
