import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, Filter, TrendingUp } from 'lucide-react';
import { supabase, getCurrentUser, signOut } from '../lib/supabase';
import AuthModal from './Auth/AuthModal';
import { User as UserType } from '../lib/types';
import { useLocalization } from '../contexts/LocalizationContext';

interface HeaderProps {
  onFilter: (filters: FilterOptions) => void;
  cartItemsCount: number;
  wishlistItemsCount: number;
  onSearch: (query: string) => void;
  onShowCart: () => void;
  onShowWishlist: () => void;
  onNavigateToSection: (section: string) => void;
}

export interface FilterOptions {
  gender: string;
  collection: string;
  category: string;
  searchQuery: string;
  sortBy: string;
}

const Header: React.FC<HeaderProps> = ({
  onFilter,
  cartItemsCount,
  wishlistItemsCount,
  onSearch,
  onShowCart,
  onShowWishlist,
  onNavigateToSection
}) => {
  const { t } = useLocalization();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    gender: 'all',
    collection: 'all',
    category: 'all',
    searchQuery: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    // Check for existing user session
    getCurrentUser().then(setUser);

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    handleFilterChange({ searchQuery: query });
    onSearch(query);
  };

  const handleGenderFilter = (gender: string) => {
    handleFilterChange({ gender });
    setIsMenuOpen(false);
    onNavigateToSection('collections');
  };

  const handleCollectionFilter = (collection: string, category?: string) => {
    const filterUpdate: Partial<FilterOptions> = { collection };
    if (category) {
      filterUpdate.category = category;
    }
    handleFilterChange(filterUpdate);
    setIsShopOpen(false);
    setIsMenuOpen(false);
    onNavigateToSection('collections');
  };

  const handleAboutNavigation = (section: string) => {
    setIsAboutOpen(false);
    setIsMenuOpen(false);
    if (section === 'about') {
      navigate('/about');
    } else {
      onNavigateToSection(section);
    }
  };

  return (
    <>
      <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/98 backdrop-blur-md shadow-2xl border-b border-white/10' : 'bg-black/40 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-5 text-white">
          {/* Left side: Empty for balance */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
          </div>

          {/* Center: Logo + Name */}
          <button
            onClick={() => onNavigateToSection('hero')}
            className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-all duration-300"
          >
            {/* Tower Symbol */}
            <div className="w-7 h-7 md:w-8 md:h-8 border border-white/60 flex items-center justify-center">
              <div className="w-0.5 h-4 md:h-5 bg-white"></div>
            </div>
            <span className="text-xl md:text-2xl font-black uppercase tracking-tighter">MENÕ</span>
          </button>

          {/* Right side: Navigation & Icons */}
          <div className="flex items-center gap-4 relative">
            {/* Shop Button */}
            <button
              onClick={() => handleCollectionFilter('all')}
              className="hidden md:block hover:text-white/80 transition-colors duration-300 tracking-wide-elegant font-medium text-xs uppercase"
            >
              Shop
            </button>

            {/* About MENÕ Button */}
            <button
              onClick={() => handleAboutNavigation('about')}
              className="hidden md:block hover:text-white/80 transition-colors duration-300 tracking-wide-elegant font-medium text-xs uppercase"
            >
              About MENÕ
            </button>

            {/* Search */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder-white/70 focus:outline-none focus:border-[#fbbf2480] focus:ring-2 focus:ring-[#fbbf2480]/20 transition-all duration-300 w-48"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="hidden md:block hover:text-[#fbbf2480] transition-all duration-300 relative"
              title="Advanced Filters"
            >
              <Filter className="w-5 h-5" />
              {(filters.collection !== 'all' || filters.category !== 'all' || filters.searchQuery) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#fbbf2480] rounded-full"></span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={onShowWishlist}
              className="hover:text-[#fbbf2480] transition-all duration-300 relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#fbbf2480] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {wishlistItemsCount}
                </span>
              )}
            </button>
            
            {/* Shopping Bag */}
            <button
              onClick={onShowCart}
              className="relative hover:text-[#fbbf2480] transition-all duration-300"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#fbbf2480] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Authentication */}
            {user ? (
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <User className="w-5 h-5 hover:text-[#fbbf2480] transition-all duration-300" />
                  <span className="text-sm hidden lg:block truncate max-w-24">{user.email}</span>
                </div>
                <div className="absolute top-full right-0 bg-black/95 backdrop-blur-md text-white p-4 w-48 z-50 opacity-0 group-hover:opacity-100 transform scale-y-0 group-hover:scale-y-100 transition-all duration-300 origin-top border border-[#fbbf2480]/30 rounded-lg shadow-2xl">
                  <div className="space-y-2">
                    <p className="text-xs text-[#fbbf2480] border-b border-[#fbbf2480]/30 pb-2">Welcome back!</p>
                    <button className="w-full text-left hover:text-[#fbbf2480] transition-colors py-1">My Account</button>
                    <button className="w-full text-left hover:text-[#fbbf2480] transition-colors py-1">Order History</button>
                    <button 
                      onClick={handleSignOut}
                      className="w-full text-left hover:text-[#fbbf2480] transition-colors py-1 border-t border-white/10 pt-2"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <User 
                className="w-5 h-5 cursor-pointer hover:text-[#fbbf2480] transition-all duration-300" 
                onClick={() => setIsAuthModalOpen(true)}
                title={t('signIn')}
              />
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden hover:text-[#fbbf2480] transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Advanced Filter Panel */}
        {isFilterOpen && (
          <div className="bg-black/95 backdrop-blur-md border-t border-[#fbbf2480]/30 p-6 shadow-2xl">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-serif font-medium text-[#fbbf2480] flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Advanced Filters
                </h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Collection Filter */}
                <div>
                  <label className="block text-sm font-medium text-[#fbbf2480] mb-2">Collection</label>
                  <select
                    value={filters.collection}
                    onChange={(e) => handleFilterChange({ collection: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#fbbf2480] focus:ring-2 focus:ring-[#fbbf2480]/20"
                  >
                    <option value="all">All Collections</option>
                    <option value="origin">THE ORIGIN</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-[#fbbf2480] mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange({ category: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#fbbf2480] focus:ring-2 focus:ring-[#fbbf2480]/20"
                  >
                    <option value="all">All Categories</option>
                    <option value="jacket">Jackets</option>
                    <option value="tshirt">T-Shirts</option>
                    <option value="shorts">Shorts</option>
                    <option value="skirt">Skirts</option>
                    <option value="pants">Pants</option>
                    <option value="set">Sets</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-[#fbbf2480] mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#fbbf2480] focus:ring-2 focus:ring-[#fbbf2480]/20"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      const resetFilters = {
                        gender: 'all',
                        collection: 'all',
                        category: 'all',
                        searchQuery: '',
                        sortBy: 'newest'
                      };
                      setFilters(resetFilters);
                      setSearchQuery('');
                      onFilter(resetFilters);
                    }}
                    className="w-full bg-[#fbbf2480] text-white px-4 py-2 rounded font-medium hover:bg-[#fbbf2480]/80 transition-colors flex items-center justify-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md text-white border-t border-[#fbbf2480]/30">
            <div className="p-6 space-y-6">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-[#fbbf2480] focus:ring-2 focus:ring-[#fbbf2480]/20"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
              </div>

              {/* Mobile Shop Button */}
              <div className="border-b border-white/10 pb-4">
                <button
                  onClick={() => { handleCollectionFilter('all'); setIsMenuOpen(false); }}
                  className="w-full text-left hover:text-white/80 transition-colors font-semibold text-lg uppercase tracking-wide"
                >
                  Shop Collection
                </button>
              </div>

              {/* Mobile About Menu */}
              <div className="border-b border-white/10 pb-4">
                <button
                  onClick={() => handleAboutNavigation('about')}
                  className="w-full text-left hover:text-white/80 transition-colors font-semibold text-lg uppercase tracking-wide"
                >
                  About MENÕ
                </button>
              </div>

              {/* Mobile Auth */}
              {!user && (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full bg-[#fbbf2480] text-white px-6 py-3 rounded font-medium hover:bg-[#fbbf2480]/80 transition-colors"
                >
                  Sign In / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Header;