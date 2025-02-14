import {FC} from 'react';
import {useCart} from "../../context/CartContext";
import Grid from "@mui/material/Grid2";
import ProductCard from "../../components/common/ProductCard";
import {Product} from "../../types/Product";
import Pages from "../../layout/Page";
import styles from "/styles/Cart.module.css"
import FormDialog from "../../components/ConfirmOrderDialog";
import {OutlinedButton} from "../../components/common/buttons/OutlinedButton";

interface CartItem extends Product {
    quantity: number;
}

const Cart: FC<{}> = ({}) => {
    const {totalProducts, deleteAll} = useCart();

    return (
        <Pages title={"Panier"}>
            <main style={{marginLeft: 32}}>
                <div style={{minHeight: "100vh"}}>
                    <h2 style={{fontSize: "2.5rem", color: "#006164"}}>Mon Panier</h2>
                    <FormDialog/>

                    <Grid container spacing={2} sx={{mb: 2, mr: 2}}>
                        {
                            totalProducts.map((product: CartItem) => (
                                <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={product.productId}>
                                    <ProductCard product={product} quantity={product.quantity}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
                <OutlinedButton onClick={deleteAll} sx={{mt: "4rem", mb: "4rem"}}>Tout supprimer</OutlinedButton>
            </main>
        </Pages>

    );
};

export default Cart;
