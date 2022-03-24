import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = { isCartOpen, setIsCartOpen }

    useEffect(() => {

    }, []);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};