import type { Request, Response } from "express";
import { prisma } from "../db.js";

export const getProducts = async (request: Request, response: Response) => {
  try {
    const products = await prisma.product.findMany();
    if (products.length === 0) {
      response.status(404).json({ message: "Nenhum produto encontrado" });
      return;
    }
    response.json(products);
  } catch (error) {
    response.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const deleteProduct = async (request: Request, response: Response) => {
  try {
    const { user } = request;
    const { id } = request.params;
    if (!user.admin) {
      response.status(400).json({ message: "Usuario nao autorizado" });
      return;
    }
    if (!id) {
      response.status(400).json({ message: "ID nao encontrado" });
      return;
    }
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });
    if (!deletedProduct) {
      response.status(404).json({ message: "Erro ao deletar o produto" });
      return;
    }
    response.json(id);
  } catch (error: any) {
    if (error.code === "P2025") {
      response.json({ message: "Produto nao encontrado" });
      return;
    }
    response.status(500).json({ message: "Erro no servidor" });
    return;
  }
};
