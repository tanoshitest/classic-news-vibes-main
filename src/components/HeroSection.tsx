import { Link } from "react-router-dom";
import { heroArticle, subHeroArticles, latestNews, recommendedArticles, editorsPick } from "@/data/mockData";
import { heroArticleJP, subHeroArticlesJP, latestNewsJP, recommendedArticlesJP, editorsPickJP } from "@/data/mockDataJP";
import { Separator } from "@/components/ui/separator";
import ArticleCard from "./ArticleCard";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { language, t } = useLanguage();

  const currentHeroArticle = language === 'VN' ? heroArticle : heroArticleJP;
  const currentSubHeroArticles = language === 'VN' ? subHeroArticles : subHeroArticlesJP;
  const currentLatestNews = language === 'VN' ? latestNews : latestNewsJP;
  const currentRecommendedArticles = language === 'VN' ? recommendedArticles : recommendedArticlesJP;
  const currentEditorsPick = language === 'VN' ? editorsPick : editorsPickJP;

  return (
    <section className="pt-4 pb-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Main Feature (50%) */}
          <div className="lg:col-span-6 space-y-3">
            <Link to={`/article/${currentHeroArticle.id}`} className="group block">
              <div className="aspect-[16/9] overflow-hidden mb-3 rounded-lg">
                <img
                  src={currentHeroArticle.image}
                  alt={currentHeroArticle.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2">
                <h2 className="newspaper-heading text-2xl sm:text-3xl font-bold group-hover:text-[#4d0078] transition-colors leading-tight">
                  {currentHeroArticle.title}
                </h2>
                <p className="newspaper-body text-black text-base leading-snug line-clamp-3">
                  {currentHeroArticle.summary}
                </p>
              </div>
            </Link>
          </div>

          {/* Right Column - Side List (50%) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Combine sub hero and latest for the sidebar list, or just use latest */}
            {[...currentSubHeroArticles, ...currentLatestNews].slice(0, 4).map((article, index) => (
              <div key={article.id}>
                <Link to={`/article/${article.id}`} className="group grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-8 space-y-1">
                    <h3 className="font-bold text-base leading-normal group-hover:text-[#4d0078] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                  <div className="col-span-4">
                    <div className="aspect-[3/2] overflow-hidden rounded bg-gray-200">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-[10px]">No Image</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
                {index < 3 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
