export interface Author {
    id: string;
    name: string;
    email?: string;
    role: "admin" | "editor" | "reporter";
    allowedCategories: string[];
    status: "active" | "inactive";
    bio?: string;
    avatar?: string;
}

export const AUTHORS: Author[] = [
    {
        id: "1",
        name: "Minh Châu",
        role: "editor",
        allowedCategories: ["Kinh doanh", "Công nghệ"],
        status: "active",
        bio: "Chuyên gia phân tích tài chính và công nghệ với 10 năm kinh nghiệm. Đam mê viết về startups và xu hướng thị trường.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
    },
    {
        id: "2",
        name: "Phóng viên Thảo Nguyên",
        role: "reporter",
        allowedCategories: ["Du lịch - Văn hóa", "E-Magazine"],
        status: "active",
        bio: "Người kể chuyện qua những chuyến đi. Thảo Nguyên đã đặt chân đến 50 quốc gia để mang lại những bài viết sống động nhất.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
    },
    {
        id: "3",
        name: "Tech Editor",
        role: "editor",
        allowedCategories: ["Công nghệ"],
        status: "active",
        bio: "Biên tập viên mảng công nghệ, luôn cập nhật những xu hướng AI và Gadgets mới nhất.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
    },
    {
        id: "4",
        name: "Bích Ngọc",
        role: "reporter",
        allowedCategories: ["Đời sống"],
        status: "active",
        bio: "Yêu thích lối sống xanh và healthy. Chia sẻ những bí quyết sống khỏe mỗi ngày.",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80"
    },
    {
        id: "5",
        name: "Minh Tuấn",
        role: "reporter",
        allowedCategories: ["Kinh doanh"],
        status: "active",
        bio: "Phóng viên kinh tế, chuyên sâu về vĩ mô và thị trường chứng khoán.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80"
    },
    // Add generic fallback for unknown authors
];

export const getAuthorByName = (name: string): Author | undefined => {
    return AUTHORS.find(author => author.name === name) || {
        id: "unknown",
        name: name,
        role: "reporter",
        allowedCategories: [],
        status: "active",
        bio: "Tác giả của Mi Chi Writer.",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };
};
