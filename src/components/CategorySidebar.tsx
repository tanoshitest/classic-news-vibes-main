import { Link } from "react-router-dom";
import { mostViewedArticles } from "@/data/mockData";
import { mostViewedArticlesJP } from "@/data/mockDataJP";
import { useLanguage } from "@/contexts/LanguageContext";

const CategorySidebar = () => {
  const { language } = useLanguage();

  const mostReadList = language === 'VN' ? mostViewedArticles : mostViewedArticlesJP;
  const sidebarArticles = mostReadList.slice(0, 8);
  const sidebarTitle = language === 'VN' ? "Đọc nhiều" : "注目の記事";

  return (
    <div className="space-y-12">
      {/* Most Viewed Widget (Tin Đọc Nhiều) */}
      <div>
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
              to={`/article/${article.id}`}
              key={article.id}
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
      </div>
    </div>
  );
};

export default CategorySidebar;
