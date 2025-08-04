"use client";

import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface PlatformData {
  platform: string;
  engagement: number;
}

interface PieChartProps {
  data: PlatformData[];
}

// Define specific colors for each platform
const platformColors: { [key: string]: string } = {
  'Instagram': '#E1306C', // Pink for Instagram
  'LinkedIn': '#0077B5',  // Dark Blue for LinkedIn
  'Facebook': '#1877F2',  // Sky Blue for Facebook
  'Twitter': '#1DA1F2',   // Blue for Twitter
};

// Fallback colors for platforms not explicitly defined above
const FALLBACK_COLORS = [
  '#FFBB28', // Yellow
  '#A233FF', // Purple
  '#33FF57', // Bright Green
  '#FF4081', // Pink (if Instagram is not present)
  '#3366FF', // Medium Blue
  '#FF3333', // Red
  '#33FFCC', // Cyan
];

export function PieChartPlaceholder({ data }: PieChartProps) {
  return (
    <div className="w-full h-64 sm:h-80 md:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="engagement"
            nameKey="platform"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={platformColors[entry.platform] || FALLBACK_COLORS[index % FALLBACK_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: 'var(--radius)' }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
