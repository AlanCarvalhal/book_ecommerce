import seedData from '../data/books.json';
import { Book } from '../models/Book';

export async function seedDatabase() {
  try {
    const userCount = await Book.countDocuments();

    if (userCount > 0) {
      console.log('Banco já está populado. Pulando processo.');
      return;
    }

    console.log('Banco está vazio. Iniciando script...');

    await Book.insertMany(seedData);

    console.log('Banco populado com dados iniciais!');
  } catch (error) {
    console.error('Erro ao popular banco:', error);
  }
}
