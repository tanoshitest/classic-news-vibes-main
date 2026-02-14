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
export const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom Threads Icon
export const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.74 12.23c.15-.9.23-1.8.23-2.65 0-3.35-2.58-6.04-5.96-6.04-3.41 0-6.14 2.65-6.14 6.09 0 3.32 2.62 6 6.03 6 1.83 0 3.32-.82 4.33-2.14l1.55 1.54c-1.48 1.87-3.71 2.92-6.15 2.92-4.66 0-8.32-3.66-8.32-8.32C3.32 5.09 7.09 1.5 12 1.5s8.62 3.65 8.62 8.38c0 3.76-2.53 7.33-6.14 8.68-1.07.4-2.19.6-3.32.6-4.52 0-8.15-3.36-8.15-7.79 0-4.3 3.6-7.81 8.16-7.81 2.22 0 4.29.86 5.86 2.39 1.56 1.53 2.45 3.63 2.45 5.92 0 1.25-.23 2.5-.66 3.66l-1.08-.31zM11.96 5.81c-2.8 0-4.67 2.14-4.67 4.98 0 2.8 1.9 4.97 4.71 4.97 2.85 0 4.77-2.17 4.77-5.01 0-2.8-1.92-4.94-4.81-4.94z" />
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200 py-10">
      <div className="container mx-auto px-4">
        {/* Row 1: Logo, Images, Categories */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-8 pb-8 border-b border-gray-100">
          {/* Logo and Images Grouped to stay together on tablet */}
          <div className="flex flex-col sm:flex-row items-start gap-8 shrink-0">
            {/* Logo */}
            <Link to="/" className="flex items-start gap-2 group shrink-0 pt-1">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-serif text-xl rounded-sm">
                B
              </div>
              <span className="font-serif text-2xl tracking-tight text-black">
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

          {/* 3x3 Grid for Categories and Social Media - Now sibling of logo group for better spreading */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 lg:gap-x-24 flex-1 lg:justify-items-end">
            {/* Column 1: Văn hóa, Kinh doanh, Đời sống */}
            <div className="flex flex-col gap-2 min-w-[120px]">
              <Link to="/category/van-hoa" className="text-sm text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                {t("category_Culture")}
              </Link>
              <Link to="/category/kinh-doanh" className="text-sm text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                {t("category_Business")}
              </Link>
              <Link to="/category/doi-song" className="text-sm text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                {t("category_Life")}
              </Link>
            </div>

            {/* Column 2: Du lịch, Sức khỏe, Longform */}
            <div className="flex flex-col gap-2 min-w-[120px]">
              <Link to="/category/du-lich" className="text-sm text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                {t("category_Travel")}
              </Link>
              <Link to="/category/suc-khoe" className="text-sm text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                {t("category_Health")}
              </Link>
              <Link to="/category/longform-e-magazine" className="text-sm text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                Longform
              </Link>
            </div>

            {/* Column 3: About, Follow Us, Icons */}
            <div className="flex flex-col gap-2 min-w-[150px]">
              <Link to="/about" className="text-sm text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                Về Betonabi
              </Link>
              <span className="text-sm text-black whitespace-nowrap">
                Theo dõi Betonabi
              </span>
              <div className="flex gap-4 items-center pt-2">
                <a href="#" className="text-black hover:text-[#7c3aed] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-black hover:text-[#7c3aed] transition-colors">
                  <XIcon className="w-4 h-4" />
                </a>
                <a href="#" className="text-black hover:text-[#7c3aed] transition-colors">
                  <ThreadsIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Newsletter, Management Info & Copyright - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
          {/* Column 1: Newsletter */}
          <div className="flex flex-col items-start gap-4">
            <div className="text-left space-y-1">
              <p className="text-sm">Đừng bỏ lỡ tin tức quan trọng!</p>
              <p className="text-xs text-gray-500">Nhận tóm tắt tin tức hấp dẫn 24 giờ qua trên Betonabi</p>
            </div>
            <div className="flex gap-2 w-full max-w-sm">
              <Input
                placeholder="Email của bạn"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus-visible:ring-[#7c3aed] h-9 text-sm"
              />
              <Button className="bg-[#4d0078] hover:bg-[#7c3aed] text-white shrink-0 h-9 px-4 text-sm">
                Đăng ký
              </Button>
            </div>
          </div>

          {/* Column 2: Management Info */}
          <div className="space-y-2 text-sm text-black">
            <p>
              <span>Chịu trách nhiệm quản lý nội dung:</span><br />Nguyễn Thị Minh Chi
            </p>
            <p><span>Tel:</span> (84) 348288561 - (81) 8072398857</p>
            <p><span>Email:</span> contact@betonabi.com</p>
          </div>

          {/* Column 3: Copyright */}
          <div className="text-sm text-black lg:text-right">
            <p className="opacity-80">
              © Toàn bộ bản quyền thuộc Betonabi
            </p>
          </div>
        </div>



      </div>
    </footer>
  );
};

export default Footer;
