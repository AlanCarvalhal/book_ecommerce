import { HealthController } from '../controllers/health.controller';
import { Request, Response } from 'express';

describe('HealthController', () => {
  let healthController: HealthController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    healthController = new HealthController();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('health', () => {
    it('should return status 200 with UP', () => {
      healthController.health(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 'UP' });
    });
  });
});
