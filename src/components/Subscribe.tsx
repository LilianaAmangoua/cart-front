import {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {SubmitHandler, useForm} from "react-hook-form";
import {post} from "../api/api";
import Pages from "../Layout/Page";
import Box from "@mui/material/Box";
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import Button from "@mui/material/Button";

interface SubscribeFormInput {
    email: string
    password: string
    role: string
}

const SubscribeForm: FC<{}> = ({}) => {
    const navigate = useNavigate();
    const {login} = useAuth();

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        defaultValues: {
            email: "",
            password: "",
            role: ""
        },
    })

    const [selectedRole, setSelectedRole] = useState("");

    const handleRole = (role: string) => {
        setSelectedRole(role);
        setValue("role", role);
    };


    const postUser = async (data: SubscribeFormInput) => {
        try {
            const user = await post("/auth/register", {
                email: data.email,
                password: data.password,
                role: data.role
            })

            console.log("Token received : ", user);
            console.log("User : " + user)

            if (user) {
                login(user, data.role);
                navigate("/login")
            } else {
                console.warn("Aucun token reçu");
            }

        } catch (e) {
            console.warn("Error logging in : ", e);
        }

    }

    const onSubmit: SubmitHandler<SubscribeFormInput> = async (data: SubscribeFormInput) => {

        if (errors) {
            console.log("Errors while submitting : ", errors);
        }
        console.log("Data to submit : ", data);
        await postUser(data);
    }



    return (
        <Pages title={"Se connecter"}>
            <form className="loginContainer" onSubmit={handleSubmit(onSubmit)}>
                <h2 style={{color: "#274c77"}}>S'inscrire</h2>

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

                <Button type="submit" variant="contained">S'inscrire</Button>
            </form>
        </Pages>
    );
};

export default SubscribeForm;