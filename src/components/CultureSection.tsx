import { Link } from "react-router-dom";
import { categoryData, mostViewedArticles } from "@/data/mockData";
import { categoryDataJP, mostViewedArticlesJP } from "@/data/mockDataJP";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

const CultureSection = () => {
    const { language, t } = useLanguage();

    // Culture Data
    const cultureArticles = language === 'VN'
        ? (categoryData["Văn hóa"] || [])
        : (categoryDataJP["文化"] || []);

    // Ensure we have enough articles (at least 4)
    const featuredCulture = cultureArticles[0];
    const sideCultureList = cultureArticles.slice(1, 4);

    // Most Read Data (8 items)
    const mostReadList = language === 'VN' ? mostViewedArticles : mostViewedArticlesJP;
    const displayMostRead = mostReadList.slice(0, 8);

    // Labels
    const cultureTitle = language === 'VN' ? "Văn hóa" : "文化";
    const mostReadTitle = language === 'VN' ? "Đọc nhiều" : "よく読まれています";
    const viewAllText = t("viewMore");

    if (!featuredCulture) return null;

    return (
        <section className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: CULTURE (2/3 width -> col-span-8) */}
                    <div className="lg:col-span-8">
                        {/* Section Header */}
                        <div className="flex items-center justify-between mb-6 border-b-2 border-primary pb-2">
                            <h2 className="text-2xl font-bold uppercase text-gray-900 border-l-4 border-primary pl-3">
                                {cultureTitle}
                            </h2>
                            <Link to="/category/van-hoa" className="text-sm font-medium text-gray-500 hover:text-primary flex items-center gap-1 group">
                                {viewAllText}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        {/* Culture Content Area */}
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Featured Article (Large) */}
                            <div className="md:w-[60%]">
                                <Link to={`/article/${featuredCulture.id}`} className="group block h-full">
                                    <div className="aspect-[4/3] w-full overflow-hidden rounded-sm mb-3 relative bg-gray-100">
                                        <img
                                            src={featuredCulture.image}
                                            alt={featuredCulture.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80";
                                                target.onerror = null; // Prevent infinite loop
                                            }}
                                        />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors">
                                        {featuredCulture.title}
                                    </h3>
                                    <p className="text-gray-600 text-base line-clamp-6 mb-2">
                                        {featuredCulture.summary}
                                    </p>
                                    <div className="text-xs text-gray-400 font-medium">{featuredCulture.date}</div>
                                </Link>
                            </div>

                            {/* Side List (Small Items) */}
                            <div className="md:w-[40%] flex flex-col gap-5">
                                {sideCultureList.map((article) => (
                                    <Link key={article.id} to={`/article/${article.id}`} className="group flex gap-3 items-start">
                                        <div className="flex-1">
                                            <h4 className="text-sm md:text-base font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-3">
                                                {article.title}
                                            </h4>
                                        </div>
                                        <div className="w-24 h-20 flex-shrink-0 overflow-hidden rounded-sm bg-gray-100">
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80";
                                                    target.onerror = null;
                                                }}
                                            />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: MOST READ (1/3 width -> col-span-4) */}
                    <div className="lg:col-span-4 pl-0 lg:pl-4 lg:border-l border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-200">
                            {mostReadTitle}
                        </h3>

                        <div className="grid grid-rows-4 grid-flow-col gap-x-6 gap-y-6">
                            {displayMostRead.map((article) => (
                                <Link key={article.id} to={`/article/${article.id}`} className="group block">
                                    <div className="flex gap-3 items-start">
                                        <div className="w-[80px] h-[60px] flex-shrink-0 overflow-hidden rounded-sm bg-gray-100">
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80";
                                                    target.onerror = null;
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors line-clamp-3">
                                                {article.title}
                                            </h4>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CultureSection;
