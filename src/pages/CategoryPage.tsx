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
import { useLanguage } from "@/contexts/LanguageContext";

const ITEMS_PER_PAGE = 10; // Adjusted for longer feed

const CategoryPage = () => {
  const { t, language } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const categoryNameVN = getCategoryDisplayName(slug || "");

  // Helper to get localized category name
  const getLocalizedCategoryName = (vnName: string) => {
    if (language === 'VN') return vnName;
    const map: Record<string, string> = {
      "Mới nhất": "category_Latest",
      "Đọc nhiều": "category_MostRead",
      "Kinh doanh": "category_Business",
      "Chính trị": "category_Politics",
      "Xã hội": "category_Society",
      "Thể thao": "category_Sports",
      "Văn hóa": "category_Culture",
      "Du lịch": "category_Travel",
      "Sức khỏe": "category_Health",
      "Giáo dục": "category_Education",
      "Đời sống": "category_Life",
      "Du lịch - Văn hóa": "category_TravelCulture",
      "Longform": "category_Longform"
    };
    const key = map[vnName];
    return key ? t(key) : vnName;
  };

  const categoryName = getLocalizedCategoryName(categoryNameVN);
  const allArticles = getArticlesByCategory(categoryNameVN); // Keep using VN name for data fetching if data uses VN keys

  // Slicing data for the layout
  const spotlightArticle = allArticles[0];
  const subFeaturedArticles = allArticles.slice(1, 5); // 4 items
  const feedArticles = allArticles.slice(5); // The rest for the feed

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const paginatedFeed = feedArticles.slice(0, visibleCount);
  const hasMore = visibleCount < feedArticles.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  // Get other categories for the bottom section
  const otherCategories = [
    ...categories.filter(c => c !== "Mới nhất" && c !== "Đọc nhiều" && c !== categoryNameVN && c !== "Longform").slice(0, 4),
    "Longform"
  ];

  if (!categoryNameVN || !categories.includes(categoryNameVN)) {
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

      <main className="container mx-auto px-4 py-6 max-w-[1140px]">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  {t("home")}
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
        <div className="mb-10 border-b border-gray-100 pb-4 flex items-center gap-4">
          <span
            className="inline-block w-2.5 h-10 rounded-sm"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #4d0078 100%)",
              transform: "skewX(-15deg)",
            }}
          />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            {categoryName}
          </h1>
        </div>

        {/* --- SECTION 1: HERO (Top) --- */}
        {spotlightArticle && (
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* 1. Spotlight Article (Left - 7/12) */}
              <div className="lg:col-span-7 group cursor-pointer">
                <Link to={`/article/${spotlightArticle.id}`}>
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-sm mb-4">
                    <img
                      src={spotlightArticle.image}
                      alt={spotlightArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80";
                        target.onerror = null;
                      }}
                    />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {spotlightArticle.title}
                  </h2>
                </Link>
              </div>

              {/* 2. Sub-featured Grid (Right - 5/12) */}
              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  {subFeaturedArticles.map((article) => (
                    <Link key={article.id} to={`/article/${article.id}`} className="group cursor-pointer flex flex-col gap-2">
                      <div className="aspect-[4/3] w-full overflow-hidden rounded-sm">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80";
                            target.onerror = null;
                          }}
                        />
                      </div>
                      <h3 className="font-serif text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-3">
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
            <div className="flex flex-col gap-5">
              {paginatedFeed.length > 0 ? (
                paginatedFeed.map((article) => (
                  <Link key={article.id} to={`/article/${article.id}`} className="group flex flex-col sm:flex-row gap-6 border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                    {/* Image Left */}
                    <div className="sm:w-1/3 shrink-0">
                      <div className="aspect-[3/2] overflow-hidden rounded-sm">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80";
                            target.onerror = null;
                          }}
                        />
                      </div>
                    </div>
                    {/* Content Right */}
                    <div className="sm:w-2/3 flex flex-col justify-start">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                        {getLocalizedCategoryName(article.category)}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {article.summary}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground italic">Không có thêm bài viết nào.</p>
              )}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-[#7c3aed] text-white font-bold rounded-sm hover:bg-[#4d0078] transition-colors"
                >
                  {t("viewMore")}
                </button>
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

        {/* --- SECTION 3: OTHER CATEGORIES --- */}
        {categoryNameVN !== "Mới nhất" && categoryNameVN !== "Đọc nhiều" && (
          <section className="mt-12 pt-10 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-block w-2.5 h-8 rounded-sm"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #4d0078 100%)",
                  transform: "skewX(-15deg)",
                }}
              />
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">
                {language === 'VN' ? "CÁC CHUYÊN MỤC KHÁC" : "その他のジャンル"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {otherCategories.map((cat) => {
                const catArticles = getArticlesByCategory(cat);
                const latest = catArticles[0];
                const others = catArticles.slice(1, 4);
                const localizedCatName = getLocalizedCategoryName(cat);

                return (
                  <div key={cat} className="space-y-4">
                    <Link to={`/category/${getArticlesByCategory(cat)[0]?.id ? cat.toLowerCase().replace(/ /g, '-') : '#'}`} className="block group">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 hover:text-primary transition-colors">{localizedCatName}</h3>
                      {latest && (
                        <div className="space-y-3">
                          <div className="aspect-[3/2] overflow-hidden rounded-sm">
                            <img
                              src={latest.image}
                              alt={latest.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80"; // Reliable Culture/Museum fallback
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
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
