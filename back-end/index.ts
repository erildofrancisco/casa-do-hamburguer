import express from "express";
import cors from "cors";
import { connection } from "./src/db.js";
import { routes } from "./src/routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", //essas 2 configs eh para permitir cookies
    credentials: true,
  }),
);
app.use(routes);
connection();

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
