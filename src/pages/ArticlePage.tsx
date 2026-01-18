import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArticleContent from "@/components/ArticleContent";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleTags from "@/components/ArticleTags";
import ArticleNavigation from "@/components/ArticleNavigation";
import RelatedNews from "@/components/RelatedNews";
import { Separator } from "@/components/ui/separator";
import { 
  getArticleById, 
  mostViewedArticles, 
  relatedCategoryArticles, 
  relatedNewsArticles,
  previousArticle,
  nextArticle
} from "@/data/articleContent";
import { getCategorySlug } from "@/data/mockData";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const article = getArticleById(id || "");

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Navigation />
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
      <Navigation />
      
      <main className="py-8">
        <div className="container mx-auto px-4" style={{ maxWidth: "1100px" }}>
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
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
            {/* Main Content - 70% */}
            <article className="lg:col-span-7">
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
              <p className="font-serif text-lg sm:text-xl font-bold text-foreground leading-relaxed mb-8">
                {article.summary}
              </p>

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
                  {article.author}
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
            </article>

            {/* Sidebar - 30% */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-24">
                <ArticleSidebar 
                  mostViewed={mostViewedArticles} 
                  relatedCategory={relatedCategoryArticles} 
                />
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Related News */}
          <RelatedNews articles={relatedNewsArticles} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
