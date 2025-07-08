import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link as LinkIcon, Home, History, Moon, Sun, Menu, X } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  return (
    <>
      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl group-hover:scale-105 transition-transform duration-200 shadow-lg">
                <LinkIcon className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ShortURL
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 ${
                  isActive('/') 
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 shadow-sm' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </Link>
              
              <Link
                to="/history"
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 ${
                  isActive('/history') 
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 shadow-sm' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <History className="w-5 h-5" />
                <span className="font-medium">History</span>
              </Link>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 shadow-sm"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <Menu 
                    className={`absolute w-6 h-6 text-slate-600 dark:text-slate-300 transition-all duration-300 ${
                      sidebarOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                    }`} 
                  />
                  <X 
                    className={`absolute w-6 h-6 text-slate-600 dark:text-slate-300 transition-all duration-300 ${
                      sidebarOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                    }`} 
                  />
                </div>
              </button>

              {/* Desktop Dark Mode Toggle */}
              <div className="hidden lg:block">
                <label className="switch relative inline-block">
                  <input 
                    type="checkbox" 
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    className="opacity-0 w-0 h-0"
                  />
                  <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-slate-300 dark:bg-slate-600 transition-all duration-300 rounded-full w-14 h-8 before:absolute before:content-[''] before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-white before:transition-all before:duration-300 before:rounded-full before:shadow-md"></span>
                  <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                    <Sun className="w-4 h-4 text-yellow-500 transition-opacity duration-300" style={{ opacity: darkMode ? 0 : 1 }} />
                    <Moon className="w-4 h-4 text-slate-300 transition-opacity duration-300" style={{ opacity: darkMode ? 1 : 0 }} />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 ${
          sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeSidebar}
      />

      {/* Mobile Sidebar */}
      <div className={`fixed top-20 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-700/50 z-40 lg:hidden transform transition-all duration-300 ease-out shadow-xl ${
        sidebarOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="px-6 py-8 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
          {/* Navigation Links */}
          <div className="space-y-2">
            <Link
              to="/"
              onClick={closeSidebar}
              className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 shadow-sm' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-lg font-medium">Home</span>
            </Link>
            
            <Link
              to="/history"
              onClick={closeSidebar}
              className={`flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-200 ${
                isActive('/history') 
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 shadow-sm' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <History className="w-6 h-6" />
              <span className="text-lg font-medium">History</span>
            </Link>
          </div>

          {/* Divider */}
          <div className="py-4">
            <div className="h-px bg-slate-200 dark:bg-slate-700"></div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="px-2 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <div className="flex items-center justify-start gap-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg">
                  {darkMode ? (
                    <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  ) : (
                    <Sun className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  )}
                </div>
                <div>
                  <span className="text-lg font-medium text-slate-700 dark:text-slate-300">
                    Dark Mode
                  </span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {darkMode ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
              <label className="switch relative inline-block">
                <input 
                  type="checkbox" 
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  className="opacity-0 w-0 h-0"
                />
                <span className="slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-slate-300 dark:bg-slate-600 transition-all duration-300 rounded-full w-12 h-7 before:absolute before:content-[''] before:h-5 before:w-5 before:left-1 before:bottom-1 before:bg-white before:transition-all before:duration-300 before:rounded-full before:shadow-md"></span>
                <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
                  <Sun className="w-3 h-3 text-yellow-500 transition-opacity duration-300" style={{ opacity: darkMode ? 0 : 1 }} />
                  <Moon className="w-3 h-3 text-slate-300 transition-opacity duration-300" style={{ opacity: darkMode ? 1 : 0 }} />
                </div>
              </label>
            </div>
          </div>

          {/* Footer Info */}
          <div className="pt-6 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2025 ShortURL
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Made with ❤️ by Pranav
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;