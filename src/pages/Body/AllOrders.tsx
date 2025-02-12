import {FC} from 'react';
import {useAuth} from "../../context/AuthContext";

const AllOrders: FC<{}> = ({}) => {
    const {logout} = useAuth();
    return (
        <>
            <h1>Admin Orders</h1>
        </>
    );
};

export default AllOrders;
