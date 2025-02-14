import {FC} from 'react';
import Grid from "@mui/material/Grid2";
import image1 from "../../assets/aurelia-dubois-6J0MUsmS4fQ-unsplash.jpg"
import image2 from "../../assets/freestocks-DlZD4V2j9oM-unsplash.jpg"
import image3 from "../../assets/towfiqu-barbhuiya-FcST_JEc3Dc-unsplash.jpg"
import image4 from "../../assets/engin-akyurt-rNBSooxNze4-unsplash (1).jpg"
import styles from "../styles/AboutUs.module.css"
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {GreenButton} from "../common/buttons/GreenButton";
import ImageGrid from "./ImageGrid";

const AboutUs: FC<{}> = ({}) => {


    const navigate = useNavigate();

    return (
        <>
            <h2 className={styles.title}>Qui sommes-nous ?</h2>
            <section className={styles.aboutUs}>
                <img src={image4} alt="citronnier" className={styles.aboutUs__image}/>
                <section className={styles.aboutUs__Text}>
                    <p>Chez Ciel et Mer, nous croyons que la beauté des paysages méditerranéens doit être vécue à
                        travers
                        tous
                        les sens. Nous avons créé une gamme de savons artisanaux, inspirée par la richesse de la mer,
                        l’air
                        frais et les couleurs vibrantes de la Méditerranée.</p>

                    <p>Nos savons sont fabriqués avec des ingrédients naturels de qualité, principalement l'huile
                        d'olive,
                        qui
                        symbolise l'héritage de cette région. Chaque savon capture l'authenticité et la pureté des eaux
                        cristallines et des champs d’oliviers ensoleillés, afin de vous offrir une expérience
                        sensorielle
                        unique.</p>

                    <p>Ciel et Mer n'est pas seulement une marque, c’est un voyage. C’est un retour à la simplicité, une
                        invitation à prendre soin de soi et à s'évader, le temps d’un moment de douceur.</p>
                </section>
            </section>



            <ImageGrid/>

            <div className={styles.ctaButton}>
                <GreenButton onClick={() => navigate("/allproducts")} variant="contained">Nos produits</GreenButton>
            </div>

        </>
    );
};

export default AboutUs;
