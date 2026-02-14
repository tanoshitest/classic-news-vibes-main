import { Separator } from "@/components/ui/separator";
import { categories, latestNews, getCategorySlug } from "@/data/mockData";
import { Facebook, Linkedin, Instagram, Youtube, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

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

// Custom X (Twitter) Icon
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200 py-10">
      <div className="container mx-auto px-4 max-w-[1240px]">
        {/* Row 1: Logo, Images, Categories */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-8 pb-8 border-b border-gray-100">
          <div className="w-full flex flex-col md:flex-row items-start gap-8 lg:gap-12">
            {/* Logo and Images Grouped to stay together on tablet */}
            <div className="flex flex-col sm:flex-row items-start gap-8 shrink-0">
              {/* Logo */}
              <Link to="/" className="flex items-start gap-2 group shrink-0 pt-1">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-serif text-xl font-bold rounded-sm">
                  B
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-black">
                  Betonabi
                </span>
              </Link>

              {/* 4 Images - Height matches the 3-link column (approx 76px) */}
              <div className="flex gap-2">
                {latestNews.slice(0, 4).map((news) => (
                  <div key={news.id} className="h-[76px] w-[57px] shrink-0 rounded overflow-hidden border border-gray-100">
                    <img src={news.image} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* 3x3 Grid for Categories and Social Media */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6 lg:gap-x-24 w-full md:w-auto">
              {/* Column 1: Culture, Life, Business */}
              <div className="flex flex-col gap-2">
                <Link to="/category/van-hoa" className="text-sm font-bold text-black hover:text-[#7c3aed] uppercase transition-colors whitespace-nowrap">
                  {t("category_Culture")}
                </Link>
                <Link to="/category/doi-song" className="text-sm font-bold text-black hover:text-[#7c3aed] uppercase transition-colors whitespace-nowrap">
                  {t("category_Life")}
                </Link>
                <Link to="/category/kinh-doanh" className="text-sm font-bold text-black hover:text-[#7c3aed] uppercase transition-colors whitespace-nowrap">
                  {t("category_Business")}
                </Link>
              </div>

              {/* Column 2: Travel, Health, Longform */}
              <div className="flex flex-col gap-2">
                <Link to="/category/du-lich" className="text-sm font-bold text-black hover:text-[#7c3aed] uppercase transition-colors whitespace-nowrap">
                  {t("category_Travel")}
                </Link>
                <Link to="/category/suc-khoe" className="text-sm font-bold text-black hover:text-[#7c3aed] uppercase transition-colors whitespace-nowrap">
                  {t("category_Health")}
                </Link>
                <Link to="/category/longform-e-magazine" className="text-sm font-bold text-black hover:text-[#7c3aed] uppercase transition-colors whitespace-nowrap">
                  Longform
                </Link>
              </div>

              {/* Column 3: About, Follow Us, Icons */}
              <div className="flex flex-col gap-2">
                <Link to="/about" className="text-sm font-bold text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                  Về Betonabi
                </Link>
                <Link to="/contact" className="text-sm font-bold text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                  Theo dõi chúng tôi
                </Link>
                <div className="flex gap-2 items-center pt-1">
                  <a href="#" className="text-black hover:text-[#7c3aed] transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-black hover:text-[#7c3aed] transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-black hover:text-[#7c3aed] transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-black hover:text-[#7c3aed] transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Management Info & Newsletter */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          {/* Info Block */}
          <div className="space-y-2 text-sm text-black max-w-xl">
            <p>
              <span className="font-bold">Chịu trách nhiệm quản lý nội dung:</span> Nguyễn Thị Minh Chi
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <p><span className="font-bold">Tel:</span> (84) 348288561 - (81) 8072398857</p>
              <p><span className="font-bold">Email:</span> contact@betonabi.com</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold">Newsletter</p>
            </div>
            <div className="flex gap-2 w-full sm:w-80">
              <Input
                placeholder="Email của bạn"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus-visible:ring-[#7c3aed] h-9 text-sm"
              />
              <Button className="bg-[#4d0078] hover:bg-[#7c3aed] text-white shrink-0 h-9 px-4 text-sm font-bold">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-50 text-center">
          <p className="text-sm font-bold text-black opacity-90">
            © Toàn bộ bản quyền thuộc Betonabi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
