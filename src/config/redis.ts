import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

export const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on('error', (err) => {
  console.error('Erro no cliente Redis:', err);
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Conectado ao Redis');
  } catch (error) {
    console.error('Falha ao conectar no Redis:', error);
    process.exit(1);
  }
};
