import {FC} from 'react';
import SearchBarComponent from "../../components/SearchBar";
import Grid from "@mui/material/Grid2";
import Pages from "../../Layout/Page";

const Research: FC<{}> = ({}) => {
    return (
        <Pages title="Recherche">
            <div style={{height: "100vh"}}>
                <h1 style={{fontSize: "2.5rem", color: "#006164"}}>Chercher un produit</h1>
                <SearchBarComponent/>
            </div>
        </Pages>

    );
};

export default Research;
