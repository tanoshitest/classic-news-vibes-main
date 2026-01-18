import { Separator } from "@/components/ui/separator";
import { categories } from "@/data/mockData";
import { Facebook, Twitter, Youtube, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryKeyMap: Record<string, string> = {
  "Kinh doanh": "category_Business",
  "Xã hội": "category_Society",
  "Đời sống": "category_Life",
  "Du lịch - Văn hóa": "category_TravelCulture",
  "Giáo dục": "category_Education",
  "Sức khỏe": "category_Health"
};

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & About */}
          <div className="md:col-span-1">
            <h2 className="font-serif text-3xl font-bold mb-4">{t('home_title')}</h2>
            <p className="text-background/70 text-sm leading-relaxed">
              {t('footer_about')}
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
              {t('footer_categories')}
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <a
                    href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {t(categoryKeyMap[category] || category)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              {t('footer_services')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  {t('footer_subscribe')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  {t('footer_ads')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  {t('footer_contact')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  {t('footer_terms')}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              {t('footer_get_latest')}
            </h3>
            <p className="text-sm text-background/70 mb-4">
              {t('footer_subscribe_text')}
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder={t('footer_email_placeholder')}
                className="flex-1 px-4 py-2 bg-background/10 border border-background/20 text-background placeholder:text-background/50 text-sm focus:outline-none focus:border-background/40"
              />
              <button className="px-4 py-2 bg-background text-foreground text-sm font-medium hover:bg-background/90 transition-colors">
                {t('footer_subscribe_btn') || t('footer_subscribe')}
              </button>
            </div>
          </div>
        </div>

        <Separator className="bg-background/20 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/60">
          <p>{t('footer_rights')}</p>
          <p>{t('footer_built')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
