import {FC} from 'react';
import {useCart} from "../../context/CartContext";
import Grid from "@mui/material/Grid2";
import ProductCard from "../../components/ProductCard";
import {Product} from "../../types/Product";
import Pages from "../../Layout/Page";
import Button from "@mui/material/Button";

interface CartItem extends Product {
    quantity: number;
}

const Cart: FC<{}> = ({}) => {
    const {totalProducts} = useCart();

    return (
        <Pages title={"Panier"}>
            <div>
                <h2>Mon Panier</h2>
                <Grid container spacing={2} sx={{mb: 2, mr: 2}}>
                    {
                        totalProducts.map((product: CartItem) => (
                            <Grid size={{xs: 12, md: 3}} key={product.productId}>
                                <ProductCard product={product} quantity={product.quantity}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>

            <Button variant="contained" sx={{mb: 5}}>Acheter</Button>
        </Pages>

    );
};

export default Cart;
