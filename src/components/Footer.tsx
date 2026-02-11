import { Separator } from "@/components/ui/separator";
import { categories, latestNews, getCategorySlug } from "@/data/mockData";
import { Facebook, Twitter, AtSign, Send } from "lucide-react";
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
      <div className="container mx-auto px-4 max-w-[1140px]">
        {/* Block 1: Logo, Images, Newsletter */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 pb-10 border-b border-gray-100">
          {/* Logo & Latest Images */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            <Link to="/" className="flex items-start gap-2 group">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-serif text-xl font-bold rounded-sm">
                B
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-black">
                Betonabi
              </span>
            </Link>

            <div className="flex gap-3">
              {latestNews.slice(0, 4).map((news) => (
                <div key={news.id} className="w-14 aspect-[10/16] shrink-0 rounded overflow-hidden border border-gray-100">
                  <img src={news.image} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3 w-full max-w-sm">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Đừng bỏ lỡ tin tức quan trọng!</h3>
              <p className="text-gray-600 text-xs">Nhận tóm tắt tin tức hấp dẫn 24 giờ qua trên Betonabi</p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Email của bạn"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus-visible:ring-[#4d0078] h-9 text-sm"
              />
              <Button className="bg-[#4d0078] hover:bg-[#3b005c] text-white shrink-0 h-9 px-6 text-sm font-bold">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>

        {/* Block 2: Categories & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Categories - 2 columns of 3 */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-x-8 gap-y-3">
            {categories.filter(c => c !== "Mới nhất" && c !== "Đọc nhiều" && c !== "Longform").slice(0, 6).map((category) => (
              <Link
                key={category}
                to={`/category/${getCategorySlug(category)}`}
                className="text-sm font-bold text-gray-600 hover:text-[#4d0078] uppercase transition-colors"
              >
                {t(categoryKeyMap[category] || category)}
              </Link>
            ))}
            {/* Ensuring Longform is handled or added to the list */}
            <Link to="/category/longform-e-magazine" className="text-sm font-bold text-gray-600 hover:text-[#4d0078] uppercase transition-colors">
              Longform
            </Link>
          </div>

          {/* Info Block */}
          <div className="lg:col-span-8 flex flex-col md:flex-row justify-between gap-8 border-l border-gray-100 pl-8">
            <div className="space-y-3 text-sm text-gray-600 max-w-sm">
              <p>
                <span className="font-bold text-gray-900">Chịu trách nhiệm quản lý nội dung:</span> Nguyễn Thị Minh Chi
              </p>
              <p>
                <span className="font-bold text-gray-900">Tel:</span> (84) 348288561 - (81) 8072398857
              </p>
              <p>
                <span className="font-bold text-gray-900">Email:</span> contact@betonabi.com
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="flex gap-6 text-sm font-bold text-gray-900">
                <Link to="/about" className="hover:text-[#4d0078] transition-colors">{t("nav_about") || "Về Betonabi"}</Link>
                <Link to="/contact" className="hover:text-[#4d0078] transition-colors">{t("nav_contact") || "Liên hệ"}</Link>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full text-gray-600 hover:bg-black hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full text-gray-600 hover:bg-black hover:text-white transition-colors">
                  <XIcon className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full text-gray-600 hover:bg-black hover:text-white transition-colors">
                  <AtSign className="w-4 h-4" />
                </a>
              </div>
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
