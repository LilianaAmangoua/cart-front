import {InputBase, styled} from "@mui/material";

export const StyledInputBase = styled(InputBase)(({theme}) => ({
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
        [theme.breakpoints.up('xs')]: {
            width: '60%',
            '&:focus': {
                width: '90%',
            },
        },
        [theme.breakpoints.up('md')]: {
            width: '80ch',
            '&:focus': {
                width: '120ch',
            },
        },
    },
}));