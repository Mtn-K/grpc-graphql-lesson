import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ARTICLE_PACKAGE_NAME } from '@proto/article';
import { join } from 'path';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ARTICLE_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: ARTICLE_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/article.proto'),
          url: 'localhost:4000',
        },
      },
    ]),
  ],
  providers: [ArticleService, ArticleResolver],
})
export class ArticleModule {}
