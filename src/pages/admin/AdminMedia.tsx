import { Image, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockImages = [
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
];

const AdminMedia = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Quản lý Media
          </h1>
          <p className="text-muted-foreground mt-1">
            Thư viện ảnh và tệp đa phương tiện
          </p>
        </div>
        <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-none font-medium">
          <Upload className="w-4 h-4 mr-2" />
          Tải lên
        </Button>
      </div>

      {/* Upload Area */}
      <div className="bg-background border-2 border-dashed border-foreground/20 p-12 text-center mb-8">
        <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg font-medium text-foreground mb-2">
          Kéo thả tệp vào đây
        </p>
        <p className="text-sm text-muted-foreground">
          hoặc click để chọn tệp từ máy tính
        </p>
      </div>

      {/* Media Grid */}
      <div className="bg-background border border-foreground/20 p-6">
        <h2 className="font-serif text-lg font-bold text-foreground mb-4">
          Ảnh đã tải lên
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockImages.map((image, index) => (
            <div
              key={index}
              className="aspect-video border border-foreground/10 overflow-hidden group cursor-pointer"
            >
              <img
                src={image}
                alt={`Media ${index + 1}`}
                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMedia;
