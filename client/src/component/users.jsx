import axios from 'axios'
import { Plus, Search, ChevronDown } from 'lucide-react'
import React, { useState, useMemo, useEffect } from 'react'
import UserModal from './createUserModal'


export default function Users() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false)

  const [users, setUsers] = useState([])
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/dashboard/userlist`,
          { withCredentials: true }
        )
        if (res.status === 200) {
          setUsers(res.data.data)
          console.log(res.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  // mapping backend roles to display labels
  const roleMap = {
    USER: 'Normal User',
    STORE_OWNER: 'Store Owner',
    SYSTEM_ADMIN: 'System Administrator',
  }

  const roles = Object.values(roleMap)

  // extract unique city/area (after comma)
  const locations = [
    ...new Set(
      users.map((user) => {
        if (!user.address) return ''
        const parts = user.address.split(',')
        return parts.length > 1 ? parts[1].trim() : parts[0].trim()
      })
    ),
  ].filter((loc) => loc !== '')

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const displayRole = roleMap[user.role] || user.role
      const matchesKeyword =
        user.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        user.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        displayRole.toLowerCase().includes(searchKeyword.toLowerCase())

      const matchesRole = selectedRole === '' || displayRole === selectedRole
      const matchesLocation =
        selectedLocation === '' || user.address?.includes(selectedLocation)

      return matchesKeyword && matchesRole && matchesLocation
    })
  }, [searchKeyword, selectedRole, selectedLocation, users])

  return (
    <div className="flex-1 p-5 h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Users Management</h2>
        <button onClick={() => setShowAddUserModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Search Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-3 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Keyword Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter keyword / Name / Email"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Role Filter */}
          <div className="relative min-w-[200px]">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <span className={selectedRole ? 'text-gray-900' : 'text-gray-500'}>
                {selectedRole || 'Select Role'}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
            {isRoleDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <div
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-900"
                  onClick={() => {
                    setSelectedRole('')
                    setIsRoleDropdownOpen(false)
                  }}
                >
                  All Roles
                </div>
                {roles.map((role) => (
                  <div
                    key={role}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-900"
                    onClick={() => {
                      setSelectedRole(role)
                      setIsRoleDropdownOpen(false)
                    }}
                  >
                    {role}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div className="min-w-[180px]">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
            >
              <option value="">Enter location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-medium">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
        </div>

        {/* Active Filters Display */}
        {(searchKeyword || selectedRole || selectedLocation) && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchKeyword && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Keyword: {searchKeyword}
                <button
                  onClick={() => setSearchKeyword('')}
                  className="ml-2 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
            {selectedRole && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Role: {selectedRole}
                <button
                  onClick={() => setSelectedRole('')}
                  className="ml-2 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            )}
            {selectedLocation && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Location: {selectedLocation}
                <button
                  onClick={() => setSelectedLocation('')}
                  className="ml-2 hover:text-purple-600"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredUsers.length} of {users.length} users
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm h-[70%]">
        <div className="bg-gray-50 px-6 py-3 grid grid-cols-5 gap-4 border-b border-gray-200">
          <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </div>
          <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </div>
          <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Address
          </div>
          <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Role
          </div>
          <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Rating
          </div>
        </div>

        <div className="bg-white divide-y divide-gray-200 overflow-auto h-full">
          {filteredUsers.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">No users found matching your search criteria.</p>
            </div>
          ) : (
            filteredUsers.map((user, idx) => {
              const displayRole = roleMap[user.role] || user.role
              return (
                <div
                  key={idx}
                  className="px-6 py-4 hover:bg-gray-50 grid grid-cols-5 gap-4 items-center"
                >
                  <div className="whitespace-nowrap font-medium text-gray-900">
                    {user.name}
                  </div>
                  <div className="whitespace-nowrap text-gray-500">
                    {user.email}
                  </div>
                  <div className="text-gray-500">{user.address}</div>
                  <div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        displayRole === 'System Administrator'
                          ? 'bg-red-100 text-red-800'
                          : displayRole === 'Store Owner'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {displayRole}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {displayRole === 'Store Owner' ? (
                      <>
                        <span className="text-yellow-400">★</span>
                        <span className="font-medium">
                          {user.store?.overallRate ?? 0}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
      {/* User Modal */}
      <UserModal 
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onUserAdded={(newUser) => setUsers((prev) => [...prev, newUser])}
      />
    </div>
  )
}
