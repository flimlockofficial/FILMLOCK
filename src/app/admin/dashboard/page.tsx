
'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AddMovieForm } from "../add-movie/add-movie-form";

const AUTH_KEY = "filmlock_admin_auth";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem(AUTH_KEY) === "true";
    if (!isAuthenticated) {
      router.replace("/admin");
    }
  }, [router]);

  // You can add a loading state here if you want
  if (typeof window !== 'undefined' && sessionStorage.getItem(AUTH_KEY) !== "true") {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-14rem)] max-w-screen-2xl items-center justify-center py-16 text-center">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-screen-2xl py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
      <AddMovieForm />
    </div>
  );
}
