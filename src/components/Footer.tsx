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
  "Longform / E-magazine": "category_Longform"
};

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200 font-sans">
      {/* Row 1: Newsletter */}
      <div className="bg-[#fcfaf6] py-8 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Left: 4 Portrait Thumbnails */}
            <div className="flex items-center gap-6">
              <div className="flex gap-3">
                {latestNews.slice(0, 4).map((news) => (
                  <div key={news.id} className="w-16 aspect-[10/16] shrink-0 rounded overflow-hidden border border-gray-200 shadow-sm">
                    <img src={news.image} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Group: Message + Form */}
            <div className="flex flex-col gap-3 text-center lg:text-left w-full max-w-sm">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Đừng bỏ lỡ tin tức quan trọng!</h3>
                <p className="text-gray-600 text-sm">Nhận tóm tắt tin tức hấp dẫn 24 giờ qua trên Betonabi</p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Email của bạn"
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus-visible:ring-[#eb6100] h-9 text-sm"
                />
                <Button className="bg-[#9f224e] hover:bg-[#851b40] text-white shrink-0 h-9 px-4 text-sm">
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-10 pb-6">
        {/* Row 2: Branding & Contact Info */}
        {/* Row 2: Branding & Contact Info */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 mb-6">
          <div className="space-y-2 max-w-xs">
            <Link to="/" className="flex items-center gap-2 group mb-2">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-serif text-xl font-bold rounded-sm">
                B
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-black">
                Betonabi
              </span>
            </Link>
            <p className="text-sm font-medium text-gray-500">Tin tức chuyên sâu về Việt Nam</p>
          </div>

          <div className="space-y-2 text-sm text-gray-600 max-w-md border-l pl-8 border-gray-200">
            <p>
              <span className="font-bold text-gray-900">Chịu trách nhiệm quản lý nội dung:</span> Nguyễn Thị Minh Chi
            </p>
            <p>
              <span className="font-bold text-gray-900">Tel:</span> (84) 348288561 - (81) 8072398857
            </p>
            <p>
              <span className="font-bold text-gray-900">Email:</span> contact@betonabi.com
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-black hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-black hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-black hover:text-white transition-colors">
                <AtSign className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-100 mb-6" />

        {/* Row 3: Category Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
          {categories.filter(c => c !== "Mới nhất" && c !== "Đọc nhiều").map((category) => (
            <Link
              key={category}
              to={`/category/${getCategorySlug(category)}`}
              className="text-sm font-bold text-gray-700 hover:text-[#eb6100] uppercase transition-colors"
            >
              {t(categoryKeyMap[category] || category)}
            </Link>
          ))}
        </div>

        <Separator className="bg-gray-100 mb-6" />

        {/* Row 4: About & Contact Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-500">
          <Link to="/about" className="hover:text-gray-900 transition-colors">Về Betonabi</Link>
          <Link to="/contact" className="hover:text-gray-900 transition-colors">Liên hệ</Link>
        </div>

        {/* Row 5: Copyright */}
        <div className="text-xs text-center text-gray-400">
          © Toàn bộ bản quyền thuộc Betonabi
        </div>
      </div>
    </footer>
  );
};

export default Footer;
