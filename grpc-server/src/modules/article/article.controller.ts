import { Controller } from '@nestjs/common';
import {
  ArticleServiceController,
  ArticleServiceControllerMethods,
  CreateArticleDto,
  FilterArticleDto,
  FindArticleDto,
  UpdateArticleDto,
} from '../../proto/article';
import { ArticleService } from './article.service';

@Controller('article')
@ArticleServiceControllerMethods()
export class ArticleController implements ArticleServiceController {
  constructor(private readonly articleService: ArticleService) {}

  async findOne(param: FindArticleDto) {
    return await this.articleService.findOne(param);
  }

  async findByFilter(param: FilterArticleDto) {
    return await this.articleService.findByFilter(param);
  }

  async create(param: CreateArticleDto) {
    return await this.articleService.create(param);
  }

  async update(param: UpdateArticleDto) {
    const id: FindArticleDto = { id: param.id };
    delete param.id;
    return await this.articleService.update(id, param);
  }

  async delete(param: FindArticleDto) {
    return await this.articleService.delete(param);
  }
}
