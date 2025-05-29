
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  Users, 
  Tag, 
  BarChart4, 
  Settings,
  ChevronRight,
  Truck
} from 'lucide-react';
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ClipboardList },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Discounts', path: '/admin/discounts', icon: Tag },
    { name: 'Shipping', path: '/admin/shipping', icon: Truck },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart4 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-bahola-blue-700">Bahola Admin</h1>
          <div>
            <span className="text-sm text-gray-500">Welcome, Admin</span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] shadow-sm">
          <nav className="py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={cn(
                      "flex items-center px-6 py-3 text-gray-700 hover:bg-bahola-blue-50 hover:text-bahola-blue-600",
                      currentPath === item.path && "bg-bahola-blue-50 text-bahola-blue-600 border-r-4 border-bahola-blue-500"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                    {currentPath === item.path && <ChevronRight className="h-4 w-4 ml-auto" />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
