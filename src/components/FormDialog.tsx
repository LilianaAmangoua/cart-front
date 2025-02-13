import {FC, useContext, useEffect, useState} from 'react';
import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {CartContext, useCart} from "../context/CartContext";
import {useOrder} from "../context/OrderContext";

const FormDialog: FC<{}> = ({}) => {
    const [open, setOpen] = React.useState(false);

    const [inputValue, setInputValue] = useState("");
    const [showError, setShowError] = useState(false);

    const {totalProducts} = useCart();
    const {addToOrder} = useOrder();

    const email = localStorage.getItem("email"); // Email de l'utilisateur


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEmailVerification = () => {
        if(inputValue === email){ // Si le mail est valide, valider la commande
            addToOrder(totalProducts);
            setShowError(false);
        }
        else {
            setShowError(true);
        }
    }



    return (
        <>

            <Button onClick={handleClickOpen} variant="contained">Acheter</Button>

            {
                showError && (
                    <p style={{color: "red"}}>Le mail n'est pas valide</p>
                )
            }


            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        handleEmailVerification();
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Vérification</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Merci d'écrire votre mail
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="text"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {
                            setInputValue(event.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button type="submit" >Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default FormDialog;