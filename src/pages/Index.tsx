import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import HotTopics from "@/components/HotTopics";
import HeroSection from "@/components/HeroSection";
import LongformSection from "@/components/LongformSection";
import CategoryGrid from "@/components/CategoryGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <HotTopics />
      <main>
        <HeroSection />
        <LongformSection />
        <CategoryGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
