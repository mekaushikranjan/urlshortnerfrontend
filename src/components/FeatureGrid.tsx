import React from 'react';
import { 
  Clock, 
  Shield, 
  QrCode, 
  BarChart3, 
  MousePointer, 
  Globe, 
  History,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Expiry Control',
    description: 'Set custom expiration times or make links permanent',
    color: 'text-blue-500'
  },
  {
    icon: Shield,
    title: 'Password Protection',
    description: 'Secure your links with password authentication',
    color: 'text-red-500'
  },
  {
    icon: QrCode,
    title: 'QR Code Generation',
    description: 'Auto-generate QR codes for every shortened URL',
    color: 'text-green-500'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track clicks, visitors, and engagement metrics',
    color: 'text-purple-500'
  },
  {
    icon: MousePointer,
    title: 'Click Tracking',
    description: 'Monitor real-time click data and trends',
    color: 'text-orange-500'
  },
  {
    icon: Globe,
    title: 'Global Insights',
    description: 'See geographic distribution of your audience',
    color: 'text-cyan-500'
  },
  {
    icon: History,
    title: 'URL History',
    description: 'Access and manage all your shortened links',
    color: 'text-pink-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant URL shortening with minimal latency',
    color: 'text-yellow-500'
  }
];

const FeatureGrid: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
          Why Choose Our URL Shortener?
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Powerful features to help you create, manage, and track your short links
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2 text-center">
              {feature.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;