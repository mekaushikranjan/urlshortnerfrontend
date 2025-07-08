import React, { useState } from 'react';
import { Copy, QrCode, BarChart3, CheckCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { URLData } from '../contexts/URLContext';

interface URLResultProps {
  url: URLData;
}

const URLResult: React.FC<URLResultProps> = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const parts = url.shortUrl.split('/').filter(Boolean);
  const qrFileName: string = parts.length > 0 ? parts[parts.length - 1] : 'shorturl';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
          Your Short URL is Ready!
        </h3>
        
        <div className="flex items-center space-x-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <input
            type="text"
            value={url.shortUrl}
            readOnly
            className="flex-1 bg-transparent border-none outline-none text-slate-700 dark:text-white"
          />
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to={`/${url.shortUrl.split('/').pop()}`}
          className="flex items-center justify-center space-x-2 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
        >
          <ExternalLink className="w-5 h-5" />
          <span>Visit Link</span>
        </Link>

        <Link
          to={`/analytics/${url.id}`}
          className="flex items-center justify-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
        >
          <BarChart3 className="w-5 h-5" />
          <span>View Analytics</span>
        </Link>

        <button className="flex items-center justify-center space-x-2 p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200">
          <QrCode className="w-5 h-5" />
          <span>Show QR Code</span>
        </button>
      </div>

      {url.qrCode && (
        <div className="text-center">
          <div className="inline-block p-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
            <img
              src={url.qrCode}
              alt="QR Code"
              className="w-32 h-32 mx-auto"
            />
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              QR Code for quick sharing
            </p>
            <button
              onClick={() => {
                if (url.qrCode) {
                  const link = document.createElement('a');
                  link.href = url.qrCode;
                  link.download = `${qrFileName}_qrcode.png`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}
              
              className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow transition-colors duration-200"
            >
              Download QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default URLResult;