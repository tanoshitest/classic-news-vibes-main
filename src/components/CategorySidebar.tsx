import { Link } from "react-router-dom";
import { mostViewedArticles, editorsPick } from "@/data/mockData";

const CategorySidebar = () => {
  return (
    <div className="space-y-12">
      {/* Most Viewed Widget (Tin Đọc Nhiều) */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <span className="w-4 h-[2px] bg-gray-200"></span>
          <h3 className="text-base font-bold text-maroon-700 whitespace-nowrap" style={{ color: '#8b0078' }}>
            TIN ĐỌC NHIỀU
          </h3>
          <span className="flex-1 h-[2px] bg-gray-200"></span>
        </div>

        <div className="space-y-0 divide-y divide-gray-100">
          {mostViewedArticles.slice(0, 8).map((article, index) => (
            <Link
              to={`/article/${article.id}`}
              key={article.id}
              className="group relative flex items-center justify-between py-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="pr-12">
                <h4 className="text-sm font-medium text-gray-800 leading-snug group-hover:text-primary transition-colors line-clamp-2">
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
    </div>
  );
};

export default CategorySidebar;
