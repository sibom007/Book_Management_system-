import About from "./About";
import ContactUs from "./ContactUs";
import LandingPageBooks from "./LandingPageBooks";


const LandingPage = () => {
    return (
        <div>
            <LandingPageBooks />
            <ContactUs />
            <About />
        </div>
    );
};

export default LandingPage;