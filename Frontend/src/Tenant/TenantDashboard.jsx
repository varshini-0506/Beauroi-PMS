import {
  CreditCard,
  Bell,
  Calendar,
  Home,
  Wrench,
  ChevronRight,
} from 'lucide-react';

const TenantDashboard = () => {
  const tenantData = {
    rentDue: 'April 1, 2025',
    rentAmount: '$1,200',
    rentStatus: 'Pending',
    leaseEnd: 'December 31, 2025',
    notifications: [
      { id: 1, message: 'Rent due in 5 days', unread: true },
      { id: 2, message: 'Maintenance scheduled for March 28', unread: false },
      { id: 3, message: 'Community event on April 5', unread: true },
    ],
  };

  const quickLinks = [
    { name: 'Pay Rent', icon: <CreditCard size={20} />, path: '/tenant/payments' },
    { name: 'Maintenance', icon: <Wrench size={20} />, path: '/tenant/maintenance' },
    { name: 'Lease Details', icon: <Home size={20} />, path: '/tenant/lease' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] to-[#FAFAFA] p-6 ml-64 text-[#374151] w-full transition-all duration-300">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-[#4F46E5]">Welcome, Tenant!</h1>
        <p className="text-[#6B7280] mt-1">Here's what's happening with your property</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        {/* Rent Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-[3px] border-[#4F46E5] group">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#374151]">Rent Overview</h2>
            <div className="p-2 rounded-lg bg-[#E0E7FF] group-hover:bg-[#4F46E5] group-hover:text-white transition-colors duration-300">
              <CreditCard size={20} className="text-[#4F46E5] group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#6B7280]">Due Date:</span>
              <span className="font-medium">{tenantData.rentDue}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#6B7280]">Amount:</span>
              <span className="font-medium">{tenantData.rentAmount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#6B7280]">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                tenantData.rentStatus === 'Pending' 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {tenantData.rentStatus}
              </span>
            </div>
          </div>
          <a
            href="/tenant/payments"
            className="mt-6 w-full flex items-center justify-between p-3 rounded-lg bg-[#E0E7FF] hover:bg-[#4F46E5] text-[#4F46E5] hover:text-white transition-colors duration-300"
          >
            <span>Pay Now</span>
            <ChevronRight size={18} />
          </a>
        </div>

        {/* Lease Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-[3px] border-[#A78BFA] group">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#374151]">Lease Info</h2>
            <div className="p-2 rounded-lg bg-[#EDE9FE] group-hover:bg-[#A78BFA] group-hover:text-white transition-colors duration-300">
              <Calendar size={20} className="text-[#8B5CF6] group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#6B7280]">End Date:</span>
              <span className="font-medium">{tenantData.leaseEnd}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#6B7280]">Property:</span>
              <span className="font-medium">123 Blue St, Unit 4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#6B7280]">Duration:</span>
              <span className="font-medium">12 months</span>
            </div>
          </div>
          <a
            href="/tenant/profile"
            className="mt-6 w-full flex items-center justify-between p-3 rounded-lg bg-[#EDE9FE] hover:bg-[#8B5CF6] text-[#8B5CF6] hover:text-white transition-colors duration-300"
          >
            <span>View Details</span>
            <ChevronRight size={18} />
          </a>
        </div>

        {/* Quick Links */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-[3px] border-[#60A5FA] group">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#374151]">Quick Links</h2>
            <div className="p-2 rounded-lg bg-[#EFF6FF] group-hover:bg-[#3B82F6] group-hover:text-white transition-colors duration-300">
              <Home size={20} className="text-[#3B82F6] group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.path}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-[#E0E7FF] transition-colors duration-300 group-hover:translate-x-1"
                >
                  <div className="flex items-center">
                    <span className="p-2 mr-3 rounded-lg bg-[#E0E7FF] text-[#4F46E5]">
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight size={16} className="text-[#9CA3AF] group-hover:text-[#4F46E5]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Notifications */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-[3px] border-[#34D399] animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#374151]">Recent Notifications</h2>
          <div className="flex items-center">
            <span className="mr-2 text-sm text-[#6B7280]">{tenantData.notifications.filter(n => n.unread).length} unread</span>
            <div className="p-2 rounded-lg bg-[#D1FAE5] text-[#10B981]">
              <Bell size={20} />
            </div>
          </div>
        </div>
        <ul className="space-y-3">
          {tenantData.notifications.length > 0 ? (
            tenantData.notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-4 rounded-lg transition-all duration-300 flex items-center ${
                  notification.unread
                    ? 'bg-[#E0E7FF] border-l-4 border-[#4F46E5] animate-pulse'
                    : 'hover:bg-[#F9FAFB]'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  notification.unread ? 'bg-[#4F46E5]' : 'bg-[#E5E7EB]'
                }`}></div>
                <span className={`flex-grow ${notification.unread ? 'font-medium' : ''}`}>
                  {notification.message}
                </span>
                <ChevronRight size={16} className="text-[#9CA3AF] hover:text-[#4F46E5]" />
              </li>
            ))
          ) : (
            <p className="text-center py-4 text-[#6B7280]">No new notifications</p>
          )}
        </ul>
        <a
          href="/tenant/notifications"
          className="mt-4 inline-flex items-center text-[#4F46E5] hover:text-[#6366F1] transition-colors duration-300"
        >
          View all notifications
          <ChevronRight size={16} className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default TenantDashboard;