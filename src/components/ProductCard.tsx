import {FC, useEffect} from 'react';
import {useCart} from "../context/CartContext";
import {Product} from "../types/Product";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard: FC<{product: Product, quantity?: number}> = ({product, quantity}) => {
     const navigate = useNavigate();

    return (
        <section style={{maxWidth: 500, cursor: "pointer"}} onClick={() => navigate(`/productsdetails/${product.productId}`)}>
            <div className={styles.card} style={{backgroundImage: `url(${product.image})`}}>
            </div>
            <h3>{product.name}</h3>
            <p>{product.price} €</p>
            {quantity !== undefined && <p>Quantité: {quantity}</p>}

        </section>
    );
};

export default ProductCard;
