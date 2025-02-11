import {FC} from 'react';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import "../pages/Body/styles/Login.css"
import {useNavigate} from "react-router-dom";
import Pages from "../Layout/Page";

const LoginForm: FC<{}> = ({}) => {
    const navigate = useNavigate();

    return (
        <Pages title={"Se connecter"}>
            <div className="loginContainer">
            <h2 style={{color: "#274c77"}}>Se connecter</h2>

            <TextField id="outlined-basic" label="Email" variant="outlined"/>
            <TextField id="outlined-basic" label="Password" variant="outlined" type={"password"}/>

            <Button onClick={() => navigate("/home")}>Se connecter</Button>
          </div>
        </Pages>
    );
};

export default LoginForm;
