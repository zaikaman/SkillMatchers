import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';

export default function DashboardPage() {
  // Normally this would come from your backend/API
  const mockUserData = {
    name: "Alex Johnson",
    matches: 5,
    unreadMessages: 3,
    upcomingInterviews: 2
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Dashboard 
        userType="employer"
        userData={mockUserData}
      />
    </main>
  );
} 