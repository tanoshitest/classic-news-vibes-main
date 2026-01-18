import { latestNews, editorsPick } from "@/data/mockData";
import { Separator } from "@/components/ui/separator";

const CategorySidebar = () => {
  return (
    <div className="space-y-8">
      {/* Latest News */}
      <div>
        <h3 className="font-serif text-lg font-bold text-foreground uppercase tracking-wide mb-1">
          Tin mới nhất
        </h3>
        <div className="h-0.5 w-12 bg-foreground mb-4" />
        
        <div className="space-y-4">
          {latestNews.slice(0, 5).map((article, index) => (
            <article key={article.id} className="group cursor-pointer">
              <div className="flex gap-3">
                {article.image && (
                  <div className="w-20 h-14 shrink-0 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:underline">
                    {article.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{article.date}</p>
                </div>
              </div>
              {index < latestNews.slice(0, 5).length - 1 && (
                <Separator className="mt-4" />
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Editor's Pick */}
      <div>
        <h3 className="font-serif text-lg font-bold text-foreground uppercase tracking-wide mb-1">
          Lựa chọn biên tập
        </h3>
        <div className="h-0.5 w-12 bg-foreground mb-4" />
        
        <div className="space-y-4">
          {editorsPick.map((article) => (
            <article key={article.id} className="group cursor-pointer">
              {article.image && (
                <div className="aspect-[16/10] overflow-hidden mb-3">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {article.category}
              </span>
              <h4 className="mt-1 font-serif text-base font-bold text-foreground group-hover:underline">
                {article.title}
              </h4>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {article.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
