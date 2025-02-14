import {FC, useEffect, useState} from 'react';
import {useCart} from "../../context/CartContext";
import {Product} from "../../types/Product";
import * as React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "../styles/ProductCard.module.css";
import DeleteIcon from '@mui/icons-material/Delete';
import {GreenButton} from "./buttons/GreenButton";

const ProductCard: FC<{product: Product, quantity?: number}> = ({product, quantity}) => {
     const navigate = useNavigate();
     const {addToCart, removeFromCart} = useCart();
     const [currentQuantity, setCurrentQuantity] = useState<number>(quantity || 1);
     const [showDelete, setShowDelete] = useState<boolean>(false);
     const [showCart, setShowCart] = useState(false);
     let location = useLocation();

     const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Gestion de l'état pour suivre la quantité
        const newQuantity = parseInt(event.target.value); // Valeur saisie dans l'input
        addToCart(product, product.stock, newQuantity); // Ajoute au panier la valeur de l'input
        setCurrentQuantity(newQuantity);
     }

    useEffect(() => {
        setShowDelete(location.pathname === ('/cart')); // Si on n'est pas dans la page panier, ne pas afficher l'icône "delete"
        setShowCart(location.pathname !== ('/cart')) // Si on n'est dans la page panier, ne pas montrer le bouton "ajouter au panier"
    }, [location.pathname]);

    return (
        <section style={{maxWidth: 500, cursor: "pointer"}}>
            <div onClick={() => navigate(`/productsdetails/${product.productId}`)}>
                <div className={styles.card} style={{backgroundImage: `url(${product.image})`}}>
                </div>
                <h2>{product.name}</h2>
                <h3>{product.price} €</h3>
            </div>

            {showDelete && (
                <div className={styles.quantity}>
                    <p>Quantité: <input type={"number"} value={currentQuantity} min="1"
                                        onChange={handleQuantityChange}/>
                    </p>
                    <DeleteIcon onClick={() => removeFromCart(product, currentQuantity)} sx={{color: "#006164"}}></DeleteIcon>
                </div>

            )
            }

            {
                showCart && (
                    <GreenButton onClick={() => addToCart(product, product.stock, currentQuantity)}>Ajouter au
                        panier</GreenButton>
                )
            }


        </section>
    );
};

export default ProductCard;
