import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import { GetBookByIdDto, GetBooksDto } from '../dtos/book.dto';
import { validateDto } from '../middlewares/validateDto';

const bookRoutes = Router();
const bookController = new BookController();

bookRoutes.get('/', validateDto(GetBooksDto, 'query'), (req, res) => bookController.getBooks(req, res));

bookRoutes.get('/:id', validateDto(GetBookByIdDto, 'params'), (req, res) => bookController.getBookById(req, res));

export default bookRoutes;
