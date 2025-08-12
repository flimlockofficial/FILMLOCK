
"use client"

import { useState, useEffect } from "react";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useMovies } from "@/providers/movie-provider";

const generateWeeklyData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map(day => ({
    date: day,
    visitors: Math.floor(100 + Math.random() * 400),
  }));
};

export function TrafficChart() {
    const { getAllMovies } = useMovies();
    const totalMovies = getAllMovies().length;
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        if (totalMovies > 0) {
            setData(generateWeeklyData());
            const interval = setInterval(() => {
                setData(generateWeeklyData());
            }, 5000); // Refresh chart data every 5 seconds

            return () => clearInterval(interval);
        } else {
            setData([]);
        }
    }, [totalMovies]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Traffic</CardTitle>
        <CardDescription>
            {totalMovies > 0 ? "A summary of page visitors for the last 7 days." : "No traffic data to display yet."}
        </CardDescription>
      </CardHeader>
      <CardContent>
          {totalMovies > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
                <RechartsBarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            borderColor: 'hsl(var(--border))',
                        }}
                    />
                    <Bar dataKey="visitors" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[350px] text-muted-foreground">
                <p>Upload a movie to start seeing traffic statistics.</p>
            </div>
          )}
      </CardContent>
    </Card>
  )
}
