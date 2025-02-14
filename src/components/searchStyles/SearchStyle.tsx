import {styled} from "@mui/material";

export const SearchStyle = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#e7ecef",
    color: "#006164",
    border: "1px solid #006164",
    '&:hover': {
        backgroundColor: "#006164",
        color: "white"
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));