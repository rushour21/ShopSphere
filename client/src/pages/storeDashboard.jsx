import React, { useEffect, useState } from 'react';
import { Store, Star, Users, LogOut, Eye, EyeOff, Settings, TrendingUp, User, Mail, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StoreDashboard() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState('dashboard'); // dashboard, profile
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const [storeData, setStoreData] = useState({});
  
  useEffect(() => {    
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/storeinfo`,
          { withCredentials: true })
        if (res.status === 200) {
          setStoreData(res.data)
          console.log(res.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  // Early return if no store data
  if (!storeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600">Loading store data...</p>
        </div>
      </div>
    );
  }

  const userRatings = storeData.ratings || [];
  // Calculate ratings distribution from the actual data
  const calculateRatingsDistribution = () => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    userRatings.forEach(rating => {
      if (rating.rating >= 1 && rating.rating <= 5) {
        distribution[rating.rating]++;
      }
    });
    return distribution;
  };

  const ratingsDistribution = calculateRatingsDistribution();
  const totalRatings = userRatings.length;

const StarRating = ({ rating, size = 'w-4 h-4' }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

const RatingDistributionBar = ({ stars, count, total }) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1 w-12">
          <span className="text-sm font-medium">{stars}</span>
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
        </div>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-gray-600 w-8">{count}</span>
      </div>
    );
  };

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

if (currentPage === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Store className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{storeData?.name}</h1>
                  <p className="text-sm text-gray-600">Store Owner Dashboard</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentPage('profile')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
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
          {/* Store Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-3xl font-bold text-emerald-600">
                      {storeData.overallRate || 0}
                    </span>
                    <div className="flex items-center space-x-1">
                      <StarRating rating={Math.round(storeData?.overallRate || 0)} size="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <TrendingUp className="h-12 w-12 text-emerald-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Ratings</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {totalRatings}
                  </p>
                </div>
                <Star className="h-12 w-12 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating Users</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">
                    {userRatings.length}
                  </p>
                </div>
                <Users className="h-12 w-12 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Rating Distribution */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Rating Distribution</h3>
                <div className="space-y-4">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <RatingDistributionBar
                      key={stars}
                      stars={stars}
                      count={ratingsDistribution[stars]}
                      total={totalRatings}
                    />
                  ))}
                </div>
                
                {totalRatings > 0 && (
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Positive Ratings (4-5 ⭐)</span>
                      <span className="font-medium text-emerald-600">
                        {Math.round(((ratingsDistribution[4] + ratingsDistribution[5]) / totalRatings) * 100)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Users Who Rated */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Users Who Rated Your Store</h3>
                  <p className="text-sm text-gray-600 mt-1">Recent customer ratings and feedback</p>
                </div>
                
                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {userRatings.length > 0 ? userRatings.map((rating, index) => (
                    <div key={rating.user?.id || index} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{rating.user?.name || 'Unknown User'}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Mail className="h-3 w-3" />
                                  <span>{rating.user?.email || 'No email provided'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                            <MapPin className="h-3 w-3" />
                            <span>No address provided</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <StarRating rating={rating.rating} size="w-4 h-4" />
                            <span className="font-semibold text-gray-900">{rating.rating}/5</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>{rating.submittedDate ? new Date(rating.submittedDate).toLocaleDateString() : 'Date not available'}</span>
                          </div>
                        </div>
                      </div>
                      
                      {rating.reviewText && (
                        <div className="ml-13">
                          <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 italic">
                            "{rating.reviewText}"
                          </p>
                        </div>
                      )}
                    </div>
                  )) : (
                    <div className="p-6 text-center text-gray-500">
                      <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p>No ratings yet</p>
                      <p className="text-sm">Your store hasn't received any ratings yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Profile/Settings Page
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
          {/* Store Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Store Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Store className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-gray-900">{storeData.name}</p>
                  <p className="text-sm text-gray-600">Store Name</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-gray-900">{storeData.email}</p>
                  <p className="text-sm text-gray-600">Store Email</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">{storeData.address}</p>
                  <p className="text-sm text-gray-600">Store Address</p>
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

  return null;
}