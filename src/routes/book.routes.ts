import { Router } from 'express';
import { BookController } from '../controllers/book.controller';

const bookRoutes = Router();
const bookController = new BookController();

bookRoutes.get('/', (req, res) => bookController.getBooks(req, res));

bookRoutes.get('/:id', (req, res) => bookController.getBookById(req, res));

export default bookRoutes;
