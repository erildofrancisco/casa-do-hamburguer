import { Button } from "./Button";
import type React from "react";
import { CartItems } from "./CartItems";
import { X } from "lucide-react";
import { useContext, useEffect } from "react";
import { CartItemContext } from "../contexts/CartItemsContext";

type cartProps = {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  showCart: boolean;
};

export const Cart = ({ setShowCart, showCart }: cartProps) => {
  const { cartItems, setCartItems } = useContext(CartItemContext);

  const getCartItems = async () => {
    try {
      const response = await fetch("http://localhost:3333/cartItems", {
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Erro ao realizar a requisicao");
        return;
      }
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCartItems();
  }, []);

  return (
    <div className="absolute right-0 z-10 flex h-screen w-93.75 flex-col bg-[#F2DAAC] p-5">
      <div className="flex justify-between">
        <X className="cursor-pointer" onClick={() => setShowCart(!showCart)} />
        <p className="font-bold uppercase">Meu carrinho</p>
      </div>

      <div className="mt-10 flex flex-1 flex-col gap-2">
        {cartItems.map((item) => (
          <CartItems
            name={item.product.name}
            price={item.product.price}
            img={item.product.img}
            id={item.product.id}
          />
        ))}
      </div>

      <Button title="Finalizar pedido" />
    </div>
  );
};
