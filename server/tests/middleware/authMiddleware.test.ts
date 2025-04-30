import { protect } from '../../src/middleware/authMiddleware';
import jwt from 'jsonwebtoken';
import User from '../../src/models/User';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../src/types/express';

jest.mock('jsonwebtoken');
jest.mock('../../src/models/User', () => ({
    __esModule: true,
    default: {
      findById: jest.fn(),
    },
  }));

describe('protect middleware', () => {
    let req: AuthenticatedRequest;
    let res: Partial<Response>;
    let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
      user: undefined,
    } as AuthenticatedRequest;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 401 if no token is provided', async () => {
    await protect(req as AuthenticatedRequest, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized, no token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', async () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    req.headers!.authorization = 'Bearer invalidtoken';

    await protect(req as AuthenticatedRequest, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized, invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if user not found', async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: 'fakeUserId' });
    (User.findById as jest.Mock).mockResolvedValue(null);

    req.headers!.authorization = 'Bearer validtoken';

    await protect(req as AuthenticatedRequest, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized, invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should attach user to req and call next if token and user are valid', async () => {
    const mockUser = {
      _id: 'userId',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
    };
  
    (jwt.verify as jest.Mock).mockReturnValue({ id: 'validUserId' });
    (User.findById as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUser),
    });
  
    req.headers!.authorization = 'Bearer validtoken';
  
    await protect(req as AuthenticatedRequest, res as Response, next);
  
    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });  
});
