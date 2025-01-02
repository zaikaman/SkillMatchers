import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface DashboardProps {
  userType: 'employer' | 'worker'
  userData: {
    name: string
    matches: number
    unreadMessages: number
    upcomingInterviews: number
  }
}

const Dashboard: React.FC<DashboardProps> = ({ userType, userData }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Welcome Message */}
      <div className="text-center mb-12">
        <h1 className="heading-lg gradient-text mb-4">Hey {userData.name}! 👋</h1>
        <p className="text-gray-600">
          {userType === 'worker' 
            ? 'Ready to find your dream job? Start swiping!' 
            : 'Ready to find great talent? Start swiping!'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
          <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">👥</span>
          </div>
          <div className="text-2xl font-bold gradient-text mb-1">{userData.matches}</div>
          <div className="text-gray-600 text-sm">New Matches</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
          <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">💌</span>
          </div>
          <div className="text-2xl font-bold gradient-text mb-1">{userData.unreadMessages}</div>
          <div className="text-gray-600 text-sm">Messages</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
          <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">📅</span>
          </div>
          <div className="text-2xl font-bold gradient-text mb-1">{userData.upcomingInterviews}</div>
          <div className="text-gray-600 text-sm">Interviews</div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="flex flex-col items-center gap-6">
        {userType === 'employer' && (
          <Link 
            href="/dashboard/employer/create-job"
            className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center group cursor-pointer"
          >
            <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-4xl">✨</span>
            </div>
            <h2 className="text-xl font-bold gradient-text mb-2">Create New Job</h2>
            <p className="text-gray-600">Post a new job opportunity</p>
          </Link>
        )}

        <Link 
          href="/match"
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center group cursor-pointer"
        >
          <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span className="text-4xl">💘</span>
          </div>
          <h2 className="text-xl font-bold gradient-text mb-2">Start Matching</h2>
          <p className="text-gray-600">
            {userType === 'worker' 
              ? 'Swipe through job opportunities' 
              : 'Swipe through potential candidates'}
          </p>
        </Link>

        <div className="grid grid-cols-3 gap-6 w-full max-w-md">
          <Link 
            href="/messages"
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center group"
          >
            <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <span className="text-2xl">💬</span>
            </div>
            <div className="font-semibold">Messages</div>
          </Link>

          <Link 
            href="/matches"
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center group"
          >
            <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <span className="text-2xl">❤️</span>
            </div>
            <div className="font-semibold">Matches</div>
          </Link>

          <Link 
            href="/interviews"
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center group"
          >
            <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📅</span>
            </div>
            <div className="font-semibold">Interviews</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 