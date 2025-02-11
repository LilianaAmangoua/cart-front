import {FC, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import {Product} from "../../types/Product";
import ProductCard from "../../components/ProductCard";
import {useCart} from "../../context/CartContext";
import {get} from "../../api/api";

const AllProducts: FC<{}> = ({}) => {
    const [productsToDisplay, setProductsToDisplay] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await get("/products/all");
                setProductsToDisplay(products);
            } catch (e) {
                console.error("Erreur lors de la récuperation : ", e)
            }

        }
        fetchProducts();
    }, []);

    return (
        <div>
           <h2>Tous les produits</h2>

            <Grid container spacing={2} sx={{mb: 2, mr: 2}}>
                {
                    productsToDisplay.map((product: Product) => (
                        <Grid size={{xs: 12, md: 3}} key={product.productId}>
                            <ProductCard product={product}/>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
};

export default AllProducts;
