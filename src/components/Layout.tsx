import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 transition-all duration-300 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-4 sm:pt-6 lg:pt-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;