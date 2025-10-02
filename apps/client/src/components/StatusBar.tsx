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
  return (
    <div className="flex items-center justify-center py-1 bg-gray-100 dark:bg-gray-800 border-b">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
    </div>
  );
}
