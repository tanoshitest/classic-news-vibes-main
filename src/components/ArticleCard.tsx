import { Link } from "react-router-dom";
import { Article } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface ArticleCardProps {
  article: Article;
  variant?: "horizontal" | "vertical" | "compact";
  showImage?: boolean; // New prop
}

const ArticleCard = ({ article, variant = "vertical", showImage = true }: ArticleCardProps) => {
  const { t, language } = useLanguage();

  const getLocalizedCategory = (category: string) => {
    if (language === 'VN') return category;

    const map: Record<string, string> = {
      "Mới nhất": "category_Latest",
      "Đọc nhiều": "category_MostRead",
      "Kinh doanh": "category_Business",
      "Chính trị": "category_Politics",
      "Xã hội": "category_Society",
      "Thể thao": "category_Sports",
      "Văn hóa": "category_Culture",
      "Du lịch": "category_Travel",
      "Sức khỏe": "category_Health",
      "Giáo dục": "category_Education",
      "Đời sống": "category_Life",
      "Du lịch - Văn hóa": "category_TravelCulture",
      "Longform": "category_Longform"
    };

    const key = map[category];
    return key ? t(key) : category;
  };

  const displayCategory = getLocalizedCategory(article.category);

  if (variant === "horizontal") {
    return (
      <Link to={`/article/${article.id}`}>
        <article className="group cursor-pointer flex gap-4">
          {showImage && article.image && (
            <div className="w-24 h-20 shrink-0 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <span className="text-xs font-semibold text-black uppercase tracking-wider">
              {displayCategory}
            </span>
            <h3 className="newspaper-subheading text-sm mt-1 line-clamp-2 group-hover:text-muted-foreground transition-colors">
              {article.title}
            </h3>
            <p className="newspaper-meta mt-1 text-xs text-black">{article.date}</p>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link to={`/article/${article.id}`}>
        <article className="group cursor-pointer py-2">
          <h4 className="text-sm font-medium text-black group-hover:text-muted-foreground transition-colors line-clamp-2">
            {article.title}
          </h4>
        </article>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.id}`}>
      <article className="group cursor-pointer">
        {showImage && article.image && (
          <div className="aspect-[16/10] overflow-hidden mb-3">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <span className="text-xs font-semibold text-black uppercase tracking-wider">
          {displayCategory}
        </span>
        <h3 className={cn(
          "newspaper-subheading mt-2 group-hover:text-muted-foreground transition-colors",
          showImage ? "text-lg" : "text-base"
        )}>
          {article.title}
        </h3>
        <p className="newspaper-meta mt-2 text-sm text-black line-clamp-2">{article.summary}</p>
      </article>
    </Link>
  );
};

export default ArticleCard;
