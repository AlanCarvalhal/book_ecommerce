import { BookService } from '../services/book.service';
import { BookRepository } from '../repositories/book.repository';
import { GetBooksDto } from '../dtos/book.dto';

describe('BookService', () => {
  let bookService: BookService;
  let bookRepositoryMock: jest.Mocked<BookRepository>;

  beforeEach(() => {
    bookRepositoryMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
    } as unknown as jest.Mocked<BookRepository>;

    bookService = new BookService(bookRepositoryMock);
  });

  describe('getBooks', () => {
    it('should return a list of books matching parameters', async () => {
      const mockResult = {
        total: 1,
        limit: 10,
        page: 1,
        totalPages: 1,
        result: [
          {
            id: 'uuid-1',
            titulo: 'Test Book',
            autor: 'Test Author',
            isbn: '1234567890',
            editora: 'Test Pub',
            anoPublicacao: 2026,
            categorias: ['Test'],
            preco: 29.9,
            estoque: 10,
            resumo: 'Test Summary',
            dataCadastro: '2026-07-01T00:00:00Z',
          },
        ],
      };

      bookRepositoryMock.findAll.mockResolvedValue(mockResult);

      const params: GetBooksDto = { page: 1, limit: 10, sortOrder: 'asc' };
      const result = await bookService.getBooks(params);

      expect(result).toEqual(mockResult);
      expect(bookRepositoryMock.findAll).toHaveBeenCalledWith(params);
    });
  });

  describe('getBookById', () => {
    it('should return a book if it exists', async () => {
      const mockBook = {
        id: 'uuid-1',
        titulo: 'Test Book',
        autor: 'Test Author',
        isbn: '1234567890',
        editora: 'Test Pub',
        anoPublicacao: 2026,
        categorias: ['Test'],
        preco: 29.9,
        estoque: 10,
        resumo: 'Test Summary',
        dataCadastro: '2026-07-01T00:00:00Z',
      };

      bookRepositoryMock.findById.mockResolvedValue(mockBook);

      const result = await bookService.getBookById('uuid-1');

      expect(result).toEqual(mockBook);
      expect(bookRepositoryMock.findById).toHaveBeenCalledWith('uuid-1');
    });

    it('should return null if the book does not exist', async () => {
      bookRepositoryMock.findById.mockResolvedValue(null);

      const result = await bookService.getBookById('non-existent-id');

      expect(result).toBeNull();
      expect(bookRepositoryMock.findById).toHaveBeenCalledWith('non-existent-id');
    });
  });
});
