// CreateStore.jsx
import React, { useState, useEffect } from 'react';
import { Save, User, Mail, MapPin, Users, X, CheckCircle } from 'lucide-react';
import axios from 'axios';
import validator from 'validator';

export default function CreateStore() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        ownerId: ''
    });

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [usersLoading, setUsersLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    // Fetch users for dropdown
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/usersToassign`,
                    { withCredentials: true }
                );
                if (res.status === 200) {
                    setUsers(res.data.getusers);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setErrors({ general: 'Failed to load users' });
            } finally {
                setUsersLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Convert ownerId to number, keep other fields as strings
        const processedValue = name === 'ownerId' ? (value ? Number(value) : '') : value;
        
        setFormData(prev => ({
            ...prev,
            [name]: processedValue
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        
        // Clear success message when form is modified
        if (success) {
            setSuccess(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Store name is required';
        } else if (!validator.isLength(formData.name.trim(), { min: 2, max: 50 })) {
            newErrors.name = 'Store name must be between 2 and 50 characters';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validator.isEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Address validation
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        } else if (!validator.isLength(formData.address.trim(), { min: 10, max: 200 })) {
            newErrors.address = 'Address must be between 10 and 200 characters';
        }

        // Owner validation (Fixed: using ownerId instead of assignedTo)
        if (!formData.ownerId) {
            newErrors.ownerId = 'Please select a store owner';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/cretestore`,
                formData,
                { withCredentials: true }
            );

            if (res.status === 201 || res.status === 200) {
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    address: '',
                    ownerId: ''
                });
                setErrors({});
                setSuccess(true);

                // Hide success message after 3 seconds
                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            if (error.response?.data?.message) {
                setErrors({ general: error.response.data.message });
            } else {
                setErrors({ general: 'Failed to create store. Please try again.' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            address: '',
            ownerId: '' // Fixed: using ownerId instead of assignedTo
        });
        setErrors({});
        setSuccess(false);
    };

    return (
        <div className="flex-1 p-5 bg-gray-50 min-h-screen">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Store</h1>
                    <p className="text-gray-600">Fill in the details to create a new store</p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <p className="text-green-700 font-medium">Store created successfully!</p>
                    </div>
                )}

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* General Error */}
                        {errors.general && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                                <X className="h-5 w-5 text-red-600" />
                                <p className="text-red-600">{errors.general}</p>
                            </div>
                        )}

                        {/* Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                                Store Name *
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full pl-12 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    placeholder="Enter store name"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-sm flex items-center space-x-1">
                                    <X className="h-4 w-4" />
                                    <span>{errors.name}</span>
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                Store Email Address *
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-12 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    placeholder="Enter store email address"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm flex items-center space-x-1">
                                    <X className="h-4 w-4" />
                                    <span>{errors.email}</span>
                                </p>
                            )}
                        </div>

                        {/* Address Field */}
                        <div className="space-y-2">
                            <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
                                Store Address *
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className={`w-full pl-12 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none ${
                                        errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    placeholder="Enter store address"
                                />
                            </div>
                            {errors.address && (
                                <p className="text-red-500 text-sm flex items-center space-x-1">
                                    <X className="h-4 w-4" />
                                    <span>{errors.address}</span>
                                </p>
                            )}
                        </div>

                        {/* Store Owner Field */}
                        <div className="space-y-2">
                            <label htmlFor="ownerId" className="block text-sm font-semibold text-gray-700">
                                Store Owner *
                            </label>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <select
                                    id="ownerId"
                                    name="ownerId"
                                    value={formData.ownerId}
                                    onChange={handleInputChange}
                                    disabled={usersLoading}
                                    className={`w-full pl-12 pr-4 py-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                                        errors.ownerId ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                    } ${usersLoading ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                >
                                    <option value="">
                                        {usersLoading ? 'Loading users...' : 'Select a store owner'}
                                    </option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.ownerId && (
                                <p className="text-red-500 text-sm flex items-center space-x-1">
                                    <X className="h-4 w-4" />
                                    <span>{errors.ownerId}</span>
                                </p>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={loading || usersLoading}
                                className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                <Save className="h-5 w-5" />
                                <span>{loading ? 'Creating Store...' : 'Create Store'}</span>
                            </button>
                            
                            <button
                                type="button"
                                onClick={handleReset}
                                disabled={loading}
                                className="flex-1 sm:flex-none px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                <X className="h-5 w-5" />
                                <span>Reset Form</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}