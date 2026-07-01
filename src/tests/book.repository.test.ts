import { BookRepository } from '../repositories/book.repository';
import { Book } from '../models/Book';
import { GetBooksDto } from '../dtos/book.dto';

jest.mock('../models/Book');

describe('BookRepository', () => {
  let bookRepository: BookRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    bookRepository = new BookRepository();
  });

  describe('findAll', () => {
    it('should return paginated and filtered results', async () => {
      const mockBooks = [
        {
          id: 'uuid-1',
          titulo: 'Clean Code',
          autor: 'Robert C. Martin',
        },
      ];

      const mockFindQuery = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockBooks),
      };

      (Book.find as jest.Mock).mockReturnValue(mockFindQuery);
      (Book.countDocuments as jest.Mock).mockResolvedValue(10);

      const params: GetBooksDto = {
        titulo: 'clean',
        resumo: 'software',
        page: 2,
        limit: 5,
        sortBy: 'preco',
        sortOrder: 'desc',
      };

      const result = await bookRepository.findAll(params);

      expect(result).toEqual({
        total: 10,
        limit: 5,
        page: 2,
        totalPages: 2,
        result: mockBooks,
      });

      expect(Book.find).toHaveBeenCalledWith(
        {
          titulo: { $regex: 'clean', $options: 'i' },
          resumo: { $regex: 'software', $options: 'i' },
        },
        { _id: 0, __v: 0 }
      );
      expect(mockFindQuery.sort).toHaveBeenCalledWith({ preco: 'desc' });
      expect(mockFindQuery.skip).toHaveBeenCalledWith(5); // (2 - 1) * 5
      expect(mockFindQuery.limit).toHaveBeenCalledWith(5);
      expect(Book.countDocuments).toHaveBeenCalledWith({
        titulo: { $regex: 'clean', $options: 'i' },
        resumo: { $regex: 'software', $options: 'i' },
      });
    });

    it('should use default values for sortOrder if not provided', async () => {
      const mockFindQuery = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([]),
      };

      (Book.find as jest.Mock).mockReturnValue(mockFindQuery);
      (Book.countDocuments as jest.Mock).mockResolvedValue(0);

      const params: GetBooksDto = {
        page: 1,
        limit: 10,
        sortBy: 'titulo',
        sortOrder: undefined as any,
      };

      await bookRepository.findAll(params);

      expect(mockFindQuery.sort).toHaveBeenCalledWith({ titulo: 'asc' });
    });
  });

  describe('findById', () => {
    it('should return a book if found', async () => {
      const mockBook = {
        id: 'uuid-1',
        titulo: 'Clean Code',
      };

      (Book.findOne as jest.Mock).mockResolvedValue(mockBook);

      const result = await bookRepository.findById('uuid-1');

      expect(result).toEqual(mockBook);
      expect(Book.findOne).toHaveBeenCalledWith({ id: 'uuid-1' }, { _id: 0, __v: 0 });
    });

    it('should return null if not found', async () => {
      (Book.findOne as jest.Mock).mockResolvedValue(null);

      const result = await bookRepository.findById('non-existent');

      expect(result).toBeNull();
      expect(Book.findOne).toHaveBeenCalledWith({ id: 'non-existent' }, { _id: 0, __v: 0 });
    });
  });
});
