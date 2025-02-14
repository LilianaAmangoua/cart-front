import {FC, useEffect, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import OrderCard from "../../components/common/OrderCard";
import LogoutIcon from '@mui/icons-material/Logout';
import Grid from "@mui/material/Grid2";
import {get} from "../../api/api";
import AdminOrderCard from "../../components/common/AdminOrderCard";
import Pages from "../../layout/Page";

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
            <main style={{marginLeft: 32}}>
                <div style={{
                    height: 80,
                    width: "100%",
                    backgroundColor: "#006164",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center"
                }}>
                    <LogoutIcon sx={{mr: 6, cursor: "pointer", color: "white"}} onClick={logout}></LogoutIcon>
                </div>
                <h2 style={{fontSize: "2.5rem", color: "#006164"}}>Toutes les commandes</h2>
                <div className={"orders"}>
                    {
                        userEmails &&
                        userEmails.map((order: UserOrders) => (
                            <AdminOrderCard order={order.orderId} email={order.email} date={order.order_date}
                                            total={order.total} key={order.orderId}/>
                        ))
                    }
                </div>
            </main>
        </Pages>
    );
};

export default AllOrders;
