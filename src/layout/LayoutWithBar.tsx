import {FC} from 'react';
import Header from "../pages/header/Header";
import {Outlet} from "react-router-dom";
import Footer from "../pages/footer/Footer";

const LayoutWithBar: FC<{}> = ({}) => {
    return (
        <>
          <Header/>
          <Outlet/>
            <Footer/>
        </>
    );
};

export default LayoutWithBar;
