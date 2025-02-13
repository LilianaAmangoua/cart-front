import {FC, useEffect, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import OrderCard from "../../components/OrderCard";
import LogoutIcon from '@mui/icons-material/Logout';
import Grid from "@mui/material/Grid2";
import {get} from "../../api/api";
import AdminOrderCard from "../../components/AdminOrderCard";
import Pages from "../../Layout/Page";

interface UserOrders {
    email: string;
    orderId: number;
    total: number;
    order_date: Date
}

const AllOrders: FC<{}> = ({}) => {

    const {logout} = useAuth();
    const [userEmails, setUserEmails] = useState<UserOrders[]>([]);

    useEffect(() => {
        const fetchOrders = async () => { // Récupérer les commandes des utilisateurs
            try {
                const getUsersEmails = await get ("/user/allEmails");
                setUserEmails(getUsersEmails);
            } catch (e) {
                console.error("Erreur lors de la récuperation : ", e)
            }

        }
        fetchOrders();
    }, []);

    return (
        <Pages title={"Toutes les commandes"}>
            <div style={{height: 80, width: "100%", backgroundColor: "blue", display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                <LogoutIcon sx={{mr: 6, cursor: "pointer"}} onClick={logout}></LogoutIcon>
            </div>
            <h1>Toutes les commandes</h1>
                {
                    userEmails &&
                    userEmails.map((order: UserOrders) => (
                        <Grid size={{xs: 12, md: 3}} key={order.orderId}>
                            <AdminOrderCard order={order.orderId} email={order.email} date={order.order_date} total={order.total}/>
                        </Grid>
                    ))
                }

        </Pages>
    );
};

export default AllOrders;
