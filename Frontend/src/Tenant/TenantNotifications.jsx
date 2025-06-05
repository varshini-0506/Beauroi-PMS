import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';

const TenantNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate fetching all notifications for the tenant
    const allNotifications = [
      { id: 1, message: '✅ New lease created for 123 Blue St!', unread: true },
      { id: 2, message: '📄 Lease renewed successfully for Unit 4.', unread: false },
      { id: 3, message: '📅 Reminder: Rent due in 5 days.', unread: false },
      { id: 4, message: '🔧 Maintenance request approved for kitchen sink.', unread: false },
      { id: 5, message: '📢 New community guidelines issued.', unread: true },
    ];
    setNotifications(allNotifications);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] to-[#FAFAFA] p-6 ml-64 text-[#374151] w-full transition-all duration-300">
      <div className="mb-6 flex items-center space-x-2">
        <a
          href="/user/tenantDashboard"
          className="flex items-center text-[#4F46E5] hover:text-[#6366F1] transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="ml-1 text-sm font-medium">Back to Dashboard</span>
        </a>
      </div>

      <h1 className="text-3xl font-bold text-[#4F46E5] mb-4">Your Notifications</h1>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 border-l-[3px] border-[#4F46E5]">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg flex items-center justify-between transition-all duration-300 ${
                notification.unread
                  ? 'bg-[#E0E7FF] border-l-4 border-[#4F46E5]'
                  : 'hover:bg-[#F9FAFB]'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full mr-3 ${
                    notification.unread ? 'bg-[#4F46E5]' : 'bg-[#D1D5DB]'
                  }`}
                ></div>
                <span className={`text-sm ${notification.unread ? 'font-medium' : 'text-[#6B7280]'}`}>
                  {notification.message}
                </span>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  notification.unread
                    ? 'bg-[#4F46E5] text-white'
                    : 'bg-[#F3F4F6] text-[#6B7280]'
                }`}
              >
                {notification.unread ? 'Unread' : 'Read'}
              </span>
            </div>
          ))
        ) : (
          <p className="text-[#6B7280] text-sm text-center">No notifications to display.</p>
        )}
      </div>
    </div>
  );
};

export default TenantNotifications;