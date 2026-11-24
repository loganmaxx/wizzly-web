"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Check,
  Clock,
  Disc3,
  LayoutGrid,
  Sparkles,
  StickyNote,
  Wrench,
  Zap,
} from "lucide-react";
import { RELEASE_NOTES_V011, type Lang } from "@/data/wizzlyData";

type NoteTab = "added" | "changed" | "fixed";

export function WhatsNewSection({ lang }: { lang: Lang }) {
  const [activeTab, setActiveTab] = useState<NoteTab>("added");
  const [enabledWidgets, setEnabledWidgets] = useState({
    clock: true,
    vinyl: true,
    calendar: true,
    memo: true,
  });

  const activeCount = Object.values(enabledWidgets).filter(Boolean).length;

  const toggleWidget = (key: keyof typeof enabledWidgets) => {
    setEnabledWidgets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const items =
    activeTab === "added"
      ? RELEASE_NOTES_V011.added
      : activeTab === "changed"
        ? RELEASE_NOTES_V011.changed
        : RELEASE_NOTES_V011.fixed;

  return (
    <section id="whats-new" className="mt-20 scroll-mt-24">
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-sky-300">
          <Sparkles className="h-3 w-3" />
          {lang === "id" ? "Pembaruan Terbaru • v0.1.1" : "What's New • v0.1.1"}
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {lang === "id"
            ? "Desktop Widgets, Genie Effect & Floating Karaoke."
            : "Desktop Widgets, Genie Effect & Floating Karaoke."}
        </h2>
        <p className="mt-2 max-w-2xl text-xs text-slate-400 sm:text-sm">
          {lang === "id"
            ? "Rilis v0.1.1 merombak halaman Widget Settings dengan 4 widget native Direct2D, animasi Genie GPU Direct3D11 VSync, dan banyak penyempurnaan responsivitas."
            : "v0.1.1 overhauls the Widget Settings gallery with 4 native Direct2D desktop widgets, VSync-locked Direct3D11 Genie Effect animations, and major responsiveness upgrades."}
        </p>
      </div>

      {/* Interactive 2x2 Widget Gallery Preview + Focused Highlights */}
      <div className="grid gap-5 lg:grid-cols-12">
        {/* Left: Interactive 2x2 Widget Gallery Preview (mirrors v0.1.1 Settings Tab) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="rounded-3xl border border-white/10 bg-[#0a0c13] p-5 lg:col-span-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-bold text-white">
                {lang === "id" ? "Galeri Widget 2×2" : "2×2 Widget Gallery"}
              </span>
            </div>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-300">
              {activeCount}/4 Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {(
              [
                {
                  key: "clock",
                  name: "Clock",
                  meta: "Liquid / Sonoma / Depth",
                  icon: Clock,
                  accent: "text-sky-300",
                },
                {
                  key: "vinyl",
                  name: "Vinyl Turntable",
                  meta: "332px • Nothing / Glass",
                  icon: Disc3,
                  accent: "text-indigo-300",
                },
                {
                  key: "calendar",
                  name: "Calendar & Agenda",
                  meta: "Square / Agenda • .ics",
                  icon: CalendarIcon,
                  accent: "text-rose-300",
                },
                {
                  key: "memo",
                  name: "Sticky Memo",
                  meta: "To-Do • Notes Yellow",
                  icon: StickyNote,
                  accent: "text-amber-300",
                },
              ] as const
            ).map((w) => {
              const Icon = w.icon;
              const isOn = enabledWidgets[w.key];
              return (
                <div
                  key={w.key}
                  onClick={() => toggleWidget(w.key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleWidget(w.key);
                    }
                  }}
                  className={`cursor-pointer rounded-2xl border p-3 transition ${
                    isOn
                      ? "border-indigo-400/35 bg-gradient-to-b from-white/[0.07] to-white/[0.02]"
                      : "border-white/10 bg-white/[0.015] opacity-60"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <Icon className={`h-4 w-4 ${w.accent}`} />
                    <span
                      className={`inline-flex h-4 w-7 items-center rounded-full p-0.5 transition ${
                        isOn ? "justify-end bg-emerald-500" : "justify-start bg-white/15"
                      }`}
                    >
                      <span className="h-3 w-3 rounded-full bg-white shadow" />
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white">{w.name}</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">{w.meta}</p>
                </div>
              );
            })}
          </div>

          <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
            {lang === "id"
              ? "Dilengkapi Magnetic Snap antar kartu, Quick Editor popover (+), dan z-order di atas lapisan Depth Clock."
              : "Includes Magnetic Snap card alignment, Quick Editor (+) popover, and z-ordering above the Depth Clock layer."}
          </p>
        </motion.div>

        {/* Right: Tabbed Release Notes v0.1.1 */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col rounded-3xl border border-white/10 bg-[#0a0c13] p-5 lg:col-span-7"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] p-1">
              {(
                [
                  {
                    id: "added",
                    label: lang === "id" ? `Ditambahkan (${RELEASE_NOTES_V011.added.length})` : `Added (${RELEASE_NOTES_V011.added.length})`,
                    icon: Sparkles,
                  },
                  {
                    id: "changed",
                    label: lang === "id" ? `Ditingkatkan (${RELEASE_NOTES_V011.changed.length})` : `Improved (${RELEASE_NOTES_V011.changed.length})`,
                    icon: Zap,
                  },
                  {
                    id: "fixed",
                    label: lang === "id" ? `Diperbaiki (${RELEASE_NOTES_V011.fixed.length})` : `Fixed (${RELEASE_NOTES_V011.fixed.length})`,
                    icon: Wrench,
                  },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      activeTab === tab.id
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <span className="font-mono text-[11px] text-slate-400">
              v{RELEASE_NOTES_V011.version} • {RELEASE_NOTES_V011.date}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="max-h-[300px] space-y-2.5 overflow-y-auto pr-1"
            >
              {items.map((item) => (
                <div
                  key={item.title.en}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-3.5"
                >
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <div>
                      <h3 className="text-xs font-bold text-white sm:text-sm">
                        {item.title[lang]}
                      </h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-400 sm:text-xs">
                        {item.detail[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
