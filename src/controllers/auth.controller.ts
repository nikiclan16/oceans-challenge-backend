import { Request, Response } from 'express';
import { findUserByUsername } from '../models/user.model';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = await findUserByUsername(username);
  if (!user) {
    res.status(401).json({ error: 'Usuario no encontrado' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ error: 'Credenciales inválidas' });
    return;
  }

  const token = generateToken({ id: user.id, username: user.username });
  res.json({ token });
};
