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
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Main Hero */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Hero Article */}
            <Link to={`/article/${currentHeroArticle.id}`}>
              <article className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden mb-4">
                  <img
                    src={currentHeroArticle.image}
                    alt={currentHeroArticle.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {t(`category_${currentHeroArticle.category.replace(/\s+/g, '')}`) || currentHeroArticle.category}
                </span>
                <h2 className="newspaper-heading text-2xl sm:text-3xl mt-2 mb-3 group-hover:text-muted-foreground transition-colors">
                  {currentHeroArticle.title}
                </h2>
                <p className="newspaper-body text-muted-foreground line-clamp-3">
                  {currentHeroArticle.summary}
                </p>
                <div className="newspaper-meta mt-3">
                  {currentHeroArticle.author} • {currentHeroArticle.date} • {currentHeroArticle.readTime}
                </div>
              </article>
            </Link>

            <Separator />

            {/* Sub Hero Articles */}
            <div className="space-y-4">
              {currentSubHeroArticles.map((article) => (
                <Link to={`/article/${article.id}`} key={article.id}>
                  <article className="group cursor-pointer">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {t(`category_${article.category.replace(/\s+/g, '')}`) || article.category}
                    </span>
                    <h3 className="newspaper-subheading text-lg mt-1 group-hover:text-muted-foreground transition-colors">
                      {article.title}
                    </h3>
                    <p className="newspaper-meta mt-1">{article.summary}</p>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* Center Column - Latest News */}
          <div className="lg:col-span-4 lg:border-x lg:border-border lg:px-6">
            <h2 className="newspaper-section-title">{t('latestNews')}</h2>
            <div className="space-y-4">
              {currentLatestNews.map((article, index) => (
                <div key={article.id}>
                  <ArticleCard article={article} variant="horizontal" />
                  {index < currentLatestNews.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Recommended & Editor's Pick */}
          <div className="lg:col-span-3 space-y-8">
            {/* Recommended */}
            <div>
              <h2 className="newspaper-section-title">{t('recommended')}</h2>
              <div className="space-y-4">
                {currentRecommendedArticles.map((article, index) => (
                  <Link to={`/article/${article.id}`} key={article.id}>
                    <article className="group cursor-pointer">
                      <div className="flex gap-3">
                        <span className="font-serif text-3xl font-bold text-muted-foreground/30">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="newspaper-subheading text-sm group-hover:text-muted-foreground transition-colors">
                            {article.title}
                          </h3>
                          <p className="newspaper-meta mt-1 text-xs">{t(`category_${article.category.replace(/\s+/g, '')}`) || article.category}</p>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>

            <Separator />

            {/* Editor's Pick */}
            <div>
              <h2 className="newspaper-section-title">{t('editorsPick')}</h2>
              {currentEditorsPick.map((article) => (
                <Link to={`/article/${article.id}`} key={article.id}>
                  <article className="group cursor-pointer">
                    <div className="aspect-[3/2] overflow-hidden mb-3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="newspaper-subheading text-base group-hover:text-muted-foreground transition-colors">
                      {article.title}
                    </h3>
                    <p className="newspaper-meta mt-2 text-xs">{article.summary}</p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
