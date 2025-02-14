import {FC} from 'react';
import SearchBarComponent from "../../components/SearchBar";
import Grid from "@mui/material/Grid2";
import Pages from "../../layout/Page";

const Research: FC<{}> = ({}) => {
    return (
        <Pages title="Recherche">
            <main style={{height: "100vh", marginLeft: 32}}>
                <h1 style={{fontSize: "2.5rem", color: "#006164"}}>Chercher un produit</h1>
                <SearchBarComponent/>
            </main>
        </Pages>

    );
};

export default Research;
