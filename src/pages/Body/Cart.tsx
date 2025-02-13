import {FC} from 'react';
import {useCart} from "../../context/CartContext";
import Grid from "@mui/material/Grid2";
import ProductCard from "../../components/ProductCard";
import {Product} from "../../types/Product";
import Pages from "../../Layout/Page";
import Button from "@mui/material/Button";
import FormDialog from "../../components/FormDialog";

interface CartItem extends Product {
    quantity: number;
}

const Cart: FC<{}> = ({}) => {
    const {totalProducts, deleteAll} = useCart();


    return (
        <Pages title={"Panier"}>
            <div>
                <h2>Mon Panier</h2>
                <Button variant="outlined" onClick={deleteAll} sx={{mt: "4rem", mb: "4rem"}}>Tout supprimer</Button>
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
            <FormDialog/>
        </Pages>

    );
};

export default Cart;
