import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                {/* Hero Banner */}
                <div className="relative h-[500px] overflow-hidden">
                    {/* Hero image */}
                    <div className="absolute inset-0">
                        <img
                            src="/images/vietnam-hue.png"
                            alt="Imperial City of Hue - Cố đô Huế"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                    <div className="relative h-full flex items-center justify-center">
                        <div className="container mx-auto px-4 text-center">
                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                                {t("about_title")}
                            </h1>
                            <div className="w-32 h-1 bg-white mx-auto"></div>
                        </div>
                    </div>
                </div>

                {/* Content Sections - Alternating Image & Text */}
                <div className="bg-white">
                    {/* Section 1: Image Left, Text Right */}
                    <div className="container mx-auto px-4 py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Image */}
                            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
                                <img
                                    src="/images/vietnam-culture.png"
                                    alt="Vietnamese culture"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Text */}
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                                    {t("about_intro").split('.')[0]}.
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {t("about_intro")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Text Left, Image Right */}
                    <div className="bg-gray-50 py-20">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                {/* Text */}
                                <div className="space-y-6 lg:order-1">
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                                        Sứ mệnh của chúng tôi
                                    </h2>
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        {t("about_mission")}
                                    </p>
                                </div>

                                {/* Image */}
                                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl lg:order-2">
                                    <img
                                        src="/images/vietnam-hue.png"
                                        alt="Cố đô Huế - Imperial City of Hue"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Image Left, Text Right */}
                    <div className="py-20">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                {/* Image */}
                                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl">
                                    <img
                                        src="/images/vietnam-landscape.png"
                                        alt="Vietnam landscape"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Text */}
                                <div className="space-y-6">
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                                        Kết nối với chúng tôi
                                    </h2>
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        {t("about_cta")}
                                    </p>

                                    {/* CTA Button */}
                                    <Link to="/contact">
                                        <Button className="bg-black hover:bg-gray-800 text-white px-10 py-6 text-lg font-semibold rounded-sm mt-6">
                                            {t("about_contact_button")}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
