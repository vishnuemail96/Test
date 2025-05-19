// Import components
import TopNewsBar from "../components/TopNewsBar";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Courses from "./Courses";
import EducationFeatures from "../components/EducationFeatures";
import PrimeCategories from "../components/PrimeCategories";
import IndustryLeaders from "../components/IndustryLeaders";
import Footer from "../components/Footer";

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
