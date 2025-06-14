import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Token requerido' });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as any;

    if (decoded.role !== 'admin') {
      res.status(403).json({ error: 'Acceso denegado: solo admin' });
      return;
    }

    (req as any).user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
};
