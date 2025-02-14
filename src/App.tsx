import React from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Research from "./pages/body/Research";
import AllProducts from "./pages/body/AllProducts";
import Cart from "./pages/body/Cart";
import Error from "./pages/body/Error";
import Login from "./pages/body/Login";
import Orders from "./pages/body/Orders";
import ProductDetails from "./pages/body/ProductDetails";
import LayoutWithBar from "./layout/LayoutWithBar";
import LayoutWithoutBar from "./layout/LayoutWithoutBar";
import {HelmetProvider} from "react-helmet-async";
import {AuthProvider, useAuth} from "./context/AuthContext";
import HomePage from "./pages/body/Home";
import {CartProvider} from "./context/CartContext";
import Register from "./pages/body/Register";
import {PrivateAdminRoutes, PrivateUserRoutes} from "./routes/ProtectedRoutes";
import AllOrders from "./pages/body/AllOrders";
import {OrderProvider} from "./context/OrderContext";


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
                  <OrderProvider>
                      <CartProvider>

                          <Routes>

                              <Route element={<PrivateUserRoutes/>}>
                                  <Route path={"/"} element={<LayoutWithBar/>}>
                                      <Route index element={<Navigate to="/login" replace/>}/>
                                      <Route path={"/home"} element={<HomePage/>}></Route>
                                      <Route path={"/allproducts"} element={<AllProducts/>}></Route>
                                      <Route path={"/productsdetails/:productId"} element={<ProductDetails/>}></Route>
                                      <Route path={"/orders"} element={<Orders/>}></Route>
                                      <Route path={"/research"} element={<Research/>}></Route>
                                      <Route path={"/cart"} element={<Cart/>}></Route>
                                  </Route>
                              </Route>

                              <Route element={<PrivateAdminRoutes/>}>
                                  <Route path={"/allorders"} element={<AllOrders/>}></Route>
                              </Route>

                              <Route path={"/"} element={<LayoutWithoutBar/>}>
                                  <Route path={"/login"} element={<Login/>}></Route>
                                  <Route path={"/subscribe"} element={<Register/>}></Route>
                                  <Route path={"/error"} element={<Error/>}></Route>
                                  <Route path={"*"} element={<Navigate to={"/error"}/>}></Route>
                              </Route>
                          </Routes>
                      </CartProvider>
                  </OrderProvider>

              </AuthProvider>
          </HelmetProvider>

      </>
  );
}

export default App;
