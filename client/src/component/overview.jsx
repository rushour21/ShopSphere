import React from 'react'
import StatCard from './stateCard'
import { Plus, Star, Store, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function Overview() {
    const dashboardStats = {
    totalUsers: 1247,
    totalStores: 89,
    totalRatings: 3456
  };
  const navigate = useNavigate()
  return (
    <div className='flex-1 p-10' >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
                icon={Users}
                title="Total Users"
                value={dashboardStats.totalUsers}
                bgColor="bg-gradient-to-r from-blue-500 to-blue-600"
            />
            <StatCard
                icon={Store}
                title="Total Stores"
                value={dashboardStats.totalStores}
                bgColor="bg-gradient-to-r from-green-500 to-green-600"
            />
            <StatCard
                icon={Star}
                title="Total Ratings"
                value={dashboardStats.totalRatings}
                bgColor="bg-gradient-to-r from-purple-500 to-purple-600"
            />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                    onClick={() => setShowAddUserModal(true)}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-6 w-6 text-blue-600" />
                    <span className="font-medium">Add New User</span>
                </button>
                <button
                    onClick={() => navigate('/stores')}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Store className="h-6 w-6 text-green-600" />
                    <span className="font-medium">Manage Stores</span>
                </button>
                <button
                    onClick={() => navigate('/users')}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Users className="h-6 w-6 text-purple-600" />
                    <span className="font-medium">Manage Users</span>
                </button>
            </div>
        </div>
    </div>
  )
}
