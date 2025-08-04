"use client"; // This MUST be the very first line of the file.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChartPlaceholder } from "@/components/charts/line-chart";
import { PieChartPlaceholder } from "@/components/charts/pie-chart";
import { BarChartPlaceholder } from "@/components/charts/bar-chart";
import { DataTable, CustomColumnDef } from "@/components/charts/data-table";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";


import {
  keyMetrics,
  monthlyPerformance,
  platformEngagement,
  recentPosts,
  demographics,
  updateKeyMetrics,
  PostData, // <--- IMPORTED PostData from mock-data.ts
} from "@/data/mock-data";

import React, { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { parseISO, startOfMonth, endOfMonth } from "date-fns";

// Removed local PostData interface definition here, now it's imported.

interface MonthlyData {
  month: string;
  reach: number;
  impressions: number;
  engagement: number;
}

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  description?: string;
  startColor: string;
  endColor: string;
}

const TrendIndicator = ({ change }: { change?: string }) => {
  if (!change) return null;

  const changeValue = parseFloat(change.replace(/[^0-9.-]+/g, ""));
  const isPositive = change.includes("+");

  const dataPoints = Array.from({ length: 7 }, (_, i) => {
    const base = 50;
    const variation = (Math.random() - 0.5) * 20;
    return base + (isPositive ? i * 5 : (6 - i) * 5) + variation * (Math.abs(changeValue) / 10);
  });

  const maxVal = Math.max(...dataPoints);
  const minVal = Math.min(...dataPoints);
  const range = maxVal - minVal;

  return (
    <div className="w-16 h-10 flex items-end justify-between overflow-hidden">
      {dataPoints.map((point, index) => (
        <div
          key={index}
          className="w-2 rounded-sm"
          style={{
            height: `${((point - minVal) / range) * 80 + 20}%`,
            backgroundColor: isPositive ? "hsl(var(--chart-2))" : "hsl(var(--chart-1))",
            opacity: 0.7,
            transition: "height 0.3s ease-out",
          }}
        />
      ))}
    </div>
  );
};

const MetricCard = ({
  title,
  value,
  change,
  description,
  startColor,
  endColor,
}: MetricCardProps) => (
  <Card className="relative rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl overflow-hidden">
    <div
      className="absolute inset-0 z-0"
      style={{
        background: `linear-gradient(270deg, ${startColor}, ${endColor}, ${startColor})`,
        backgroundSize: "400% 400%",
        animation: "gradient-move 6s ease infinite",
      }}
    ></div>
    <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium text-white dark:text-gray-300">{title}</CardTitle>
      <TrendIndicator change={change} />
    </CardHeader>
    <CardContent className="relative z-10">
      <div className="text-2xl font-bold text-white dark:text-white">
        {parseFloat(value).toLocaleString("en-US")}
      </div>
      {change && (
        <p className={`text-xs ${change.includes("+") ? "text-green-300" : "text-red-300"}`}>
          {change} {description}
        </p>
      )}
    </CardContent>
  </Card>
);


const recentPostsColumns: CustomColumnDef<PostData>[] = [
  {
    accessorKey: "platform", // Using platform for State/UT
    header: "State/UT",
    cell: info => info.getValue(),
    cellClassName: "text-left",
  },
  {
    accessorKey: "reach", // Using reach for Population Total
    header: "Population (Total)",
    cell: info => (info.getValue() as number).toLocaleString(),
    cellClassName: "text-right",
  },
  {
    accessorKey: "engagement", // Using engagement for Population Males
    header: "Males (millions)",
    cell: info => (info.getValue() as number).toLocaleString(),
    cellClassName: "text-right",
  },
  {
    accessorKey: "impressions", // Using impressions for Population Females
    header: "Females (millions)",
    cell: info => (info.getValue() as number).toLocaleString(),
    cellClassName: "text-right",
  },
  {
    accessorKey: "type", // Using type for Total literates
    header: "Total literates (millions)",
    cell: info => info.getValue(),
    cellClassName: "text-right",
  },
  {
    accessorKey: "content", // Using content for Literates Males
    header: "Males (millions)",
    cell: info => info.getValue(),
    cellClassName: "text-right",
  },
  {
    accessorKey: "date", // Using date for Literates Females
    header: "Females (millions)",
    cell: info => info.getValue(),
    cellClassName: "text-right",
  },
  {
    accessorKey: "id", // Using id for Literacy Rate Total
    header: "Total (%)",
    cell: info => info.getValue(),
    cellClassName: "text-right",
  },
  {
    accessorKey: "id", // Using id for Literacy Rate M
    header: "M (%)",
    cell: info => info.getValue(),
    cellClassName: "text-right",
  },
  {
    accessorKey: "id", // Using id for Literacy Rate F
    header: "F (%)",
    cell: info => info.getValue(),
    cellClassName: "text-right",
  },
];

const SkeletonLoader = ({ height = "h-64" }) => (
  <div className={`w-full ${height} bg-muted animate-pulse rounded-lg`} />
);
const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="text-xl font-semibold mb-4">Loading...</div>
    <SkeletonLoader height="h-96" />
  </div>
)

export default function DashboardPage() {
  console.log("DashboardPage: Running as client component.");

  const [metricsUpdated, setMetricsUpdated] = useState<number>(0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = setTimeout(() => setIsLoading(false), 1500);

    const interval = setInterval(() => {
      updateKeyMetrics();
      setMetricsUpdated((prev) => prev + 1);
    }, 5000);

    return () => {
      clearTimeout(loadData);
      clearInterval(interval);
    };
  }, []);

  const filteredRecentPosts = useMemo(() => {
    if (!dateRange?.from && !dateRange?.to) return recentPosts;
    return recentPosts.filter((post: PostData) => {
      const postDate = parseISO(post.date);
      return (
        (!dateRange?.from || postDate >= dateRange.from) &&
        (!dateRange?.to || postDate <= dateRange.to)
      );
    });
  }, [recentPosts, dateRange]);

  const filteredMonthlyPerformance = useMemo(() => {
    if (!dateRange?.from && !dateRange?.to) return monthlyPerformance;

    const fromDate = dateRange.from;
    const toDate = dateRange.to;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return monthlyPerformance.filter((dataPoint: MonthlyData) => {
      const monthIndex = monthNames.indexOf(dataPoint.month);
      const dataPointDate = new Date(new Date().getFullYear(), monthIndex, 1);
      return (
        (!fromDate || dataPointDate >= startOfMonth(fromDate)) &&
        (!toDate || dataPointDate <= endOfMonth(toDate))
      );
    });
  }, [monthlyPerformance, dateRange]);

  const filteredPlatformEngagement = useMemo(() => {
    const engagementMap = new Map<string, number>();
    filteredRecentPosts.forEach((post: PostData) => {
      engagementMap.set(post.platform, (engagementMap.get(post.platform) || 0) + post.engagement);
    });
    return Array.from(engagementMap.entries()).map(([platform, engagement]) => ({ platform, engagement }));
  }, [filteredRecentPosts]);

  const filteredDemographics = useMemo(() => demographics, [demographics]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
        <header className="flex justify-between items-center mb-8 relative">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-4">
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            <ThemeToggle />
          </div>
        </header>


        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonLoader key={i} height="h-32" />)
          ) : (
            <>
              <MetricCard
                title="Total Reach"
                value={keyMetrics.totalReach.toString()}
                change="+12.5%"
                description="from last month"
                startColor="#ff7e5f"
                endColor="#feb47b"
              />
              <MetricCard
                title="Total Impressions"
                value={keyMetrics.totalImpressions.toString()}
                change="+8.2%"
                description="from last month"
                startColor="#43cea2"
                endColor="#185a9d"
              />
              <MetricCard
                title="Total Engagement"
                value={keyMetrics.totalEngagement.toString()}
                change="+15.1%"
                description="from last month"
                startColor="#8e2de2"
                endColor="#4a00e0"
              />
              <MetricCard
                title="Follower Growth"
                value={`${keyMetrics.followerGrowth}%`}
                change="+2.1%"
                description="vs. last quarter"
                startColor="#f7971e"
                endColor="#ffd200"
              />
            </>
          )}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="rounded-xl shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Monthly Performance</CardTitle>
            </CardHeader>
            <CardContent>{isLoading ? <SkeletonLoader /> : <LineChartPlaceholder data={filteredMonthlyPerformance} />}</CardContent>
          </Card>
          <Card className="rounded-xl shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Engagement by Platform</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                <PieChartPlaceholder data={filteredPlatformEngagement} />
              )}
            </CardContent>
          </Card>
          <Card className="rounded-xl shadow-md lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Audience Demographics</CardTitle>
            </CardHeader>
            <CardContent>{isLoading ? <SkeletonLoader height="h-[500px]" /> : <BarChartPlaceholder data={filteredDemographics.ageGroups} />}</CardContent>
          </Card>
        </section>

        <section>
          <Card className="rounded-xl shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Recent Posts Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <SkeletonLoader height="h-96" />
              ) : (
                <DataTable columns={recentPostsColumns} data={filteredRecentPosts} />
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </ThemeProvider>
  );
}
