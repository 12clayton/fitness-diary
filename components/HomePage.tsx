"use client";

import { ArrowRight, Flame, Heart, Plus } from "lucide-react";
import { type WorkoutRecord } from "@/lib/data";
import { formatLocalDate, getTodayDate } from "@/lib/date";
import { Card } from "@/components/ui";

export default function HomePage({
  records,
  onQuickLog
}: {
  records: WorkoutRecord[];
  onQuickLog: () => void;
}) {
  const today = getTodayDate();
  const todaysRecord = records.find((record) => record.date === today) ?? records[0];
  const weekStart = getWeekStart(today);
  const weeklyRecords = records.filter((record) => record.date >= weekStart && record.date <= today);
  const workoutCount = weeklyRecords.filter((record) => record.duration > 0).length;
  const minutes = weeklyRecords.reduce((sum, record) => sum + record.duration, 0);

  return (
    <div className="grid gap-4">
      <Card className="bg-cocoa text-cream">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm text-cream/70">今天</p>
            <h2 className="text-2xl font-semibold">{todaysRecord ? todaysRecord.type : "还未记录"}</h2>
            {todaysRecord ? (
              <p className="mt-2 text-sm leading-6 text-cream/72">
                {todaysRecord.duration} 分钟 · {todaysRecord.intensity} · {todaysRecord.mood}
              </p>
            ) : (
              <p className="mt-2 text-sm leading-6 text-cream/72">今天还可以轻轻记一笔。</p>
            )}
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream/14">
            <Heart size={22} />
          </div>
        </div>
      </Card>

      <button
        type="button"
        onClick={onQuickLog}
        className="flex min-h-14 items-center justify-center gap-2 rounded-[1.25rem] bg-rosewood px-5 text-base font-semibold text-cream shadow-soft transition active:scale-[0.99]"
      >
        <Plus size={20} />
        快速记录
      </button>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-cocoa">本周概览</h2>
          <Flame className="text-honey" size={22} />
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-linen p-3">
            <p className="text-2xl font-semibold">{workoutCount}</p>
            <p className="mt-1 text-xs text-cocoa/55">次训练</p>
          </div>
          <div className="rounded-2xl bg-linen p-3">
            <p className="text-2xl font-semibold">{minutes}</p>
            <p className="mt-1 text-xs text-cocoa/55">分钟</p>
          </div>
          <div className="rounded-2xl bg-linen p-3">
            <p className="text-2xl font-semibold">4/5</p>
            <p className="mt-1 text-xs text-cocoa/55">目标</p>
          </div>
        </div>
      </Card>

      <Card className="bg-blush/55">
        <p className="text-sm font-medium text-rosewood">今日小贴士</p>
        <p className="mt-2 text-lg font-semibold leading-7 text-cocoa">
          温柔一点，也可以坚持得很好。
        </p>
      </Card>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-cocoa">最近记录</h2>
          <ArrowRight size={19} className="text-cocoa/45" />
        </div>
        <div className="grid gap-3">
          {records.slice(0, 4).map((record) => (
            <Card key={record.date} className="p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-cocoa">{record.type}</p>
                  <p className="mt-1 text-sm text-cocoa/55">{record.day} · {record.note}</p>
                </div>
                <span className="shrink-0 rounded-full bg-linen px-3 py-1 text-sm font-medium text-cocoa/70">
                  {record.duration ? `${record.duration} 分钟` : "休息"}
                </span>
              </div>
            </Card>
          ))}
          {records.length === 0 && (
            <Card className="p-3">
              <p className="text-sm text-cocoa/55">还没有记录，先从今天开始吧。</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}

function getWeekStart(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`);
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  return formatLocalDate(date);
}
