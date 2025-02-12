import {FC} from 'react';
import Button from "@mui/material/Button";
import Pages from "../../Layout/Page";
import {useNavigate} from "react-router-dom";

const Error: FC<{}> = ({}) => {

    const navigate = useNavigate();

    return (
        <Pages title="Erreur 404">
            <div>
                <h1>404</h1>
                <p>La page que vous recherchez n'existe pas ou vous vous êtes connecté avec les mauvaises informations
                    d'identification</p>
                <Button variant="outlined" onClick={() => navigate("/login")}>Se connecter ou s'inscrire</Button>
            </div>
        </Pages>

    );
};

export default Error;
