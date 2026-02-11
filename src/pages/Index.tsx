import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LongformSection from "@/components/LongformSection";
import CategorySection from "@/components/CategorySection";

import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LongformSection />

        {/* Culture Section */}
        <CategorySection category="Văn hóa" />

        {/* Business Section */}
        <CategorySection category="Kinh doanh" />

        {/* Lifestyle Section */}
        <CategorySection category="Đời sống" />

        {/* Travel Section */}
        <CategorySection category="Du lịch" />

        {/* Health Section */}
        <CategorySection category="Sức khỏe" />

      </main>
      <Footer />
    </div>
  );
};

export default Index;
