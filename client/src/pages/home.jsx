import React, { useState } from 'react';
import LoginModal from '../component/loginModal';
import SignUpModal from '../component/signUpModal';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-800">StoreRate</span>
            <span className="text-xs text-gray-400">for shoppers</span>
          </div>
          <nav className="flex gap-4 items-center">
            <button className="text-gray-500 hover:text-blue-600" onClick={() => setShowLoginModal(true)}>
              Login
            </button>
            <button className="text-white bg-blue-600 rounded px-4 py-2 hover:bg-blue-700" onClick={() => setShowSignupModal(true)}>
              Sign Up
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="bg-gray-50 py-12">
          <div className="max-w-xl mx-auto text-center px-5">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Discover & Rate Stores Near You
            </h1>
            <p className="text-md md:text-lg text-gray-600 mb-8">
              Honest ratings from real shoppers. Find trending stores, share your experience, and help others shop better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 text-base" onClick={() => setShowSignupModal(true)}>
                Get Started Free
              </button>
              <button className="border border-gray-300 px-6 py-3 rounded text-gray-700 hover:bg-gray-100">
                Browse Stores
              </button>
            </div>
          </div>
        </section>

        {/* Store Highlights */}
        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-5">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Top Features
              </h2>
              <p className="text-gray-600 text-base">
                Find the best, share your voice, and join a review-driven community.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-5 border rounded-lg text-center bg-gray-50">
                <span className="inline-block mb-2 text-3xl">⭐</span>
                <h3 className="font-semibold text-lg mb-1 text-gray-800">Quick Ratings</h3>
                <p className="text-gray-600 text-sm">
                  Leave simple 1-5 star ratings and add details so your feedback matters.
                </p>
              </div>
              <div className="p-5 border rounded-lg text-center bg-gray-50">
                <span className="inline-block mb-2 text-3xl">🔍</span>
                <h3 className="font-semibold text-lg mb-1 text-gray-800">Local Store Search</h3>
                <p className="text-gray-600 text-sm">
                  Map-based locator lets you quickly find well-rated stores nearby.
                </p>
              </div>
              <div className="p-5 border rounded-lg text-center bg-gray-50">
                <span className="inline-block mb-2 text-3xl">👥</span>
                <h3 className="font-semibold text-lg mb-1 text-gray-800">Genuine Reviews</h3>
                <p className="text-gray-600 text-sm">
                  All reviews come from verified shoppers, building trust in the community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Social Proof */}
        <section className="bg-blue-50 pt-12 pb-10">
          <div className="max-w-2xl mx-auto text-center px-5">
            <h2 className="text-xl font-semibold text-blue-700 mb-5">Why Users Love StoreRate</h2>
            <blockquote className="italic text-gray-800 mb-2">
              "I found my favorite store thanks to honest reviews!"
            </blockquote>
            <span className="block text-sm text-gray-600 mb-4">— Kavya R.</span>
            <blockquote className="italic text-gray-800">
              "The local search made it easy to shop for quality products."
            </blockquote>
            <span className="block text-sm text-gray-600">— Neil S.</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 pt-10 pb-3">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <span className="font-semibold text-lg text-white">StoreRate</span>
            <p className="mt-4 text-sm text-gray-400">
              Where shoppers speak and stores listen.
            </p>
          </div>
          <div>
            <div className="mb-2 text-white font-bold text-base">Get Started</div>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button className="hover:text-white">Sign Up</button></li>
              <li><button className="hover:text-white">Browse Stores</button></li>
            </ul>
          </div>
          <div>
            <div className="mb-2 text-white font-bold text-base">Company</div>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button className="hover:text-white">About</button></li>
              <li><button className="hover:text-white">Contact</button></li>
            </ul>
          </div>
          <div>
            <div className="mb-2 text-white font-bold text-base">Legal</div>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button className="hover:text-white">Privacy Policy</button></li>
              <li><button className="hover:text-white">Terms</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-xs">
          &copy; 2025 StoreRate. All rights reserved.
        </div>
      </footer>

      {/* Modals - Pass close functions as props */}
      {showLoginModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center z-50"
          onClick={() => setShowLoginModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <LoginModal onClose={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}

      {showSignupModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center z-50"
          onClick={() => setShowSignupModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <SignUpModal onClose={() => setShowSignupModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}