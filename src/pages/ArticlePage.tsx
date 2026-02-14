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
  const [visibleSameCategoryCount, setVisibleSameCategoryCount] = useState(5);
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
                </nav>
                <p className="text-[#666] font-normal">
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
              <div className="mt-8 mb-6 text-right">
                <p className="font-bold text-lg text-gray-900">
                  <Link
                    to={`/author/${encodeURIComponent(article.author)}`}
                    className="hover:underline hover:text-primary transition-colors"
                  >
                    {article.author}
                  </Link>
                </p>
              </div>

              {/* Related Articles Box (Below Author) */}
              <section className="mb-8 p-6 bg-gray-50/50 rounded-sm border border-gray-100">
                <div className="space-y-6">
                  {youMayAlsoLikeArticles.slice(0, 2).map((item, idx) => (
                    <div key={item.id} className={idx > 0 ? "pt-6 border-t border-gray-100" : ""}>
                      <Link to={`/article/${item.id}`} className="group flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-1/3 shrink-0">
                          <div className="aspect-[16/9] overflow-hidden rounded-sm bg-gray-200">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80";
                                target.onerror = null;
                              }}
                            />
                          </div>
                        </div>
                        <div className="sm:w-2/3">
                          <h4 className="font-serif text-lg font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                            {item.summary}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* Share Buttons and Tags */}
              <div className="flex flex-col gap-6 mb-10">
                <div className="pt-4 border-t border-gray-100">
                  <ShareButtons url={window.location.href} title={article.title} category={article.category} />
                </div>

                <div className="pt-4 border-t border-gray-50">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Tags</h4>
                  <ArticleTags tags={article.tags} />
                </div>
              </div>

              {/* Same Category Recommendations (5 articles) */}
              <div className="mb-10 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="inline-block w-2.5 h-6 rounded-sm"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed 0%, #4d0078 100%)",
                      transform: "skewX(-15deg)",
                    }}
                  />
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight uppercase">CÙNG CHUYÊN MỤC</h3>
                </div>
                <div className="space-y-6">
                  {getArticlesByCategory(article.category).slice(0, visibleSameCategoryCount).map((item) => (
                    <Link key={item.id} to={`/article/${item.id}`} className="group block pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                      <h4 className="font-serif text-lg font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                        {item.summary}
                      </p>
                    </Link>
                  ))}
                </div>

                {visibleSameCategoryCount < getArticlesByCategory(article.category).length && (
                  <div className="mt-8 pt-4 border-t border-gray-50">
                    <button
                      onClick={() => setVisibleSameCategoryCount(prev => prev + 5)}
                      className="inline-flex items-center text-sm font-bold text-gray-900 hover:text-primary transition-colors group"
                    >
                      Xem thêm
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>


              {/* Comments (Ý kiến) */}
              <div id="comments">
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
