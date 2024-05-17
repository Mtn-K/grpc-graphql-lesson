import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from '../entities/article.entity';
import { ArticleController } from '../modules/article/article.controller';
import { ArticleService } from '../modules/article/article.service';
import {
  mockArticle,
  mockArticleWrapper,
  mockCorrectId,
  mockSearchArticle,
  mockUpdatedField,
} from './__mock__/mockArticle';

describe('ArticleController', () => {
  let controller: ArticleController;
  let service: ArticleService;
  const id = { id: mockCorrectId };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(Article),
          useValue: {},
        },
      ],
      controllers: [ArticleController],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
    service = module.get<ArticleService>(ArticleService);
  });

  describe('create', () => {
    it('should create an article', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockArticleWrapper);
      const result = await controller.create(mockArticle);
      expect(result).toEqual(mockArticleWrapper);
    });
  });

  describe('findOne', () => {
    it('should find and return an article if it exists', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockArticleWrapper);
      const result = await controller.findOne(id);
      expect(result).toEqual(mockArticleWrapper);
    });
  });

  describe('filterArticles', () => {
    it('should return filtered articles successfully', async () => {
      jest
        .spyOn(service, 'findByFilter')
        .mockResolvedValue({ articles: [mockArticleWrapper] });
      const result = await controller.findByFilter(mockSearchArticle);
      expect(result).toEqual({ articles: [mockArticleWrapper] });
    });
  });

  describe('update', () => {
    it('should update article successfully', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockArticleWrapper);
      const result = await controller.update({ ...id, ...mockUpdatedField });
      expect(result).toEqual(mockArticleWrapper);
    });
  });

  describe('remove', () => {
    it('should delete article if found', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(mockArticleWrapper);
      expect(await controller.delete(id)).toEqual(mockArticleWrapper);
    });
  });
});
