import {FC} from 'react';
import Button from "@mui/material/Button";
import Pages from "../../layout/Page";
import {useNavigate} from "react-router-dom";

const Error: FC<{}> = ({}) => {

    const navigate = useNavigate();

    return (
        <Pages title="Erreur 404">
            <main style={{marginLeft: 32}}>
                <h1>404</h1>
                <p>La page que vous recherchez n'existe pas ou vous vous êtes connecté avec les mauvaises informations
                    d'identification</p>
                <Button variant="outlined" onClick={() => navigate("/login")}>Se connecter ou s'inscrire</Button>
            </main>
        </Pages>

    );
};

export default Error;
