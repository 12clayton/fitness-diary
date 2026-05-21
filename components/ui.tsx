import { ReactNode } from "react";

export function Card({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[1.4rem] border border-oat/70 bg-white/82 p-4 shadow-soft ${className}`}>
      {children}
    </section>
  );
}

export function Pill({
  children,
  active = false,
  onClick
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-10 rounded-full border px-4 text-sm font-medium transition ${
        active ? "border-cocoa bg-cocoa text-cream" : "border-oat bg-linen text-cocoa/75"
      }`}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-cocoa/75">
      {label}
      {children}
    </label>
  );
}

export const inputClass =
  "min-h-12 rounded-2xl border border-oat bg-white px-4 text-base text-cocoa outline-none transition placeholder:text-cocoa/35 focus:border-rosewood";
