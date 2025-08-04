"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell // Import Cell
} from 'recharts';

interface DemographicsData {
  group: string;
  users: number;
}

interface BarChartProps {
  data: DemographicsData[];
}

// Define a set of distinct colors for the bars
const BAR_COLORS = [
  '#FF6384', // Pink
  '#36A2EB', // Blue
  '#FFCE56', // Yellow
  '#4BC0C0', // Teal
  '#9966FF', // Purple
  '#FF9F40', // Orange
  '#C9CBCF', // Grey
  '#A1C935', // Greenish
  '#F4A261', // Sandy Brown
  '#2A9D8F', // Persian Green
];

export function BarChartPlaceholder({ data }: BarChartProps) {
  return (
    // Increased height for the chart container to make the card larger
    <div className="w-full h-80 sm:h-96 md:h-[450px] lg:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 40, // Significantly increased bottom margin for X-axis label
          }}
        >
          {/* CartesianGrid for horizontal lines only */}
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="group"
            type="category"
            interval={0}
            tick={{ fill: 'hsl(var(--foreground))' }}
            // Further updated X-axis label styling with increased offset and dy
            label={{
              value: "Age Group",
              position: "insideBottom",
              offset: 0, // Reset offset to 0 and use dy for precise control
              dy: 30, // Shift label downwards by 30 pixels
              fill: 'hsl(var(--foreground))',
              style: {
                fontSize: '14px',
                fontWeight: 'bold',
              },
            }}
          />
          <YAxis
            tick={{ fill: 'hsl(var(--foreground))' }}
            // Updated Y-axis label styling
            label={{
              value: "Number of Users",
              angle: -90,
              position: "insideLeft",
              offset: -10, // Offset for Y-axis label
              fill: 'hsl(var(--foreground))',
              style: {
                fontSize: '14px',
                fontWeight: 'bold',
              },
            }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Bar
            dataKey="users"
            label={{ position: 'top', fill: 'hsl(var(--foreground))' }}
          >
            {
              data.map((entry: DemographicsData, index: number) => (
                <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
