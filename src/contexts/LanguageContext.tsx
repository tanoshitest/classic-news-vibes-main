
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'VN' | 'JP';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
    VN: {
        "search": "Tìm kiếm",
        "signIn": "Đăng nhập",
        "date_format": "dd/MM/yyyy", // We handle date formatting separately usually, but good to have a key
        "readTime": "phút đọc",
        "latestNews": "Tin mới nhất",
        "editorsPick": "Lựa chọn của biên tập viên",
        "recommended": "Đề xuất cho bạn",
        "viewMore": "Xem thêm",
        "copyright": "Bản quyền thuộc về Mi Chi Writer",
        "category_Business": "Kinh doanh",
        "category_Politics": "Chính trị",
        "category_Society": "Xã hội",
        "category_Sports": "Thể thao",
        "category_Culture": "Văn hóa",
        "category_Travel": "Du lịch",
        "category_Health": "Sức khỏe",
        "category_Education": "Giáo dục",
        "category_Life": "Đời sống",
        "category_TravelCulture": "Du lịch - Văn hóa",
        "home_title": "Mi Chi Writer",
        "hot_topics": "Chủ đề nóng",
        "follow_us": "Theo dõi chúng tôi",
        "most_viewed": "Xem nhiều nhất",
        "footer_about": "Trang tin tức uy tín hàng đầu Việt Nam. Cập nhật tin tức mới nhất 24/7.",
        "footer_categories": "Chuyên mục",
        "footer_services": "Dịch vụ",
        "footer_subscribe": "Đăng ký",
        "footer_ads": "Quảng cáo",
        "footer_contact": "Liên hệ",
        "footer_terms": "Điều khoản sử dụng",
        "footer_get_latest": "Nhận tin mới nhất",
        "footer_subscribe_text": "Đăng ký để nhận tin tức nóng hổi mỗi ngày.",
        "footer_email_placeholder": "Email của bạn",
        "footer_rights": "© 2025 Mi Chi Writer. Bảo lưu mọi quyền.",
        "footer_built": "Được xây dựng với ❤️ tại Việt Nam"
    },
    JP: {
        "search": "検索",
        "signIn": "ログイン",
        "date_format": "yyyy/MM/dd",
        "readTime": "分",
        "latestNews": "最新ニュース",
        "editorsPick": "編集長のおすすめ",
        "recommended": "おすすめ",
        "viewMore": "もっと見る",
        "copyright": "© Mi Chi Writer",
        "category_Business": "ビジネス",
        "category_Politics": "政治",
        "category_Society": "社会",
        "category_Sports": "スポーツ",
        "category_Culture": "文化",
        "category_Travel": "旅行",
        "category_Health": "健康",
        "category_Education": "教育",
        "category_Life": "ライフスタイル",
        "category_TravelCulture": "旅行・文化",
        "home_title": "ミ・チ・ライター",
        "hot_topics": "ホットトピック",
        "follow_us": "フォローする",
        "most_viewed": "人気の記事",
        "footer_about": "ベトナム有数の信頼できるニュースサイト。最新ニュースを24時間年中無休で更新。",
        "footer_categories": "カテゴリー",
        "footer_services": "サービス",
        "footer_subscribe": "登録",
        "footer_ads": "広告",
        "footer_contact": "お問い合わせ",
        "footer_terms": "利用規約",
        "footer_get_latest": "最新ニュースを受け取る",
        "footer_subscribe_text": "毎日最新のニュースを受け取るために登録してください。",
        "footer_email_placeholder": "メールアドレス",
        "footer_rights": "© 2025 Mi Chi Writer. 全著作権所有。",
        "footer_built": "ベトナムで❤️を込めて作られました"
    }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('VN');

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
