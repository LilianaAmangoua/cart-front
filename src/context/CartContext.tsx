import {createContext, FC, useContext, useState} from 'react';
import {Product} from "../types/Product";

interface CartProps {
    addToCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
    totalProducts: Product[];
    deleteAll: () => void;
}

export const CartContext = createContext<CartProps | undefined>(undefined);

export const CartProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [totalProducts, setTotalProducts] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        const productToAdd = totalProducts.find((productToFind) => productToFind.productId === product.productId);
        if(!productToAdd){
            const newTotal = [...totalProducts, product];
            setTotalProducts(newTotal)
        } else {
            return totalProducts;
        }
    }

    const removeFromCart = (product: Product) => {
        const productToRemove = totalProducts.find((productToFind) => productToFind.productId === product.productId);
        if (productToRemove) {
            const newTotal = totalProducts.filter((product) => product.productId !== product.productId)
            setTotalProducts(newTotal);
        } else {
            return totalProducts;
        }
    }

    const deleteAll = () => {
        setTotalProducts([]);
    }

    return (
        <CartContext.Provider value={{totalProducts, addToCart, removeFromCart, deleteAll}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("Cart not found");
    }
    return context;
}


