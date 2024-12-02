import { Module } from '@nestjs/common'
import { AddressModule } from './address/address.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [PrismaModule, UserModule, AddressModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
