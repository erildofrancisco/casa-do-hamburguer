import type { Request, Response } from "express";
import { prisma } from "../db.js";

export const getCartItems = async (request: Request, response: Response) => {
  const { user } = request;
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });
    if (cartItems.length === 0) {
      response.status(404).json({ message: "Nenhum produto encontrado" });
      return;
    }
    response.json(cartItems);
  } catch (error) {
    response.status(500).json({ message: "Erro no servidor" });
    return;
  }
};
