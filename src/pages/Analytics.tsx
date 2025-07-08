import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Eye, 
  Users, 
  Globe, 
  Monitor, 
  Calendar, 
  TrendingUp,
  Clock,
  Smartphone,
  MapPin,
  Activity,
  BarChart3,
  PieChart,
  Network,
  AlertCircle,
  Loader
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Pie
} from 'recharts';
import { useURL } from '../contexts/URLContext';
import type { AnalyticsData } from '../contexts/URLContext';

const Analytics: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getUrlById, getAnalytics } = useURL();
  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const url = id ? getUrlById(id) : null;

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const analyticsData = await getAnalytics(id);
        setAnalytics(analyticsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id, getAnalytics]);

  if (!url) {
    return (
      <div className="min-h-[calc(100vh-5rem)] pt-4 sm:pt-6 lg:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              URL Not Found
            </h1>
            <Link
              to="/history"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
            >
              Back to History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] pt-4 sm:pt-6 lg:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">Loading analytics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-5rem)] pt-4 sm:pt-6 lg:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
              Failed to Load Analytics
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
            <Link
              to="/history"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
            >
              Back to History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  const topCountries = Object.entries(analytics.countries)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const topStates = Object.entries(analytics.states)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const topDevices = Object.entries(analytics.devices)
    .sort(([, a], [, b]) => b - a);

  const topBrowsers = Object.entries(analytics.browsers)
    .sort(([, a], [, b]) => b - a);

  const topOS = Object.entries(analytics.operatingSystems)
    .sort(([, a], [, b]) => b - a);

  const topReferrers = Object.entries(analytics.referrers)
    .sort(([, a], [, b]) => b - a);

  const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5A2B', '#6366F1', '#EC4899'];

  const formatHour = (hour: number) => {
    return hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'traffic', label: 'Traffic', icon: TrendingUp },
    { id: 'geography', label: 'Geography', icon: Globe },
    { id: 'technology', label: 'Technology', icon: Monitor },
    { id: 'details', label: 'Details', icon: Activity }
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] pt-4 sm:pt-6 lg:pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/history"
            className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to History</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Comprehensive insights for your shortened URL
          </p>
        </div>

        {/* URL Info Card */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white truncate">
                {url.shortUrl}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                {url.originalUrl}
              </p>
            </div>
            <div className="text-right ml-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Created: {new Date(url.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Expires: {url.expiration === 'never' ? 'Never' : url.expiration}
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Clicks</h3>
              <Eye className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {analytics.clicks.toLocaleString()}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Real-time tracking
            </p>
          </div>

          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Unique Visitors</h3>
              <Users className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {analytics.uniqueVisitors.toLocaleString()}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Unique IP addresses
            </p>
          </div>

          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Countries</h3>
              <Globe className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {Object.keys(analytics.countries).length}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Global reach
            </p>
          </div>

          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg. CTR</h3>
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {analytics.uniqueVisitors > 0 ? ((analytics.clicks / analytics.uniqueVisitors) * 100).toFixed(1) : '0.0'}%
            </p>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
              Click-through rate
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 mb-6">
          <div className="flex flex-wrap border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm sm:text-base">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Click History Chart */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                      Click History
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={analytics.clickHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: 'none', 
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="clicks" 
                          stroke="#8B5CF6" 
                          fill="#8B5CF6" 
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Hourly Activity */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                      Hourly Activity
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analytics.hourlyStats}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="hour" 
                          stroke="#6B7280"
                          tickFormatter={formatHour}
                        />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: 'none', 
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }}
                          labelFormatter={(hour) => `Time: ${formatHour(hour as number)}`}
                        />
                        <Bar dataKey="clicks" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'traffic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Daily Traffic */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                      Daily Traffic Trend
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={analytics.dailyStats}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: 'none', 
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }} 
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="clicks" 
                          stroke="#8B5CF6" 
                          strokeWidth={3}
                          dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="uniqueVisitors" 
                          stroke="#10B981" 
                          strokeWidth={3}
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Referrer Sources */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                      Traffic Sources
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsPieChart>
                        <Pie
                          data={topReferrers.map(([name, value]) => ({ name, value }))}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {topReferrers.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'geography' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Top Countries */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                      <Globe className="w-5 h-5 text-purple-500 mr-2" />
                      Top Countries
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {topCountries.map(([country, clicks], index) => (
                        <div key={country} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 w-6">
                              #{index + 1}
                            </span>
                            <span className="text-slate-700 dark:text-slate-300">{country}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-800 dark:text-white font-medium">
                              {clicks.toLocaleString()}
                            </span>
                            <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-1">
                              <div 
                                className="bg-purple-500 h-2 rounded-full" 
                                style={{ width: `${(clicks / Math.max(...topCountries.map(([, c]) => c))) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top States */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                      <MapPin className="w-5 h-5 text-green-500 mr-2" />
                      Top States/Regions
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {topStates.map(([state, clicks], index) => (
                        <div key={state} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 w-6">
                              #{index + 1}
                            </span>
                            <span className="text-slate-700 dark:text-slate-300">{state}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-800 dark:text-white font-medium">
                              {clicks.toLocaleString()}
                            </span>
                            <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-1">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${(clicks / Math.max(...topStates.map(([, c]) => c))) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'technology' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Devices */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                      <Monitor className="w-5 h-5 text-blue-500 mr-2" />
                      Devices
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <RechartsPieChart>
                        <Pie
                          data={topDevices.map(([name, value]) => ({ name, value }))}
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {topDevices.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2 mt-4">
                      {topDevices.map(([device, clicks], index) => (
                        <div key={device} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="text-slate-600 dark:text-slate-400">{device}</span>
                          </div>
                          <span className="text-slate-800 dark:text-white font-medium">
                            {clicks.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Browsers */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                      <Globe className="w-5 h-5 text-green-500 mr-2" />
                      Browsers
                    </h3>
                    <div className="space-y-3">
                      {topBrowsers.map(([browser, clicks], index) => (
                        <div key={browser} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <span className="text-slate-700 dark:text-slate-300">{browser}</span>
                          <div className="text-right">
                            <span className="text-slate-800 dark:text-white font-medium text-sm">
                              {clicks.toLocaleString()}
                            </span>
                            <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1">
                              <div 
                                className="bg-green-500 h-1.5 rounded-full" 
                                style={{ width: `${(clicks / Math.max(...topBrowsers.map(([, c]) => c))) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operating Systems */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                      <Smartphone className="w-5 h-5 text-orange-500 mr-2" />
                      Operating Systems
                    </h3>
                    <div className="space-y-3">
                      {topOS.map(([os, clicks], index) => (
                        <div key={os} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                          <span className="text-slate-700 dark:text-slate-300">{os}</span>
                          <div className="text-right">
                            <span className="text-slate-800 dark:text-white font-medium text-sm">
                              {clicks.toLocaleString()}
                            </span>
                            <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1">
                              <div 
                                className="bg-orange-500 h-1.5 rounded-full" 
                                style={{ width: `${(clicks / Math.max(...topOS.map(([, c]) => c))) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                    <Network className="w-5 h-5 text-red-500 mr-2" />
                    IP Address Details
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">IP Address</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Location</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Clicks</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Last Access</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics.ipAddresses.map((ip, index) => (
                          <tr key={index} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="py-3 px-4 font-mono text-slate-800 dark:text-white">{ip.ip}</td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                              {ip.city}, {ip.state}, {ip.country}
                            </td>
                            <td className="py-3 px-4 text-slate-800 dark:text-white">{ip.clicks}</td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                              {new Date(ip.lastAccess).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;