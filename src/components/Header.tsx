import { Search, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [language, setLanguage] = useState<"VN" | "JP">("VN");

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Left - Search */}
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Tìm kiếm</span>
          </button>

          {/* Center - Logo */}
          <div className="flex-1 text-center">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Mi Chi Writer
            </h1>
            <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
              Thứ Bảy, 18 Tháng 1, 2025
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
                Đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
