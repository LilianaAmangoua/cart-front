import {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Pages from "../../Layout/Page";
import {get} from "../../api/api";

const ProductDetails: FC<{}> = ({}) => {

    const {productId} = useParams();
    const [productToDisplay, setProductToDisplay] = useState();

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
            <div>
                <h1>Product Details</h1>
            </div>
        </Pages>

    );
};

export default ProductDetails;
