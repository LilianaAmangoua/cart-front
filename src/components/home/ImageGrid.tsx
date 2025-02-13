import image1 from "../../assets/aurelia-dubois-6J0MUsmS4fQ-unsplash.jpg";
import image2 from "../../assets/freestocks-DlZD4V2j9oM-unsplash.jpg";
import image3 from "../../assets/towfiqu-barbhuiya-FcST_JEc3Dc-unsplash.jpg";
import "../styles/ImageGrid.css"

const images = [
    {
        title: "Ingrédients Naturels",
        description: " Nous utilisons exclusivement des ingrédients de qualité, 100% naturels et issus de la région méditerranéenne.",
        image: image1
    },
    {
        title: "Fabrication Artisanale",
        description: "Nos savons sont fabriqués à la main, avec un savoir-faire traditionnel.",
        image: image2
    },
    {
        title: "Respect de l’environnement",
        description: "Nous privilégions des pratiques respectueuses de l’environnement et des emballages éco-responsables.",
        image: image3
    }
]

const ImageGrid = () => {
    return (
        <div className="grid-container">
            {images.map((item, index) => (
                <div className={`grid-row ${index % 2 === 0 ? "reverse" : ""}`} key={index}>
                    <img src={item.image} alt={item.title} className="grid-image"/>
                    <div className="grid-text">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ImageGrid;