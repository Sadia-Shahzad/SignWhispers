import HeroSection from "../components/home_components/HeroSection";
import FeaturesSection from "../components/home_components/FeaturesSection";
import HowItWorksSection from "../components/home_components/HowItWorksSection";
import CTASection from "../components/home_components/CTASection";

const Home = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Call to Action Section */}
      <CTASection />
    </div>
  );
};

export default Home;
