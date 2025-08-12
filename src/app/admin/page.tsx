
'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AddMovieForm } from "./add-movie/add-movie-form";
import { ManageMoviesTable } from "./manage-movies/manage-movies-table";
import { StatsOverview } from "./dashboard/stats-overview";
import { TrafficChart } from "./dashboard/traffic-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for authentication status from sessionStorage
    const authStatus = sessionStorage.getItem('isAdminAuthenticated');
    if (authStatus !== 'true') {
      router.replace('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    // Render a loading state or a skeleton screen while checking auth
    return (
        <div className="container mx-auto max-w-screen-2xl py-16">
            <div className="flex flex-col space-y-3">
                <h1 className="text-4xl font-bold mb-8 text-center invisible">Admin Dashboard</h1>
                 <div className="flex justify-center">
                    <Skeleton className="h-10 w-full max-w-md rounded-lg" />
                 </div>
                <Skeleton className="h-[400px] w-full rounded-xl mt-6" />
            </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-screen-2xl py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
       <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="addMovie">Add Movie</TabsTrigger>
          <TabsTrigger value="manageMovies">Manage Movies</TabsTrigger>
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
        <TabsContent value="manageMovies" className="mt-6">
          <ManageMoviesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
