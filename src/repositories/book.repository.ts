import { Book } from '../models/Book';

export class BookRepository {
  async findAll() {
    return await Book.find({}, { _id: 0, __v: 0 });
  }

  async findById(id: string) {
    return await Book.findOne({ id }, { _id: 0, __v: 0 });
  }
}
