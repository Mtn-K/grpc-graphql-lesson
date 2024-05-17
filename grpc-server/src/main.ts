import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'article',
        protoPath: join(__dirname, '../proto/article.proto'),
        url: 'localhost:4000',
      },
    },
  );
  await app.listen();
}
bootstrap();
