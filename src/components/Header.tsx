import { Search, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  const formatDate = () => {
    const date = new Date();
    if (language === 'JP') {
      return date.toLocaleDateString('ja-JP', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    return "Thứ Bảy, 18 Tháng 1, 2025"; // Keeping the hardcoded one for VN as it matches the mockup/original code perfectly, or we could use dynamic:
    // return date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Left - Search */}
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">{t('search')}</span>
          </button>

          {/* Center - Logo */}
          <div className="flex-1 text-center">
            <Link to="/">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {t('home_title')}
              </h1>
            </Link>
            <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
              {formatDate()}
            </p>
          </div>

          {/* Right - Language & Sign In */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === "VN" ? "JP" : "VN")}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{language}</span>
            </button>
            <Link to="/admin/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
              >
                <User className="w-4 h-4" />
                {t('signIn')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
