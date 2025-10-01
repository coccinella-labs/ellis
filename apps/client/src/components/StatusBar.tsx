import { useEffect, useState } from 'react';

export function StatusBar() {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => setStatus(data.status === 'ok' ? 'ok' : 'error'))
      .catch(() => setStatus('error'));
  }, []);

  const color =
    status === 'ok'
      ? 'bg-green-500'
      : status === 'error'
        ? 'bg-red-500'
        : 'bg-yellow-500';
  const text =
    status === 'ok'
      ? 'API Active'
      : status === 'error'
        ? 'API Error'
        : 'Checking...';

  return (
    <div className="flex items-center justify-center py-1 bg-gray-100 dark:bg-gray-800 border-b">
      <div className={`w-2 h-2 rounded-full ${color} mr-2`}></div>
      <span className="text-sm text-gray-600 dark:text-gray-400">{text}</span>
    </div>
  );
}
