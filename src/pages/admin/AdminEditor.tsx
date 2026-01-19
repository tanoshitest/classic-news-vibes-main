import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bold, Italic, Image, Quote, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  { value: "kinh-doanh", label: "Kinh doanh" },
  { value: "xa-hoi", label: "Xã hội" },
  { value: "doi-song", label: "Đời sống" },
  { value: "du-lich-van-hoa", label: "Du lịch - Văn hóa" },
  { value: "giao-duc", label: "Giáo dục" },
  { value: "suc-khoe", label: "Sức khỏe" },
];

interface ContentState {
  title: string;
  sapo: string;
  content: string;
}

const AdminEditor = () => {
  const navigate = useNavigate();

  // State for Vietnamese content
  const [viContent, setViContent] = useState<ContentState>({
    title: "",
    sapo: "",
    content: "",
  });

  // State for Japanese content
  const [jpContent, setJpContent] = useState<ContentState>({
    title: "",
    sapo: "",
    content: "",
  });

  const [category, setCategory] = useState("");

  const handlePublish = () => {
    const articleData = {
      vi: viContent,
      jp: jpContent,
      category,
      publishedAt: new Date().toISOString(),
    };
    console.log("Publishing article:", articleData);
    // Add API call here
  };

  const EditorField = ({
    lang,
    data,
    onChange
  }: {
    lang: string;
    data: ContentState;
    onChange: (data: ContentState) => void;
  }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Title */}
      <div className="bg-background border border-foreground/20 p-6">
        <Input
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          placeholder={`Nhập tiêu đề bài viết (${lang})...`}
          className="border-0 p-0 font-serif text-3xl font-bold placeholder:text-muted-foreground/50 focus-visible:ring-0 h-auto"
        />
      </div>

      {/* Sapo */}
      <div className="bg-background border border-foreground/20 p-6">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Sapo (Tóm tắt - {lang})
        </label>
        <Textarea
          value={data.sapo}
          onChange={(e) => onChange({ ...data, sapo: e.target.value })}
          placeholder={`Nhập đoạn sapo tóm tắt nội dung bài viết (${lang})...`}
          className="border-0 p-0 font-bold text-lg resize-none min-h-24 placeholder:text-muted-foreground/50 focus-visible:ring-0"
        />
      </div>

      {/* Content Editor */}
      <div className="bg-background border border-foreground/20">
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-3 border-b border-foreground/20">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-foreground/5"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-foreground/5"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-foreground/5"
          >
            <Image className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-foreground/5"
          >
            <Quote className="w-4 h-4" />
          </Button>
        </div>

        {/* Content Area */}
        <Textarea
          value={data.content}
          onChange={(e) => onChange({ ...data, content: e.target.value })}
          placeholder={`Bắt đầu viết nội dung bài viết (${lang})...`}
          className="border-0 p-6 text-lg leading-relaxed resize-none min-h-[400px] placeholder:text-muted-foreground/50 focus-visible:ring-0 rounded-none"
        />
      </div>
    </div>
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/articles")}
          className="hover:bg-foreground/5"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Viết bài mới
          </h1>
          <p className="text-muted-foreground mt-1">
            Tạo bài viết mới đa ngôn ngữ (Việt - Nhật)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-none border-foreground/20"
          >
            Lưu nháp
          </Button>
          <Button
            onClick={handlePublish}
            className="bg-foreground text-background hover:bg-foreground/90 rounded-none"
          >
            Xuất bản
          </Button>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="vi" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b border-foreground/20 bg-transparent p-0 mb-6 h-auto">
              <TabsTrigger
                value="vi"
                className="rounded-none border-b-2 border-transparent px-6 py-3 font-serif text-lg data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Tiếng Việt
              </TabsTrigger>
              <TabsTrigger
                value="jp"
                className="rounded-none border-b-2 border-transparent px-6 py-3 font-serif text-lg data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Tiếng Nhật
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vi" className="mt-0">
              <EditorField
                lang="Tiếng Việt"
                data={viContent}
                onChange={setViContent}
              />
            </TabsContent>

            <TabsContent value="jp" className="mt-0">
              <EditorField
                lang="Tiếng Nhật"
                data={jpContent}
                onChange={setJpContent}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6 pt-[60px]">
          {/* Category */}
          <div className="bg-background border border-foreground/20 p-6">
            <label className="block font-serif font-bold text-foreground mb-3">
              Chuyên mục
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="rounded-none border-foreground/20">
                <SelectValue placeholder="Chọn chuyên mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Thumbnail Upload */}
          <div className="bg-background border border-foreground/20 p-6">
            <label className="block font-serif font-bold text-foreground mb-3">
              Ảnh đại diện
            </label>
            <div className="border-2 border-dashed border-foreground/20 p-8 text-center">
              <Image className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Kéo thả hoặc click để tải ảnh
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG tối đa 5MB
              </p>
            </div>
          </div>

          {/* Publish Date */}
          <div className="bg-background border border-foreground/20 p-6">
            <label className="block font-serif font-bold text-foreground mb-3">
              Ngày xuất bản
            </label>
            <Input
              type="datetime-local"
              className="rounded-none border-foreground/20"
            />
          </div>

          {/* Tags */}
          <div className="bg-background border border-foreground/20 p-6">
            <label className="block font-serif font-bold text-foreground mb-3">
              Thẻ tags
            </label>
            <Input
              placeholder="Nhập tag và nhấn Enter..."
              className="rounded-none border-foreground/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditor;
