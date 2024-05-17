import { Article as Entity } from '../../entities/article.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Article,
  Articles,
  CreateArticleDto,
  FilterArticleDto,
  FindArticleDto,
  UpdateArticleDto,
} from '@proto/article';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Entity)
    private readonly articlesRepository: Repository<Article>,
  ) {}

  async findOne(param: FindArticleDto): Promise<Article> {
    const article = await this.articlesRepository.findOne({
      where: { id: param.id },
    });
    if (!article)
      throw new GrpcNotFoundException(
        'Cannot find article with ID ' + param.id,
      );
    return article;
  }

  async findByFilter(param: FilterArticleDto): Promise<Articles> {
    const queryBuilder = this.articlesRepository.createQueryBuilder('article');
    Object.keys(param).forEach((item) => {
      queryBuilder.andWhere(`article.${item} ILike :${item}`, {
        [item]: `%${param[item]}%`,
      });
    });
    const articles: Articles = { articles: await queryBuilder.getMany() };
    if (articles.articles.length === 0)
      throw new GrpcNotFoundException('No result.');
    return articles;
  }

  async create(param: CreateArticleDto): Promise<Article> {
    const article = this.articlesRepository.create(param);
    return await this.articlesRepository.save(article);
  }

  async update(id: FindArticleDto, param: UpdateArticleDto): Promise<Article> {
    const article = await this.findOne(id);
    Object.assign(article, param);
    return await this.articlesRepository.save(article);
  }

  async delete(param: FindArticleDto): Promise<Article> {
    const article = await this.findOne(param);
    this.articlesRepository.softDelete(param.id);
    return article;
  }
}
