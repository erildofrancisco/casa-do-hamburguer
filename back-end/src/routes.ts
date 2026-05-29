import { Router } from "express";
import { auth, login, logout, register } from "./controller/user-controller.js";
import { authMiddleware } from "./middlewares/auth.js";
import { deleteProduct, getProducts } from "./controller/product-controller.js";
import { getCartItems } from "./controller/cartItem-controller.js";

const routes: ReturnType<typeof Router> = Router();

routes.post("/login", login);
routes.post("/register", register);
routes.get("/me", authMiddleware, auth);
routes.post("/logout", authMiddleware, logout);

routes.get("/products", getProducts);
routes.delete("/product/:id", authMiddleware, deleteProduct);

routes.get("/cartItems", authMiddleware, getCartItems);

export { routes };
