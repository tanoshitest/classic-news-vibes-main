import { Link } from "react-router-dom";
import { Article } from "@/data/mockData";

interface RelatedNewsProps {
  articles: Article[];
}

const RelatedNews = ({ articles }: RelatedNewsProps) => {
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
              {article.category}
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
