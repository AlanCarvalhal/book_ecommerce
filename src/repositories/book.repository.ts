import { GetBooksDto } from '../dtos/book.dto';
import { Book } from '../models/Book';

export class BookRepository {
  async findAll(params: GetBooksDto) {
    const query: { titulo?: { $regex: string; $options: string }; resumo?: { $regex: string; $options: string } } = {};

    if (params.titulo) query.titulo = { $regex: params.titulo, $options: 'i' };
    if (params.resumo) query.resumo = { $regex: params.resumo, $options: 'i' };

    const sortObj: any = {};
    if (params.sortBy) {
      sortObj[params.sortBy] = params.sortOrder ?? 'asc';
    }
    console.log(sortObj);

    const skip = (params.page - 1) * params.limit;

    const [result, total] = await Promise.all([
      Book.find(query, { _id: 0, __v: 0 }).sort(sortObj).skip(skip).limit(params.limit),
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
    return await Book.findOne({ id }, { _id: 0, __v: 0 });
  }
}
