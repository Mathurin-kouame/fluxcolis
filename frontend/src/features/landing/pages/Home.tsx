import { CtaSection } from "../components/CtaSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Navbar } from "../components/Navbar";
import { StatsSection } from "../components/StatsSection";

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-blue-500/5">
              <HeroSection />
            </div>
            <div>
                <StatsSection />
            </div>
            <div>
                <FeaturesSection />
            </div>
            <div>
                <CtaSection />
            </div>
            <div>
                <Footer />
            </div>
        </div>
 )
}
export default Home;