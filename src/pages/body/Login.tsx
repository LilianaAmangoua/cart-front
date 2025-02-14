import {FC} from 'react';
import LoginForm from "../../components/auth/LoginForm";
import Pages from "../../layout/Page";

const Login: FC<{}> = ({}) => {
    return (
        <Pages title={"Se connecter"}>
            <LoginForm/>
        </Pages>

    );
};

export default Login;
