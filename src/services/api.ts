const API_BASE_URL = 'http://localhost:5000/api';

export interface URLData {
  id: string;
  originalUrl: string;
  shortUrl: string;
  customAlias?: string;
  password?: string;
  expiration: string;
  createdAt: string;
  clicks: number;
  qrCode?: string;
}

export interface AnalyticsData {
  clicks: number;
  uniqueVisitors: number;
  countries: { [key: string]: number };
  states: { [key: string]: number };
  devices: { [key: string]: number };
  browsers: { [key: string]: number };
  operatingSystems: { [key: string]: number };
  referrers: { [key: string]: number };
  ipAddresses: {
    ip: string;
    country: string;
    state: string;
    city: string;
    clicks: number;
    lastAccess: string;
  }[];
  clickHistory: { date: string; clicks: number; uniqueVisitors: number }[];
  hourlyStats: { hour: number; clicks: number }[];
  dailyStats: { date: string; clicks: number; uniqueVisitors: number }[];
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async shortenUrl(data: {
    url: string;
    customAlias?: string;
    password?: string;
    expiration: string;
  }): Promise<URLData> {
    return this.request<URLData>('/shorten', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUrls(): Promise<URLData[]> {
    return this.request<URLData[]>('/urls');
  }

  async deleteUrl(id: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/urls/${id}`, {
      method: 'DELETE',
    });
  }

  async getAnalytics(id: string): Promise<AnalyticsData> {
    return this.request<AnalyticsData>(`/analytics/${id}`);
  }

  async redirectUrl(shortCode: string, password?: string): Promise<{ redirectUrl?: string; requiresPassword?: boolean; error?: string }> {
    const endpoint = `http://localhost:5000/${shortCode}`;
    const config: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (password) {
      config.method = 'POST';
      config.body = JSON.stringify({ password });
    }

    try {
      const response = await fetch(endpoint, config);
      return await response.json();
    } catch (error) {
      console.error('Redirect request failed:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<{ status: string }> {
    return this.request<{ status: string }>('/health');
  }
}

export const apiService = new ApiService();