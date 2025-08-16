
'use client';

import { useEffect } from 'react';

const trackEvent = (storageKey: string) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const data = JSON.parse(localStorage.getItem(storageKey) || '{}');
    data[today] = (data[today] || 0) + 1;
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to track event for ${storageKey}`, error);
  }
};

export const trackDownload = () => {
    trackEvent('dailyDownloads');
}

export function PageTracker() {
  useEffect(() => {
    trackEvent('dailyVisitors');
  }, []);

  return null;
}
