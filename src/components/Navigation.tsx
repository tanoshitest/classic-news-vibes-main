import { categories, getCategorySlug } from "@/data/mockData";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryKeyMap: Record<string, string> = {
  "Mới nhất": "category_Latest",
  "Đọc nhiều": "category_MostRead",
  "Kinh doanh": "category_Business",
  "Xã hội": "category_Society",
  "Đời sống": "category_Life",
  "Du lịch - Văn hóa": "category_TravelCulture",
  "Giáo dục": "category_Education",
  "Sức khỏe": "category_Health"
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center">
          {categories.map((category, index) => (
            <Link
              key={category}
              to={`/category/${getCategorySlug(category)}`}
              className="nav-link"
            >
              {t(categoryKeyMap[category] || category)}
              {index < categories.length - 1 && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-px bg-border" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between py-3">
          <span className="text-sm font-medium text-foreground">Danh mục</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 animate-fade-in">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${getCategorySlug(category)}`}
                className="block py-2 px-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t(categoryKeyMap[category] || category)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
