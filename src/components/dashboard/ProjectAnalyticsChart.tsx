"use client";

import { Card } from "@/components/ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function ProjectAnalyticsChart({ projects }: { projects: any[] }) {
  // Format data for Recharts
  const data = projects.map((p) => ({
    name: p.name.length > 15 ? p.name.substring(0, 15) + "..." : p.name,
    Views: p.views || 0,
    Upvotes: p._count?.upvotes || 0,
  }));

  if (projects.length === 0) {
    return (
      <Card className="p-8 text-center border-dashed">
        <p className="text-text-secondary">No projects to analyze yet.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
        Project Performance
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="var(--text-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--text-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--bg-elevated)",
                borderColor: "var(--border)",
                borderRadius: "8px",
                color: "var(--text-primary)",
              }}
              itemStyle={{ color: "var(--text-primary)" }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar dataKey="Views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Upvotes" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
