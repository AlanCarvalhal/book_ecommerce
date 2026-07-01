import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true, index: true },
    titulo: { type: String, required: true, index: true },
    autor: { type: String, required: true },
    isbn: { type: String, required: true, unique: true, index: true },
    editora: { type: String, required: true },
    anoPublicacao: { type: Number, required: true },
    categorias: { type: Array<string>, required: true },
    preco: { type: Number, required: true },
    estoque: { type: Number, required: true },
    resumo: { type: String, required: true, index: true },
    dataCadastro: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (_, ret: Record<string, any>) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      transform: function (_, ret: Record<string, any>) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

BookSchema.index({ titulo: 'text', resumo: 'text' }, { default_language: 'portuguese', name: 'titulo_resumo_text_index' });

export const Book = mongoose.models['Book'] || mongoose.model('Book', BookSchema);
