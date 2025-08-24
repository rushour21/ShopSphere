import React, { useEffect, useState } from 'react'
import { Search,Star, MapPin,User, LogOut, Eye, EyeOff,  Home,  Settings,  Edit2, Store, ArrowLeft, Mail} from 'lucide-react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const location = useLocation();
  const LoggedUser = location.state;  


  const [searchTerm, setSearchTerm] =useState('');
  const [searchBy, setSearchBy] =useState('name');
  const [selectedStore, setSelectedStore] =useState(null);
  const [showRatingModal, setShowRatingModal] =useState(false);
  const [newRating, setNewRating] =useState(0);
  const [showCurrentPassword, setShowCurrentPassword] =useState(false);
  const [showNewPassword, setShowNewPassword] =  useState(false);

  useEffect(() => {
  const fetchStore = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/getstores`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        setStores(res.data);
        console.log(res.data)
      }
    } catch (err) {
      console.error("Error fetching stores:", err);
    }
  };
  fetchStore();
}, []);
  


  const [stores, setStores] =useState([]);

  const [formData, setFormData] =useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  
    const [formErrors, setFormErrors] =useState({});
  

  const handleLogout = async() => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true })
        if(res.status === 200){
          navigate('/');
        }
    } catch (error) {
      console.log(error.message)
    }
    
  };

  const filteredStores = stores.filter(store => {
    if (!searchTerm) return true;
    const searchValue = searchTerm.toLowerCase();
    if (searchBy === 'name') {
      return store.name.toLowerCase().includes(searchValue);
    } else {
      return store.address.toLowerCase().includes(searchValue);
    }
  });

  const handleRatingSubmit = async() => {
    if (newRating > 0 && selectedStore) {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/addrating/${selectedStore.id}`,
        {rating:newRating},
        { withCredentials: true })

      setStores(prev => prev.map(store => 
        store.id === selectedStore.id 
          ? { ...store, userRating: newRating }
          : store
      ));
      setShowRatingModal(false);
      setNewRating(0);
      setSelectedStore(null);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("Password must be at least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("Must contain an uppercase letter");
    if (!/[!@#$%^&*]/.test(password)) errors.push("Must contain a special character");
    return errors;
  };

  const handlePasswordUpdate = async () => {
    const errors = {};
    
    if (!formData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      errors.newPassword = 'New password is required';
    } else {
      const passwordErrors = validatePassword(formData.newPassword);
      if (passwordErrors.length > 0) {
        errors.newPassword = passwordErrors[0];
      }
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        const res = await axios.patch(
          `${import.meta.env.VITE_API_URL}/updatepassword`,
          {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
          },
          { withCredentials: true }
        );
        if(res.status === 200){
          alert(res.data.message || "Password updated successfully!");
          
          setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        }
      } catch (err) {
        alert(err.response?.data?.message || "Failed to update password");
      }
    }
  };

  const StarRating = ({ rating, onRatingChange, readonly = false, size = 'w-5 h-5' }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onRatingChange && onRatingChange(star)}
            className={`${size} ${!readonly ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-all`}
          >
            <Star
              className={`${size} ${
                star <= rating 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (currentPage === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">ShopSphere</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentPage('profile')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Find Stores</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search stores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="name">Search by Name</option>
                <option value="address">Search by Address</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => (
              <div key={store.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {store.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-start text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm line-clamp-2">{store.address}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Overall Rating:</span>
                      <div className="flex items-center space-x-2">
                        <StarRating rating={Math.round(store.overallRate)} readonly size="w-4 h-4" />
                        <span className="text-sm font-medium text-gray-900">
                          {store.overallRate} ({store.ratings.length} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Your Rating:</span>
                      <div className="flex items-center space-x-2">
                        {store.userRating ? (
                          <>
                            <StarRating rating={store.userRating} readonly size="w-4 h-4" />
                            <span className="text-sm font-medium text-indigo-600">
                              {store.userRating}/5
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500">Not rated</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <button
                        onClick={() => {
                          setSelectedStore(store);
                          setNewRating(store.userRating || 0);
                          setShowRatingModal(true);
                        }}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                      >
                        {store.userRating ? 'Update Rating' : 'Submit Rating'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredStores.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No stores found matching your search.</p>
            </div>
          )}
        </div>

        {showRatingModal && selectedStore && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                {selectedStore.userRating ? 'Update Your Rating' : 'Rate This Store'}
              </h3>
              <p className="text-gray-600 mb-6">{selectedStore.name}</p>
              
              <div className="flex items-center justify-center space-x-2 mb-6">
                <span className="text-sm font-medium text-gray-700">Your Rating:</span>
                <StarRating 
                  rating={newRating} 
                  onRatingChange={setNewRating}
                  size="w-8 h-8"
                />
                <span className="text-lg font-medium text-indigo-600">
                  {newRating > 0 ? `${newRating}/5` : 'Select'}
                </span>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleRatingSubmit}
                  disabled={newRating === 0}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {selectedStore.userRating ? 'Update Rating' : 'Submit Rating'}
                </button>
                <button
                  onClick={() => {
                    setShowRatingModal(false);
                    setSelectedStore(null);
                    setNewRating(0);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentPage === 'profile') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="text-emerald-600 hover:text-emerald-800 transition-colors"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* usesr Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">User Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-gray-900">{LoggedUser.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-gray-900">{LoggedUser.email}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">{LoggedUser.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Password Change */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {formErrors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.currentPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="8-16 chars, 1 uppercase, 1 special char"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {formErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.newPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Confirm your new password"
                />
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
                )}
              </div>

              <button
                onClick={handlePasswordUpdate}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
