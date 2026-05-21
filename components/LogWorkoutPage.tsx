"use client";

import { ChevronDown, Moon, Save, Trash2, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { inputClass, Card, Field, Pill } from "@/components/ui";
import { type WorkoutRecord, type WorkoutType, workoutTypes } from "@/lib/data";
import { getTodayDate } from "@/lib/date";

type ExerciseDraft = {
  name: string;
  weight: string;
  sets: string;
  reps: string;
  note: string;
};

const emptyExercise: ExerciseDraft = {
  name: "",
  weight: "",
  sets: "",
  reps: "",
  note: ""
};

export default function LogWorkoutPage({
  editingRecord,
  onCancelEdit,
  onDelete,
  onSave
}: {
  editingRecord: WorkoutRecord | null;
  onCancelEdit: () => void;
  onDelete: (recordId: string) => void;
  onSave: (record: WorkoutRecord) => void;
}) {
  const workoutTypeOptions = workoutTypes as Exclude<WorkoutType, "休息">[];
  const [date, setDate] = useState(getToday());
  const [isRest, setIsRest] = useState(false);
  const [type, setType] = useState<Exclude<WorkoutType, "休息">>("臀腿");
  const [duration, setDuration] = useState("45");
  const [intensity, setIntensity] = useState<"轻松" | "适中" | "偏累">("适中");
  const [mood, setMood] = useState("平静");
  const [sleep, setSleep] = useState("不错");
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");
  const [exercise, setExercise] = useState<ExerciseDraft>(emptyExercise);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!editingRecord) {
      resetForm();
      return;
    }

    const firstExercise = editingRecord.exercises?.[0];
    setDate(editingRecord.date);
    setIsRest(editingRecord.type === "休息");
    setType(editingRecord.type === "休息" ? "臀腿" : editingRecord.type);
    setDuration(String(editingRecord.duration || 0));
    setIntensity(editingRecord.intensity === "休息" ? "适中" : editingRecord.intensity);
    setMood(editingRecord.mood || "平静");
    setSleep(editingRecord.sleep || "不错");
    setWeight(editingRecord.weight ? String(editingRecord.weight) : "");
    setNote(editingRecord.note || "");
    setExercise(
      firstExercise
        ? {
            name: firstExercise.name,
            weight: firstExercise.weight,
            sets: String(firstExercise.sets),
            reps: firstExercise.reps,
            note: firstExercise.note ?? ""
          }
        : emptyExercise
    );
    setShowDetails(Boolean(firstExercise));
  }, [editingRecord]);

  function resetForm() {
    setDate(getToday());
    setIsRest(false);
    setType("臀腿");
    setDuration("45");
    setIntensity("适中");
    setMood("平静");
    setSleep("不错");
    setWeight("");
    setNote("");
    setExercise(emptyExercise);
    setShowDetails(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedExerciseName = exercise.name.trim();
    const nextRecord: WorkoutRecord = {
      id: editingRecord?.id ?? `${date}-${Date.now()}`,
      date,
      day: formatDay(date),
      type: isRest ? "休息" : type,
      duration: isRest ? 0 : Number(duration || 0),
      intensity: isRest ? "休息" : intensity,
      mood,
      sleep,
      weight: weight ? Number(weight) : undefined,
      note: note.trim() || (isRest ? "今天好好休息。" : "完成了今天的训练。"),
      exercises:
        !isRest && trimmedExerciseName
          ? [
              {
                name: trimmedExerciseName,
                weight: exercise.weight.trim(),
                sets: Number(exercise.sets || 0),
                reps: exercise.reps.trim(),
                note: exercise.note.trim() || undefined
              }
            ]
          : undefined
    };

    onSave(nextRecord);
    resetForm();
  }

  function handleDelete() {
    if (!editingRecord) {
      return;
    }

    onDelete(editingRecord.id);
    onCancelEdit();
    resetForm();
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <Card>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-cocoa">
              {editingRecord ? "编辑记录" : "记录今天"}
            </h2>
            <p className="mt-1 text-sm text-cocoa/58">点几下就够了。</p>
          </div>
          {editingRecord && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-linen text-cocoa/65"
              aria-label="取消编辑"
              title="取消编辑"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Pill active={!isRest} onClick={() => setIsRest(false)}>训练</Pill>
          <Pill active={isRest} onClick={() => setIsRest(true)}>
            <span className="inline-flex items-center gap-2"><Moon size={16} /> 休息</span>
          </Pill>
        </div>
      </Card>

      <Card className="grid gap-4">
        <Field label="日期">
          <input className={inputClass} type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </Field>

        {!isRest && (
          <div>
            <h3 className="mb-3 font-semibold text-cocoa">训练类型</h3>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {workoutTypeOptions.map((option) => (
                <Pill key={option} active={type === option} onClick={() => setType(option)}>
                  {option}
                </Pill>
              ))}
            </div>
          </div>
        )}

        {!isRest && (
          <Field label="训练时长">
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <input
                className={inputClass}
                type="number"
                min="0"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
              />
              <span className="text-sm font-medium text-cocoa/55">分钟</span>
            </div>
          </Field>
        )}

        {!isRest && (
          <div>
            <p className="mb-2 text-sm font-medium text-cocoa/75">训练强度</p>
            <div className="grid grid-cols-3 gap-2">
              {(["轻松", "适中", "偏累"] as const).map((option) => (
                <Pill key={option} active={intensity === option} onClick={() => setIntensity(option)}>
                  {option}
                </Pill>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Field label="心情">
            <select className={inputClass} value={mood} onChange={(event) => setMood(event.target.value)}>
              <option>平静</option>
              <option>开心</option>
              <option>专注</option>
              <option>有点累</option>
              <option>酸胀</option>
            </select>
          </Field>
          <Field label="睡眠">
            <select className={inputClass} value={sleep} onChange={(event) => setSleep(event.target.value)}>
              <option>很好</option>
              <option>不错</option>
              <option>还行</option>
              <option>浅睡</option>
            </select>
          </Field>
        </div>

        <Field label="体重">
          <input
            className={inputClass}
            inputMode="decimal"
            placeholder="选填"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </Field>

        <Field label="备注">
          <textarea
            className={`${inputClass} min-h-24 resize-none py-3`}
            placeholder="今天身体感觉怎么样？"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </Field>
      </Card>

      {!isRest && (
        <Card>
          <button
            type="button"
            onClick={() => setShowDetails((current) => !current)}
            className="flex w-full items-center justify-between text-left font-semibold text-cocoa"
          >
            动作详情
            <ChevronDown className={`transition ${showDetails ? "rotate-180" : ""}`} size={20} />
          </button>

          {showDetails && (
            <div className="mt-4 grid gap-3">
              <Field label="动作名称">
                <input
                  className={inputClass}
                  placeholder="臀推"
                  value={exercise.name}
                  onChange={(event) => setExercise({ ...exercise, name: event.target.value })}
                />
              </Field>
              <div className="grid grid-cols-3 gap-2">
                <Field label="重量">
                  <input
                    className={inputClass}
                    placeholder="45 公斤"
                    value={exercise.weight}
                    onChange={(event) => setExercise({ ...exercise, weight: event.target.value })}
                  />
                </Field>
                <Field label="组数">
                  <input
                    className={inputClass}
                    type="number"
                    placeholder="4"
                    value={exercise.sets}
                    onChange={(event) => setExercise({ ...exercise, sets: event.target.value })}
                  />
                </Field>
                <Field label="次数">
                  <input
                    className={inputClass}
                    placeholder="10"
                    value={exercise.reps}
                    onChange={(event) => setExercise({ ...exercise, reps: event.target.value })}
                  />
                </Field>
              </div>
              <Field label="动作备注">
                <input
                  className={inputClass}
                  placeholder="选填"
                  value={exercise.note}
                  onChange={(event) => setExercise({ ...exercise, note: event.target.value })}
                />
              </Field>
            </div>
          )}
        </Card>
      )}

      <div className="grid gap-2">
        <button
          type="submit"
          className="flex min-h-14 items-center justify-center gap-2 rounded-[1.25rem] bg-cocoa px-5 text-base font-semibold text-cream shadow-soft"
        >
          <Save size={19} />
          保存记录
        </button>

        {editingRecord && (
          <button
            type="button"
            onClick={handleDelete}
            className="flex min-h-12 items-center justify-center gap-2 rounded-[1.25rem] bg-blush px-5 text-sm font-semibold text-rosewood"
          >
            <Trash2 size={18} />
            删除记录
          </button>
        )}
      </div>
    </form>
  );
}

function getToday() {
  return getTodayDate();
}

function formatDay(dateString: string) {
  const today = getToday();
  if (dateString === today) {
    return "今天";
  }

  return new Intl.DateTimeFormat("zh-CN", { weekday: "short" }).format(new Date(`${dateString}T00:00:00`));
}
