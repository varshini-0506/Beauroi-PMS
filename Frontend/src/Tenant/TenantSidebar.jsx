import {
  Home,
  User,
  CreditCard,
  Wrench,
  LogOut,
  Bell,
} from 'lucide-react';

const TenantSidebar = () => {
  const activeItem = 'Dashboard';

  const menuItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/user/tenantDashboard' },
    { name: 'Profile', icon: <User size={20} />, path: '/user/tenantProfile' },
    { name: 'Payments', icon: <CreditCard size={20} />, path: '/user/payment' },
    { name: 'Maintenance', icon: <Wrench size={20} />, path: '/user/requestform' },
    { name: 'Notifications', icon: <Bell size={20} />, path: '/tenant/notifications' },
    { name: 'Logout', icon: <LogOut size={20} />, path: '/signin' },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-[#FAFAFA] border-r border-[#E0E7FF] text-[#374151] shadow-md">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-20 bg-[#4F46E5] text-white">
        <h1 className="text-xl font-bold">Tenant Portal</h1>
      </div>

      {/* Menu Items */}
      <nav className="mt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.path}
                className={`flex items-center px-6 py-3 transition-colors duration-200 rounded-r-full ${
                  activeItem === item.name
                    ? 'bg-[#E0E7FF] text-[#4F46E5]'
                    : 'text-[#374151] hover:bg-[#F3F4F6]'
                }`}
              >
                <span
                  className={`mr-3 ${
                    activeItem === item.name ? 'text-[#4F46E5]' : 'text-[#6366F1]'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TenantSidebar;
