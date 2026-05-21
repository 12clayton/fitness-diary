"use client";

import type { ReactElement } from "react";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { type WorkoutRecord } from "@/lib/data";
import { formatLocalDate } from "@/lib/date";
import { Card } from "@/components/ui";

const colors = ["#7A4C48", "#D99E57", "#71836D", "#C27B67", "#B9A27E", "#C88C72", "#8E9B7D"];

export default function StatsPage({ records }: { records: WorkoutRecord[] }) {
  const stats = useMemo(() => buildStats(records), [records]);

  return (
    <div className="grid gap-4">
      <Card>
        <p className="text-sm font-medium text-rosewood/70">数据</p>
        <h2 className="mt-1 text-xl font-semibold text-cocoa">温柔进步</h2>
        <p className="mt-2 text-sm leading-6 text-cocoa/58">
          看见一点点变化，不给自己压力。
        </p>
      </Card>

      <ChartCard title="每周训练次数">
        <BarChart data={stats.weeklyFrequency}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8D7C3" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis hide allowDecimals={false} />
          <Tooltip cursor={{ fill: "#FDF4E8" }} formatter={(value) => [`${value} 次`, "训练"]} />
          <Bar dataKey="workouts" name="训练" fill="#7A4C48" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ChartCard>

      <ChartCard title="总训练时长">
        <AreaChart data={stats.minutesTrend}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8D7C3" />
          <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis hide />
          <Tooltip formatter={(value) => [`${value} 分钟`, "时长"]} />
          <Area type="monotone" dataKey="minutes" name="时长" stroke="#7A4C48" fill="#F7D9CF" strokeWidth={3} />
        </AreaChart>
      </ChartCard>

      <ChartCard title="训练类型分布">
        <PieChart>
          <Pie data={stats.typeDistribution} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={3}>
            {stats.typeDistribution.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} 次`, "次数"]} />
        </PieChart>
      </ChartCard>

      <ChartCard title="体重趋势">
        <LineChart data={stats.weightTrend}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8D7C3" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis hide domain={["dataMin - 0.5", "dataMax + 0.5"]} />
          <Tooltip formatter={(value) => [`${value} 公斤`, "体重"]} />
          <Line type="monotone" dataKey="weight" name="体重" stroke="#71836D" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ChartCard>
    </div>
  );
}

function ChartCard({
  title,
  children
}: {
  title: string;
  children: ReactElement;
}) {
  return (
    <Card>
      <h3 className="mb-3 font-semibold text-cocoa">{title}</h3>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function buildStats(records: WorkoutRecord[]) {
  const sortedRecords = [...records].sort((a, b) => a.date.localeCompare(b.date));
  const weekDays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const today = new Date();
  const weekStart = getWeekStart(today);

  const weeklyFrequency = weekDays.map((day, index) => {
    const current = new Date(weekStart);
    current.setDate(weekStart.getDate() + index);
    const date = formatLocalDate(current);

    return {
      day,
      workouts: records.filter((record) => record.date === date && record.duration > 0).length
    };
  });

  const minutesByWeek = new Map<string, number>();
  sortedRecords.forEach((record) => {
    const recordDate = new Date(`${record.date}T00:00:00`);
    const start = getWeekStart(recordDate);
    const key = `${start.getMonth() + 1}月${start.getDate()}日`;
    minutesByWeek.set(key, (minutesByWeek.get(key) ?? 0) + record.duration);
  });

  const minutesTrend = Array.from(minutesByWeek.entries()).map(([week, minutes]) => ({
    week,
    minutes
  }));

  const typeCounts = new Map<string, number>();
  records.forEach((record) => {
    if (record.type === "休息") {
      return;
    }
    typeCounts.set(record.type, (typeCounts.get(record.type) ?? 0) + 1);
  });

  const typeDistribution = Array.from(typeCounts.entries()).map(([name, value]) => ({
    name,
    value
  }));

  const weightTrend = sortedRecords
    .filter((record) => typeof record.weight === "number")
    .map((record) => ({
      date: formatShortDate(record.date),
      weight: record.weight
    }));

  return {
    weeklyFrequency,
    minutesTrend: minutesTrend.length ? minutesTrend : [{ week: "本周", minutes: 0 }],
    typeDistribution: typeDistribution.length ? typeDistribution : [{ name: "暂无", value: 1 }],
    weightTrend: weightTrend.length ? weightTrend : [{ date: "暂无", weight: 0 }]
  };
}

function getWeekStart(date: Date) {
  const start = new Date(date);
  const day = start.getDay() || 7;
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - day + 1);
  return start;
}

function formatShortDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}
