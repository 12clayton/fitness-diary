export type WorkoutType =
  | "臀腿"
  | "背部"
  | "胸肩"
  | "手臂"
  | "有氧"
  | "拉伸"
  | "其他"
  | "休息";

export type WorkoutRecord = {
  id: string;
  date: string;
  day: string;
  type: WorkoutType;
  duration: number;
  intensity: "轻松" | "适中" | "偏累" | "休息";
  mood: string;
  sleep: string;
  weight?: number;
  note: string;
  exercises?: {
    name: string;
    weight: string;
    sets: number;
    reps: string;
    note?: string;
  }[];
};

export const workoutTypes: WorkoutType[] = [
  "臀腿",
  "背部",
  "胸肩",
  "手臂",
  "有氧",
  "拉伸",
  "其他"
];

export const records: WorkoutRecord[] = [
  {
    id: "mock-2026-05-21",
    date: "2026-05-21",
    day: "今天",
    type: "臀腿",
    duration: 48,
    intensity: "适中",
    mood: "平静",
    sleep: "不错",
    weight: 55.8,
    note: "状态稳定，也有力量感。节奏保持得很舒服。",
    exercises: [
      { name: "臀推", weight: "45 公斤", sets: 4, reps: "10", note: "动作很顺" },
      { name: "罗马尼亚硬拉", weight: "28 公斤", sets: 3, reps: "12" }
    ]
  },
  {
    id: "mock-2026-05-20",
    date: "2026-05-20",
    day: "周三",
    type: "拉伸",
    duration: 22,
    intensity: "轻松",
    mood: "放松",
    sleep: "还行",
    weight: 56.0,
    note: "忙了一天后，晚上做了舒缓活动。"
  },
  {
    id: "mock-2026-05-19",
    date: "2026-05-19",
    day: "周二",
    type: "背部",
    duration: 42,
    intensity: "适中",
    mood: "专注",
    sleep: "不错",
    weight: 56.1,
    note: "发力感很好。"
  },
  {
    id: "mock-2026-05-18",
    date: "2026-05-18",
    day: "周一",
    type: "休息",
    duration: 0,
    intensity: "休息",
    mood: "有点累",
    sleep: "浅睡",
    note: "休息日。出门散了步，也简单拉伸了一下。"
  },
  {
    id: "mock-2026-05-16",
    date: "2026-05-16",
    day: "周六",
    type: "有氧",
    duration: 35,
    intensity: "偏累",
    mood: "轻快",
    sleep: "很好",
    weight: 56.3,
    note: "短跑完成，值得骄傲。"
  }
];

export const weeklyFrequency = [
  { day: "周一", workouts: 0 },
  { day: "周二", workouts: 1 },
  { day: "周三", workouts: 1 },
  { day: "周四", workouts: 1 },
  { day: "周五", workouts: 0 },
  { day: "周六", workouts: 1 },
  { day: "周日", workouts: 0 }
];

export const minutesTrend = [
  { week: "4月20日", minutes: 128 },
  { week: "4月27日", minutes: 154 },
  { week: "5月4日", minutes: 118 },
  { week: "5月11日", minutes: 171 },
  { week: "5月18日", minutes: 147 }
];

export const typeDistribution = [
  { name: "臀腿", value: 34 },
  { name: "背部", value: 22 },
  { name: "有氧", value: 18 },
  { name: "拉伸", value: 16 },
  { name: "其他", value: 10 }
];

export const weightTrend = [
  { date: "5月1日", weight: 56.5 },
  { date: "5月6日", weight: 56.2 },
  { date: "5月11日", weight: 56.4 },
  { date: "5月16日", weight: 56.3 },
  { date: "5月21日", weight: 55.8 }
];

export const calendarDays = Array.from({ length: 31 }, (_, index) => {
  const day = index + 1;
  const date = `2026-05-${String(day).padStart(2, "0")}`;
  return {
    day,
    record: records.find((record) => record.date === date)
  };
});
