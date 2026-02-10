import { Link } from "react-router-dom";
import { categoryData, mostViewedArticles } from "@/data/mockData";
import { categoryDataJP, mostViewedArticlesJP } from "@/data/mockDataJP";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

interface CategorySectionProps {
    category: string;
    jpCategory?: string;
    reverseLayout?: boolean;
}

const CategorySection = ({ category, jpCategory, reverseLayout = false }: CategorySectionProps) => {
    const { language } = useLanguage();

    // Map VN category to JP category if not provided
    const getJPCategory = (vnCat: string) => {
        if (jpCategory) return jpCategory;
        const map: Record<string, string> = {
            "Kinh doanh": "ビジネス",
            "Đời sống": "ライフスタイル",
            "Du lịch": "旅行",
            "Sức khỏe": "健康",
            "Văn hóa": "文化",
            "Giáo dục": "教育",
            "Xã hội": "社会"
        };
        return map[vnCat] || vnCat;
    };

    const currentCategoryName = language === 'VN' ? category : getJPCategory(category);

    // Data Fetching
    const articles = language === 'VN'
        ? (categoryData[category] || [])
        : (categoryDataJP[getJPCategory(category)] || []);

    // Ensure we have enough articles (at least 1, preferably 4)
    const featuredArticle = articles[0];
    const sideArticles = articles.slice(1, 4);

    // Most Read Data (8 items) - Reused for all sections as per "layout y hệt"
    const mostReadList = language === 'VN' ? mostViewedArticles : mostViewedArticlesJP;
    const displayMostRead = mostReadList.slice(0, 8); // Or randomize/rotate if desired

    // Labels
    const mostReadTitle = language === 'VN' ? "Đọc nhiều" : "よく読まれています";
    const viewAllText = language === 'VN' ? "Xem thêm" : "一覧へ";

    // Slug for "Xem thêm" link
    const getSlug = (cat: string) => {
        const slugMap: Record<string, string> = {
            "Kinh doanh": "kinh-doanh",
            "Đời sống": "doi-song",
            "Du lịch": "du-lich",
            "Sức khỏe": "suc-khoe",
            "Văn hóa": "van-hoa",
            "Giáo dục": "giao-duc",
            "Xã hội": "xa-hoi"
        };
        return slugMap[cat] || "#";
    };
    const categoryLink = `/category/${getSlug(category)}`;

    if (!featuredArticle) return null;

    return (
        <section className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* MAIN CONTENT AREA (2/3 width -> col-span-8) */}
                    <div className="lg:col-span-8">
                        {/* Section Header */}
                        <div className="flex items-center justify-between mb-6 border-b-2 border-primary pb-2">
                            <h2 className="text-2xl font-bold uppercase text-gray-900 border-l-4 border-primary pl-3">
                                {currentCategoryName}
                            </h2>
                            <Link to={categoryLink} className="text-sm font-medium text-gray-500 hover:text-primary flex items-center gap-1 group">
                                {viewAllText}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        {/* Content Area */}
                        <div className="flex flex-col gap-6">
                            {/* Featured Article (Large) - Full Width of Main Column */}
                            <div className="w-full">
                                <Link to={`/article/${featuredArticle.id}`} className="group block h-full">
                                    <div className="aspect-[2/1] w-full overflow-hidden rounded-sm mb-4 relative bg-gray-100">
                                        <img
                                            src={featuredArticle.image}
                                            alt={featuredArticle.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80";
                                                target.onerror = null;
                                            }}
                                        />
                                    </div>
                                    <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-primary transition-colors">
                                        {featuredArticle.title}
                                    </h3>
                                    <p className="text-gray-600 text-base md:text-lg line-clamp-3 mb-3">
                                        {featuredArticle.summary}
                                    </p>
                                    <div className="text-sm text-gray-400 font-medium">{featuredArticle.date}</div>
                                </Link>
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

export default CategorySection;
