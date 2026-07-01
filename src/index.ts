import 'reflect-metadata';

import express from 'express';
import { connectDB } from './config/database';
import { connectRedis } from './config/redis';
import bookRoutes from './routes/book.routes';
import healthRoutes from './routes/health.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/livros', bookRoutes);
app.use('/health', healthRoutes);

const startServer = async () => {
  await connectDB();
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`Servidor em execução em http://localhost:${PORT}`);
  });
};

startServer();
