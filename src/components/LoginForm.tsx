import {FC, useState} from 'react';
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import "../pages/Body/styles/Login.css"
import {useNavigate} from "react-router-dom";
import Pages from "../Layout/Page";
import {useAuth} from "../context/AuthContext";
import {SubmitHandler, useForm} from "react-hook-form";
import {post} from "../api/api";
import Box from "@mui/material/Box";
import {GreenButton} from "./common/GreenButton";

interface LoginFormInput {
    email: string
    password: string
    role: string
}

const LoginForm: FC<{}> = ({}) => {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [selectedRole, setSelectedRole] = useState("");
    const [error, setError] = useState("");


    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        defaultValues: {
            email: "",
            password: "",
            role: ""
        },
    })

    const postUser = async (data: LoginFormInput) => {
        localStorage.setItem("email", data.email);

        try {
            const user = await post("/auth/login", {
                email: data.email,
                password: data.password,
                role: data.role
            })

            if (user.token) {
                login(user.token, data.role);
                data.role === "ADMIN" ? navigate("/allorders") : navigate("/home")
            } else {
                setError(user)
            }

        } catch (e : any) {
            console.warn("Error logging in : ", e);

        }

    }

    const onSubmit: SubmitHandler<LoginFormInput> = async (data: LoginFormInput) => {
        await postUser(data);
    }

    const handleRole = (role: string) => {
        setSelectedRole(role);
        setValue("role", role);
    };


    return (
        <Pages title={"Se connecter"}>

            <form className="loginContainer" onSubmit={handleSubmit(onSubmit)}>
                <h2 style={{color: "#006164"}}>Se connecter</h2>

                <TextField id="outlined-basic" label="Email" variant="outlined" {...register("email")}/>
                <TextField id="outlined-basic" label="Mot de passe" variant="outlined"
                           type={"password"} {...register("password")}/>

                <FormControlLabel
                    control={
                        <Checkbox name="Utilisateur" checked={selectedRole === "USER"}
                                  onChange={() => handleRole("USER")}/>
                    }
                    label="Utilisateur"
                />

                <FormControlLabel
                    control={
                        <Checkbox name="admin" checked={selectedRole === "ADMIN"}
                                  onChange={() => handleRole("ADMIN")}/>
                    }
                    label="Admin"
                />
                {error && (<p style={{color: "red"}}>{error}</p>)}
                <GreenButton type="submit" variant="contained">Se connecter</GreenButton>
                <p>Pas encore inscrit ? <span onClick={() => navigate("/subscribe")} style={{
                    cursor: "pointer",
                    textDecoration: "underline"
                }}>S'inscrire</span></p>
            </form>


        </Pages>
    );
};

export default LoginForm;
