import { Link } from "react-router-dom";
import { Article } from "@/data/mockData";
import { Separator } from "@/components/ui/separator";

interface ArticleSidebarProps {
  mostViewed: Article[];
}

const ArticleSidebar = ({ mostViewed }: ArticleSidebarProps) => {
  return (
    <aside className="space-y-8">
      {/* Most Viewed Widget (Xem nhiều) */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-4 h-[2px] bg-gray-200"></span>
          <h3 className="text-base font-bold text-maroon-700 whitespace-nowrap uppercase" style={{ color: '#8b0000' }}>
            ĐỌC NHIỀU
          </h3>
          <span className="flex-1 h-[2px] bg-gray-200"></span>
        </div>

        <div className="space-y-0 divide-y divide-gray-100">
          {mostViewed.slice(0, 8).map((article, index) => (
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


    </aside>
  );
};

export default ArticleSidebar;
