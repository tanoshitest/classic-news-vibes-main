import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryArticleItem from "@/components/CategoryArticleItem";
import CategorySidebar from "@/components/CategorySidebar";
import CategoryPagination from "@/components/CategoryPagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getArticlesByCategory, getCategoryDisplayName, categories } from "@/data/mockData";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const ITEMS_PER_PAGE = 10; // Adjusted for longer feed

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentPage, setCurrentPage] = useState(1);

  const categoryName = getCategoryDisplayName(slug || "");
  const allArticles = getArticlesByCategory(categoryName);

  // Slicing data for the layout
  const spotlightArticle = allArticles[0];
  const subFeaturedArticles = allArticles.slice(1, 5); // 4 items
  const relatedLinks = allArticles.slice(5, 10); // 5 items
  const feedArticles = allArticles.slice(10); // The rest

  // Pagination for the feed
  const totalPages = Math.ceil(feedArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedFeed = feedArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const feedSection = document.getElementById('category-feed');
    if (feedSection) {
      feedSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!categoryName || !categories.includes(categoryName)) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Không tìm thấy chuyên mục
          </h1>
          <p className="mt-4 text-muted-foreground">
            Chuyên mục bạn tìm kiếm không tồn tại.
          </p>
          <Link to="/" className="mt-4 inline-block text-foreground underline hover:text-muted-foreground">
            Quay về trang chủ
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6" style={{ maxWidth: "1280px" }}>
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  Trang chủ
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-primary">{categoryName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Category Title */}
        <div className="mb-8 border-b border-black pb-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground uppercase tracking-tight">
            {categoryName}
          </h1>
        </div>

        {/* --- SECTION 1: HERO (Top) --- */}
        {spotlightArticle && (
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
              {/* 1. Spotlight Article (Left - 50%) */}
              <div className="lg:col-span-5 group cursor-pointer">
                <Link to={`/article/${spotlightArticle.id}`}>
                  <div className="aspect-[3/2] w-full overflow-hidden rounded-sm mb-4">
                    <img
                      src={spotlightArticle.image}
                      alt={spotlightArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {spotlightArticle.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground line-clamp-3">
                    {spotlightArticle.summary}
                  </p>
                </Link>
              </div>

              {/* 2. Sub-featured Grid (Middle - 30%) */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-2 gap-4">
                  {subFeaturedArticles.map((article) => (
                    <Link key={article.id} to={`/article/${article.id}`} className="group cursor-pointer">
                      <div className="aspect-[4/3] w-full overflow-hidden rounded-sm mb-2">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="font-serif text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-3">
                        {article.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 3. Related Links (Right - 20%) */}
              <div className="lg:col-span-2 border-l border-gray-100 pl-4 lg:pl-6">
                <h3 className="font-bold text-red-700 uppercase text-xs tracking-widest mb-4">Tiêu điểm</h3>
                <div className="flex flex-col gap-4">
                  {relatedLinks.map((article) => (
                    <Link key={article.id} to={`/article/${article.id}`} className="group block border-b border-dotted border-gray-200 pb-2 last:border-0">
                      <h3 className="font-serif text-sm font-medium text-gray-700 group-hover:text-primary transition-colors leading-normal">
                        {article.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <Separator className="mb-12" />

        {/* --- SECTION 2: MAIN CONTENT & SIDEBAR (Bottom) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10" id="category-feed">
          {/* Left Column: Article Feed (8 cols ~ 66%) */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-8">
              {paginatedFeed.length > 0 ? (
                paginatedFeed.map((article) => (
                  <Link key={article.id} to={`/article/${article.id}`} className="group flex flex-col sm:flex-row gap-6 border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                    {/* Image Left */}
                    <div className="sm:w-1/3 shrink-0">
                      <div className="aspect-[3/2] overflow-hidden rounded-sm">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    {/* Content Right */}
                    <div className="sm:w-2/3 flex flex-col justify-start">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                        {article.category}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors mb-3">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {article.summary}
                      </p>
                      <span className="text-xs text-gray-400 mt-auto">
                        {article.date}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground italic">Không có thêm bài viết nào.</p>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <CategoryPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar (4 cols ~ 33%) */}
          <aside className="lg:col-span-4 pl-0 lg:pl-4">
            <div className="lg:sticky lg:top-24">
              <CategorySidebar />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
