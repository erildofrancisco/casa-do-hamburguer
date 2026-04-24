import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../db.js";
import Jwt from "jsonwebtoken";

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  try {
    if (!email || !password) {
      response.status(400).json({ message: "Email e senha são obrigatórios" });
      return;
    }
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      response.status(404).json({ message: "Usuário não encontrado" });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      response.status(401).json({ message: "Usuario nao encontrado" });
      return;
    }
    const userInfos = {
      id: user.id,
      name: user.name,
      email: user.email,
      bi: user.bi,
      admin: user.admin,
    };
    if (!process.env.JWT_SECRET) {
      return;
    }
    const token = Jwt.sign(userInfos, process.env.JWT_SECRET);
    response.cookie("user", token, {
      maxAge: 18000000,
    });
    response.status(200).json(userInfos);
  } catch (error) {
    response.status(500).json({ message: "Erro do servidor" });
    return;
  }
};

export const register = async (request: Request, response: Response) => {
  const { name, email, password, bi } = request.body;
  try {
    if (!name || !email || !password || !bi) {
      response
        .status(400)
        .json({ message: "Todas as informacoes sao obrigatorias" });
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (user?.email) {
      response.status(409).json({ message: "Usuário já cadastrado" });
      return;
    }
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        bi,
      },
    });
    response.status(201).json(newUser);
  } catch (error) {
    response.status(500).json({ message: "Erro do servidor" });
    return;
  }
};

export const auth = async (request: Request, response: Response) => {
  try {
    const { user } = request;
    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const logout = (request: Request, response: Response) => {
  const { user } = request.cookies;
  if (user) {
    return response.clearCookie("user");
  }
};
