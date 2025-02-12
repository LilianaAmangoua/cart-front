import {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Pages from "../../Layout/Page";
import {get} from "../../api/api";
import {Product} from "../../types/Product";
import Button from "@mui/material/Button";
import "./styles/ProductDetails.css"

const ProductDetails: FC<{}> = ({}) => {

    const {productId} = useParams();
    const [productToDisplay, setProductToDisplay] = useState<Product>();

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
        <Pages title="Détails">
            <div className={"container"}>
                <img/>

                <div className="container__text">
                    <h1>{productToDisplay?.name}</h1>
                    <p>{productToDisplay?.description}</p>

                    <p>{productToDisplay?.price}</p>
                    <label htmlFor="quantity">Quantité</label>
                    <input id="quantity" type="number"/>

                    <Button variant="contained">Ajouter au panier</Button>
                </div>

            </div>
        </Pages>

    );
};

export default ProductDetails;
