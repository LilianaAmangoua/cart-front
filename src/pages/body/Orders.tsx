import {FC, useEffect, useState} from 'react';
import {get} from "../../api/api";
import Grid from "@mui/material/Grid2";
import {OrderType} from "../../types/OrderType";
import OrderCard from "../../components/common/OrderCard";
import {useAuth} from "../../context/AuthContext";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import Pages from "../../layout/Page";

const Orders: FC<{}> = ({}) => {

    const [ordersToDisplay, setOrdersToDisplay] = useState<OrderType[]>([]);
    const {userId} = useAuth();
    const [loading, setLoading] = useState<boolean>(false);

    // Au montage du composant, aller chercher les commandes de l'utilisateur
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true)
                const orders = await get(`/orders/${userId}`);
                console.log(orders);
                setOrdersToDisplay(orders);
                if (Array.isArray(orders)) { // Vérifier que c'est un array
                    setOrdersToDisplay(orders);
                } else {
                    console.error("La réponse n'est pas un tableau", orders);
                    setOrdersToDisplay([]);
                }
            } catch (e) {
                console.error("Erreur lors de la récuperation : ", e)
            } finally {
                setLoading(false)
            }

        }
        fetchOrders();
    }, []);

    return (
        <Pages title={"Commandes"}>
            <main style={{marginLeft: 32}}>
                <h2 style={{fontSize: "2.5rem", color: "#006164"}}>Mes commandes</h2>

                <Grid container spacing={2} sx={{mb: 2, mr: 2}}>
                    {
                        loading ? (
                                <Box sx={{display: 'flex', justifyContent: "center"}}>
                                    <CircularProgress/>
                                </Box>
                            ) :
                            ordersToDisplay.map((order: OrderType) => (
                                <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={order.orderId}>
                                    <OrderCard order={order}/>
                                </Grid>
                            ))

                    }
                </Grid>
            </main>
        </Pages>

    );
};

export default Orders;
