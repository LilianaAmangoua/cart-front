import {FC} from 'react';
import {useParams} from "react-router-dom";
import Pages from "../../Layout/Page";

const ProductDetails: FC<{}> = ({}) => {

    const {productId} = useParams();

    // Requête API

    return (
        <Pages title="Détails">
            <div>
                <h1>Product Details</h1>
            </div>
        </Pages>

    );
};

export default ProductDetails;
