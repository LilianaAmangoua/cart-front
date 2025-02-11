import {FC} from 'react';
import {Link} from "react-router-dom";
import "./Footer.css"

const Footer: FC<{}> = ({}) => {
    return (
        <footer className="footer">
           <Link to={"/home"}>Accueil</Link>
            <Link to={"/allproducts"}>Tous les produits</Link>
            <Link to={"/research"}>Chercher un produit</Link>
            <Link to={"/orders"}>Mes commandes</Link>
        </footer>
    );
};

export default Footer;
