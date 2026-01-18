import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AdminSettings = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Cài đặt
        </h1>
        <p className="text-muted-foreground mt-1">
          Quản lý cấu hình trang tin
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Site Info */}
        <div className="bg-background border border-foreground/20 p-6">
          <h2 className="font-serif text-lg font-bold text-foreground mb-4">
            Thông tin trang
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Tên trang
              </label>
              <Input
                defaultValue="Mi Chi Writer"
                className="rounded-none border-foreground/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Mô tả
              </label>
              <Textarea
                defaultValue="Trang tin tức tổng hợp với phong cách cổ điển"
                className="rounded-none border-foreground/20 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-background border border-foreground/20 p-6">
          <h2 className="font-serif text-lg font-bold text-foreground mb-4">
            Thông tin liên hệ
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Email
              </label>
              <Input
                type="email"
                defaultValue="minhchi.pr@gmail.com"
                className="rounded-none border-foreground/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Zalo
              </label>
              <Input
                type="tel"
                defaultValue="+81 8072398857 (Nhật Bản)"
                className="rounded-none border-foreground/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Địa chỉ
              </label>
              <Textarea
                defaultValue="Osaka, Nhật Bản"
                className="rounded-none border-foreground/20 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-none font-medium">
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
