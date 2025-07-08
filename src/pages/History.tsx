import React, { useState } from 'react';
import { Search, Calendar, BarChart3, Copy, Trash2, ExternalLink, AlertCircle, Loader, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useURL } from '../contexts/URLContext';

const History: React.FC = () => {
  const { urls, removeUrl, loading, error, refreshUrls } = useURL();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const filteredUrls = urls.filter(url => 
    url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (url.customAlias && url.customAlias.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedUrls = [...filteredUrls].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'clicks':
        return b.clicks - a.clicks;
      default:
        return 0;
    }
  });

  const handleCopy = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(id);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this URL?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      await removeUrl(id);
    } catch (err) {
      console.error('Failed to delete URL:', err);
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] pt-4 sm:pt-6 lg:pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2">
                URL History
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Manage and track all your shortened URLs
              </p>
            </div>
            <button
              onClick={refreshUrls}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search URLs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 text-sm sm:text-base"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white text-sm sm:text-base min-w-[140px]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="clicks">Most Clicks</option>
            </select>
          </div>

          {loading && urls.length === 0 ? (
            <div className="text-center py-12">
              <Loader className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">Loading URLs...</p>
            </div>
          ) : sortedUrls.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-slate-400 dark:text-slate-500 mb-4">
                <Calendar className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg">No URLs found</p>
                <p className="text-sm">
                  {searchTerm ? 'Try adjusting your search terms' : 'Start by shortening your first URL'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedUrls.map((url) => (
                <div
                  key={url.id}
                  className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Link
                          to={`/${url.shortUrl.split('/').pop()}`}
                          className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium truncate text-sm sm:text-base"
                        >
                          {url.shortUrl}
                        </Link>
                        <button
                          onClick={() => handleCopy(url.shortUrl, url.id)}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors duration-200 flex-shrink-0"
                        >
                          {copySuccess === url.id ? (
                            <div className="w-4 h-4 text-green-500">✓</div>
                          ) : (
                            <Copy className="w-4 h-4 text-slate-500" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate">
                        {url.originalUrl}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 sm:ml-4 flex-shrink-0">
                      <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        {url.clicks} clicks
                      </span>
                      <Link
                        to={`/analytics/${url.id}`}
                        className="p-1.5 sm:p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/${url.shortUrl.split('/').pop()}`}
                        className="p-1.5 sm:p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(url.id)}
                        disabled={deleteLoading === url.id}
                        className="p-1.5 sm:p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 disabled:opacity-50"
                      >
                        {deleteLoading === url.id ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
                    <span>Created: {formatDate(url.createdAt)}</span>
                    <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap">
                      {url.customAlias && (
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded">
                          Custom
                        </span>
                      )}
                      {url.password && (
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded">
                          Protected
                        </span>
                      )}
                      <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded">
                        {url.expiration === 'never' ? 'Permanent' : `Expires: ${url.expiration}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;