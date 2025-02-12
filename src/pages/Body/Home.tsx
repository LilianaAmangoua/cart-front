import {FC} from 'react';
import HeroSection from "../../components/home/HeroSection";
import AboutUs from "../../components/home/AboutUs";

const HomePage: FC<{}> = ({}) => {
    return (
        <div>
            <HeroSection></HeroSection>
            <AboutUs></AboutUs>
        </div>
    );
};

export default HomePage;
