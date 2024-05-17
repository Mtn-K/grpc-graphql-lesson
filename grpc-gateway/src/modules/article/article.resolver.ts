import {
  Article,
  ArticleInput,
  FilterInput,
  FindArticleInput,
  UpdateArticleInput,
} from '@entities/article.entity';
import { UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { ArticleService } from './article.service';

@Resolver()
@UseInterceptors(GrpcToHttpInterceptor)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => Article)
  async getArticleById(@Args('id') id: FindArticleInput): Promise<Article> {
    return await this.articleService.getArticleById(id);
  }

  @Query(() => [Article])
  async getArticleByFilter(
    @Args('filterDto', { nullable: true })
    filterDto: FilterInput,
  ): Promise<Article[]> {
    const { articles } = await this.articleService.getArticleByFilter(
      filterDto ?? {},
    );
    return articles;
  }

  @Mutation(() => Article)
  async createArticle(
    @Args('createArticleDto')
    createArticleDto: ArticleInput,
  ): Promise<Article> {
    const res = await this.articleService.createArticle(createArticleDto);
    return res;
  }

  @Mutation(() => Article)
  async updateArticle(
    @Args('updateArticleDto') updateArticleDto: UpdateArticleInput,
  ): Promise<Article> {
    return await this.articleService.updateArticle(updateArticleDto);
  }

  @Mutation(() => Article)
  async deleteArticle(@Args('id') id: FindArticleInput): Promise<Article> {
    return await this.articleService.deleteArticle(id);
  }
}
