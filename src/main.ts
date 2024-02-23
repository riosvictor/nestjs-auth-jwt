/* istanbul ignore file */
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from '@/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

let app: NestExpressApplication;
let logger: Logger;

async function closeGracefully(signal) {
  logger.log(`Received signal to terminate: ${signal}`);

  await app.close();
  // await db.close() if we have a db connection in this app
  // await other things we should cleanup nicely
  process.exit();
}

async function bootstrap() {
  app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  logger = new Logger('Main');

  app.useGlobalPipes(new ValidationPipe());
  app.useBodyParser('json', { limit: '100kb' }); //default 100kb
  app.enableCors();
  app.use(helmet());

  await app.listen(3000);

  logger.log(`Application is running on: ${await app.getUrl()} 🚀`);
}

bootstrap();
process.on('SIGINT', closeGracefully);
process.on('SIGTERM', closeGracefully);
