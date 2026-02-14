import { Link } from "react-router-dom";
import { mostViewedArticles } from "@/data/mockData";
import { mostViewedArticlesJP } from "@/data/mockDataJP";
import { useLanguage } from "@/contexts/LanguageContext";
import { Cloud, Sun, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

const HomeSidebar = () => {
    const { language } = useLanguage();

    const mostReadList = language === 'VN' ? mostViewedArticles : mostViewedArticlesJP;
    const sidebarArticles = mostReadList.slice(0, 8);

    const sidebarTitle = language === 'VN' ? "ĐỌC NHIỀU" : "注目の記事";
    const weatherTitle = language === 'VN' ? "THỜI TIẾT" : "天気";
    const financialTitle = language === 'VN' ? "TỈ GIÁ" : "為替レート";

    return (
        <aside className="space-y-8 lg:pl-6 border-l border-gray-100 sticky top-6 self-start">
            {/* 1. Đọc nhiều Block */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-4 h-[2px] bg-gray-200"></span>
                    <h3 className="text-base font-bold text-maroon-700 whitespace-nowrap" style={{ color: '#8b0000' }}>
                        {sidebarTitle}
                    </h3>
                    <span className="flex-1 h-[2px] bg-gray-200"></span>
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
                    <span className="w-4 h-[2px] bg-gray-200"></span>
                    <h3 className="text-base font-bold text-maroon-700 whitespace-nowrap" style={{ color: '#8b0000' }}>
                        {weatherTitle}
                    </h3>
                    <span className="flex-1 h-[2px] bg-gray-200"></span>
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
                    <span className="w-4 h-[2px] bg-gray-200"></span>
                    <h3 className="text-base font-bold text-maroon-700 whitespace-nowrap" style={{ color: '#8b0000' }}>
                        {financialTitle}
                    </h3>
                    <span className="flex-1 h-[2px] bg-gray-200"></span>
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
                    <div className="pt-2 text-[10px] text-center text-gray-400">
                        Cập nhật: {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </section>
        </aside>
    );
};

export default HomeSidebar;
