
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Film, BarChart } from "lucide-react";
import { useMovies } from "@/providers/movie-provider";

export function StatsOverview() {
  const { trendingMovies, newlyReleasedMovies } = useMovies();
  const totalMovies = trendingMovies.length + newlyReleasedMovies.length;

  const [traffic, setTraffic] = useState({
    weekly: 10345,
    monthly: 42123,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTraffic({
        weekly: Math.floor(10000 + Math.random() * 2000),
        monthly: Math.floor(40000 + Math.random() * 5000),
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Traffic</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{traffic.weekly.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+12.5% from last week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Visitors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{traffic.monthly.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+8.2% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
          <Film className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMovies}</div>
          <p className="text-xs text-muted-foreground">Live count</p>
        </CardContent>
      </Card>
    </div>
  );
}
