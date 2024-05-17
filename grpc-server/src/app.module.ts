import { ArticleModule } from '@modules/article/article.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ArticleModule],
})
export class AppModule {}
