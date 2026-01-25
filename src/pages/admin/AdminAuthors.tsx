import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

// Mock Categories - in a real app this would come from an API/Context
const AVAILABLE_CATEGORIES = [
    { id: "thoi-su", name: "Thời Sự" },
    { id: "the-gioi", name: "Thế Giới" },
    { id: "kinh-doanh", name: "Kinh Doanh" },
    { id: "giai-tri", name: "Giải Trí" },
    { id: "the-thao", name: "Thể Thao" },
    { id: "phap-luat", name: "Pháp Luật" },
    { id: "giao-duc", name: "Giáo Dục" },
];

interface Author {
    id: string;
    name: string;
    email: string;
    role: "admin" | "editor" | "reporter";
    allowedCategories: string[];
    status: "active" | "inactive";
}

const INITIAL_AUTHORS: Author[] = [
    {
        id: "1",
        name: "Nguyễn Văn A",
        email: "vana@example.com",
        role: "admin",
        allowedCategories: ["all"],
        status: "active",
    },
    {
        id: "2",
        name: "Trần Thị B",
        email: "thib@example.com",
        role: "editor",
        allowedCategories: ["thoi-su", "the-gioi", "kinh-doanh"],
        status: "active",
    },
    {
        id: "3",
        name: "Lê Văn C",
        email: "vanc@example.com",
        role: "reporter",
        allowedCategories: ["the-thao"],
        status: "active",
    },
];

const AdminAuthors = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentAuthor, setCurrentAuthor] = useState<Author | null>(null);
    const { toast } = useToast();

    // Form State
    const [formData, setFormData] = useState<Partial<Author>>({
        name: "",
        email: "",
        role: "reporter",
        allowedCategories: [],
        status: "active",
    });

    useEffect(() => {
        // Load from local storage or use initial
        const stored = localStorage.getItem("admin_authors");
        if (stored) {
            setAuthors(JSON.parse(stored));
        } else {
            setAuthors(INITIAL_AUTHORS);
            localStorage.setItem("admin_authors", JSON.stringify(INITIAL_AUTHORS));
        }
    }, []);

    const saveAuthors = (newAuthors: Author[]) => {
        setAuthors(newAuthors);
        localStorage.setItem("admin_authors", JSON.stringify(newAuthors));
    };

    const handleOpenDialog = (author?: Author) => {
        if (author) {
            setCurrentAuthor(author);
            setFormData(author);
        } else {
            setCurrentAuthor(null);
            setFormData({
                name: "",
                email: "",
                role: "reporter",
                allowedCategories: [],
                status: "active",
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.email) {
            toast({
                title: "Lỗi",
                description: "Vui lòng nhập tên và email",
                variant: "destructive",
            });
            return;
        }

        if (currentAuthor) {
            // Edit
            const updated = authors.map((a) =>
                a.id === currentAuthor.id ? { ...a, ...formData } as Author : a
            );
            saveAuthors(updated);
            toast({ title: "Thành công", description: "Đã cập nhật thông tin tác giả" });
        } else {
            // Add
            const newAuthor: Author = {
                id: Date.now().toString(),
                ...formData,
            } as Author;
            saveAuthors([...authors, newAuthor]);
            toast({ title: "Thành công", description: "Đã thêm tác giả mới" });
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tác giả này?")) {
            const updated = authors.filter((a) => a.id !== id);
            saveAuthors(updated);
            toast({ title: "Thành công", description: "Đã xóa tác giả" });
        }
    };

    const toggleCategory = (catId: string) => {
        const currentCats = formData.allowedCategories || [];
        if (currentCats.includes("all")) {
            // If 'all' was selected and we toggle something else, remove 'all' first? 
            // Or handle 'all' logic separately. For simplicity, let's say 'all' is just another implementation.
        }

        if (currentCats.includes(catId)) {
            setFormData({
                ...formData,
                allowedCategories: currentCats.filter((id) => id !== catId),
            });
        } else {
            setFormData({
                ...formData,
                allowedCategories: [...currentCats, catId],
            });
        }
    };

    const toggleAllCategories = (checked: boolean) => {
        if (checked) {
            setFormData({ ...formData, allowedCategories: ["all"] });
        } else {
            setFormData({ ...formData, allowedCategories: [] });
        }
    }

    const filteredAuthors = authors.filter(
        (a) =>
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-foreground">
                        Quản Lý Tác Giả
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Quản lý danh sách tác giả và phân quyền chuyên mục
                    </p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Thêm Tác Giả
                </Button>
            </div>

            {/* Search */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm kiếm theo tên hoặc email..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border shadow-sm">
                <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 font-medium text-sm">
                    <div className="col-span-3">Họ và tên</div>
                    <div className="col-span-3">Email</div>
                    <div className="col-span-2">Vai trò</div>
                    <div className="col-span-3">Quyền chuyên mục</div>
                    <div className="col-span-1 text-right">Thao tác</div>
                </div>
                <div className="divide-y">
                    {filteredAuthors.map((author) => (
                        <div
                            key={author.id}
                            className="grid grid-cols-12 gap-4 p-4 items-center text-sm hover:bg-muted/5 transition-colors"
                        >
                            <div className="col-span-3 font-medium">{author.name}</div>
                            <div className="col-span-3 text-muted-foreground">{author.email}</div>
                            <div className="col-span-2">
                                <span
                                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${author.role === "admin"
                                            ? "bg-purple-100 text-purple-700"
                                            : author.role === "editor"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {author.role.charAt(0).toUpperCase() + author.role.slice(1)}
                                </span>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-wrap gap-1">
                                    {author.allowedCategories.includes("all") ? (
                                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                                            Tất cả
                                        </span>
                                    ) : (
                                        author.allowedCategories.map((catId) => {
                                            const cat = AVAILABLE_CATEGORIES.find((c) => c.id === catId);
                                            return (
                                                <span
                                                    key={catId}
                                                    className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded"
                                                >
                                                    {cat?.name || catId}
                                                </span>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                            <div className="col-span-1 flex justify-end gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleOpenDialog(author)}
                                >
                                    <Pencil className="w-4 h-4 text-blue-600" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(author.id)}
                                >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {filteredAuthors.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">
                            Không tìm thấy tác giả nào
                        </div>
                    )}
                </div>
            </div>

            {/* Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {currentAuthor ? "Sửa thông tin tác giả" : "Thêm tác giả mới"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Họ và tên</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Nhập họ tên..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="email@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Vai trò</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(val: any) => setFormData({ ...formData, role: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="editor">Editor</SelectItem>
                                    <SelectItem value="reporter">Reporter</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Phân quyền chuyên mục</Label>
                            <div className="border rounded-md p-3 max-h-40 overflow-y-auto space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="cat-all"
                                        checked={formData.allowedCategories?.includes("all")}
                                        onCheckedChange={(checked) => toggleAllCategories(checked as boolean)}
                                    />
                                    <Label htmlFor="cat-all" className="font-bold">Tất cả chuyên mục</Label>
                                </div>
                                {!formData.allowedCategories?.includes("all") && AVAILABLE_CATEGORIES.map((cat) => (
                                    <div key={cat.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`cat-${cat.id}`}
                                            checked={formData.allowedCategories?.includes(cat.id)}
                                            onCheckedChange={() => toggleCategory(cat.id)}
                                        />
                                        <Label htmlFor={`cat-${cat.id}`}>{cat.name}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Hủy
                        </Button>
                        <Button onClick={handleSubmit}>Lưu</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminAuthors;
