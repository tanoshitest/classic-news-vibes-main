import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticlesTable from "@/components/admin/ArticlesTable";
import CategoryPagination from "@/components/CategoryPagination";

const AdminArticles = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Quản lý bài viết
          </h1>
          <p className="text-muted-foreground mt-1">
            Danh sách tất cả bài viết trên hệ thống
          </p>
        </div>
        <Link to="/admin/editor">
          <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-none font-medium">
            <Plus className="w-4 h-4 mr-2" />
            Viết bài mới
          </Button>
        </Link>
      </div>

      {/* Articles Table */}
      <ArticlesTable />

      {/* Pagination */}
      <div className="mt-6">
        <CategoryPagination currentPage={1} totalPages={5} onPageChange={() => {}} />
      </div>
    </div>
  );
};

export default AdminArticles;
