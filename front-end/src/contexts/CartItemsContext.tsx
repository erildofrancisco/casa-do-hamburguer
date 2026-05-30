import { createContext, useState } from "react";
import type { CartItemsContextType, CartItemType } from "../types/CartItem";

export const CartItemContext = createContext<CartItemsContextType>({
    cartItems: [],
    setCartItems: () => { }
})

export const CartItemsProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([])
    return (
        <CartItemContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </CartItemContext.Provider>
    )
}