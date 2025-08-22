import React from 'react';
import { Store, Star, Users, LogOut, Eye, EyeOff,Settings,TrendingUp,User,Mail,MapPin,Calendar, ArrowLeftIcon, ArrowLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StoreDashboard() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = React.useState('dashboard'); // login, dashboard, profile
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = React.useState({});

  // Sample store data
  const storeData = {
    id: 1,
    name: 'Tech Electronics Store',
    email: 'tech@store.com',
    address: '123 Main St, Downtown Area, City Center',
    averageRating: 4.2,
    totalRatings: 156,
    ratingsDistribution: {
      5: 68,
      4: 45,
      3: 28,
      2: 12,
      1: 3
    }
  };

  // Sample ratings data - users who rated this store
  const userRatings = [
    {
      id: 1,
      userName: 'John Michael Smith Johnson',
      userEmail: 'john.smith@email.com',
      userAddress: '123 Elm St, Springfield',
      rating: 5,
      submittedDate: '2024-01-15',
      reviewText: 'Excellent service and great products!'
    },
    {
      id: 2,
      userName: 'Sarah Elizabeth Johnson Williams',
      userEmail: 'sarah.johnson@email.com',
      userAddress: '456 Maple Ave, Riverside',
      rating: 4,
      submittedDate: '2024-01-14',
      reviewText: 'Good experience overall, will come back.'
    },
    {
      id: 3,
      userName: 'Michael Robert Davis Brown',
      userEmail: 'michael.davis@email.com',
      userAddress: '789 Oak Blvd, Hillside',
      rating: 3,
      submittedDate: '2024-01-13',
      reviewText: 'Average service, room for improvement.'
    },
    {
      id: 4,
      userName: 'Emily Grace Wilson Martinez',
      userEmail: 'emily.wilson@email.com',
      userAddress: '321 Pine St, Westwood',
      rating: 5,
      submittedDate: '2024-01-12',
      reviewText: 'Outstanding customer service!'
    },
    {
      id: 5,
      userName: 'David Christopher Anderson',
      userEmail: 'david.anderson@email.com',
      userAddress: '654 Cedar Ave, Northside',
      rating: 4,
      submittedDate: '2024-01-11',
      reviewText: 'Quality products and friendly staff.'
    },
    {
      id: 6,
      userName: 'Lisa Michelle Thompson Lee',
      userEmail: 'lisa.thompson@email.com',
      userAddress: '987 Birch Rd, Eastside',
      rating: 2,
      submittedDate: '2024-01-10',
      reviewText: 'Service could be better.'
    }
  ];

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({
      email: '',
      password: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    navigate('/')
  };

  const handlePasswordUpdate = () => {
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
      // Password update logic here
      alert('Password updated successfully!');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
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
                  <h1 className="text-2xl font-bold text-gray-900">{storeData.name}</h1>
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
                      {storeData.averageRating}
                    </span>
                    <div className="flex items-center space-x-1">
                      <StarRating rating={Math.round(storeData.averageRating)} size="w-5 h-5" />
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
                    {storeData.totalRatings}
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
                      count={storeData.ratingsDistribution[stars]}
                      total={storeData.totalRatings}
                    />
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Positive Ratings (4-5 ⭐)</span>
                    <span className="font-medium text-emerald-600">
                      {Math.round(((storeData.ratingsDistribution[4] + storeData.ratingsDistribution[5]) / storeData.totalRatings) * 100)}%
                    </span>
                  </div>
                </div>
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
                  {userRatings.map((rating) => (
                    <div key={rating.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{rating.userName}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Mail className="h-3 w-3" />
                                  <span>{rating.userEmail}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                            <MapPin className="h-3 w-3" />
                            <span>{rating.userAddress}</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <StarRating rating={rating.rating} size="w-4 h-4" />
                            <span className="font-semibold text-gray-900">{rating.rating}/5</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(rating.submittedDate).toLocaleDateString()}</span>
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
                  ))}
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
};
