import { BookController } from '../controllers/book.controller';
import { BookService } from '../services/book.service';
import { Request, Response } from 'express';

jest.mock('../services/book.service');

describe('BookController', () => {
  let bookController: BookController;
  let bookServiceMock: jest.Mocked<BookService>;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    bookServiceMock = {
      getBooks: jest.fn(),
      getBookById: jest.fn(),
    } as unknown as jest.Mocked<BookService>;

    bookController = new BookController(bookServiceMock);

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('getBooks', () => {
    it('should return books list with status 200', async () => {
      const mockResult = {
        total: 1,
        limit: 10,
        page: 1,
        totalPages: 1,
        result: [],
      };
      bookServiceMock.getBooks.mockResolvedValue(mockResult);

      req.query = { page: '1', limit: '10' } as any;

      await bookController.getBooks(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should return status 500 when bookService throws error', async () => {
      bookServiceMock.getBooks.mockRejectedValue(new Error('DB error'));

      req.query = {};

      await bookController.getBooks(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('getBookById', () => {
    it('should return book details with status 200 if found', async () => {
      const mockBook = { id: 'uuid-1', titulo: 'Test Book' };
      bookServiceMock.getBookById.mockResolvedValue(mockBook as any);

      req.params = { id: 'uuid-1' };

      await bookController.getBookById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBook);
    });

    it('should return status 404 if book is not found', async () => {
      bookServiceMock.getBookById.mockResolvedValue(null);

      req.params = { id: 'uuid-1' };

      await bookController.getBookById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Livro não encontrado.' });
    });

    it('should return status 500 when bookService throws error', async () => {
      bookServiceMock.getBookById.mockRejectedValue(new Error('Unexpected error'));

      req.params = { id: 'uuid-1' };

      await bookController.getBookById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
});
