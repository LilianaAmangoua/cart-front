import React, {FC, useEffect, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import { List, ListItemButton, ListItemText} from "@mui/material";
import {Product} from "../types/Product";
import SearchIcon from '@mui/icons-material/Search';
import {get} from "../api/api";
import {useNavigate} from "react-router-dom";
import {SearchStyle} from "./searchStyles/SearchStyle";
import {SearchIconWrapper} from "./searchStyles/SearchIconWrapper";
import {StyledInputBase} from "./searchStyles/StyledInputBase";


const SearchBarComponent: FC<{}> = ({}) => {
    const [availableProduct, setAvailableProduct] = useState<Product[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [showList, setShowList] = useState<boolean>(false);
    const navigate = useNavigate();

    // Obtenir la valeur de l'input
    const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault(); // Ne pas recharger la page
        setInputValue(event.target.value);
    }

    useEffect(() => {
        if (inputValue.length > 2) { // Attendre que l'utilisateur ait écrit 2 lettres au moins
            setShowList(true);
            const timeoutId = setTimeout(() => {
                fetchProducts();
            }, 300);
            return () => clearTimeout(timeoutId);
        }
    }, [inputValue]);

    // Récupérer les produits qui contiennent l'input value
    const fetchProducts = async () => {
        try {
            const response = await get(`/products/search?query=${inputValue}`);
            setAvailableProduct(response);
        } catch (e) {
            console.error("Erreur lors de la requête", e);
            setShowList(false);
        }
    };


    return (
        <>
            <Toolbar>
                <SearchStyle>
                    <SearchIconWrapper>
                        <SearchIcon sx={{color: "#006164", "&:hover": {color: "white"}}}/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Rechercher…"
                        inputProps={{'aria-label': 'search'}}
                        value={inputValue}
                        onChange={handleInputValue}
                    />
                </SearchStyle>
            </Toolbar>
            {
                (availableProduct.length > 0 && showList) && (
                    <List sx={{
                        position: "absolute",
                        height: 250,
                        overflowY: "scroll",
                        backgroundColor: "white",
                        border: "1px solid grey",
                        width: {
                            xs: "90%",
                            md: "400px",
                            lg: "400px"
                        },
                        ml: "24px"
                    }}>
                        {
                            availableProduct.map((product) => {
                                return (
                                    <ListItemButton divider={true} onClick={() => navigate(`/productsdetails/${product.productId}`)} key={product.productId} sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                        <ListItemText primary={product.name}
                                                      sx={{color: "black"}}/>
                                    </ListItemButton>
                                )
                            })
                        }
                    </List>
                )
            }
        </>


    );
}
export default SearchBarComponent;
