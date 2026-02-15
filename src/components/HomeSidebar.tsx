import { Link } from "react-router-dom";
import { mostViewedArticles } from "@/data/mockData";
import { mostViewedArticlesJP } from "@/data/mockDataJP";
import { useLanguage } from "@/contexts/LanguageContext";
import { Cloud, Sun, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

const HomeSidebar = () => {
    const { language } = useLanguage();

    const mostReadList = language === 'VN' ? mostViewedArticles : mostViewedArticlesJP;
    const sidebarArticles = mostReadList.slice(0, 8);

    const sidebarTitle = language === 'VN' ? "Đọc nhiều" : "アクセスランキング";
    const weatherTitle = language === 'VN' ? "Thời tiết" : "天気";
    const financialTitle = language === 'VN' ? "Tỉ giá" : "為替";

    return (
        <aside className="space-y-8 lg:pl-6 border-l border-gray-100 sticky top-6 self-start">
            {/* 1. Đọc nhiều Block */}
            <section>
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
                            <span className="absolute right-0 text-5xl font-black text-gray-100 pointer-events-none group-hover:text-[#7c3aed] transition-colors select-none">
                                {index + 1}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 2. Thời tiết Block */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <span
                        className="inline-block w-2.5 h-7 rounded-sm"
                        style={{
                            background: "linear-gradient(135deg, #7c3aed 0%, #4d0078 100%)",
                            transform: "skewX(-15deg)",
                        }}
                    />
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                        {weatherTitle}
                    </h3>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-gray-900">Hà Nội</p>
                            <p className="text-xs text-gray-500">Nhiều mây, có mưa</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Cloud className="w-8 h-8 text-gray-400" />
                            <span className="text-2xl font-bold text-gray-900">22°C</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                        <div>
                            <p className="text-sm font-bold text-gray-900">TP. Hồ Chí Minh</p>
                            <p className="text-xs text-gray-500">Nắng nhẹ</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sun className="w-8 h-8 text-yellow-500" />
                            <span className="text-2xl font-bold text-gray-900">32°C</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Tỉ giá Block */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <span
                        className="inline-block w-2.5 h-7 rounded-sm"
                        style={{
                            background: "linear-gradient(135deg, #7c3aed 0%, #4d0078 100%)",
                            transform: "skewX(-15deg)",
                        }}
                    />
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                        {financialTitle}
                    </h3>
                </div>

                <div className="bg-white border border-gray-100 rounded-lg p-4 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🇺🇸</span>
                            <span className="text-sm font-bold">USD/VND</span>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold">25.450</p>
                            <div className="flex items-center gap-1 text-[10px] text-green-600 justify-end">
                                <ArrowUpRight className="w-3 h-3" />
                                <span>+0.05%</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🇯🇵</span>
                            <span className="text-sm font-bold">JPY/VND</span>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold">168.45</p>
                            <div className="flex items-center gap-1 text-[10px] text-red-600 justify-end">
                                <ArrowDownRight className="w-3 h-3" />
                                <span>-0.12%</span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2 text-[10px] text-left text-gray-400">
                        {language === 'VN' ? "Cập nhật 11:04, 14/2/2026" : "2026年02月14日 11:04 更新"}
                    </div>
                </div>
            </section>
        </aside>
    );
};

export default HomeSidebar;
