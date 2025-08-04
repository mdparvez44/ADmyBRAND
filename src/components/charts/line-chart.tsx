"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface MonthlyData {
  month: string;
  reach: number;
  impressions: number;
  engagement: number;
}

interface LineChartProps {
  data: MonthlyData[];
}

export function LineChartPlaceholder({ data }: LineChartProps) {
  return (
    <div className="w-full h-64 sm:h-80 md:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* Grid lines with a themed border color */}
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          {/* X-Axis for months, labels themed to foreground color */}
          <XAxis dataKey="month" tick={{ fill: 'hsl(var(--foreground))' }} />
          {/* Y-Axis for values, labels themed to foreground color */}
          <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
          {/* Tooltip for showing data on hover, styled for theme compatibility */}
          <Tooltip
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
          {/* Legend to identify each line */}
          <Legend />
          {/* Line for 'reach' data with a vibrant blue color and increased stroke width */}
          <Line
            type="monotone"
            dataKey="reach"
            stroke="#4FC3F7" // Vibrant Light Blue
            activeDot={{ r: 8 }}
            strokeWidth={3} // Increased stroke width for prominence
          />
          {/* Line for 'impressions' data with a vibrant green color and increased stroke width */}
          <Line
            type="monotone"
            dataKey="impressions"
            stroke="#8BC34A" // Vibrant Light Green
            strokeWidth={3} // Increased stroke width for prominence
          />
          {/* Line for 'engagement' data with a vibrant orange color and increased stroke width */}
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#FF7043" // Vibrant Deep Orange
            strokeWidth={3} // Increased stroke width for prominence
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
