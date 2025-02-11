import {FC} from 'react';
import SearchBarComponent from "../../components/SearchBar";
import Grid from "@mui/material/Grid2";

const Research: FC<{}> = ({}) => {
    return (
        <div>
           <h1>Chercher un produit</h1>
            <SearchBarComponent/>
            <Grid></Grid>
        </div>
    );
};

export default Research;
