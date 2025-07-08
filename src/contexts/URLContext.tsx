import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService, URLData, AnalyticsData } from '../services/api';

interface URLContextType {
  urls: URLData[];
  loading: boolean;
  error: string | null;
  addUrl: (data: {
    url: string;
    customAlias?: string;
    password?: string;
    expiration: string;
  }) => Promise<URLData>;
  removeUrl: (id: string) => Promise<void>;
  getUrlById: (id: string) => URLData | undefined;
  getAnalytics: (id: string) => Promise<AnalyticsData>;
  refreshUrls: () => Promise<void>;
}

const URLContext = createContext<URLContextType | undefined>(undefined);

export const useURL = () => {
  const context = useContext(URLContext);
  if (!context) {
    throw new Error('useURL must be used within a URLProvider');
  }
  return context;
};

export const URLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [urls, setUrls] = useState<URLData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshUrls = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUrls = await apiService.getUrls();
      setUrls(fetchedUrls);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch URLs');
      console.error('Failed to fetch URLs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUrls();
  }, []);

  const addUrl = async (data: {
    url: string;
    customAlias?: string;
    password?: string;
    expiration: string;
  }): Promise<URLData> => {
    try {
      setLoading(true);
      setError(null);
      const newUrl = await apiService.shortenUrl(data);
      setUrls(prev => [newUrl, ...prev]);
      return newUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to shorten URL';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const removeUrl = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await apiService.deleteUrl(id);
      setUrls(prev => prev.filter(url => url.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete URL';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getUrlById = (id: string): URLData | undefined => {
    return urls.find(url => url.id === id);
  };

  const getAnalytics = async (id: string): Promise<AnalyticsData> => {
    try {
      setError(null);
      return await apiService.getAnalytics(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch analytics';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return (
    <URLContext.Provider value={{
      urls,
      loading,
      error,
      addUrl,
      removeUrl,
      getUrlById,
      getAnalytics,
      refreshUrls
    }}>
      {children}
    </URLContext.Provider>
  );
};

// Export the interface for use in components
export type { URLData, AnalyticsData };