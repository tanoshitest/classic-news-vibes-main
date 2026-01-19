import { useState } from "react";
import { Plus, Pencil, Trash2, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    articleCount: number;
}

const initialCategories: Category[] = [
    { id: "1", name: "Kinh doanh", slug: "kinh-doanh", description: "Tin tức kinh doanh, thị trường", articleCount: 15 },
    { id: "2", name: "Xã hội", slug: "xa-hoi", description: "Tin tức xã hội, đời sống", articleCount: 12 },
    { id: "3", name: "Đời sống", slug: "doi-song", description: "Mẹo vặt, phong cách sống", articleCount: 8 },
    { id: "4", name: "Du lịch - Văn hóa", slug: "du-lich-van-hoa", description: "Điểm đến, văn hóa vùng miền", articleCount: 10 },
    { id: "5", name: "Giáo dục", slug: "giao-duc", description: "Tin tức giáo dục, tuyển sinh", articleCount: 5 },
    { id: "6", name: "Sức khỏe", slug: "suc-khoe", description: "Tư vấn sức khỏe, y tế", articleCount: 7 },
];

const AdminCategories = () => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({ name: "", slug: "", description: "" });
    const { toast } = useToast();

    const handleOpenDialog = (category?: Category) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                slug: category.slug,
                description: category.description,
            });
        } else {
            setEditingCategory(null);
            setFormData({ name: "", slug: "", description: "" });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.slug) {
            toast({
                title: "Lỗi",
                description: "Vui lòng điền đầy đủ tên và đường dẫn",
                variant: "destructive",
            });
            return;
        }

        if (editingCategory) {
            // Edit
            setCategories(categories.map(cat =>
                cat.id === editingCategory.id
                    ? { ...cat, ...formData }
                    : cat
            ));
            toast({ title: "Thành công", description: "Đã cập nhật danh mục" });
        } else {
            // Add
            const newCategory: Category = {
                id: Date.now().toString(),
                ...formData,
                articleCount: 0,
            };
            setCategories([...categories, newCategory]);
            toast({ title: "Thành công", description: "Đã thêm danh mục mới" });
        }
        setIsDialogOpen(false);
    };

    const handleDelete = (id: string) => {
        if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
            setCategories(categories.filter(cat => cat.id !== id));
            toast({ title: "Thành công", description: "Đã xóa danh mục" });
        }
    };

    // Simple slug generator
    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[đĐ]/g, "d")
            .replace(/[^a-z0-9\s]/g, "")
            .replace(/\s+/g, "-");
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setFormData(prev => ({
            ...prev,
            name,
            slug: !editingCategory ? generateSlug(name) : prev.slug // Auto-generate slug only when creating
        }));
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-foreground">
                        Quản lý danh mục
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Quản lý các chuyên mục tin tức trên hệ thống
                    </p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-foreground text-background hover:bg-foreground/90 rounded-none font-medium"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm danh mục
                </Button>
            </div>

            {/* Table */}
            <div className="bg-background border border-foreground/20">
                <Table>
                    <TableHeader>
                        <TableRow className="border-foreground/20">
                            <TableHead className="font-serif font-bold text-foreground w-16">ID</TableHead>
                            <TableHead className="font-serif font-bold text-foreground">Tên danh mục</TableHead>
                            <TableHead className="font-serif font-bold text-foreground">Đường dẫn (Slug)</TableHead>
                            <TableHead className="font-serif font-bold text-foreground">Mô tả</TableHead>
                            <TableHead className="font-serif font-bold text-foreground text-center">Số bài viết</TableHead>
                            <TableHead className="font-serif font-bold text-foreground w-24 text-right">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category, index) => (
                            <TableRow key={category.id} className="border-foreground/10">
                                <TableCell className="text-muted-foreground font-mono text-sm">
                                    #{index + 1}
                                </TableCell>
                                <TableCell className="font-medium text-foreground">
                                    <div className="flex items-center gap-2">
                                        <FolderTree className="w-4 h-4 text-muted-foreground" />
                                        {category.name}
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground font-mono text-sm">
                                    {category.slug}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {category.description}
                                </TableCell>
                                <TableCell className="text-center font-medium">
                                    {category.articleCount}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 hover:bg-foreground/5"
                                            onClick={() => handleOpenDialog(category)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 hover:bg-foreground/5"
                                            onClick={() => handleDelete(category.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px] rounded-none border border-foreground/20">
                    <DialogHeader>
                        <DialogTitle className="font-serif text-2xl">
                            {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
                        </DialogTitle>
                        <DialogDescription>
                            Nhập thông tin chi tiết cho danh mục tin tức.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Tên danh mục</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={handleNameChange}
                                placeholder="Ví dụ: Kinh doanh"
                                className="rounded-none"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="slug">Đường dẫn (Slug)</Label>
                            <Input
                                id="slug"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="vi-du-kinh-doanh"
                                className="rounded-none font-mono text-sm"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Mô tả</Label>
                            <Input
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Mô tả ngắn về danh mục..."
                                className="rounded-none"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                            className="rounded-none"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="bg-foreground text-background hover:bg-foreground/90 rounded-none"
                        >
                            {editingCategory ? "Cập nhật" : "Thêm mới"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminCategories;
