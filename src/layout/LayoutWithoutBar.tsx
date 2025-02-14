import {FC} from 'react';
import {Outlet} from "react-router-dom";
import Footer from "../pages/footer/Footer";

const LayoutWithoutBar: FC<{}> = ({}) => {
    return (
        <>
            <Outlet/>
        </>
    );
};

export default LayoutWithoutBar;
