import { Separator } from "@/components/ui/separator";
import { categories } from "@/data/mockData";
import { Facebook, Twitter, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & About */}
          <div className="md:col-span-1">
            <h2 className="font-serif text-3xl font-bold mb-4">The News</h2>
            <p className="text-background/70 text-sm leading-relaxed">
              Trang tin tức uy tín hàng đầu Việt Nam. Cập nhật tin tức mới nhất 24/7.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Chuyên mục
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <a
                    href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Dịch vụ
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Đăng ký nhận tin
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Quảng cáo
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Liên hệ tòa soạn
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Nhận tin mới nhất
            </h3>
            <p className="text-sm text-background/70 mb-4">
              Đăng ký để nhận tin tức nóng hổi mỗi ngày.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-2 bg-background/10 border border-background/20 text-background placeholder:text-background/50 text-sm focus:outline-none focus:border-background/40"
              />
              <button className="px-4 py-2 bg-background text-foreground text-sm font-medium hover:bg-background/90 transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        <Separator className="bg-background/20 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/60">
          <p>© 2025 The News. Bảo lưu mọi quyền.</p>
          <p>Được xây dựng với ❤️ tại Việt Nam</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
