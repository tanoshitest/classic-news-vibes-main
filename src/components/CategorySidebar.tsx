import { Link } from "react-router-dom";
import { mostViewedArticles, editorsPick } from "@/data/mockData";

const CategorySidebar = () => {
  return (
    <div className="space-y-8">
      {/* Most Viewed Widget (Tin Đọc Nhiều) */}
      <div>
        <h3 className="newspaper-section-title">Tin Đọc Nhiều</h3>
        <div className="flex flex-col gap-6">
          {mostViewedArticles.map((article, index) => (
            <Link
              to={`/article/${article.id}`}
              key={article.id}
              className="group cursor-pointer flex items-baseline gap-4"
            >
              <span className="font-sans text-5xl font-bold text-gray-200 group-hover:text-primary transition-colors shrink-0 -mt-2 w-12 text-right">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0 pt-1 border-b border-gray-100 pb-4 group-last:border-0">
                <h4 className="font-serif text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-3">
                  {article.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Editor's Pick */}
      <div>
        <h3 className="newspaper-section-title">Lựa chọn biên tập</h3>
        <div className="space-y-4">
          {editorsPick.map((article) => (
            <Link to={`/article/${article.id}`} key={article.id} className="group cursor-pointer block">
              {article.image && (
                <div className="aspect-[16/10] overflow-hidden mb-3 rounded-sm">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {article.category}
              </span>
              <h4 className="mt-1 font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                {article.title}
              </h4>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {article.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
