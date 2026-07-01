import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export function validateDto(dtoClass: any, target: 'body' | 'query' | 'params' = 'body') {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(dtoClass, req[target]);
    const errors: ValidationError[] = await validate(dtoObject);

    if (errors.length > 0) {
      const errorMessages = errors.map((err) => Object.values(err.constraints || {})).flat();
      res.status(400).json({ errors: errorMessages });
      return;
    }

    Object.assign(req[target], dtoObject);

    next();
  };
}
