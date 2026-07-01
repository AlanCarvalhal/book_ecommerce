import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { redisClient } from '../config/redis';
import { GetBooksDto } from '../dtos/book.dto';
import { BookService } from '../services/book.service';

export class BookController {
  private bookService: BookService;

  constructor(bookService = new BookService()) {
    this.bookService = bookService;
  }

  async getBooks(req: Request, res: Response) {
    try {
      const cacheKey = `books_cache:${req.originalUrl}`;
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        res.status(200).json(JSON.parse(cachedData));
        return;
      }

      const params = plainToInstance(GetBooksDto, req.query);

      const result = await this.bookService.getBooks(params);

      await redisClient.setEx(cacheKey, 3600, JSON.stringify(result));

      res.status(200).json(result);
    } catch (error: unknown) {
      console.error('Erro ao procurar livros:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const cacheKey = `book_by_id_cache:${req.originalUrl}`;
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        res.status(200).json(JSON.parse(cachedData));
        return;
      }

      const book = await this.bookService.getBookById(req.params.id as string);

      if (!book) {
        res.status(404).json({ message: 'Livro não encontrado.' });
        return;
      }

      await redisClient.setEx(cacheKey, 3600, JSON.stringify(book));

      res.status(200).json(book);
    } catch (error: unknown) {
      console.error('Erro ao procurar livro por ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
