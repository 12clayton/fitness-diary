import { type WorkoutRecord } from "@/lib/data";

const STORAGE_KEY = "little-fitness-diary-records";

export function loadWorkoutRecords() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return (parsed as WorkoutRecord[]).map((record, index) => ({
      ...record,
      id: record.id ?? `${record.date}-${index}`
    }));
  } catch {
    return [];
  }
}

export function saveWorkoutRecords(nextRecords: WorkoutRecord[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecords));
}
