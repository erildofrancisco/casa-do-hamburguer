import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { user } = request.cookies;
  if (!process.env.JWT_SECRET) {
    response.status(500).json({ message: "Erro no servidor" });
    return;
  }
  try {
    const decoded = jwt.verify(user, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    response.status(401).json({ message: "Usuario não autenticado" });
    return;
  }
};
