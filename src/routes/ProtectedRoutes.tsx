import {useAuth} from "../context/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

export const PrivateUserRoutes = () => {
    const{isLogged, role} = useAuth();

    if(!isLogged) return <Navigate to="/login"/>;
    if (role !== "USER") return <Navigate to="/error"/>;

    return <Outlet/>;
}

export const PrivateAdminRoutes = () => {
    const {isLogged, role} = useAuth();

    if (!isLogged) return <Navigate to="/login"/>;
    if (role !== "ADMIN") return <Navigate to="/error"/>;

    return <Outlet/>;
}