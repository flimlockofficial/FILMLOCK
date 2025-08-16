
"use client";

import { useState, useEffect } from 'react';

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getCookie = (name: string): string | undefined => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const authCookie = getCookie('film_lock_admin_auth');
    setIsAdmin(authCookie === 'true');
  }, []);

  return { isAdmin };
}
