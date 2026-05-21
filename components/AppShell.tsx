"use client";

import { ReactNode, useEffect, useState } from "react";
import { CalendarDays, Dumbbell, Home, LineChart, UserRound } from "lucide-react";
import HomePage from "@/components/HomePage";
import LogWorkoutPage from "@/components/LogWorkoutPage";
import CalendarPage from "@/components/CalendarPage";
import StatsPage from "@/components/StatsPage";
import ProfilePage from "@/components/ProfilePage";
import { type WorkoutRecord } from "@/lib/data";
import { loadWorkoutRecords, saveWorkoutRecords } from "@/lib/storage";

type Tab = "home" | "log" | "calendar" | "stats" | "profile";

const tabs: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: "home", label: "首页", icon: <Home size={20} /> },
  { id: "log", label: "记录", icon: <Dumbbell size={20} /> },
  { id: "calendar", label: "日历", icon: <CalendarDays size={20} /> },
  { id: "stats", label: "数据", icon: <LineChart size={20} /> },
  { id: "profile", label: "我的", icon: <UserRound size={20} /> }
];

export default function AppShell() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [records, setRecords] = useState<WorkoutRecord[]>([]);
  const [editingRecord, setEditingRecord] = useState<WorkoutRecord | null>(null);

  useEffect(() => {
    setRecords(loadWorkoutRecords());
  }, []);

  function updateRecords(nextRecords: WorkoutRecord[]) {
    const sortedRecords = [...nextRecords].sort((a, b) => b.date.localeCompare(a.date));
    setRecords(sortedRecords);
    saveWorkoutRecords(sortedRecords);
  }

  function handleSaveRecord(record: WorkoutRecord) {
    const nextRecords = records.some((item) => item.id === record.id)
      ? records.map((item) => (item.id === record.id ? record : item))
      : [record, ...records];

    updateRecords(nextRecords);
    setEditingRecord(null);
    setActiveTab("home");
  }

  function handleDeleteRecord(recordId: string) {
    updateRecords(records.filter((record) => record.id !== recordId));
    if (editingRecord?.id === recordId) {
      setEditingRecord(null);
    }
  }

  function handleEditRecord(record: WorkoutRecord) {
    setEditingRecord(record);
    setActiveTab("log");
  }

  const pages: Record<Tab, ReactNode> = {
    home: <HomePage records={records} onQuickLog={() => {
      setEditingRecord(null);
      setActiveTab("log");
    }} />,
    log: (
      <LogWorkoutPage
        editingRecord={editingRecord}
        onCancelEdit={() => setEditingRecord(null)}
        onDelete={handleDeleteRecord}
        onSave={handleSaveRecord}
      />
    ),
    calendar: (
      <CalendarPage records={records} onDelete={handleDeleteRecord} onEdit={handleEditRecord} />
    ),
    stats: <StatsPage records={records} />,
    profile: <ProfilePage />
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-28 pt-5">
      <header className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-rosewood/70">Little Fitness Diary</p>
          <h1 className="text-2xl font-semibold tracking-normal text-cocoa">清纯美少女</h1>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blush text-xl shadow-soft">
          L
        </div>
      </header>

      {pages[activeTab]}

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-oat/70 bg-linen/95 px-3 pb-4 pt-2 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs transition ${
                  isActive ? "bg-cocoa text-cream shadow-soft" : "text-cocoa/55"
                }`}
                aria-label={tab.label}
                title={tab.label}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
