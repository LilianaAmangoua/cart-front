import {FC, useEffect, useState} from 'react';
import {useCart} from "../context/CartContext";
import {Product} from "../types/Product";
import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./styles/ProductCard.module.css";
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard: FC<{product: Product, quantity?: number}> = ({product, quantity}) => {
     const navigate = useNavigate();
     const {addToCart, removeFromCart} = useCart();
     const [currentQuantity, setCurrentQuantity] = useState<number>(quantity || 1);
     const [showDelete, setShowDelete] = useState<boolean>(false);
     let location = useLocation();

     const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value);
        addToCart(product, product.stock, newQuantity);
        setCurrentQuantity(newQuantity);

        //console.log(currentQuantity);
     }

    useEffect(() => {
        setShowDelete(location.pathname === ('/cart'));
    }, [location.pathname]);

    return (
        <section style={{maxWidth: 500, cursor: "pointer"}}>
            <div onClick={() => navigate(`/productsdetails/${product.productId}`)}>
                <div className={styles.card} style={{backgroundImage: `url(${product.image})`}}>
                </div>
                <h3>{product.name}</h3>
                <p>{product.price} €</p>
            </div>

            {quantity !== undefined && <p>Quantité: <input type={"number"} value={currentQuantity} min="1" onChange={handleQuantityChange}/></p>}
            {showDelete && (
                <DeleteIcon onClick={() => removeFromCart(product, currentQuantity) }></DeleteIcon>
            )}


        </section>
    );
};

export default ProductCard;
