import React from 'react';
import URLShortener from '../components/URLShortener';
import FeatureGrid from '../components/FeatureGrid';

const Home: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)]">
      <div className="pt-8 sm:pt-12 lg:pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Shorten URLs
              </span>
              <br />
              <span className="text-slate-700 dark:text-slate-300">
                Track Everything
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
              Create short, memorable links with powerful analytics and customization options. 
              Perfect for social media, marketing campaigns, and personal use.
            </p>
          </div>
          
          <URLShortener />
        </div>
      </div>

      <FeatureGrid />
    </div>
  );
};

export default Home;