// Import components
import EducationFeatures from "../components/EducationFeatures";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import IndustryLeaders from "../components/IndustryLeaders";
import Navbar from "../components/Navbar";
import PrimeCategories from "../components/PrimeCategories";
import TopNewsBar from "../components/TopNewsBar";
import Courses from "./Courses";

const Home = () => {
  return (
    <div>
      <TopNewsBar />
      <Navbar />
      <HeroSection />
      <Courses />
      <EducationFeatures />
      <PrimeCategories />
      <IndustryLeaders />
      <Footer />
    </div>
  );
};

export default Home;
