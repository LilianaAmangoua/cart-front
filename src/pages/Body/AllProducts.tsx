import {FC} from 'react';
import Grid from "@mui/material/Grid2";
import {Product} from "../../types/Product";
import ProductCard from "../../components/ProductCard";
import {useCart} from "../../context/CartContext";

const AllProducts: FC<{}> = ({}) => {
    const {totalProducts} = useCart(); // A MODIFIER AVEC DONNES REELLES

    return (
        <div>
           <h2>Tous les produits</h2>

            <Grid container spacing={2} sx={{mb: 2, mr: 2}}>
                {
                    totalProducts.map((product: Product) => (
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
