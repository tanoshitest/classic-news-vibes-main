import { Link } from "react-router-dom";
import { longformArticle } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

const LongformSection = () => {
  return (
    <section className="longform-section py-16 my-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1 bg-accent text-accent-foreground text-sm font-semibold uppercase tracking-widest">
            E-Magazine
          </span>
        </div>

        <Link to={`/article/${longformArticle.id}`}>
          <article className="group cursor-pointer max-w-5xl mx-auto">
            <div className="relative aspect-[21/9] overflow-hidden rounded-sm mb-8">
              <img
                src={longformArticle.image}
                alt={longformArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
                <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-balance">
                  {longformArticle.title}
                </h2>
                <p className="text-white/90 text-base sm:text-lg max-w-3xl leading-relaxed hidden sm:block">
                  {longformArticle.summary}
                </p>
                <div className="flex items-center gap-2 mt-6 text-white/80 text-sm">
                  <span>{longformArticle.author}</span>
                  <span>•</span>
                  <span>{longformArticle.date}</span>
                  <span>•</span>
                  <span>{longformArticle.readTime}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-foreground font-medium hover:gap-3 transition-all">
                Xem thêm bài viết dài
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
