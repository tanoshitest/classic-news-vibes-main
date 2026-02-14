import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleContent from "@/components/ArticleContent";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleTags from "@/components/ArticleTags";
import CommentSection from "@/components/CommentSection";
import ShareButtons from "@/components/ShareButtons";
import { Separator } from "@/components/ui/separator";
import {
  getArticleById,
  mostViewedArticles,
  sameCategoryArticles,
  youMayAlsoLikeArticles
} from "@/data/articleContent";
import { getCategorySlug, categoryData, categories, getArticlesByCategory } from "@/data/mockData";

import LongformArticle from "@/components/LongformArticle";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [visibleSameCategoryCount, setVisibleSameCategoryCount] = useState(3);
  const article = getArticleById(id || "");

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl font-bold">Không tìm thấy bài viết</h1>
          <p className="mt-4 text-muted-foreground">
            Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-6 py-2 bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  console.log("ArticlePage Rendered", { id, article });

  // Check if this is a Longform article
  if (article) {
    console.log("Checking Longform condition:", {
      category: article.category,
      id: article.id,
      match: article.category === "Longform" || article.id === "longform-japan"
    });
  }

  if (article.category === "Longform" || article.id === "longform-japan") {
    console.log("Rendering LongformArticle component");
    return <LongformArticle article={article} content={article.content} />;
  }

  const categorySlug = getCategorySlug(article.category);

  // Format date for Vietnamese display
  const formatDate = (dateStr: string) => {
    const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const today = new Date();
    const dayName = days[today.getDay()];
    return `${dayName}, ${dateStr}, 09:00 (GMT+7)`;
  };

  // Get other categories for the bottom section
  const otherCategories = [
    ...categories.filter(c => c !== "Mới nhất" && c !== "Đọc nhiều" && c !== article.category && c !== "Longform").slice(0, 4),
    "Longform"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-6">
        <div className="container mx-auto px-4 max-w-[1140px]">
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-sm leading-relaxed">
            {/* Main Content - Left Column (8 cols) */}
            <article className="lg:col-span-8">
              {/* Breadcrumb & Date Row - NOW INSIDE COLUMN */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
                <nav className="flex items-center gap-2 text-[#0072bc]">
                  <Link
                    to={`/category/${categorySlug}`}
                    className="hover:underline transition-colors font-medium"
                  >
                    {article.category}
                  </Link>
                  <ChevronRight className="w-3 h-3 text-gray-300" />
                  <span className="text-gray-600 font-medium cursor-default">
                    {article.title.length > 30 ? article.title.substring(0, 30) + "..." : article.title}
                  </span>
                </nav>
                <p className="text-[#666] font-normal italic">
                  {formatDate(article.date)}
                </p>
              </div>
              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-6">
                {article.title}
              </h1>

              {/* Sapo / Lead Paragraph */}
              <p className="font-sans text-lg sm:text-xl text-black font-semibold leading-relaxed mb-4">
                {article.summary}
              </p>

              {/* Article Body */}
              <div className="article-body">
                <ArticleContent content={article.content} />
              </div>

              {/* Author Signature */}
              <div className="mt-8 text-right">
                <p className="font-bold text-foreground">
                  <Link
                    to={`/author/${encodeURIComponent(article.author)}`}
                    className="hover:underline hover:text-primary transition-colors"
                  >
                    {article.author}
                  </Link>
                </p>
              </div>

              {/* Related Articles / Bạn có thể quan tâm */}
              <section className="mt-12">
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="inline-block w-2.5 h-7 rounded-sm"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed 0%, #4d0078 100%)",
                      transform: "skewX(-12deg)",
                    }}
                  />
                  <h3 className="text-xl font-bold text-gray-900">Bạn có thể quan tâm</h3>
                </div>

                <div className="space-y-8">
                  {youMayAlsoLikeArticles.slice(0, 3).map((item) => (
                    <Link key={item.id} to={`/article/${item.id}`} className="group flex flex-col gap-3">
                      <h4 className="font-serif text-xl font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 line-clamp-2 text-base leading-relaxed">
                        {item.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Tags (Hashtag) */}
              <div className="mt-8 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Tags</h4>
                <ArticleTags tags={article.tags} />
              </div>

              <div className="mt-6 mb-8">
                <ShareButtons url={window.location.href} title={article.title} />
              </div>

              {/* Same Category Articles (No Title) */}
              <div className="space-y-8 mt-10">
                {sameCategoryArticles.slice(0, visibleSameCategoryCount).map((item) => (
                  <Link key={item.id} to={`/article/${item.id}`} className="group flex flex-col gap-3">
                    <h4 className="font-serif text-xl font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 line-clamp-2 text-base leading-relaxed">
                      {item.summary}
                    </p>
                  </Link>
                ))}

                {visibleSameCategoryCount < sameCategoryArticles.length && (
                  <div className="pt-4">
                    <button
                      onClick={() => setVisibleSameCategoryCount(prev => prev + 3)}
                      className="inline-flex items-center text-sm font-bold text-gray-900 hover:text-primary transition-colors"
                    >
                      Xem thêm
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Comments (Ý kiến) */}
              <div id="comments" className="mt-10 bg-gray-50/50 p-6 rounded-sm border border-gray-100">
                <CommentSection articleId={id || "default"} />
              </div>

            </article>

            {/* Sidebar - Right Column (4 cols) */}
            <aside className="lg:col-span-4 pl-0 lg:pl-8">
              <div className="lg:sticky lg:top-24">
                <ArticleSidebar
                  mostViewed={mostViewedArticles}
                />
              </div>
            </aside>
          </div>
          {/* --- SECTION 3: OTHER CATEGORIES --- */}
          <section className="mt-12 pt-10 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-block w-2.5 h-8 rounded-sm"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #4d0078 100%)",
                  transform: "skewX(-15deg)",
                }}
              />
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">CÁC CHUYÊN MỤC KHÁC</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {otherCategories.map((cat) => {
                const catArticles = getArticlesByCategory(cat);
                const latest = catArticles[0];
                const others = catArticles.slice(1, 4);

                return (
                  <div key={cat} className="space-y-4">
                    <Link to={`/category/${getCategorySlug(cat)}`} className="block group font-sans">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 hover:text-primary transition-colors">{cat}</h3>
                      {latest && (
                        <div className="space-y-3">
                          <div className="aspect-[3/2] overflow-hidden rounded-sm">
                            <img
                              src={latest.image}
                              alt={latest.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80";
                                target.onerror = null;
                              }}
                            />
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-3">
                            {latest.title}
                          </h4>
                        </div>
                      )}
                    </Link>
                    <div className="space-y-3 pt-2 border-t border-gray-100">
                      {others.map((art) => (
                        <Link key={art.id} to={`/article/${art.id}`} className="block group">
                          <h4 className="text-sm font-bold text-black hover:text-[#7c3aed] transition-colors leading-normal line-clamp-2">
                            {art.title}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
