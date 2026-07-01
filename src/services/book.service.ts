import { GetBooksDto } from '../dtos/book.dto';
import { BookRepository } from '../repositories/book.repository';

export class BookService {
  private bookRepository: BookRepository;

  constructor(bookRepository = new BookRepository()) {
    this.bookRepository = bookRepository;
  }

  async getBooks(params: GetBooksDto) {
    return await this.bookRepository.findAll(params);
  }

  async getBookById(id: string) {
    return await this.bookRepository.findById(id);
  }
}
