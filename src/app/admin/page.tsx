
'use client'

import { AddMovieForm } from "./add-movie/add-movie-form";
import { StatsOverview } from "./dashboard/stats-overview";
import { TrafficChart } from "./dashboard/traffic-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryManager } from "./dashboard/category-manager";

export default function AdminDashboardPage() {
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
