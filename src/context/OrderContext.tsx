import {createContext, FC, useContext, useState} from "react";
import {Product} from "../types/Product";
import {post} from "../api/api";
import {useAuth} from "./AuthContext";
import {CartContext} from "./CartContext";
import {OrderType} from "../types/OrderType";
import {OrderItem} from "../types/OrderItem";

interface CartItem extends Product {
    quantity: number;
}

interface OrderProps {
    addToOrder: (product: CartItem[]) => void;
    order: OrderType[];
    orderItems: OrderItem[];
}

const OrderContext = createContext<OrderProps | undefined>(undefined);


export const OrderProvider: FC<{ children: React.ReactNode }> = ({children}) => {
    const [order, setOrder] = useState<OrderType[]>([]);
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const {userId} = useAuth();


    // Ajoute des produits à une commande
    const addToOrder = (products: CartItem[]) => {
        const postOrder = async () => {
            try {
                const date = new Date().toJSON().slice(0, 10); // Formate la date

                const totalPrice = products.reduce((acc, product) => { // Calcule le prix total
                    return acc += product.quantity * product.price
                }, 0);


                const orderDB = await post("/orders", { // Fait une nouvelle commande
                    userId: userId,
                    total: totalPrice,
                    order_date: date
                })


                if (!orderDB || !orderDB.orderId) {
                    console.warn("Erreur : La commande n'a pas été créée");
                    return;
                }

                setOrder([...order, orderDB]); // Ajoute cette nouvelle commande dans les commandes totales


                const postOrderItems = await Promise.all(products.map(async (product) => {//Ajoute une ligne "order item" pour chaque ligne de la commande
                    console.log("Order DB" + orderDB);
                        const orderItems = await post("/orderItem", {
                            orderId: orderDB.orderId,
                            productId: product.productId,
                            quantity: product.quantity
                        })
                    return orderItems;
                    })
                )
                setOrderItems([...orderItems, ...postOrderItems]); // Ajoute les nouvelles lignes créées dans le tableau orderItems

            } catch (e) {
                console.warn("Erreur lors de la soumission de la commande : ", e)
            }
        }
        postOrder();
    }

    return(
        <OrderContext.Provider value={{addToOrder, order, orderItems}}>
            {children}
        </OrderContext.Provider>
    )

}

// Hook personnalisé
export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("Order Context is undefined");
    }
    return context;
}