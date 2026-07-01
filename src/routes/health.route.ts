import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';

const healthRoutes = Router();
const healthController = new HealthController();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Indica se o serviço está levantado
 *     responses:
 *       200:
 *         description: O servidor está funcionando
 *       500:
 *         description: Erro interno do servidor
 */
healthRoutes.get('/', (req, res) => healthController.health(req, res));

export default healthRoutes;
