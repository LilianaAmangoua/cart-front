import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {OrderType} from "../../types/OrderType";
import {useEffect} from "react";

export default function OrderCard({order}: { order: OrderType }) {
    return (
        <Card sx={{maxWidth: 345, height: 400}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Numéro de commande : {order.orderId}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    {order.total} €
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    {new Date(order.order_date).toLocaleDateString("fr-FR")}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Détails</Button>
            </CardActions>
        </Card>
    );
}
