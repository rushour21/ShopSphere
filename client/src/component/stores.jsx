import { Plus, Search } from 'lucide-react'
import React, { useState, useMemo } from 'react'

export default function Stores() {
  const [searchKeyword, setSearchKeyword] = useState('')

  const stores = [
    { id: 1, name: 'Tech Electronics Store', email: 'tech@store.com', address: '123 Main St, City', rating: 4.2 },
    { id: 2, name: 'Fashion Boutique Central', email: 'fashion@boutique.com', address: '456 Oak Ave, Downtown', rating: 4.7 },
    { id: 3, name: 'Grocery Mart Express', email: 'contact@grocerymart.com', address: '789 Pine Rd, Suburb', rating: 3.8 },
    { id: 4, name: 'Books & Coffee Corner', email: 'info@bookscoffee.com', address: '321 Library St, City', rating: 4.5 },
    { id: 5, name: 'Sports Gear Hub', email: 'sales@sportsgear.com', address: '654 Athletic Ave, Downtown', rating: 4.1 },
    { id: 6, name: 'Home Decor Paradise', email: 'hello@homedecor.com', address: '987 Design Blvd, Suburb', rating: 4.3 }
  ];

  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      const matchesKeyword = 
        store.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        store.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        store.address.toLowerCase().includes(searchKeyword.toLowerCase());
      
      return matchesKeyword;
    });
  }, [searchKeyword]);

  return (
    <div className='flex-1 p-10'>
      <div className="flex items-center justify-between mb-6 w-full">
        <h2 className="text-3xl font-bold text-gray-900">Stores Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Store</span>
        </button>
      </div>

      {/* Search Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
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
          
          {/* Search Button */}
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-medium">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
        </div>

        {/* Active Filters Display 
        {searchKeyword && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Keyword: {searchKeyword}
              <button 
                onClick={() => setSearchKeyword('')}
                className="ml-2 hover:text-blue-600"
              >
                ×
              </button>
            </span>
          </div>
        )}*/}
      </div>

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredStores.length} of {stores.length} stores
        </p>
      </div>

      {/* Stores Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 grid grid-cols-4 gap-4 border-b border-gray-200">
          <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 flex items-center space-x-1">
            <span>Name</span>
            <span className='text-sm text-gray-400'>↕</span>
          </div>
          <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 flex items-center space-x-1" >
            <span>Email</span>
            <span className='text-sm text-gray-400'>↕</span>
          </div>
          <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 flex items-center space-x-1">
            <span>Address</span>
            <span className='text-sm text-gray-400'>↕</span>
          </div>
          <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 flex items-center space-x-1">
            <span>Rating</span>
            <span className='text-sm text-gray-400'>↕</span>
          </div>
        </div>  
        
        <div className="bg-white divide-y divide-gray-200">
          {filteredStores.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">No stores found matching your search criteria.</p>
            </div>
          ) : (
            filteredStores.map((store) => (
              <div key={store.id} className="px-6 py-4 hover:bg-gray-50 grid grid-cols-4 gap-4 items-center">
                <div className="whitespace-nowrap font-medium text-gray-900">
                  {store.name}
                </div>
                <div className="whitespace-nowrap text-gray-500">
                  {store.email}
                </div>
                <div className="text-gray-500">
                  {store.address}
                </div>
                <div className="whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-medium">{store.rating}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>  
      </div>
    </div>
  )
}