import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import { GetBookByIdDto, GetBooksDto } from '../dtos/book.dto';
import { validateDto } from '../middlewares/validateDto';

const bookRoutes = Router();
const bookController = new BookController();

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Retorna uma lista de livros paginada
 *     parameters:
 *       - in: query
 *         name: titulo
 *         schema:
 *           type: string
 *         description: Busca parcial pelo título do livro
 *       - in: query
 *         name: resumo
 *         schema:
 *           type: string
 *         description: Busca parcial pelo resumo do livro
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *         description: Número da página da busca
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 10
 *         description: Quantidade de itens por página
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Indica qual será a propriedade a ser ordenada
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         description: Indica qual será a direção de ordenação
 *     responses:
 *       200:
 *         description: Lista de livros encontrada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
bookRoutes.get('/', validateDto(GetBooksDto, 'query'), (req, res) => bookController.getBooks(req, res));

/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Busca um livro pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id do livro a ser buscado
 *     responses:
 *       200:
 *         description: Livro encontrado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
bookRoutes.get('/:id', validateDto(GetBookByIdDto, 'params'), (req, res) => bookController.getBookById(req, res));

export default bookRoutes;
