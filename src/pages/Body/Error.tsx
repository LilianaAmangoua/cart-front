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
                <p>La page que vous recherchez n'existe pas</p>
                <Button variant="outlined" onClick={() => navigate("/home")}>Accueil</Button>
            </div>
        </Pages>

    );
};

export default Error;
