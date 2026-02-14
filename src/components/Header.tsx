import { Search, Globe, User, Menu, X, TrendingUp, ChevronRight } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const formatDate = () => {
    const date = new Date();
    if (language === 'JP') {
      return date.toLocaleDateString('ja-JP', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    return "Thứ Hai, 9 tháng 2, 2026";
  };

  return (
    <header className="flex flex-col w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* 1. Top Row (Utility & Branding) */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between relative">

          {/* Left: Mobile Menu Trigger (Moved here for better UX) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="font-serif text-2xl font-bold flex items-center gap-2">
                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-lg rounded-sm">B</div>
                    Betonabi
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-1">
                  {categories.map((category) => (
                    <SheetClose asChild key={category}>
                      <Link
                        to={`/category/${getCategorySlug(category)}`}
                        className="py-3 px-4 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md transition-colors flex items-center justify-between group"
                      >
                        {t(categoryKeyMap[category] || category)}
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <Separator className="my-6" />

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between px-4">
                    <span className="text-sm font-medium text-gray-500">{t('language') || "Ngôn ngữ"}</span>
                    <button
                      onClick={() => setLanguage(language === "VN" ? "JP" : "VN")}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>{language === "VN" ? "Japanese" : "Vietnamese"}</span>
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Center: Brand Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-black text-white flex items-center justify-center font-serif text-xl md:text-3xl font-bold rounded-sm shadow-sm transition-transform group-hover:scale-105">
                B
              </div>
              <div className="flex flex-col items-center">
                <h1 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-black group-hover:text-[#4d0078] transition-colors">
                  Betonabi
                </h1>
                <p className="text-[10px] text-gray-400 leading-none hidden sm:block whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatDate()}
                </p>
              </div>
            </Link>
          </div>

          {/* Right: Actions (Language, Search & User) */}
          <div className="flex flex-1 items-center justify-end gap-1 md:gap-4">
            {/* Language Switcher (Desktop) */}
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
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 md:w-60 z-10 flex items-center bg-white shadow-lg rounded-md overflow-hidden border border-gray-200">
                  <Input
                    autoFocus
                    placeholder={t('search') || "Tìm kiếm"}
                    className="h-9 text-sm border-0 focus-visible:ring-0 rounded-none px-3"
                    onBlur={() => setIsSearchOpen(false)}
                  />
                  <div className="pr-2 cursor-pointer hover:bg-gray-100 p-1 rounded-full m-1" onClick={() => setIsSearchOpen(false)}>
                    <X className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-[#4d0078] transition-colors hover:bg-gray-50 rounded-full"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* User/Login */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-50">
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
                    className="p-2 text-gray-600 hover:text-[#4d0078] transition-colors flex items-center gap-2 hover:bg-gray-50 rounded-full md:rounded-md md:px-3"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium hidden md:inline">{t('signIn')}</span>
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
          </div>
        </div>
      </div>

      {/* 2. Middle Row (Main Navigation - Desktop Only) */}
      <div className="hidden md:block bg-[#4d0078]">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center h-12">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${getCategorySlug(category)}`}
                className="text-white hover:bg-[#6a1b9a] px-6 h-full flex items-center text-base font-medium whitespace-nowrap transition-colors"
              >
                {t(categoryKeyMap[category] || category)}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* 3. Bottom Row (Trending - Sticky on Mobile?) */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="w-full py-2 flex items-center gap-3 overflow-hidden">
            <div className="flex items-center gap-1 text-[#4d0078] shrink-0 font-bold text-xs md:text-sm">
              <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="whitespace-nowrap">{t('hot_topics') || "Chủ đề nóng"}:</span>
            </div>
            <div className="flex items-center gap-2 py-1 overflow-x-auto scrollbar-hide mask-fade-right">
              {getHotTopics(language).map((topic) => (
                <span key={topic} className="shrink-0 px-2.5 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-semibold border border-[#7c3aed] text-[#7c3aed] bg-white rounded-full whitespace-nowrap hover:bg-[#7c3aed] hover:text-white transition-colors cursor-pointer">
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
