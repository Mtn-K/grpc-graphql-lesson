import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateArticleDto } from '@proto/article';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { ArticleService } from '../modules/article/article.service';
import {
  mockArticle,
  mockArticleRepository,
  mockArticleWrapper,
  mockCorrectId,
  mockDate,
  mockSearchArticle,
  mockUpdatedField,
} from './__mock__/mockArticle';

describe('ArticlesService', () => {
  let service: ArticleService;
  let articleRepository: Repository<Article>;
  const id = { id: mockCorrectId };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(Article),
          useValue: mockArticleRepository,
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    articleRepository = module.get<Repository<Article>>(
      getRepositoryToken(Article),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new article', async () => {
      const createArticleDto = <CreateArticleDto>{}; // Mock createArticleDto
      jest
        .spyOn(articleRepository, 'create')
        .mockReturnValue(mockArticle as any);
      jest
        .spyOn(articleRepository, 'save')
        .mockResolvedValue(mockArticleWrapper);

      const result = await service.create(createArticleDto);
      expect(result).toEqual(mockArticleWrapper);
    });
  });

  describe('findOne', () => {
    it('should return the article with the given ID', async () => {
      jest
        .spyOn(articleRepository, 'findOne')
        .mockResolvedValue(mockArticleWrapper);

      const result = await service.findOne(id);
      expect(articleRepository.findOne).toHaveBeenCalledWith({
        where: id,
      });
      expect(result).toEqual(mockArticleWrapper);
    });

    it('should return an error message if article is not found', async () => {
      jest.spyOn(articleRepository, 'findOne').mockResolvedValue(null);

      const result = service.findOne(id);
      await expect(result).rejects.toThrow(
        new GrpcNotFoundException('Cannot find article with ID ' + id.id),
      );
    });
  });

  describe('filterArticles', () => {
    it('should return articles matching the search criteria', async () => {
      jest.spyOn(articleRepository, 'createQueryBuilder').mockReturnValue({
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([mockArticle]),
      } as any);

      const { articles } = await service.findByFilter(mockSearchArticle);
      expect(articles).toEqual([mockArticle]);
    });

    it('should return an error message if the list article is empty', async () => {
      jest.spyOn(articleRepository, 'createQueryBuilder').mockReturnValue({
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      } as any);

      const articles = service.findByFilter(mockSearchArticle);
      await expect(articles).rejects.toThrow(
        new GrpcNotFoundException('No result.'),
      );
    });
  });

  describe('update', () => {
    it('should update the article with the given ID', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockArticleWrapper);
      jest
        .spyOn(articleRepository, 'save')
        .mockResolvedValue(mockArticleWrapper);

      const result = await service.update(id, { ...id, ...mockUpdatedField });
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(articleRepository.save).toHaveBeenCalledWith({
        ...mockArticle,
        ...mockUpdatedField,
        ...mockDate,
      });
      expect(result).toEqual(mockArticleWrapper);
    });
  });

  describe('delete', () => {
    it('should remove the article with the given ID', async () => {
      jest
        .spyOn(articleRepository, 'findOne')
        .mockResolvedValue(mockArticleWrapper);
      const result = await service.delete(id);
      expect(articleRepository.softDelete).toHaveBeenCalledWith(id.id);
      expect(result).toEqual(mockArticleWrapper);
    });
  });
});
