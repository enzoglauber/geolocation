import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  //
  // app.use(cookieParser())
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })
  //
  app.setGlobalPrefix('api')
  // app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('KOover API')
    .setDescription('Taking care of what you are looking for')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
