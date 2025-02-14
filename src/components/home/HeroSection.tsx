import {FC} from 'react';
import styles from "../styles/HeroSection.module.css"
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {GreenButton} from "../common/buttons/GreenButton";

const HeroSection: FC<{}> = ({}) => {
    const navigate = useNavigate()
    return (
        <section className={styles.heroSection} >
            <div className={styles.herosection__text}>
                <h1>Savons artisanaux inspirés par la beauté de la Méditerranée</h1>
                <GreenButton variant="contained" onClick={() => navigate("/allproducts")}>Découvrez nos produits</GreenButton>
            </div>

        </section>
    );
};

export default HeroSection;
