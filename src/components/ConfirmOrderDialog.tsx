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
import {GreenButton} from "./common/buttons/GreenButton";

const ConfirmOrderDialog: FC<{}> = ({}) => {
    const [open, setOpen] = React.useState(false);

    const [inputValue, setInputValue] = useState("");
    const [showError, setShowError] = useState(false);
    const [emptyCart, setEmptyCart] = useState(false);

    const {totalProducts} = useCart();
    const {addToOrder} = useOrder();

    const email = localStorage.getItem("email"); // Email de l'utilisateur


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Vérifie le mail de l'utilisateur
    const handleEmailVerification = () => {
        if(inputValue === email){ // Si le mail est égal au mail de l'utilisateur, valider la commande
            if(totalProducts.length <= 0){ // Ne rien faire si le panier est vide
                setEmptyCart(true);
                return;
            }
            addToOrder(totalProducts);
            setShowError(false);
        }
        else {
            setShowError(true);
        }
    }



    return (
        <>

            <GreenButton onClick={handleClickOpen} variant="contained" sx={{mb: "4rem"}}>Acheter</GreenButton>

            {
                showError && (
                    <p style={{color: "red"}}>Le mail n'est pas valide</p>
                )
            }

            {
                emptyCart && (
                    <p>Le panier est vide</p>
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

export default ConfirmOrderDialog;