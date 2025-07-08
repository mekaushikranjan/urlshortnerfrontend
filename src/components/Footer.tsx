import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg border-t border-slate-200/50 dark:border-slate-700/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-slate-600 dark:text-slate-400">
          <div className="flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by Pranav</span>
          </div>
          <div className="mt-2 text-sm">
            © 2025 ShortURL. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;