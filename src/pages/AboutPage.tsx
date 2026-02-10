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
                        <div className="space-y-6 text-center">
                            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-8">
                                {t("about_title")}
                            </h1>

                            <div className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-6 text-justify md:text-center">
                                <p>
                                    {t("about_intro")}
                                </p>
                                <p>
                                    {t("about_mission")}
                                </p>
                                <p className="font-medium text-gray-900">
                                    {t("about_cta")}
                                </p>
                            </div>

                            {/* 3. Contact Button */}
                            <div className="pt-8">
                                <Link to="/contact">
                                    <Button className="bg-black hover:bg-gray-800 text-white px-10 py-6 text-lg font-semibold rounded-sm">
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
