import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleContent from "@/components/ArticleContent";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleTags from "@/components/ArticleTags";
import ArticleNavigation from "@/components/ArticleNavigation";
import CommentSection from "@/components/CommentSection";
import ShareButtons from "@/components/ShareButtons";
import { Separator } from "@/components/ui/separator";
import {
  getArticleById,
  mostViewedArticles,
  previousArticle,
  nextArticle,
  sameCategoryArticles,
  youMayAlsoLikeArticles,
  closeRelatedArticles
} from "@/data/articleContent";
import { getCategorySlug } from "@/data/mockData";

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

      <main className="py-8">
        <div className="container mx-auto px-4" style={{ maxWidth: "1160px" }}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              to={`/category/${categorySlug}`}
              className="hover:text-foreground transition-colors"
            >
              {article.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground line-clamp-1">Chi tiết bài viết</span>
          </nav>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content - Left Column (8 cols) */}
            <article className="lg:col-span-8">
              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
                {article.title}
              </h1>

              {/* Meta Data */}
              <p className="text-sm text-muted-foreground mb-6">
                {formatDate(article.date)}
                {article.location && ` • ${article.location}`}
              </p>

              {/* Sapo / Lead Paragraph */}
              <p className="font-serif text-lg sm:text-xl font-bold text-foreground leading-relaxed mb-4">
                {article.summary}
              </p>

              <ShareButtons url={window.location.href} title={article.title} />

              {/* Featured Image */}
              <figure className="mb-8">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto"
                />
              </figure>

              {/* Article Body */}
              <ArticleContent content={article.content} />

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

              <Separator className="my-8" />

              {/* Tags */}
              <ArticleTags tags={article.tags} />

              <Separator className="my-8" />

              {/* Navigation */}
              <ArticleNavigation
                previousArticle={previousArticle}
                nextArticle={nextArticle}
              />

              {/* 1. Contextual Related Articles (Bài liên quan) - Immediately after content */}
              <div className="mt-12 bg-gray-50 p-6 rounded-sm">
                <h3 className="newspaper-section-title mb-4">Bài liên quan</h3>
                <ul className="space-y-3">
                  {closeRelatedArticles.map((item) => (
                    <li key={item.id} className="group">
                      <Link to={`/article/${item.id}`} className="flex gap-2 items-start">
                        <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 block"></span>
                        <span className="text-base font-medium text-gray-800 group-hover:text-primary transition-colors leading-snug">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Comments (Ý kiến) */}
              <div className="mt-12">
                <CommentSection articleId={id || "default"} />
              </div>

              <Separator className="my-12" />

              {/* 3. Same Category (Bài cùng chuyên mục) - List 6 items */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
                  <h3 className="newspaper-section-title mb-0 uppercase text-[#9f224e]">{article.category}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {sameCategoryArticles.map((item) => (
                    <Link key={item.id} to={`/article/${item.id}`} className="group flex gap-4">
                      <div className="w-1/3 aspect-[4/3] shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="w-2/3">
                        <h4 className="font-serif text-base font-bold text-gray-900 leading-snug group-hover:text-[#9f224e] transition-colors line-clamp-3">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-xs text-gray-400">{item.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Separator className="my-12" />

              {/* 4. You May Also Like (Bạn có thể quan tâm) - 8 items Grid */}
              <div className="mt-8">
                <h3 className="newspaper-section-title mb-6">Bạn có thể quan tâm</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {youMayAlsoLikeArticles.map((item) => (
                    <Link key={item.id} to={`/article/${item.id}`} className="group block">
                      <div className="aspect-video overflow-hidden mb-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h4 className="font-serif text-sm font-bold text-gray-900 leading-snug group-hover:text-[#9f224e] transition-colors line-clamp-3">
                        {item.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>

            </article>

            {/* Sidebar - Right Column (4 cols) */}
            <aside className="lg:col-span-4 pl-0 lg:pl-8">
              <div className="lg:sticky lg:top-24">
                <ArticleSidebar
                  mostViewed={mostViewedArticles}
                />
                {/* Ad Placeholder or additional widgets can go here */}
                <div className="mt-8 w-full bg-gray-100 h-[300px] flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-300">
                  Quảng cáo
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
