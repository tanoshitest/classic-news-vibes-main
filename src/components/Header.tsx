import { Search, Globe, User, CloudSun, HelpCircle, Menu, X, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
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
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <div className="shrink-0 w-auto md:w-[280px]">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-serif text-3xl font-bold rounded-sm">
                B
              </div>
              <div className="flex flex-col">
                <h1 className="font-serif text-2xl font-bold tracking-tight text-black group-hover:text-[#eb6100] transition-colors">
                  Betonabi
                </h1>
                <p className="text-[10px] text-gray-400 leading-none hidden sm:block whitespace-nowrap">
                  {formatDate()}
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Utility & Search */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-6 px-8">
            <div className="relative w-[320px] shrink-0">
              <input
                type="text"
                placeholder={t('search') || "Tìm kiếm"}
                className="w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 focus:outline-none focus:border-[#4d0078]"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4d0078]">
                <Search className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setLanguage(language === "VN" ? "JP" : "VN")}
              className="flex items-center gap-1 hover:text-black transition-colors shrink-0 w-36 justify-start"
            >
              <Globe className="w-4 h-4" />
              <span>{language === "VN" ? "Vietnamese" : "Japanese"}</span>
            </button>
          </div>

          {/* Right: Weather & Actions */}
          <div className="flex items-center gap-4">
            {/* Weather Widget */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600 border-r border-gray-200 pr-4">
              <CloudSun className="w-5 h-5 text-orange-400" />
              <div className="flex flex-col leading-none">
                <span className="font-medium">Tokyo</span>
                <span className="text-xs">18°C</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button className="hidden sm:flex bg-[#eb6100] hover:bg-[#d45600] text-white rounded-none h-8 text-sm px-4 w-28 justify-center">
                {t('header_subscribe')}
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">{user.name}</span>
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
                <>
                  <Button variant="outline" className="hidden sm:flex border-[#4d0078] text-[#4d0078] hover:bg-[#4d0078] hover:text-white rounded-none h-8 text-sm px-4 w-28 justify-center">
                    {t('header_register')}
                  </Button>
                  <button onClick={() => login('user')} className="text-sm font-medium text-gray-700 hover:text-[#eb6100] px-2 w-24 text-center">
                    {t('signIn')}
                  </button>
                </>
              )}


            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2"
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
          <nav className="flex flex-col md:flex-row items-center md:h-12 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${getCategorySlug(category)}`}
                className="text-white hover:bg-[#6a1b9a] px-5 first:pl-0 py-3 md:py-0 h-full flex items-center text-sm font-medium whitespace-nowrap transition-colors w-full md:w-auto text-center md:text-left border-b md:border-b-0 border-[#6a1b9a] md:border-none"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(categoryKeyMap[category] || category)}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* 3. Bottom Row (Information Bar) */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* Left: Trending/Featured Words */}
          <div className="flex-1 py-2 flex items-center gap-3 overflow-hidden">
            <div className="flex items-center gap-1 text-[#4d0078] shrink-0 font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>{t('hot_topics') || "Chủ đề nóng"}:</span>
            </div>
            <div className="flex items-center gap-2 py-1 overflow-hidden">
              {getHotTopics(language).map((topic) => (
                <span key={topic} className="shrink-0 px-2 py-0.5 text-xs font-medium bg-white text-gray-700 border border-[#bfa2d5] rounded-full whitespace-nowrap">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Market Data */}
          <div className="md:w-1/3 py-2 md:pl-4 flex items-center justify-between md:justify-end gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600">Nikkei</span>
              <span className="font-bold text-green-600 flex items-center">
                <ArrowDown className="w-3 h-3" /> 27,453.56
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600">Dow</span>
              <span className="font-bold text-red-600 flex items-center">
                <ArrowUp className="w-3 h-3" /> 33,869.27
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
