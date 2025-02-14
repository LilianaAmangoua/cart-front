import {useAuth} from "../context/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

export const PrivateUserRoutes = () => {
    const{token, role} = useAuth();

    if(!token) return <Navigate to="/login"/>; // Si aucun token n'existe, aller sur la page de connexion
    if (role !== "USER") return <Navigate to="/error"/>; // Si le role n'est pas le bon, aller sur la page d'erreur

    return <Outlet/>;
}

export const PrivateAdminRoutes = () => {
    const {token, role} = useAuth();

    if (!token) return <Navigate to="/login"/>; // Si aucun token n'existe, aller sur la page de connexion
    if (role !== "ADMIN") return <Navigate to="/error"/>; // Si le role n'est pas le bon, aller sur la page d'erreur

    return <Outlet/>;
}