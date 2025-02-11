import React from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Research from "./pages/Body/Research";
import AllProducts from "./pages/Body/AllProducts";
import Cart from "./pages/Body/Cart";
import Error from "./pages/Body/Error";
import Login from "./pages/Body/Login";
import OrderDetails from "./pages/Body/OrderDetails";
import Orders from "./pages/Body/Orders";
import ProductDetails from "./pages/Body/ProductDetails";
import LayoutWithBar from "./Layout/LayoutWithBar";
import LayoutWithoutBar from "./Layout/LayoutWithoutBar";
import {HelmetProvider} from "react-helmet-async";
import {AuthProvider, useAuth} from "./context/AuthContext";
import HomePage from "./pages/Body/Home";
import {CartProvider} from "./context/CartContext";


function App() {
    return (
        <BrowserRouter>
            <MainApp/>
        </BrowserRouter>
    );
}

function MainApp() {

  return (
      <>
          <HelmetProvider>
              <AuthProvider>
                  <CartProvider>
                      <Routes>

                          <Route path={"/"} element={<LayoutWithBar/>}>
                              <Route index element={<Navigate to="/home" replace/>}/>
                              <Route path={"/home"} element={<HomePage/>}></Route>
                              <Route path={"/allproducts"} element={<AllProducts/>}></Route>
                              <Route path={"/productsdetails/:productId"} element={<ProductDetails/>}></Route>
                              <Route path={"/orders"} element={<Orders/>}></Route>
                              <Route path={"/research"} element={<Research/>}></Route>
                              <Route path={"/orderdetails/:orderId"} element={<OrderDetails/>}></Route>
                              <Route path={"/cart"} element={<Cart/>}></Route>
                          </Route>

                          <Route path={"/"} element={<LayoutWithoutBar/>}>
                              <Route path={"/login"} element={<Login/>}></Route>
                              <Route path={"/error"} element={<Error/>}></Route>
                              <Route path={"*"} element={<Navigate to={"/error"}/>}></Route>
                          </Route>
                      </Routes>
                  </CartProvider>
              </AuthProvider>
          </HelmetProvider>

      </>
  );
}

export default App;
