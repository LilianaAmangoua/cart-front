import {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Pages from "../../Layout/Page";
import {get} from "../../api/api";
import {Product} from "../../types/Product";
import Button from "@mui/material/Button";
import styles from "./styles/ProductDetails.module.css"
import {useCart} from "../../context/CartContext";

const ProductDetails: FC<{}> = ({}) => {

    const {productId} = useParams();
    const [productToDisplay, setProductToDisplay] = useState<Product>();
    const {addToCart, sufficientStock} = useCart();
    const [quantity, setQuantity] = useState<number>(1);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const product = await get(`/products/${productId}`);
                setProductToDisplay(product);
            } catch (e) {
                console.error("Erreur lors de la récuperation : ", e)
            }
        }
        fetchProducts();
    }, []);

    return (
        <Pages title={`Détails ${productToDisplay?.name}`}>
            <div className={styles.container}>
                <div className={styles.image} style={{backgroundImage: `url(${productToDisplay?.image})`}}>

                </div>

                <div className={styles.container__text}>
                    <h2 style={{fontSize: "2.5rem", color: "#006164"}}>{productToDisplay?.name}</h2>
                    <p>{productToDisplay?.description}</p>

                    <p>{productToDisplay?.price} €</p>
                    <label htmlFor="quantity">Quantité</label>
                    <input id="quantity" type="number" min="1" value={quantity}
                           onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}/>


                    {sufficientStock && <p style={{color: "red"}}>{sufficientStock}</p>}


                    <Button variant="contained" onClick={() => {
                        if (productToDisplay) {
                            addToCart(productToDisplay, productToDisplay.stock, quantity);
                        }
                    }}>Ajouter au panier</Button>
                </div>

            </div>
        </Pages>

    );
};

export default ProductDetails;
