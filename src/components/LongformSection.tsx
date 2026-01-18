import { Link } from "react-router-dom";
import { longformArticle } from "@/data/mockData";
import { longformArticleJP } from "@/data/mockDataJP";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LongformSection = () => {
  const { language, t } = useLanguage();
  const currentArticle = language === 'VN' ? longformArticle : longformArticleJP;

  return (
    <section className="longform-section py-16 my-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1 bg-accent text-accent-foreground text-sm font-semibold uppercase tracking-widest">
            E-Magazine
          </span>
        </div>

        <Link to={`/article/${currentArticle.id}`}>
          <article className="group cursor-pointer max-w-5xl mx-auto">
            <div className="relative aspect-[21/9] overflow-hidden rounded-sm mb-8">
              <img
                src={currentArticle.image}
                alt={currentArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-balance">
                  {currentArticle.title}
                </h2>
                <p className="text-white/90 text-base sm:text-lg max-w-3xl leading-relaxed hidden sm:block">
                  {currentArticle.summary}
                </p>
                <div className="flex items-center gap-2 mt-6 text-white/80 text-sm">
                  <span>{currentArticle.author}</span>
                  <span>•</span>
                  <span>{currentArticle.date}</span>
                  <span>•</span>
                  <span>{currentArticle.readTime}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-foreground font-medium hover:gap-3 transition-all">
                {t('viewMore')}
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </article>
        </Link>
      </div>
    </section>
  );
};

export default LongformSection;

