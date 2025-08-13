
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Film, BarChart } from "lucide-react";
import { useMovies } from "@/providers/movie-provider";

export function StatsOverview() {
  const { getAllMovies } = useMovies();
  const totalMovies = getAllMovies().length;
  const [isClient, setIsClient] = useState(false);

  const [traffic, setTraffic] = useState({
    weekly: 0,
    monthly: 0,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // In a real application, you would fetch this data from your analytics service.
    // For now, we'll only show stats if there are movies.
    if (totalMovies > 0) {
      const generateTraffic = () => {
        setTraffic({
          weekly: Math.floor(100 + Math.random() * 500), // More realistic for a new site
          monthly: Math.floor(500 + Math.random() * 2000),
        });
      };
      generateTraffic();
      const interval = setInterval(generateTraffic, 5000);
      return () => clearInterval(interval);
    } else {
      setTraffic({ weekly: 0, monthly: 0 });
    }
  }, [totalMovies, isClient]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Traffic</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{traffic.weekly.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Live simulated data</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Visitors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{traffic.monthly.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Live simulated data</p>
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
