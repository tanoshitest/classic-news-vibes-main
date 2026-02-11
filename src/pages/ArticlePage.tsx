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
import { getCategorySlug, categoryData } from "@/data/mockData";

import LongformArticle from "@/components/LongformArticle";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-6">
        <div className="container mx-auto px-4 max-w-[1140px]">
          {/* Breadcrumb & Date Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Trang chủ
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                to={`/category/${categorySlug}`}
                className="hover:text-foreground transition-colors font-medium text-primary"
              >
                {article.category}
              </Link>
            </nav>
            <p className="text-sm text-muted-foreground">
              {formatDate(article.date)}
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content - Left Column (8 cols) */}
            <article className="lg:col-span-8">
              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-6">
                {article.title}
              </h1>

              {/* Sapo / Lead Paragraph */}
              <p className="font-sans text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
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

              <Separator className="my-10" />

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

              <div className="mt-10 mb-12">
                <ShareButtons url={window.location.href} title={article.title} />
              </div>

              {/* Comments (Ý kiến) */}
              <div id="comments" className="mt-12 bg-gray-50/50 p-6 rounded-sm border border-gray-100">
                <CommentSection articleId={id || "default"} />
              </div>

              {/* Tags (Hashtag) */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-wider">Hashtags</h4>
                <ArticleTags tags={article.tags} />
              </div>

            </article>

            {/* Sidebar - Right Column (4 cols) */}
            <aside className="lg:col-span-4 pl-0 lg:pl-8">
              <div className="lg:sticky lg:top-24">
                <ArticleSidebar
                  mostViewed={mostViewedArticles}
                />
                {/* Same Category Small Widgets */}
                <div className="mt-12">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="inline-block w-2 h-6 rounded-sm"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed 0%, #4d0078 100%)",
                        transform: "skewX(-12deg)",
                      }}
                    />
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">{article.category}</h3>
                  </div>
                  <div className="space-y-4">
                    {sameCategoryArticles.slice(0, 4).map(item => (
                      <Link key={item.id} to={`/article/${item.id}`} className="group block pb-4 border-b border-gray-100 last:border-0">
                        <h4 className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
