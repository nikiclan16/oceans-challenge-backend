import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createUser } from '../models/user.model';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password, role } = req.body;

  if (!['admin', 'mesero'].includes(role)) {
    res.status(400).json({ error: 'Rol inválido' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await createUser(username, passwordHash, role);
  res.status(201).json(newUser);
};
