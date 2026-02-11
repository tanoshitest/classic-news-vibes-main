import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Single Section Layout */}
                <div className="container mx-auto px-4 py-12 md:py-20">
                    <div className="max-w-4xl mx-auto">
                        {/* 1. Large Image */}
                        <div className="rounded-lg overflow-hidden shadow-xl mb-12 aspect-video">
                            <img
                                src="/images/vietnam-hue.png"
                                alt="About Betonabi"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* 2. Text Content */}
                        <div className="space-y-6">
                            <div className="mb-8">
                                <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#7c3aed]">
                                    {t("about_title")}
                                </h1>
                            </div>

                            <div className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-6">
                                <p>
                                    {t("about_intro")}
                                </p>
                                <p>
                                    {t("about_mission")}
                                </p>
                                <div className="flex items-center gap-3 py-2">
                                    <span
                                        className="inline-block w-2 h-6 rounded-sm shrink-0"
                                        style={{
                                            background: "linear-gradient(135deg, #7c3aed 0%, #4d0078 100%)",
                                            transform: "skewX(-12deg)",
                                        }}
                                    />
                                    <p className="font-medium text-gray-900 italic">
                                        {t("about_cta")}
                                    </p>
                                </div>
                            </div>

                            {/* 3. Contact Button */}
                            <div className="pt-8">
                                <Link to="/contact">
                                    <Button className="bg-[#7c3aed] hover:bg-[#4d0078] text-white px-10 py-6 text-lg font-semibold rounded-sm transition-colors">
                                        {t("about_contact_button")}
                                    </Button>
                                </Link>
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
