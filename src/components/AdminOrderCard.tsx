import {FC, useEffect} from 'react';
import {OrderType} from "../types/OrderType";

const AdminOrderCard: FC<{order: number, email: string, total: number, date: Date}> = ({order, email, total, date}) => {

    return (
        <>
            <div style={{width: "100%", height: 70, borderBottom: "1px solid black"}}>

                <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                    <p>Id Commande : {order}</p>
                    <p>Mail User: {email}</p>
                    <p>Prix total: {total}</p>
                    <p>Date : {new Date(date).toLocaleDateString("fr-FR")}</p>
                </div>

            </div>
        </>

    );
};

export default AdminOrderCard;
