import 'reflect-metadata';

import express from 'express';
import { connectDB } from './config/database';
import bookRoutes from './routes/book.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/livros', bookRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servidor em execução em http://localhost:${PORT}`);
  });
};

startServer();
