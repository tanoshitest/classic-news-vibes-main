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

const ITEMS_PER_PAGE = 5;

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentPage, setCurrentPage] = useState(1);

  const categoryName = getCategoryDisplayName(slug || "");
  const articles = getArticlesByCategory(categoryName);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!categoryName || !categories.includes(categoryName)) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
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

      <main className="container mx-auto px-4 py-6">
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
              <BreadcrumbPage className="font-medium">{categoryName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground uppercase tracking-wide">
            {categoryName}
          </h1>
          <div className="mt-3 h-1 w-24 bg-foreground" />
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-dotted divide-border">
              {paginatedArticles.map((article) => (
                <CategoryArticleItem key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <CategoryPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <CategorySidebar />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
