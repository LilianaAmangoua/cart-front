import {FC, useEffect} from 'react';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import {useCart} from "../context/CartContext";
import {Product} from "../types/Product";
import Box from "@mui/material/Box";

const ProductCard: FC<{product: Product}> = ({product}) => {
     const {addToCart} = useCart();

    return (
        <Box>
           <h3>{product.name}</h3>
            <p>{product.price}</p>
            <ControlPointRoundedIcon onClick={() => addToCart(product)}/>
        </Box>
    );
};

export default ProductCard;
