import {FC, useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import {Product} from "../../types/Product";
import ProductCard from "../../components/ProductCard";
import {get} from "../../api/api";
import Pages from "../../Layout/Page";

const AllProducts: FC<{}> = ({}) => {
    const [productsToDisplay, setProductsToDisplay] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {// Récupérer tous les produits
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
        <Pages title="Tous les produits">
            <div style={{minHeight: "90vh"}}>

                <h2 style={{fontSize: "2.5rem", color: "#006164"}}>Tous les produits</h2>

                <Grid container spacing={5} sx={{mb: 2, mr: 2}}>
                    {
                        productsToDisplay &&
                        productsToDisplay.map((product: Product) => (
                            <Grid size={{xs: 12,sm: 6, md: 4, lg: 3}} key={product.productId}>
                                <ProductCard product={product}/>
                            </Grid>
                        ))
                    }
                </Grid>

            </div>
        </Pages>
    );
};

export default AllProducts;
