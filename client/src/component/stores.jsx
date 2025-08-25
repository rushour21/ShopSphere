import axios from 'axios';
import { Plus, Search } from 'lucide-react'
import React, { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Stores() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const navigate = useNavigate();
  const [stores, steStores] = useState([]);

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/dashboard/storelist`,
          { withCredentials: true }
        );
        if(res.status === 200){
          steStores(res.data.data);
          console.log(res.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  },[]);

  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      const matchesKeyword = 
        store.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        store.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        store.address.toLowerCase().includes(searchKeyword.toLowerCase());
      
      return matchesKeyword;
    });
  }, [searchKeyword, stores]);

  return (
    <div className='flex-1 p-10 h-screen'>
      <div className="flex items-center justify-between mb-6 w-full">
        <h2 className="text-3xl font-bold text-gray-900">Stores Management</h2>
        <Link to= "/dashboard/createstore"><button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Store</span>
        </button></Link>
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
      </div>

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredStores.length} of {stores.length} stores
        </p>
      </div>

      {/* Stores Table */}
      <div className="bg-white rounded-lg shadow-sm h-[70%]">
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
        
        <div className="bg-white divide-y divide-gray-200 h-full overflow-auto">
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
                  {store?.address}
                </div>
                <div className="whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-medium">{store?.overallRate?.toFixed(1)}</span>
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