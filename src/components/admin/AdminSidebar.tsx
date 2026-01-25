import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Image, Settings, LogOut, ListTree, Users } from "lucide-react";

const menuItems = [
  { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Bài viết", path: "/admin/articles", icon: FileText },
  { title: "Danh mục", path: "/admin/categories", icon: ListTree },
  { title: "Tác giả", path: "/admin/authors", icon: Users },
  { title: "Media", path: "/admin/media", icon: Image },
  { title: "Cài đặt", path: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-background border-r border-foreground/20 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-foreground/20">
        <h1 className="font-serif text-xl font-bold text-foreground">
          Mi Chi Writer
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isActive
                    ? "font-serif font-bold text-foreground border-b-2 border-foreground"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-foreground/20">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng xuất</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
