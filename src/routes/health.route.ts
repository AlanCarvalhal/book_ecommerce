import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';

const healthRoutes = Router();
const healthController = new HealthController();

healthRoutes.get('/', (req, res) => healthController.health(req, res));

export default healthRoutes;
