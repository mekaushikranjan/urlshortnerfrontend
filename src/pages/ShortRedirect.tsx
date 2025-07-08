import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

const ShortRedirect: React.FC = () => {
  const { short } = useParams<{ short: string }>();
  const [loading, setLoading] = useState(true);
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!short) return;
    // Try to access the short URL (GET)
    fetch(`${API_BASE_URL}/${short}`)
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          if (data.requiresPassword) {
            setRequiresPassword(true);
            setLoading(false);
          } else if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
          } else {
            setError('Unexpected response.');
            setLoading(false);
          }
        } else {
          const data = await res.json().catch(() => ({}));
          setError(data.error || 'Link not found or expired.');
          setLoading(false);
        }
      })
      .catch(() => {
        setError('Network error.');
        setLoading(false);
      });
  }, [short]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    fetch(`${API_BASE_URL}/${short}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
          } else {
            setError('Unexpected response.');
          }
        } else {
          const data = await res.json().catch(() => ({}));
          setError(data.error || 'Incorrect password.');
        }
      })
      .catch(() => setError('Network error.'))
      .finally(() => setSubmitting(false));
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-lg text-slate-800 dark:text-white">Loading...</div>
      </div>
    );
  }

  if (requiresPassword) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 bg-white dark:bg-slate-900">
        <div className="card p-6 max-w-md w-full shadow-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">🔐 Enter Password to Access Link</h3>
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger mb-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded px-3 py-2">{error}</div>}
            <input
              type="password"
              className="form-control block w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded mb-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
              name="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={submitting}
            />
            <button
              type="submit"
              className="btn btn-primary w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              disabled={submitting}
            >
              {submitting ? 'Checking...' : 'Access'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 bg-white dark:bg-slate-900">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{error ? 'Error' : 'Redirecting...'}</h1>
          <p className="text-slate-700 dark:text-slate-300 mb-2">
            {error || 'You are being redirected to the destination.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShortRedirect; 