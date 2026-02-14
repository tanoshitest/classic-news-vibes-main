import { Link } from "react-router-dom";
import { Article, getCategorySlug } from "@/data/mockData";
import ArticleCard from "./ArticleCard";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

interface CategoryBlockProps {
  title: string;
  articles: Article[];
}

const CategoryBlock = ({ title, articles }: CategoryBlockProps) => {
  const categorySlug = getCategorySlug(title);

  if (!articles || articles.length === 0) {
    return null;
  }

  const mainArticle = articles[0];
  const listArticles = articles.slice(1);

  return (
    <div className="category-block" id={title.toLowerCase().replace(/\s+/g, "-")}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl font-bold uppercase tracking-wide text-foreground">
          {title}
        </h2>
        <Link
          to={`/category/${categorySlug}`}
          className="flex items-center gap-1 text-sm text-black hover:text-foreground transition-colors"
        >
          Xem thêm
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <Separator className="mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Article */}
        <div>
          <ArticleCard article={mainArticle} variant="vertical" showImage={true} />
        </div>

        {/* List Articles */}
        <div className="space-y-1">
          {listArticles.map((article, index) => (
            <div key={article.id}>
              <ArticleCard article={article} variant="compact" showImage={false} />
              {index < listArticles.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBlock;
