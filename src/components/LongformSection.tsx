import { Link } from "react-router-dom";
import { longformArticle, latestNews } from "@/data/mockData";
import { longformArticleJP, latestNewsJP } from "@/data/mockDataJP";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play, Mic, FileText, HelpCircle, ArrowRight } from "lucide-react";

const LongformSection = () => {
  const { language, t } = useLanguage();
  const featuredArticle = language === 'VN' ? longformArticle : longformArticleJP;
  const articlesList = language === 'VN' ? latestNews : latestNewsJP;
  const sideArticles = articlesList.slice(0, 2);

  return (
    <section className="py-8 my-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="border-[6px] border-[#7c3aed]/20 rounded-3xl p-4 md:p-5 shadow-2xl shadow-[#7c3aed]/5 bg-white relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#7c3aed]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#4d0078]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3 relative z-10">
            <div className="flex items-center gap-3">
              <span
                className="inline-block w-2.5 h-10 rounded-sm"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #4d0078 100%)",
                  transform: "skewX(-15deg)",
                }}
              />
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{language === 'VN' ? "Longform" : "特集"}</h2>
            </div>
            <Link
              to="/category/longform-e-magazine"
              className="text-sm font-bold text-[#7c3aed] hover:text-[#4d0078] flex items-center gap-1.5 group transition-colors"
            >
              {t("viewMore")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
            {/* 1. Featured Article (Left - 8/12) */}
            <div className="lg:col-span-8">
              <Link to={`/article/${featuredArticle.id}`} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden mb-8 rounded-xl shadow-md">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-[1.2] group-hover:text-[#7c3aed] transition-colors">
                  {featuredArticle.title}
                </h3>
                <p className="text-black text-base md:text-base leading-relaxed line-clamp-3 font-medium opacity-90">
                  {featuredArticle.summary}
                </p>
              </Link>
            </div>

            {/* 2. Side Articles (Right - 4/12) */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {sideArticles.map((article) => (
                <Link key={article.id} to={`/article/${article.id}`} className="group block">
                  <div className="relative aspect-video overflow-hidden mb-5 rounded-lg shadow-sm">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80";
                        target.onerror = null;
                      }}
                    />
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-black/60 backdrop-blur-md text-white p-2 rounded-md block">
                        <FileText className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#7c3aed] transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LongformSection;

