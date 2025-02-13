import {createContext, FC, useContext, useState} from 'react';
import {Product} from "../types/Product";
import {update} from "../api/api";

interface CartItem extends Product {
    quantity: number;
}

interface CartProps {
    addToCart: (product: Product, stock: number, quantityToAdd: number) => void;
    removeFromCart: (product: Product, quantityRemove: number) => void;
    updateQuantity: (product: Product, quantity: number) => void;
    totalProducts: CartItem[];
    deleteAll: () => void;
    sufficientStock: string | null;
}

export const CartContext = createContext<CartProps | undefined>(undefined);

export const CartProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [totalProducts, setTotalProducts] = useState<CartItem[]>([]);
    const [sufficientStock, setSufficientStock] = useState<string | null>(null);

    const updateQuantity = (product: Product, quantity: number) => {
        const updatedCart = totalProducts.map((item) =>
            item.productId === product.productId
                ? {...item, quantity}
                : item
        );
        setTotalProducts(updatedCart);
    }

    const addToCart = (product: Product, stock: number, quantityToAdd: number) => {
        const productInCart = totalProducts.find((item) => item.productId === product.productId);

        if (!productInCart) { // Vérifie que le produit ne soit pas déjà dans le panier
            if (stock > 0) { // Vérifie que le stock est suffisant
                setSufficientStock("")
                const updateStock = async () => {
                    try{
                        const stock = await update(`/products/${product.productId}/decrease?quantity=${quantityToAdd}`, {
                            quantity: quantityToAdd
                        })
                    } catch (e) {
                        console.warn("Erreur lors de l'ajout au panier : ", e);
                    }

                }
                setTotalProducts([...totalProducts, {...product, quantity: quantityToAdd}]);
                updateStock();
            } else {
                setSufficientStock(`Stock Insuffisant pour le ${product.name}`);

            }
        } else { // Si le produit est déjà present dans le panier
            if (productInCart.quantity < stock) { // Vérifie que le stock est suffisant par rapport à la quantité
                updateQuantity(productInCart, productInCart.quantity + quantityToAdd);
                setSufficientStock("")
            } else {
                console.log("Stock insuffisant pour augmenter la quantité");
                setSufficientStock(`Stock Insuffisant pour le ${product.name}`);
            }
        }
    }

    const removeFromCart = (product: Product, quantityRemove: number) => {
        const updateStock = async () => {
            try {
                const stock = await update(`/products/${product.productId}/increase?quantity=${quantityRemove}`, {
                    quantity: quantityRemove
                })
            } catch (e) {
                console.warn("Erreur lors de l'ajout au panier : ", e);
            }
        }

        updateStock();
        const updatedCart = totalProducts.filter((item) => item.productId !== product.productId);// Renvoie un nouveau tableau sans le produit
        setTotalProducts(updatedCart);
    }


    const deleteAll = () => {
        setTotalProducts([]);
    }

    return (
        <CartContext.Provider value={{totalProducts, addToCart, removeFromCart, deleteAll, updateQuantity, sufficientStock}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("Cart is undefined");
    }
    return context;
}


