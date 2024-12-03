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
  async create(@Body() createAddressDto: CreateAddressDto) {
    return new AddressEntity(await this.addressService.create(createAddressDto))
  }

  @Get()
  @ApiOkResponse({ type: AddressEntity, isArray: true })
  async findAll() {
    const addresses = await this.addressService.findAll()
    return addresses.map((address) => new AddressEntity(address))
  }

  @Get(':id')
  @ApiOkResponse({ type: AddressEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new AddressEntity(await this.addressService.findOne(id))
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: AddressEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateAddressDto: UpdateAddressDto) {
    return new AddressEntity(await this.addressService.update(id, updateAddressDto))
  }

  @Delete(':id')
  @ApiOkResponse({ type: AddressEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new AddressEntity(await this.addressService.remove(id))
  }
}
