import { Link } from "react-router-dom";
import { categoryData, mostViewedArticles } from "@/data/mockData";
import { categoryDataJP, mostViewedArticlesJP } from "@/data/mockDataJP";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

interface CategorySectionProps {
    category: string;
    jpCategory?: string;
    reverseLayout?: boolean;
    hideSidebar?: boolean;
}

const CategorySection = ({ category, jpCategory, reverseLayout = false, hideSidebar = false }: CategorySectionProps) => {
    const { language, t } = useLanguage();

    // Map VN category to JP category if not provided
    const getJPCategory = (vnCat: string) => {
        if (jpCategory) return jpCategory;
        const map: Record<string, string> = {
            "Kinh doanh": "ビジネス",
            "Đời sống": "ライフ",
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

    const mostReadList = language === 'VN' ? mostViewedArticles : mostViewedArticlesJP;
    const sidebarArticles = mostReadList.slice(0, 8); // Take 8 for the sidebar

    // Ensure we have enough articles
    const featuredArticle = articles[0];
    const subArticles = articles.slice(1, 4); // Take 3 articles for the grid

    // Labels
    const viewAllText = t("viewMore");
    const sidebarTitle = language === 'VN' ? "Đọc nhiều" : "アクセスランキング";

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
        <section className="py-6 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className={`grid grid-cols-1 ${hideSidebar ? 'lg:grid-cols-8' : 'lg:grid-cols-12'} gap-8`}>

                    {/* LEFT COLUMN: Main Articles */}
                    <div className={`${hideSidebar ? 'lg:col-span-8' : 'lg:col-span-8'}`}>
                        {/* Section Header */}
                        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                            <div className="flex items-center gap-3">
                                <span
                                    className="inline-block w-2 h-8 rounded-sm"
                                    style={{
                                        background: "linear-gradient(135deg, #7c3aed 0%, #4d0078 100%)",
                                        transform: "skewX(-12deg)",
                                    }}
                                />
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {currentCategoryName}
                                </h2>
                            </div>
                            <Link to={categoryLink} className="text-sm font-medium text-black hover:text-primary flex items-center gap-1 group">
                                {viewAllText}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        {/* 1. Featured Article: Text Left, Image Right */}
                        <div className="mb-10">
                            <Link to={`/article/${featuredArticle.id}`} className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                                <div className="md:col-span-5 space-y-3">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                                        {featuredArticle.title}
                                    </h3>
                                    <p className="text-black text-sm md:text-base leading-relaxed line-clamp-4">
                                        {featuredArticle.summary}
                                    </p>
                                </div>
                                <div className="md:col-span-12 lg:col-span-7">
                                    <div className="aspect-[16/9] w-full overflow-hidden rounded-sm bg-gray-100">
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
                                </div>
                            </Link>
                        </div>

                        {/* 2. Grid of 3 Articles */}
                        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4`}>
                            {subArticles.map((article) => (
                                <Link key={article.id} to={`/article/${article.id}`} className="group block">
                                    <div className="aspect-[16/9] w-full overflow-hidden rounded-sm bg-gray-100 mb-3">
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
                                    <h4 className="text-base font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-3">
                                        {article.title}
                                    </h4>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Optional Tin đọc nhiều */}
                    {!hideSidebar && (
                        <div className="lg:col-span-4 lg:pl-6 pt-12 lg:pt-0">
                            <div className="flex items-center gap-3 mb-6">
                                <span
                                    className="inline-block w-2.5 h-7 rounded-sm"
                                    style={{
                                        background: "linear-gradient(135deg, #7c3aed 0%, #4d0078 100%)",
                                        transform: "skewX(-15deg)",
                                    }}
                                />
                                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                                    {sidebarTitle}
                                </h3>
                            </div>

                            <div className="space-y-0 divide-y divide-gray-100">
                                {sidebarArticles.map((article, index) => (
                                    <Link
                                        key={article.id}
                                        to={`/article/${article.id}`}
                                        className="group relative flex items-center justify-between py-4 hover:bg-gray-50/50 transition-colors"
                                    >
                                        <div className="pr-12">
                                            <h4 className="text-sm font-medium text-black leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                                {article.title}
                                            </h4>
                                        </div>
                                        <span className="absolute right-0 text-5xl font-black text-gray-100 pointer-events-none group-hover:text-gray-200 transition-colors select-none">
                                            {index + 1}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default CategorySection;
