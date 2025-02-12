import {createContext, FC, useContext, useState} from 'react';
import {Product} from "../types/Product";
import {update} from "../api/api";

interface CartItem extends Product {
    quantity: number;
}

interface CartProps {
    addToCart: (product: Product, stock: number, quantityToAdd: number) => void;
    removeFromCart: (product: Product) => void;
    updateQuantity: (product: Product, quantity: number) => void;
    totalProducts: CartItem[];
    deleteAll: () => void;
    sufficientStock: boolean;
}

export const CartContext = createContext<CartProps | undefined>(undefined);

export const CartProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [totalProducts, setTotalProducts] = useState<CartItem[]>([]);
    const [sufficientStock, setSufficientStock] = useState<boolean>(true);

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
                const updateStock = async () => {
                    try{
                        const stock = await update(`/products/3/quantity?quantity=${quantityToAdd}`, {
                            quantity: quantityToAdd
                        })
                    } catch (e) {
                        console.warn("Erreur lors de l'ajout au panier : ", e);
                    }

                }
                setTotalProducts([...totalProducts, {...product, quantity: quantityToAdd}]);
                updateStock();
            } else {
                console.log("Stock insuffisant");
                setSufficientStock(false);

            }
        } else { // Si le produit est déjà present dans le panier
            if (productInCart.quantity < stock) { // Vérifie que le stock est suffisant
                updateQuantity(product, productInCart.quantity + quantityToAdd);
            } else {
                console.log("Stock insuffisant pour augmenter la quantité");
                setSufficientStock(false)
            }
        }
    }

    const removeFromCart = (product: Product) => {
        const updatedCart = totalProducts.filter((item) => item.productId !== product.productId); // Renvoie un nouveau tableau sans le produit
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
        throw new Error("Cart not found");
    }
    return context;
}


