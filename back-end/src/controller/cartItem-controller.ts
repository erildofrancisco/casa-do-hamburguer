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

export const createCartItem = async (request: Request, response: Response) => {
  try {
    const { user } = request;
    //o id do produto eu pego do body.
    const { productId, quantity } = request.body;
    if (!productId) {
      response.status(400).json({ message: "O productId é obrigatório" });
      return;
    }
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: user.id,
        productId,
      },
    });
    let cartItem;
    if (existingItem) {
      cartItem = await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: { increment: 1 },
        },
      });
    } else {
      //o connect do prisma verifica se o produto e o user existem tambem,
      //antes mesmo de salvar.
      cartItem = await prisma.cartItem.create({
        data: {
          product: { connect: { id: productId } },
          user: { connect: { id: user.id } },
          quantity,
        },
      });
    }
    const statusCode = cartItem.quantity === 1 ? 201 : 200;
    response.status(statusCode).json(cartItem);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Erro ao adicionar item ao carrinho." });
    return;
  }
};
