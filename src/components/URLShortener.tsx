import React, { useState } from 'react';
import { Link, Clock, Lock, QrCode, Sparkles, AlertCircle } from 'lucide-react';
import { useURL } from '../contexts/URLContext';
import URLResult from './URLResult';
import type { URLData } from '../contexts/URLContext';

const URLShortener: React.FC = () => {
  const { addUrl, loading, error } = useURL();
  const [formData, setFormData] = useState({
    url: '',
    customAlias: '',
    password: '',
    expiration: 'never'
  });
  const [result, setResult] = useState<URLData | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setResult(null);

    if (!formData.url.trim()) {
      setFormError('Please enter a URL');
      return;
    }

    try {
      const newUrl = await addUrl({
        url: formData.url.trim(),
        customAlias: formData.customAlias.trim() || undefined,
        password: formData.password.trim() || undefined,
        expiration: formData.expiration
      });
      
      setResult(newUrl);
      // Reset form
      setFormData({
        url: '',
        customAlias: '',
        password: '',
        expiration: 'never'
      });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to shorten URL');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear errors when user starts typing
    if (formError) setFormError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
              <Link className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            Shorten Your URL
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Create short, memorable links that are easy to share
          </p>
        </div>

        {/* Error Display */}
        {(error || formError) && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 dark:text-red-400 text-sm">
                {formError || error}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Original URL
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://example.com/very-long-url"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Custom Alias (Optional)</span>
              </label>
              <input
                type="text"
                name="customAlias"
                value={formData.customAlias}
                onChange={handleInputChange}
                placeholder="my-custom-link"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                disabled={loading}
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Clock className="w-4 h-4" />
                <span>Expiration</span>
              </label>
              <select
                name="expiration"
                value={formData.expiration}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white"
                disabled={loading}
              >
                <option value="never">Never Expire</option>
                <option value="5m">5 Minutes</option>
                <option value="1h">1 Hour</option>
                <option value="1d">1 Day</option>
                <option value="7d">7 Days</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Lock className="w-4 h-4" />
              <span>Password Protection (Optional)</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Shortening...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <QrCode className="w-5 h-5" />
                <span>Shorten URL</span>
              </div>
            )}
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <URLResult url={result} />
          </div>
        )}
      </div>
    </div>
  );
};

export default URLShortener;