import {FC, useState} from 'react';
import {Box, Button} from "@mui/material";

const Menu: FC<{}> = ({}) => {

    const [value, setValue] = useState(0);
    const incremente = () => {
        setValue(value + 1)
    }
    const decremente = () => {
        setValue(value - 1)
    }

    return (
        <>
            <Box m={2}>
                <Button onClick={() => incremente()} variant={"contained"} sx={{margin: 2}}>Incrémente</Button>
                <Button onClick={() => decremente()} variant={"contained"}>Décrémente</Button>
            </Box>
            <Box ml={2}>
                <p>{value}</p>
            </Box>
            {/*
            <Button>Modifier mon nom</Button>
            */}
        </>
    );
};

export default Menu;
