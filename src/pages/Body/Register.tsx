import {FC} from 'react';
import Subscribe from "../../components/Subscribe";
import Pages from "../../Layout/Page";


const RegisterPage: FC<{}> = ({}) => {

    return (
        <Pages title={"S'inscrire"}>
           <Subscribe/>
        </Pages>
    );
};

export default RegisterPage;
