
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
        "copyright": "Bản quyền thuộc về Betonabi",
        "category_Latest": "Mới nhất",
        "category_MostRead": "Đọc nhiều",
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
        "category_Longform": "Longform",
        "home_title": "Betonabi",
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
        "footer_rights": "© 2025 Betonabi. Bảo lưu mọi quyền.",
        "header_subscribe": "Theo dõi",
        "header_register": "Đăng ký",
        "footer_built": "Được xây dựng với ❤️ tại Việt Nam",
        "contact_title": "Liên hệ với Betonabi",
        "contact_intro": "Bạn có thể đặt câu hỏi về trang web Betonabi.",
        "contact_intro_line2": "Vui lòng điền vào biểu mẫu dưới đây.",
        "contact_required": "trường bắt buộc",
        "contact_fullname": "Họ và Tên",
        "contact_fullname_placeholder": "Nhập họ và tên của bạn",
        "contact_company": "Tên công ty/tổ chức",
        "contact_company_placeholder": "Nhập tên công ty hoặc tổ chức",
        "contact_company_warning": "Nếu không cung cấp tên công ty hoặc tổ chức của bạn, đơn đăng ký sẽ bị từ chối.",
        "contact_company_warning2": "",
        "contact_department": "Phòng ban",
        "contact_department_placeholder": "Nhập tên phòng ban (không bắt buộc)",
        "contact_email": "Địa chỉ email",
        "contact_email_placeholder": "Nhập địa chỉ email của bạn",
        "contact_email_warning": "* Bắt buộc nhập địa chỉ email của cá nhân hoặc tổ chức của bạn.",
        "contact_email_warning2": "* Các địa chỉ email miễn phí KHÔNG được chấp nhận.",
        "contact_phone": "Số điện thoại",
        "contact_phone_placeholder": "Nhập số điện thoại (không bắt buộc)",
        "contact_message": "Tin nhắn",
        "contact_message_placeholder": "Nhập tin nhắn của bạn...",
        "contact_submit": "Xác nhận",
        "about_title": "Về Betonabi",
        "about_intro": "Betonabi cung cấp tin tức chuyên sâu về Việt Nam trong nhiều lĩnh vực như kinh tế, văn hóa, xã hội, đời sống, du lịch, giáo dục, với góc nhìn trung thực, khách quan. Ngoài ra, thông qua hợp tác với các đối tác, chúng tôi mang đến các nội dung phong phú về đất nước và con người Việt Nam với những hình ảnh và video chân thực.",
        "about_mission": "Với hai phiên bản gồm tiếng Việt và tiếng Nhật, Betonabi hi vọng sẽ được độc giả đón đọc và coi là nguồn tin đáng tin cậy về Việt Nam.",
        "about_cta": "Nếu bạn quan tâm, vui lòng liên hệ với chúng tôi.",
        "about_contact_button": "Liên hệ",
        "nav_about": "Về chúng tôi",
        "nav_contact": "Liên hệ với chúng tôi",
        "login_as_admin": "Đăng nhập Admin",
        "login_as_guest": "Đăng nhập Khách"
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
        "copyright": "© Betonabi",
        "category_Latest": "最新ニュース",
        "category_MostRead": "最も読まれている",
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
        "category_Longform": "ロングフォーム",
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
        "footer_rights": "© 2025 Betonabi. 全著作権所有。",
        "header_subscribe": "購読",
        "header_register": "登録",
        "footer_built": "ベトナムで❤️を込めて作られました",
        "contact_title": "お問い合わせ",
        "contact_intro": "このサイトに関するお問い合わせはこちらのフォームで受け付けています。",
        "contact_intro_line2": "以下のフォームにご記入ください。",
        "contact_required": "必須項目",
        "contact_fullname": "お名前",
        "contact_fullname_placeholder": "お名前を入力してください",
        "contact_company": "会社名/組織名",
        "contact_company_placeholder": "会社名または組織名を入力してください",
        "contact_company_warning": "* この無料トライアルは、新聞社、出版社、金融サービス、専門研究者などの商業目的のみを対象としています。",
        "contact_company_warning2": "会社名または組織名が提供されない場合、お申し込みは却下されます。",
        "contact_department": "部署名",
        "contact_department_placeholder": "部署名を入力してください（任意）",
        "contact_email": "メールアドレス",
        "contact_email_placeholder": "メールアドレスを入力してください",
        "contact_email_warning": "* 組織のメールアドレスが必要です。",
        "contact_email_warning2": "* フリーメールアドレス（Yahoo Mail、gmailなど）は受け付けておりません。",
        "contact_phone": "電話番号",
        "contact_phone_placeholder": "電話番号を入力してください（任意）",
        "contact_message": "メッセージ",
        "contact_message_placeholder": "メッセージを入力してください...",
        "contact_submit": "確認",
        "about_title": "Betonabiについて",
        "about_intro": "Betonabiは、経済、文化、社会、生活、旅行、教育など、様々な分野でベトナムに関する詳細なニュースを提供しています。誠実で客観的な視点から報道しています。また、パートナーとの協力を通じて、ベトナムの国と人々について、本物の写真や動画を使った豊富なコンテンツを提供しています。",
        "about_mission": "ベトナム語版と日本語版の2つのバージョンで、Betonabiは読者に読まれ、ベトナムに関する信頼できる情報源となることを願っています。",
        "about_cta": "ご興味がございましたら、お問い合わせください。",
        "about_contact_button": "お問い合わせ",
        "nav_about": "私たちについて",
        "nav_contact": "お問い合わせ",
        "login_as_admin": "管理者としてログイン",
        "login_as_guest": "ゲストとしてログイン"
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
