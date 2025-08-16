
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { AdminDashboardClient } from './admin-dashboard-client';

interface DailyData {
  date: string;
  count: number;
}

interface AnalyticsData {
  dailyVisitors: DailyData[];
  dailyDownloads: DailyData[];
}

export default function AdminDashboardPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );

  useEffect(() => {
    const visitorsData = localStorage.getItem('dailyVisitors');
    const downloadsData = localStorage.getItem('dailyDownloads');

    const parseData = (data: string | null): DailyData[] => {
      if (!data) return [];
      try {
        const parsed = JSON.parse(data);
        // Transform the object into an array of objects for the chart
        return Object.entries(parsed).map(([date, count]) => ({
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          count: count as number,
        })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      } catch (e) {
        return [];
      }
    };

    setAnalyticsData({
      dailyVisitors: parseData(visitorsData),
      dailyDownloads: parseData(downloadsData),
    });
  }, []);

  if (!analyticsData) {
    return (
        <div className="container mx-auto flex min-h-[calc(100vh-14rem)] max-w-screen-2xl items-center justify-center py-16 text-center">
            <div>
            <h1 className="font-headline text-5xl font-bold">Loading Analytics...</h1>
            </div>
        </div>
    );
  }
  
  const chartConfig = {
    count: {
      label: 'Count',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <AdminDashboardClient>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsData.dailyVisitors.length > 0 ? (
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={analyticsData.dailyVisitors}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                </BarChart>
                </ChartContainer>
            ) : (
                <p className="text-muted-foreground">No visitor data available yet.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Movie Downloads</CardTitle>
          </CardHeader>
          <CardContent>
             {analyticsData.dailyDownloads.length > 0 ? (
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={analyticsData.dailyDownloads}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="date"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                </BarChart>
                </ChartContainer>
            ) : (
                <p className="text-muted-foreground">No download data available yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminDashboardClient>
  );
}

