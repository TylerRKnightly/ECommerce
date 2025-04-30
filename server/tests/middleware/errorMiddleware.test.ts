import { errorHandler } from '../../src/middleware/errorMiddleware';
import { Request, Response, NextFunction } from 'express';

describe('errorHandler middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let error: Error;

  beforeEach(() => {
    req = {};

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      statusCode: 200,
    };

    next = jest.fn();

    error = new Error('Test error');
    
    jest.clearAllMocks();
  });

  it('should return 500 and error message if status code is 200', () => {
    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Test error',
      stack: expect.any(String),
    });
  });

  it('should preserve existing status code if it is not 200', () => {
    res.statusCode = 404;

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Test error',
      stack: expect.any(String),
    });
  });

  it('should hide stack trace in production', () => {
    process.env.NODE_ENV = 'production';

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Test error',
      stack: '🍕',
    });

    process.env.NODE_ENV = 'test';
  });
});
