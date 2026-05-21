"use client";

import { Bell, LockKeyhole, Sparkles } from "lucide-react";
import { Card, Field, inputClass, Pill } from "@/components/ui";

export default function ProfilePage() {
  return (
    <div className="grid gap-4">
      <Card className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blush text-3xl font-semibold text-rosewood">
          L
        </div>
        <h2 className="mt-3 text-xl font-semibold text-cocoa">她的日记</h2>
        <p className="mt-1 text-sm text-cocoa/55">温柔记录身体、心情和一点点进步。</p>
      </Card>

      <Card>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles size={20} className="text-honey" />
          <h3 className="font-semibold text-cocoa">每周目标</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[2, 3, 4, 5].map((goal) => (
            <Pill key={goal} active={goal === 4}>
              {goal}次
            </Pill>
          ))}
        </div>
      </Card>

      <Card className="grid gap-4">
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-rosewood" />
          <h3 className="font-semibold text-cocoa">偏好设置</h3>
        </div>
        <Field label="温柔提醒时间">
          <input className={inputClass} type="time" defaultValue="20:30" />
        </Field>
        <Field label="偏爱的训练重点">
          <select className={inputClass} defaultValue="臀腿和体态">
            <option>臀腿和体态</option>
            <option>力量</option>
            <option>灵活度</option>
            <option>心肺健康</option>
          </select>
        </Field>
        <label className="flex items-center justify-between gap-4 rounded-2xl bg-linen p-3 text-sm font-medium text-cocoa/75">
          在首页显示体重
          <input type="checkbox" defaultChecked className="h-5 w-5 accent-rosewood" />
        </label>
      </Card>

      <Card className="bg-moss text-cream">
        <div className="flex gap-3">
          <LockKeyhole className="mt-0.5 shrink-0" size={21} />
          <div>
            <h3 className="font-semibold">隐私说明</h3>
            <p className="mt-2 text-sm leading-6 text-cream/75">
              第一版只使用本地模拟数据。没有账号，没有分享，也没有后端。
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
