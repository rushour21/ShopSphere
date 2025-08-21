
import React, { useState } from 'react';
import { Users, Store, Star, Plus, Search, Filter, LogOut,Eye,Edit,ChevronDown,ArrowUpDown} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    address: '',
    role: ''
  });

  // Sample data
  const dashboardStats = {
    totalUsers: 1247,
    totalStores: 89,
    totalRatings: 3456
  };

  const stores = [
    { id: 1, name: 'Tech Electronics Store', email: 'tech@store.com', address: '123 Main St, City', rating: 4.2 },
    { id: 2, name: 'Fashion Boutique Central', email: 'fashion@boutique.com', address: '456 Oak Ave, Downtown', rating: 4.7 },
    { id: 3, name: 'Grocery Mart Express', email: 'contact@grocerymart.com', address: '789 Pine Rd, Suburb', rating: 3.8 }
  ];

  const users = [
    { id: 1, name: 'John Michael Smith', email: 'john.smith@email.com', address: '123 Elm St, Springfield', role: 'Normal User' },
    { id: 2, name: 'Sarah Elizabeth Johnson', email: 'sarah.johnson@email.com', address: '456 Maple Ave, Riverside', role: 'Store Owner' },
    { id: 3, name: 'Michael Robert Davis', email: 'michael.davis@email.com', address: '789 Oak Blvd, Hillside', role: 'System Administrator' }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const StatCard = ({ icon: Icon, title, value, bgColor }) => (
    <div className={`${bgColor} rounded-xl p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value.toLocaleString()}</p>
        </div>
        <Icon className="h-12 w-12 text-white/60" />
      </div>
    </div>
  );

  const TableHeader = ({ children, sortKey, onSort }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
      onClick={() => onSort && onSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {onSort && <ArrowUpDown className="h-4 w-4" />}
      </div>
    </th>
  );

  const AddUserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Add New User</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Min 20, Max 60 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="8-16 chars, 1 uppercase, 1 special"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Max 400 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Normal User">Normal User</option>
              <option value="Store Owner">Store Owner</option>
              <option value="System Administrator">System Administrator</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              onClick={() => {
                // Handle form submission logic here
                setShowAddUserModal(false);
              }}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add User
            </button>
            <button
              onClick={() => setShowAddUserModal(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <div className="p-6">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('stores')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'stores' 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Stores
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'users' 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Users
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
              
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
                    onClick={() => setActiveTab('stores')}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Store className="h-6 w-6 text-green-600" />
                    <span className="font-medium">Manage Stores</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('users')}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Users className="h-6 w-6 text-purple-600" />
                    <span className="font-medium">Manage Users</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stores' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Stores Management</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Store</span>
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    placeholder="Filter by name..."
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.name}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Filter by email..."
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.email}
                    onChange={(e) => handleFilterChange('email', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Filter by address..."
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.address}
                    onChange={(e) => handleFilterChange('address', e.target.value)}
                  />
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <span>Apply Filters</span>
                  </button>
                </div>
              </div>

              {/* Stores Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <TableHeader sortKey="name" onSort={handleSort}>Name</TableHeader>
                      <TableHeader sortKey="email" onSort={handleSort}>Email</TableHeader>
                      <TableHeader sortKey="address" onSort={handleSort}>Address</TableHeader>
                      <TableHeader sortKey="rating" onSort={handleSort}>Rating</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stores.map((store) => (
                      <tr key={store.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {store.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {store.email}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {store.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{store.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Users Management</h2>
                <button 
                  onClick={() => setShowAddUserModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add User</span>
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <input
                    type="text"
                    placeholder="Filter by name..."
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.name}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Filter by email..."
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.email}
                    onChange={(e) => handleFilterChange('email', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Filter by address..."
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.address}
                    onChange={(e) => handleFilterChange('address', e.target.value)}
                  />
                  <select
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.role}
                    onChange={(e) => handleFilterChange('role', e.target.value)}
                  >
                    <option value="">All Roles</option>
                    <option value="Normal User">Normal User</option>
                    <option value="Store Owner">Store Owner</option>
                    <option value="System Administrator">System Administrator</option>
                  </select>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <span>Apply Filters</span>
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <TableHeader sortKey="name" onSort={handleSort}>Name</TableHeader>
                      <TableHeader sortKey="email" onSort={handleSort}>Email</TableHeader>
                      <TableHeader sortKey="address" onSort={handleSort}>Address</TableHeader>
                      <TableHeader sortKey="role" onSort={handleSort}>Role</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {user.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'System Administrator' 
                              ? 'bg-red-100 text-red-800'
                              : user.role === 'Store Owner'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {showAddUserModal && <AddUserModal />}
    </div>
  );
}
