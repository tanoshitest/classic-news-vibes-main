import { Link } from "react-router-dom";
import { longformArticle, latestNews } from "@/data/mockData";
import { longformArticleJP, latestNewsJP } from "@/data/mockDataJP";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play, Mic, FileText, Camera, HelpCircle } from "lucide-react";

const LongformSection = () => {
  const { language } = useLanguage();
  const featuredArticle = language === 'VN' ? longformArticle : longformArticleJP;
  const sideArticles = language === 'VN' ? latestNews.slice(0, 2) : latestNewsJP.slice(0, 2);



  return (
    <section className="py-12 my-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 border-b-2 border-black/10 pb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-black text-black tracking-tighter uppercase">Longform</h2>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Article (Left) */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <Link to={`/article/${featuredArticle.id}`} className="group block flex-grow flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/20 backdrop-blur-sm text-white p-2 rounded-sm">
                    <Camera className="w-5 h-5" />
                  </span>
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-black mb-3 leading-tight group-hover:text-black/80 transition-colors">
                {featuredArticle.title}
              </h3>
              <p className="text-black/80 text-base leading-relaxed line-clamp-6">
                {featuredArticle.summary}
              </p>
            </Link>
          </div>

          {/* Side Articles Grid (Right) */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="flex flex-col gap-8 h-full justify-between">
              {sideArticles.map((article) => (
                <Link key={article.id} to={`/article/${article.id}`} className="group block flex flex-col flex-1">
                  <div className="relative aspect-video overflow-hidden mb-3 w-full h-full">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-black/40 text-white p-1 rounded-sm">
                        <FileText className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold text-lg text-black leading-snug group-hover:text-black/70 transition-colors line-clamp-2 mt-auto">
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

