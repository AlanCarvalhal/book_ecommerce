import { GetBooksDto } from '../dtos/book.dto';
import { Book } from '../models/Book';

export class BookRepository {
  async findAll(params: GetBooksDto) {
    const query: { $text?: { $search?: string } } = {};

    if (params.titulo || params.resumo) query.$text = { $search: params.titulo || params.resumo };

    const sortObj: any = {};
    if (params.sortBy) {
      sortObj[params.sortBy] = params.sortOrder ?? 'asc';
    }

    const skip = (params.page - 1) * params.limit;

    const [result, total] = await Promise.all([
      Book.find(query, { __v: 0 }).sort(sortObj).skip(skip).limit(params.limit),
      Book.countDocuments(query),
    ]);

    return {
      total,
      limit: Number(params.limit),
      page: Number(params.page),
      totalPages: Math.ceil(total / Number(params.limit)),
      result,
    };
  }

  async findById(id: string) {
    return await Book.findOne({ _id: id }, { __v: 0 });
  }
}
