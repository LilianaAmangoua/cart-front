import {FC, useEffect, useRef, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import {alpha, InputBase, List, ListItemButton, ListItemText, styled} from "@mui/material";
import {fromEvent, tap, map, filter, debounceTime, switchMap} from "rxjs";
import {Product} from "../types/Product";
import SearchIcon from '@mui/icons-material/Search';

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
    width: '100%',
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

    return (
        <Toolbar>
            <Search sx={{position: "relative"}}>
                <SearchIconWrapper>
                    <SearchIcon sx={{color: "#6096ba"}}/>
                </SearchIconWrapper>
                <StyledInputBase
                    sx={{width: 400}}
                    placeholder="Rechercher…"
                    inputProps={{'aria-label': 'search'}}
                />
            </Search>
        </Toolbar>

    );
}
export default SearchBarComponent;
