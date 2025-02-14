import {FC} from 'react';
import {Link} from "react-router-dom";
import "./Footer.css"

const Footer: FC<{}> = ({}) => {
    return (
        <footer className="footer">
            <div className={"links"}>
                <Link to={"/home"}>Accueil</Link>
                <Link to={"/allproducts"}>Tous les produits</Link>
                <Link to={"/research"}>Chercher un produit</Link>
                <Link to={"/orders"}>Mes commandes</Link>
            </div>
            <div className={"band"}>
                <p>© 2024 Ciel et Mer. Tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;
