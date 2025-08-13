
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const authStatus = sessionStorage.getItem('isAdminAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    if (!authStatus) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  if (!isClient || !isAuthenticated) {
    return null; // Or a loading spinner
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
