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
    viewBox="0 0 192 192"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.741 121.563 140.512 128.381 130.825C130.138 128.315 131.427 125.593 132.246 122.683C135.004 130.625 141.584 134.422 151.832 133.094C162.274 131.741 167.337 121.841 166.908 103.111C166.363 79.3146 151.812 55.4377 126.542 34.6975C110.832 21.7995 91.0366 15.3533 69.761 16.5443C42.062 18.0965 20.403 35.8166 14.1558 60.1896C7.90962 84.5626 15.9189 110.155 34.6133 125.684C35.8077 126.678 37.0398 127.6 38.3075 128.452L27.6749 140.854C25.433 139.313 23.2751 137.643 21.2144 135.845" />
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200 py-10">
      <div className="container mx-auto px-4 max-w-[1240px]">
        {/* Row 1: Logo, Images, Categories */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-8 pb-8 border-b border-gray-100">
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

          {/* 3x3 Grid for Categories and Social Media - Now sibling of logo group for better spreading */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 lg:gap-x-24 flex-1 lg:justify-items-end">
            {/* Column 1: Văn hóa, Kinh doanh, Đời sống */}
            <div className="flex flex-col gap-2 min-w-[120px]">
              <Link to="/category/van-hoa" className="text-sm font-bold text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                {t("category_Culture")}
              </Link>
              <Link to="/category/kinh-doanh" className="text-sm font-bold text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                {t("category_Business")}
              </Link>
              <Link to="/category/doi-song" className="text-sm font-bold text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                {t("category_Life")}
              </Link>
            </div>

            {/* Column 2: Du lịch, Sức khỏe, Longform */}
            <div className="flex flex-col gap-2 min-w-[120px]">
              <Link to="/category/du-lich" className="text-sm font-bold text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                {t("category_Travel")}
              </Link>
              <Link to="/category/suc-khoe" className="text-sm font-bold text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                {t("category_Health")}
              </Link>
              <Link to="/category/longform-e-magazine" className="text-sm font-bold text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                Longform
              </Link>
            </div>

            {/* Column 3: About, Follow Us, Icons */}
            <div className="flex flex-col gap-2 min-w-[150px]">
              <Link to="/about" className="text-sm font-bold text-black hover:text-[#7c3aed] transition-colors whitespace-nowrap">
                Về Betonabi
              </Link>
              <span className="text-sm font-bold text-black whitespace-nowrap">
                Theo dõi chúng tôi
              </span>
              <div className="flex gap-4 items-center pt-2">
                <a href="#" className="text-black hover:text-[#7c3aed] transition-colors">
                  <Facebook className="w-5 h-5 font-bold" />
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
            <p className="pt-2 text-xs font-bold opacity-80">
              © Toàn bộ bản quyền thuộc Betonabi
            </p>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center sm:items-start gap-4 w-full lg:w-auto">
            <div className="text-center sm:text-left space-y-1">
              <p className="text-sm font-bold">Đừng bỏ lỡ tin tức quan trọng!</p>
              <p className="text-xs text-gray-500">Nhận tóm tắt tin tức hấp dẫn 24 giờ qua trên Betonabi</p>
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


      </div>
    </footer>
  );
};

export default Footer;
