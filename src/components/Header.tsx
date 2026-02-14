import { Search, Globe, User, Menu, X, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { categories, getCategorySlug, getHotTopics } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const categoryKeyMap: Record<string, string> = {
  "Mới nhất": "category_Latest",
  "Đọc nhiều": "category_MostRead",
  "Kinh doanh": "category_Business",
  "Xã hội": "category_Society",
  "Đời sống": "category_Life",
  "Du lịch": "category_Travel",
  "Văn hóa": "category_Culture",
  "Giáo dục": "category_Education",
  "Sức khỏe": "category_Health",
  "Longform": "category_Longform"
};

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const formatDate = () => {
    const date = new Date();
    if (language === 'JP') {
      return date.toLocaleDateString('ja-JP', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    return "Thứ Hai, 9 tháng 2, 2026";
  };

  return (
    <header className="flex flex-col w-full">
      {/* 1. Top Row (Utility & Branding) */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between relative">

          {/* Left: Spacer to keep branding centered */}
          <div className="hidden md:flex flex-1 justify-start">
          </div>

          {/* Center: Brand Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-serif text-3xl font-bold rounded-sm">
                B
              </div>
              <div className="flex flex-col items-center">
                <h1 className="font-serif text-2xl font-bold tracking-tight text-black group-hover:text-[#eb6100] transition-colors">
                  Betonabi
                </h1>
                <p className="text-[10px] text-gray-400 leading-none hidden sm:block whitespace-nowrap">
                  {formatDate()}
                </p>
              </div>
            </Link>
          </div>

          {/* Right: Actions (Language, Search & User) */}
          <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
            {/* Language Switcher (Now on the right) */}
            <div className="hidden md:flex items-center border-r border-gray-200 pr-4 mr-2">
              <button
                onClick={() => setLanguage(language === "VN" ? "JP" : "VN")}
                className="flex items-center gap-1 hover:text-[#4d0078] transition-colors text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                <span>{language === "VN" ? "Japanese" : "Vietnamese"}</span>
              </button>
            </div>

            {/* Search Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-60 z-10 flex items-center">
                  <Input
                    autoFocus
                    placeholder={t('search') || "Tìm kiếm"}
                    className="h-8 text-sm pr-8"
                    onBlur={() => setIsSearchOpen(false)}
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-2 cursor-pointer" onClick={() => setIsSearchOpen(false)} />
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-[#4d0078] transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* User/Login */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}>
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="p-2 text-gray-600 hover:text-[#4d0078] transition-colors flex items-center gap-2"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">{t('signIn')}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => login('admin')}>
                    {t('login_as_admin')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => login('user')}>
                    {t('login_as_guest')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Middle Row (Main Navigation) */}
      <div className={`bg-[#4d0078] ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        <div className="container mx-auto px-4">
          <nav className="flex flex-col md:flex-row items-center justify-center md:h-14 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${getCategorySlug(category)}`}
                className="text-white hover:bg-[#6a1b9a] px-6 py-3 md:py-0 h-full flex items-center text-base font-medium whitespace-nowrap transition-colors w-full md:w-auto text-center border-b md:border-b-0 border-[#6a1b9a] md:border-none"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(categoryKeyMap[category] || category)}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* 3. Bottom Row (Information Bar - Simplified) */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* Trending/Featured Words - Centered or Left aligned? Giving it full width since market data is gone */}
          <div className="w-full py-2 flex items-center justify-center md:justify-start gap-3 overflow-hidden">
            <div className="flex items-center gap-1 text-[#4d0078] shrink-0 font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>{t('hot_topics') || "Chủ đề nóng"}:</span>
            </div>
            <div className="flex items-center gap-2 py-1 overflow-x-auto scrollbar-hide">
              {getHotTopics(language).map((topic) => (
                <span key={topic} className="shrink-0 px-3 py-1 text-xs font-semibold border border-[#7c3aed] text-[#7c3aed] bg-white rounded-none whitespace-nowrap hover:bg-[#7c3aed] hover:text-white transition-colors cursor-pointer">
                  #{topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
