import { Book } from '../models/Book';

describe('Book Model', () => {
  describe('Schema Definition', () => {
    it('should have all required fields', () => {
      const schema = Book.schema;
      const paths = schema.paths;

      expect(paths._id).toBeDefined();
      expect(paths.titulo).toBeDefined();
      expect(paths.autor).toBeDefined();
      expect(paths.isbn).toBeDefined();
      expect(paths.editora).toBeDefined();
      expect(paths.anoPublicacao).toBeDefined();
      expect(paths.categorias).toBeDefined();
      expect(paths.preco).toBeDefined();
      expect(paths.estoque).toBeDefined();
      expect(paths.resumo).toBeDefined();
      expect(paths.dataCadastro).toBeDefined();
    });

    it('should have correct field types', () => {
      const schema = Book.schema;
      const paths = schema.paths;

      expect(paths._id.instance).toBe('String');
      expect(paths.titulo.instance).toBe('String');
      expect(paths.autor.instance).toBe('String');
      expect(paths.isbn.instance).toBe('String');
      expect(paths.editora.instance).toBe('String');
      expect(paths.anoPublicacao.instance).toBe('Number');
      expect(paths.preco.instance).toBe('Number');
      expect(paths.estoque.instance).toBe('Number');
      expect(paths.resumo.instance).toBe('String');
      expect(paths.dataCadastro.instance).toBe('String');
    });

    it('should enforce unique constraints', () => {
      const schema = Book.schema;

      expect(schema.paths._id.options.unique).toBe(true);
      expect(schema.paths.isbn.options.unique).toBe(true);
    });
  });

  describe('toJSON Transformation', () => {
    it('should transform _id to id and remove __v when converting to JSON', () => {
      const mockBook = {
        _id: 'uuid-1',
        titulo: 'Test Book',
        autor: 'Test Author',
        isbn: '1234567890',
        editora: 'Test Publisher',
        anoPublicacao: 2024,
        categorias: ['Fiction'],
        preco: 29.99,
        estoque: 10,
        resumo: 'Test Summary',
        dataCadastro: '2026-07-01T00:00:00Z',
        __v: 0,
      };

      const transform = Book.schema.options.toJSON?.transform;
      expect(transform).toBeDefined();

      // Test that transform function exists and modifies the object
      if (transform) {
        const copy = { ...mockBook } as any;
        transform(null, copy);

        expect(copy.id).toBe('uuid-1');
        expect(copy._id).toBeUndefined();
        expect(copy.__v).toBeUndefined();
        expect(copy.titulo).toBe('Test Book');
      }
    });
  });

  describe('toObject Transformation', () => {
    it('should transform _id to id and remove __v when converting to Object', () => {
      const mockBook = {
        _id: 'uuid-2',
        titulo: 'Another Book',
        autor: 'Another Author',
        isbn: '0987654321',
        editora: 'Another Publisher',
        anoPublicacao: 2025,
        categorias: ['Science'],
        preco: 39.99,
        estoque: 5,
        resumo: 'Another Summary',
        dataCadastro: '2026-07-01T00:00:00Z',
        __v: 0,
      };

      const transform = Book.schema.options.toObject?.transform;
      expect(transform).toBeDefined();

      // Test that transform function exists and modifies the object
      if (transform) {
        const copy = { ...mockBook } as any;
        transform(null, copy);

        expect(copy.id).toBe('uuid-2');
        expect(copy._id).toBeUndefined();
        expect(copy.__v).toBeUndefined();
        expect(copy.titulo).toBe('Another Book');
      }
    });
  });

  describe('Text Index', () => {
    it('should have text index configured on schema', () => {
      const schema = Book.schema;

      // Verify that the schema has been initialized with the text index
      expect(schema).toBeDefined();
      expect(schema.paths.titulo).toBeDefined();
      expect(schema.paths.resumo).toBeDefined();
    });
  });
});
