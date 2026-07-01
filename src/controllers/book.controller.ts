import { Request, Response } from 'express';
import { GetBooksDto } from '../dtos/book.dto';
import { BookService } from '../services/book.service';

export class BookController {
  private bookService: BookService;

  constructor(bookService = new BookService()) {
    this.bookService = bookService;
  }

  async getBooks(req: Request, res: Response) {
    try {
      const params = req.query as unknown as GetBooksDto;
      const result = await this.bookService.getBooks(params);
      res.status(200).json(result);
    } catch (error: unknown) {
      console.error('Erro ao procurar livros:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const book = await this.bookService.getBookById(req.params.id as string);

      if (!book) {
        res.status(404).json({ message: 'Livro não encontrado.' });
        return;
      }

      res.status(200).json(book);
    } catch (error: unknown) {
      console.error('Erro ao procurar livro por ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
