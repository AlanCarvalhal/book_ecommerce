import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class GetBooksDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  resumo?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsIn(['titulo', 'preco', 'anoPublicacao'], {
    message: 'sortBy deve ser titulo, preco ou anoPublicacao',
  })
  sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'], { message: 'sortOrder deve ser asc ou desc' })
  sortOrder: 'asc' | 'desc' = 'asc';
}

export class GetBookByIdDto {
  @IsUUID(4, { message: 'O ID fornecido não é um identificador válido.' })
  id!: string;
}
