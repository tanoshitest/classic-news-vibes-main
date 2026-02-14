import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LongformSection from "@/components/LongformSection";
import CategorySection from "@/components/CategorySection";
import HomeSidebar from "@/components/HomeSidebar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LongformSection />

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Column - Category Sections */}
            <div className="lg:col-span-8 space-y-0">
              {/* Culture Section */}
              <CategorySection category="Văn hóa" hideSidebar={true} />

              {/* Business Section */}
              <CategorySection category="Kinh doanh" hideSidebar={true} />

              {/* Lifestyle Section */}
              <CategorySection category="Đời sống" hideSidebar={true} />

              {/* Travel Section */}
              <CategorySection category="Du lịch" hideSidebar={true} />

              {/* Health Section */}
              <CategorySection category="Sức khỏe" hideSidebar={true} />
            </div>

            {/* Right Column - Unified Sidebar */}
            <div className="lg:col-span-4 mt-6 lg:mt-0">
              <HomeSidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
