
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Film, BarChart } from "lucide-react";

export function StatsOverview() {
  const [traffic, setTraffic] = useState({
    weekly: 10345,
    monthly: 42123,
    totalMovies: 152,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTraffic({
        weekly: Math.floor(10000 + Math.random() * 2000),
        monthly: Math.floor(40000 + Math.random() * 5000),
        totalMovies: 152, // Assuming this doesn't change as frequently
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
          <div className="text-2xl font-bold">{traffic.totalMovies}</div>
          <p className="text-xs text-muted-foreground">10 added this month</p>
        </CardContent>
      </Card>
    </div>
  );
}
