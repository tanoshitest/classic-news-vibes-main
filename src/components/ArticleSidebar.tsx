import { Link } from "react-router-dom";
import { Article } from "@/data/mockData";
import { Separator } from "@/components/ui/separator";

interface ArticleSidebarProps {
  mostViewed: Article[];
  relatedCategory: Article[];
}

const ArticleSidebar = ({ mostViewed, relatedCategory }: ArticleSidebarProps) => {
  return (
    <aside className="space-y-8">
      {/* Most Viewed Section */}
      <div>
        <h3 className="newspaper-section-title">Xem nhiều</h3>
        <div className="space-y-4">
          {mostViewed.map((article, index) => (
            <Link 
              to={`/article/${article.id}`} 
              key={article.id}
              className="group cursor-pointer flex gap-3"
            >
              <span className="font-serif text-2xl font-bold text-muted-foreground/40 w-8 shrink-0">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-sm font-bold text-foreground leading-snug group-hover:text-muted-foreground transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {article.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Separator />

      {/* Related Category Section */}
      <div>
        <h3 className="newspaper-section-title">Tin cùng chuyên mục</h3>
        <div className="space-y-4">
          {relatedCategory.map((article) => (
            <Link 
              to={`/article/${article.id}`} 
              key={article.id}
              className="group cursor-pointer block"
            >
              <h4 className="font-serif text-sm font-medium text-foreground leading-snug group-hover:text-muted-foreground transition-colors line-clamp-2">
                {article.title}
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                {article.date}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ArticleSidebar;
