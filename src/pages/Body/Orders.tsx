import {FC, useEffect, useRef, useState} from 'react';
import {get} from "../../api/api";
import {Product} from "../../types/Product";
import Grid from "@mui/material/Grid2";
import ProductCard from "../../components/ProductCard";
import {OrderType} from "../../types/OrderType";
import OrderCard from "../../components/OrderCard";

const Orders: FC<{}> = ({}) => {

    const [ordersToDisplay, setOrdersToDisplay] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await get("/orders/");
                setOrdersToDisplay(orders);
            } catch (e) {
                console.error("Erreur lors de la récuperation : ", e)
            }

        }
        fetchOrders();
    }, []);

    return (
        <div>
           <h2>Mes commandes</h2>
            <Grid container spacing={2} sx={{mb: 2, mr: 2}}>
                {
                    ordersToDisplay && ordersToDisplay.map((order: OrderType) => (
                        <Grid size={{xs: 12, md: 3}} key={order.orderId}>
                            <OrderCard order={order}/>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
};

export default Orders;
