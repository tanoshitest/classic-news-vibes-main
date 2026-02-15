import { Link } from "react-router-dom";
import { Article } from "@/data/mockData";
import { useLanguage } from "@/contexts/LanguageContext";

interface RelatedNewsProps {
  articles: Article[];
}

const RelatedNews = ({ articles }: RelatedNewsProps) => {
  const { t, language } = useLanguage();

  const getLocalizedCategoryName = (category: string) => {
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

  return (
    <section className="py-8">
      <h2 className="newspaper-section-title mb-6">Tin liên quan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <Link
            to={`/article/${article.id}`}
            key={article.id}
            className="group cursor-pointer"
          >
            <div className="aspect-[16/10] overflow-hidden mb-3">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {getLocalizedCategoryName(article.category)}
            </span>
            <h3 className="font-serif text-base font-bold text-foreground mt-1 line-clamp-2 group-hover:text-muted-foreground transition-colors">
              {article.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedNews;
