import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { UserProvider } from "./contexts/UserContext";
import { CartItemsProvider } from "./contexts/CartItemsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <CartItemsProvider>
        <RouterProvider router={router} />
      </CartItemsProvider>
    </UserProvider>
  </StrictMode>,
);
