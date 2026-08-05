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
            <section id="home" className="bg-blue-500/5">
              <HeroSection />
            </section>
            <section id="pricing"
            className="scroll-mt-24"
            >
                <StatsSection />
            </section>
            <section id="features">
                <FeaturesSection />
            </section>
            <section id="cta">
                <CtaSection />
            </section>
            <section id="footer">
                <Footer />
            </section>
        </div>
 )
}
export default Home;