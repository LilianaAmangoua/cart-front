import {FC} from 'react';
import Subscribe from "../../components/auth/Subscribe";
import Pages from "../../layout/Page";


const RegisterPage: FC<{}> = ({}) => {

    return (
        <Pages title={"S'inscrire"}>
           <Subscribe/>
        </Pages>
    );
};

export default RegisterPage;
