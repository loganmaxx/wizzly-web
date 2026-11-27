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
import { RELEASE_NOTES_HISTORY, type Lang } from "@/data/wizzlyData";

type NoteTab = "added" | "changed" | "fixed";

export function WhatsNewSection({ lang }: { lang: Lang }) {
  const [selectedVersion, setSelectedVersion] = useState(RELEASE_NOTES_HISTORY[0].version);
  const [activeTab, setActiveTab] = useState<NoteTab>("added");
  const [enabledWidgets, setEnabledWidgets] = useState({
    clock: true,
    vinyl: true,
    calendar: true,
    memo: true,
  });

  const activeRelease =
    RELEASE_NOTES_HISTORY.find((r) => r.version === selectedVersion) ??
    RELEASE_NOTES_HISTORY[0];

  const activeCount = Object.values(enabledWidgets).filter(Boolean).length;

  const toggleWidget = (key: keyof typeof enabledWidgets) => {
    setEnabledWidgets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const items =
    activeTab === "added"
      ? activeRelease.added
      : activeTab === "changed"
        ? activeRelease.changed
        : activeRelease.fixed;

  return (
    <section id="whats-new" className="mt-28 scroll-mt-24 sm:mt-36">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            {lang === "id"
              ? `Catatan Rilis • v${activeRelease.version}`
              : `Changelog • v${activeRelease.version}`}
          </p>
          <h2 className="mt-2.5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            {lang === "id"
              ? `Apa yang baru di v${activeRelease.version}.`
              : `What's new in v${activeRelease.version}.`}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            {activeRelease.summary[lang]}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#0e0e11] p-1">
            {RELEASE_NOTES_HISTORY.map((rel) => (
              <button
                key={rel.version}
                type="button"
                onClick={() => {
                  setSelectedVersion(rel.version);
                  setActiveTab("added");
                }}
                className={`rounded-md px-2.5 py-1 font-mono text-xs transition ${
                  rel.version === activeRelease.version
                    ? "bg-white font-semibold text-zinc-950"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                v{rel.version}
              </button>
            ))}
          </div>
          <span className="rounded-lg border border-white/[0.08] bg-[#0e0e11] px-3 py-1.5 font-mono text-xs text-zinc-400">
            {activeRelease.date}
          </span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Left: Interactive 2x2 Widget Gallery Preview */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="surface-card flex flex-col justify-between rounded-3xl p-6 lg:col-span-5"
        >
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-zinc-300" />
                <span className="text-sm font-semibold text-white">
                  {lang === "id" ? "Galeri Widget 2×2" : "2×2 Widget Gallery"}
                </span>
              </div>
              <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] tabular-nums text-zinc-300">
                {activeCount}/4 Active
              </span>
            </div>

            {/* Live Miniature Wallpaper Preview */}
            <div
              className="relative mb-4 h-36 overflow-hidden rounded-2xl border border-white/10 p-3.5 shadow-inner"
              style={{
                background:
                  "radial-gradient(circle at 22% 24%, rgba(64,96,150,0.28), transparent 56%), linear-gradient(155deg, #0b0e16 0%, #070709 100%)",
              }}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <AnimatePresence>
                    {enabledWidgets.clock && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.18 }}
                      >
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">
                          Nov 26
                        </p>
                        <p className="text-2xl font-bold tracking-tight tabular-nums text-white">
                          09:41
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="rounded-md bg-black/50 px-2 py-0.5 font-mono text-[9px] text-zinc-400 backdrop-blur-md">
                    {lang === "id" ? "Live" : "Live"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  <AnimatePresence>
                    {enabledWidgets.vinyl && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/[0.08] px-2 py-1.5 backdrop-blur-md"
                      >
                        <Disc3 className="animate-spin-slow h-3.5 w-3.5 shrink-0 text-zinc-200" />
                        <span className="truncate text-[9px] font-medium text-white">Vinyl</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {enabledWidgets.calendar && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/[0.08] px-2 py-1.5 backdrop-blur-md"
                      >
                        <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-rose-400" />
                        <span className="truncate text-[9px] font-medium text-white">Nov 26</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {enabledWidgets.memo && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="flex items-center gap-1.5 rounded-lg border border-amber-300/35 bg-amber-200 px-2 py-1.5 text-amber-950"
                      >
                        <StickyNote className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate text-[9px] font-bold">To-Do</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {(
                [
                  { key: "clock", name: "Clock", meta: "Liquid / Sonoma / Depth", icon: Clock },
                  { key: "vinyl", name: "Vinyl Turntable", meta: "332px • Nothing / Glass", icon: Disc3 },
                  { key: "calendar", name: "Calendar", meta: "Square / Agenda • .ics", icon: CalendarIcon },
                  { key: "memo", name: "Sticky Memo", meta: "To-Do • Notes Yellow", icon: StickyNote },
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
                    className={`cursor-pointer rounded-2xl border p-3.5 transition ${
                      isOn
                        ? "border-white/16 bg-white/[0.05]"
                        : "border-white/[0.06] bg-white/[0.015] opacity-50"
                    }`}
                  >
                    <div className="mb-2.5 flex items-center justify-between">
                      <Icon className="h-4 w-4 text-zinc-200" />
                      <span
                        className={`inline-flex h-4 w-7 items-center rounded-full p-0.5 transition ${
                          isOn ? "justify-end bg-white" : "justify-start bg-white/15"
                        }`}
                      >
                        <span
                          className={`h-3 w-3 rounded-full shadow ${
                            isOn ? "bg-zinc-950" : "bg-zinc-400"
                          }`}
                        />
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-white">{w.name}</p>
                    <p className="mt-0.5 text-[10px] text-zinc-500">{w.meta}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-zinc-500">
            {lang === "id"
              ? "Klik kartu untuk toggle pratinjau. Mendukung Magnetic Snap, Quick Editor (+), dan z-order di atas Depth Clock."
              : "Click any card to toggle preview. Supports Magnetic Snap, Quick Editor (+), and z-ordering above Depth Clock."}
          </p>
        </motion.div>

        {/* Right: Clean Segmented Changelog */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="surface-card flex flex-col rounded-3xl p-6 lg:col-span-7"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 rounded-xl border border-white/[0.07] bg-black/50 p-1">
              {(
                [
                  {
                    id: "added",
                    label:
                      lang === "id"
                        ? `Baru (${activeRelease.added.length})`
                        : `Added (${activeRelease.added.length})`,
                    icon: Sparkles,
                  },
                  {
                    id: "changed",
                    label:
                      lang === "id"
                        ? `Ditingkatkan (${activeRelease.changed.length})`
                        : `Improved (${activeRelease.changed.length})`,
                    icon: Zap,
                  },
                  {
                    id: "fixed",
                    label:
                      lang === "id"
                        ? `Diperbaiki (${activeRelease.fixed.length})`
                        : `Fixed (${activeRelease.fixed.length})`,
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
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      activeTab === tab.id
                        ? "bg-white text-zinc-950"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="max-h-[410px] divide-y divide-white/[0.06] overflow-y-auto pr-1"
            >
              {items.map((item) => (
                <div key={item.title.en} className="py-3.5 first:pt-1 last:pb-1">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-zinc-300">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    <div>
                      <h3 className="text-xs font-semibold text-white sm:text-sm">
                        {item.title[lang]}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-400">
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
