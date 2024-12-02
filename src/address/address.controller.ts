import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { AddressEntity } from './entities/address.entity'

@Controller('address')
@ApiTags('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiCreatedResponse({ type: AddressEntity })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto)
  }

  @Get()
  @ApiOkResponse({ type: AddressEntity, isArray: true })
  findAll() {
    return this.addressService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ type: AddressEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.findOne(id)
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: AddressEntity })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: AddressEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.remove(id)
  }
}
