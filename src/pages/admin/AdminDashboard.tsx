import StatCard from "@/components/admin/StatCard";
import RecentActivityTable from "@/components/admin/RecentActivityTable";

const stats = [
  { label: "Tổng bài viết", value: "1,247", description: "+12 trong tuần này" },
  { label: "Lượt xem hôm nay", value: "45.2K", description: "+8% so với hôm qua" },
  { label: "Bài chờ duyệt", value: "23", description: "Cần xử lý" },
  { label: "Tổng lượt xem", value: "1.2M", description: "Tháng 01/2026" },
];

const AdminDashboard = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Tổng quan hoạt động trang tin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <RecentActivityTable />
    </div>
  );
};

export default AdminDashboard;
