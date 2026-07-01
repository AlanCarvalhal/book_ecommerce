import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  id: String,
  titulo: String,
  autor: String,
  isbn: String,
  editora: String,
  anoPublicacao: Number,
  categorias: Array<String>,
  preco: Number,
  estoque: Number,
  resumo: String,
  dataCadastro: String,
});

export const Book = mongoose.models['Book'] || mongoose.model('Book', BookSchema);
