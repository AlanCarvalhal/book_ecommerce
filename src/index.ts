import express, { Request, Response } from 'express';
import { connectDB } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servidor em execução em http://localhost:${PORT}`);
  });
};

startServer();
