import {styled} from "@mui/material";
import Button from "@mui/material/Button";

export const GreenButton = styled(Button)(({theme}) => ({
    backgroundColor: "#006164",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    "&:hover": {
        backgroundColor: "white",
        color: "#006164",
        border: "1px solid #006164"
    },
}));
