import {FC} from 'react';
import LoginForm from "../../components/LoginForm";
import Pages from "../../Layout/Page";

const Login: FC<{}> = ({}) => {
    return (
        <Pages title={"Se connecter"}>
            <LoginForm/>
        </Pages>

    );
};

export default Login;
