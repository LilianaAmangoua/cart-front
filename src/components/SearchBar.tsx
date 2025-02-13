import React, {FC, useEffect, useRef, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import {alpha, InputBase, List, ListItemButton, ListItemText, styled} from "@mui/material";
import {fromEvent, tap, map, filter, debounceTime, switchMap} from "rxjs";
import {Product} from "../types/Product";
import SearchIcon from '@mui/icons-material/Search';
import {get} from "../api/api";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#e7ecef",
    '&:hover': {
        backgroundColor: "#a3cef1",
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: "100%",
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const SearchBarComponent: FC<{}> = ({}) => {
    const [availableProduct, setAvailableProduct] = useState<Product[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [showList, setShowList] = useState<boolean>(false);

    const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInputValue(event.target.value);
    }

    useEffect(() => {
        if (inputValue.length > 2) {
            setShowList(true);
            const timeoutId = setTimeout(() => {
                fetchProducts();
                console.log("inputValue plus que 2", inputValue);
            }, 300);
            return () => clearTimeout(timeoutId);
        }
    }, [inputValue]);

    const fetchProducts = async () => {
        try {
            const response = await get(`/products/search?query=${inputValue}`);
            setAvailableProduct(response);
            console.log("Recherche : ", response);
        } catch (e) {
            console.error("Erreur lors de la requête", e);
            setShowList(false);
        }
    };


    return (
        <>
            <Toolbar>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon sx={{color: "#6096ba"}}/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        sx={{width: 400}}
                        placeholder="Rechercher…"
                        inputProps={{'aria-label': 'search'}}
                        value={inputValue}
                        onChange={handleInputValue}
                    />
                </Search>
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
                                    <ListItemButton divider={true} key={product.productId} sx={{
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
