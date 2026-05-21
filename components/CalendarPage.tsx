"use client";

import { Edit3, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { type WorkoutRecord } from "@/lib/data";
import { formatLocalDate, getTodayDate } from "@/lib/date";
import { Card } from "@/components/ui";

export default function CalendarPage({
  records,
  onDelete,
  onEdit
}: {
  records: WorkoutRecord[];
  onDelete: (recordId: string) => void;
  onEdit: (record: WorkoutRecord) => void;
}) {
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const selectedRecord = records.find((record) => record.date === selectedDate);
  const monthDays = useMemo(() => buildMonthDays(today), [today]);
  const leadingEmptyDays = Array.from({ length: monthDays.leadingEmptyDays }, (_, index) => index);
  const recordCount = records.filter((record) => record.date.startsWith(monthDays.monthKey) && record.duration > 0).length;

  return (
    <div className="grid gap-4">
      <Card>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-rosewood/70">日历</p>
            <h2 className="text-xl font-semibold text-cocoa">{monthDays.title}</h2>
          </div>
          <p className="text-sm text-cocoa/55">{recordCount} 次训练</p>
        </div>

        <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold text-cocoa/45">
          {["一", "二", "三", "四", "五", "六", "日"].map((day, index) => (
            <span key={`${day}-${index}`}>{day}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {leadingEmptyDays.map((day) => (
            <div key={`empty-${day}`} className="aspect-square" />
          ))}
          {monthDays.days.map(({ day, date }) => {
            const record = records.find((item) => item.date === date);
            const isSelected = selectedDate === date;
            return (
              <button
                key={date}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`relative flex aspect-square items-center justify-center rounded-2xl text-sm font-medium transition ${
                  isSelected ? "bg-cocoa text-cream" : "bg-linen text-cocoa/70"
                }`}
              >
                {day}
                {record && (
                  <span
                    className={`absolute bottom-2 h-1.5 w-1.5 rounded-full ${
                      isSelected ? "bg-cream" : "bg-rosewood"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        {selectedRecord ? (
          <div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-cocoa/55">{selectedRecord.date}</p>
                <h3 className="mt-1 text-xl font-semibold text-cocoa">{selectedRecord.type}</h3>
              </div>
              <span className="rounded-full bg-blush px-3 py-1 text-sm font-semibold text-rosewood">
                {selectedRecord.duration ? `${selectedRecord.duration} 分钟` : "休息"}
              </span>
            </div>
            <p className="mt-4 leading-6 text-cocoa/68">{selectedRecord.note}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl bg-linen p-3">
                <p className="text-xs text-cocoa/45">强度</p>
                <p className="mt-1 text-sm font-semibold">{selectedRecord.intensity}</p>
              </div>
              <div className="rounded-2xl bg-linen p-3">
                <p className="text-xs text-cocoa/45">心情</p>
                <p className="mt-1 text-sm font-semibold">{selectedRecord.mood}</p>
              </div>
              <div className="rounded-2xl bg-linen p-3">
                <p className="text-xs text-cocoa/45">睡眠</p>
                <p className="mt-1 text-sm font-semibold">{selectedRecord.sleep}</p>
              </div>
            </div>

            {selectedRecord.exercises?.length ? (
              <div className="mt-4 rounded-2xl bg-linen p-3">
                <p className="text-sm font-semibold text-cocoa">动作详情</p>
                {selectedRecord.exercises.map((exercise) => (
                  <p key={`${exercise.name}-${exercise.sets}`} className="mt-2 text-sm leading-6 text-cocoa/65">
                    {exercise.name} · {exercise.weight || "未填重量"} · {exercise.sets} 组 · {exercise.reps} 次
                  </p>
                ))}
              </div>
            ) : null}

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onEdit(selectedRecord)}
                className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-cocoa px-4 text-sm font-semibold text-cream"
              >
                <Edit3 size={17} />
                编辑
              </button>
              <button
                type="button"
                onClick={() => onDelete(selectedRecord.id)}
                className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-blush px-4 text-sm font-semibold text-rosewood"
              >
                <Trash2 size={17} />
                删除
              </button>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center">
            <p className="font-semibold text-cocoa">还没有记录</p>
            <p className="mt-1 text-sm text-cocoa/55">安静的一天，也值得被温柔放进日记里。</p>
          </div>
        )}
      </Card>
    </div>
  );
}

function buildMonthDays(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const leadingEmptyDays = (firstDay + 6) % 7;
  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;

  return {
    title: `${year}年${month + 1}月`,
    monthKey,
    leadingEmptyDays,
    days: Array.from({ length: totalDays }, (_, index) => {
      const day = index + 1;
      return {
        day,
        date: formatLocalDate(new Date(year, month, day))
      };
    })
  };
}
