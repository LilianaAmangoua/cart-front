import {FC} from 'react';
import HeroSection from "../../components/home/HeroSection";
import AboutUs from "../../components/home/AboutUs";
import Pages from "../../layout/Page";

const HomePage: FC<{}> = ({}) => {
    return (
        <Pages title={"Accueil"}>
            <main>
                <HeroSection></HeroSection>
                <AboutUs></AboutUs>
            </main>
        </Pages>
    );
};

export default HomePage;
