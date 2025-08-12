
'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AddMovieForm } from "../add-movie/add-movie-form";
import { StatsOverview } from "./stats-overview";
import { TrafficChart } from "./traffic-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryManager } from "./category-manager";

const AUTH_KEY = "filmlock_admin_auth";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // This check now runs only on the client, after the component mounts.
    const authStatus = sessionStorage.getItem(AUTH_KEY) === "true";
    if (!authStatus) {
      router.replace("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // While we're checking for authentication, show a loading message.
  // This prevents the dashboard from flashing before the redirect can happen.
  if (isAuthenticated === null) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-14rem)] max-w-screen-2xl items-center justify-center py-16 text-center">
        <p>Verifying authentication...</p>
      </div>
    );
  }
  
  // If authenticated, render the full dashboard.
  return (
    <div className="container mx-auto max-w-screen-2xl py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
       <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="addMovie">Add Movie</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-6">
           <StatsOverview />
           <div className="mt-8">
            <TrafficChart />
           </div>
        </TabsContent>
        <TabsContent value="addMovie" className="mt-6">
          <AddMovieForm />
        </TabsContent>
        <TabsContent value="categories" className="mt-6">
          <CategoryManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
