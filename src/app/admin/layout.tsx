
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('isAdminAuthenticated');
    }
    router.push('/admin/login');
  };

  if (!isClient) {
    return null; 
  }

  const isAuthenticated = typeof window !== 'undefined' && sessionStorage.getItem('isAdminAuthenticated') === 'true';

  if (!isAuthenticated) {
     router.push('/admin/login');
     return null;
  }
  
  return (
    <div className="container mx-auto max-w-screen-2xl py-8">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="destructive">Logout</Button>
        </div>
        {children}
    </div>
  );
}
