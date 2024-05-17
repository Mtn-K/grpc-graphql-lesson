import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  ARTICLE_PACKAGE_NAME,
  ARTICLE_SERVICE_NAME,
  ArticleServiceClient,
  CreateArticleDto,
  FilterArticleDto,
  FindArticleDto,
  UpdateArticleDto,
} from '@proto/article';

@Injectable()
export class ArticleService implements OnModuleInit {
  private articleService: ArticleServiceClient;

  constructor(@Inject(ARTICLE_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.articleService =
      this.client.getService<ArticleServiceClient>(ARTICLE_SERVICE_NAME);
  }

  async getArticleById(id: FindArticleDto) {
    return await lastValueFrom(this.articleService.findOne(id));
  }

  async getArticleByFilter(data: FilterArticleDto) {
    return await lastValueFrom(this.articleService.findByFilter(data));
  }

  async createArticle(data: CreateArticleDto) {
    return await lastValueFrom(this.articleService.create(data));
  }

  async updateArticle(data: UpdateArticleDto) {
    return await lastValueFrom(this.articleService.update(data));
  }

  async deleteArticle(id: FindArticleDto) {
    return await lastValueFrom(this.articleService.delete(id));
  }
}
