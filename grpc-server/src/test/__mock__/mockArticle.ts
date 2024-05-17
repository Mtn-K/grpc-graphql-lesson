export const mockCorrectId = '8bc38386-cd2c-44cc-a96f-0c608ceb1bd9';

export const mockIncorrectId = '123-abc';

export const mockArticle = {
  id: mockCorrectId,
  title: 'Test',
  author: 'Test',
  topic: 'Cybersecurity',
  body: 'You may be looking for a new career and stumbled upon cybersecurity and are all excited about it now! That makes me happy to think about. Its my job now to explain to you how to get started learning cybersecurity at home.',
};

export const mockDate = {
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
};

export const mockArticleWrapper = {
  ...mockArticle,
  ...mockDate,
};

export const mockSearchArticle = {
  title: 'How to Learn Cybersecurity at Home',
  author: 'Tyler Wall',
  topic: 'Cybersecurity',
  body: 'This is content',
};

export const mockUpdatedField = {
  title: 'How to Learn Rubik at Home',
  author: 'Nhat Khanh',
  topic: 'Rubik',
  body: 'This is content',
};

export const mockArticleRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest
    .fn()
    .mockImplementation((article) => Promise.resolve({ ...article })),
  softDelete: jest.fn().mockResolvedValue({ affected: 1 }),
  findOne: jest.fn().mockResolvedValue(mockArticle),
  createQueryBuilder: jest.fn().mockReturnValue({
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([mockArticle]),
  }),
};

// export const mockArticleControllerRepository: Partial<
//   Record<keyof Repository<Article>, jest.Mock>
// > = {
//   findOne: jest.fn(async (id: string) => {
//     if (id === 'existing-id') {
//       return {
//         id: 'existing-id',
//         // Other properties of the article
//       } as Article;
//     } else {
//       return null;
//     }
//   }),
//   save: jest.fn(async (article: Article) => article),
// };
