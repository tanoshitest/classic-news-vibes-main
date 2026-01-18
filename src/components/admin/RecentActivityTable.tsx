import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Activity {
  id: string;
  title: string;
  author: string;
  status: "published" | "draft";
  date: string;
}

const recentActivities: Activity[] = [
  {
    id: "1",
    title: "Nhà sáng lập các startup AI tỷ USD ngày càng trẻ hóa",
    author: "Nguyễn Văn A",
    status: "published",
    date: "18/01/2026",
  },
  {
    id: "2",
    title: "Tỷ giá Yên Nhật biến động mạnh trong tuần qua",
    author: "Trần Thị B",
    status: "published",
    date: "18/01/2026",
  },
  {
    id: "3",
    title: "Startup AI gọi vốn triệu đô từ quỹ đầu tư Mỹ",
    author: "Lê Văn C",
    status: "draft",
    date: "17/01/2026",
  },
  {
    id: "4",
    title: "Khám phá hang Sơn Đoòng qua góc nhìn nhiếp ảnh gia",
    author: "Phạm Thị D",
    status: "published",
    date: "17/01/2026",
  },
  {
    id: "5",
    title: "Dự báo thời tiết Hà Nội tuần tới",
    author: "Hoàng Văn E",
    status: "draft",
    date: "16/01/2026",
  },
];

const RecentActivityTable = () => {
  return (
    <div className="bg-background border border-foreground/20">
      <div className="p-4 border-b border-foreground/20">
        <h2 className="font-serif text-lg font-bold text-foreground">
          Hoạt động gần đây
        </h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-foreground/20">
            <TableHead className="font-serif font-bold text-foreground">Tiêu đề</TableHead>
            <TableHead className="font-serif font-bold text-foreground">Tác giả</TableHead>
            <TableHead className="font-serif font-bold text-foreground">Trạng thái</TableHead>
            <TableHead className="font-serif font-bold text-foreground">Ngày</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentActivities.map((activity) => (
            <TableRow key={activity.id} className="border-foreground/10">
              <TableCell className="font-medium max-w-xs truncate">
                {activity.title}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {activity.author}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-block px-2 py-1 text-xs border ${
                    activity.status === "published"
                      ? "border-foreground text-foreground"
                      : "border-dashed border-muted-foreground text-muted-foreground"
                  }`}
                >
                  {activity.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {activity.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentActivityTable;
