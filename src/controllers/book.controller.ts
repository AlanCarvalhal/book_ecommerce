import { Request, Response } from 'express';
import { BookRepository } from '../repositories/book.repository';

const bookRepository = new BookRepository();

export class BookController {
  async getBooks(req: Request, res: Response) {
    try {
      const result = await bookRepository.findAll();
      res.status(200).json(result);
    } catch (error: unknown) {
      console.error('Erro ao procurar livros:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const book = await bookRepository.findById(req.params.id as string);

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
