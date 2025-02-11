import {FC} from 'react';
import Header from "../pages/Header/Header";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer";

const LayoutWithBar: FC<{}> = ({}) => {
    return (
        <>
          <Header/>
          <Outlet/>
            <Footer></Footer>
        </>
    );
};

export default LayoutWithBar;
