import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe'
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    description: 'Email of the user',
    example: 'johndoe@example.com'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string

  // @IsString()
  // @IsNotEmpty()
  // @MinLength(6)
  // @ApiProperty()
  // password: string
}
