import {FC, useEffect} from 'react';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import {useCart} from "../context/CartContext";
import {Product} from "../types/Product";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import * as React from "react";
import {useNavigate} from "react-router-dom";

const ProductCard: FC<{product: Product}> = ({product}) => {
     const {addToCart} = useCart();
     const navigate = useNavigate();

    return (
        <Card sx={{maxWidth: 345}}>
            <CardMedia
                sx={{height: 140}}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    {product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/productsdetails/${product.productId}`)}>Détails</Button>
                <ControlPointRoundedIcon onClick={() => addToCart(product, product.stock)}/>
            </CardActions>


        </Card>
    );
};

export default ProductCard;
