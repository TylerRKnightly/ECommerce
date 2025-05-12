import { Request, RequestHandler, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const generateToken = (id: string, rememberMe: boolean) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: rememberMe ? '7d' : '1h',
  });
};

// export const generateGuestToken = (req: Request, res: Response) => {
//   const guestPayload = {
//     role: 'guest'
//   };

//   const token = jwt.sign(guestPayload, process.env.JWT_SECRET as string, {
//     expiresIn: '30m'
//   });

//   res.json({ token });
// }

export const registerUser: RequestHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: 'User already exists' });
    return;
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id as string, false),
    });
    return;
  } else {
    res.status(400).json({ error: 'Invalid user data' });
    return;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password, rememberMe } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id as string, rememberMe), 
    });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
};

export const findUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  const user = await User.findOne({ _id: userId });

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401).json({ error: 'Invalid user ID' });
  }
};
