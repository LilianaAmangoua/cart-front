import {styled} from "@mui/material";
import Button from "@mui/material/Button";

export const OutlinedButton = styled(Button)(({theme}) => ({
    backgroundColor: "white",
    color: "#006164",
    border: "1px solid #006164",
    padding: "10px 20px",
    borderRadius: "8px",
    "&:hover": {
        backgroundColor: "#015d60",
        color: "white",
    },
}));