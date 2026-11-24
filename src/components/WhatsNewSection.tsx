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
    <section id="whats-new" className="mt-28 scroll-mt-20 sm:mt-36">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2997ff]">
            {lang === "id" ? `Rilis Terbaru • v${RELEASE_NOTES_V011.version}` : `What's New • v${RELEASE_NOTES_V011.version}`}
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#f5f5f7] sm:text-5xl">
            Desktop Widgets, Genie Effect & Floating Karaoke.
          </h2>
          <p className="mt-3 text-base text-[#86868b] sm:text-lg">
            {lang === "id"
              ? "Rilis v0.1.1 merombak halaman Widget Settings dengan pratinjau wallpaper langsung, animasi Genie GPU Direct3D11 VSync, dan banyak penyempurnaan responsivitas."
              : "v0.1.1 introduces a visual 2×2 Widget Gallery with live wallpaper preview, VSync-locked Direct3D11 Genie animations, and responsiveness upgrades."}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-[#161617] px-3.5 py-1.5 font-mono text-xs text-[#a1a1a6]">
          v{RELEASE_NOTES_V011.version} • {RELEASE_NOTES_V011.date}
        </span>
      </div>

      {/* Interactive 2x2 Widget Gallery Preview + Apple-Styled Release Notes */}
      <div className="grid gap-5 lg:grid-cols-12">
        {/* Left: Live Wallpaper Preview + 2x2 Widget Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="apple-card flex flex-col justify-between rounded-[28px] p-6 lg:col-span-5"
        >
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-[#2997ff]" />
                <span className="text-sm font-semibold text-[#f5f5f7]">
                  {lang === "id" ? "Galeri Widget 2×2" : "2×2 Widget Gallery"}
                </span>
              </div>
              <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-300">
                {activeCount}/4 Active
              </span>
            </div>

            {/* Live Miniature Wallpaper Preview */}
            <div
              className="relative mb-4 h-36 overflow-hidden rounded-2xl border border-white/15 p-3.5 shadow-inner"
              style={{
                background:
                  "radial-gradient(circle at 25% 25%, rgba(0,113,227,0.45), transparent 55%), radial-gradient(circle at 80% 70%, rgba(139,92,246,0.35), transparent 55%), linear-gradient(155deg, #070a14 0%, #050507 100%)",
              }}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <AnimatePresence>
                    {enabledWidgets.clock && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.18 }}
                      >
                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/60">
                          Nov 24
                        </p>
                        <p className="text-2xl font-bold tracking-tight text-white">09:41</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="rounded-full bg-black/50 px-2 py-0.5 text-[9px] text-white/70 backdrop-blur-md">
                    {lang === "id" ? "Pratinjau Live" : "Live Preview"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  <AnimatePresence>
                    {enabledWidgets.vinyl && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2 py-1.5 backdrop-blur-md"
                      >
                        <Disc3 className="animate-spin-slow h-3.5 w-3.5 shrink-0 text-[#2997ff]" />
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
                        className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2 py-1.5 backdrop-blur-md"
                      >
                        <CalendarIcon className="h-3.5 w-3.5 shrink-0 text-rose-400" />
                        <span className="truncate text-[9px] font-medium text-white">Nov 24</span>
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
                  {
                    key: "clock",
                    name: "Clock",
                    meta: "Liquid / Sonoma / Depth",
                    icon: Clock,
                    accent: "text-[#2997ff]",
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
                    accent: "text-rose-400",
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
                    className={`cursor-pointer rounded-2xl border p-3.5 transition ${
                      isOn
                        ? "border-white/20 bg-white/[0.06]"
                        : "border-white/[0.06] bg-white/[0.015] opacity-55"
                    }`}
                  >
                    <div className="mb-2.5 flex items-center justify-between">
                      <Icon className={`h-4 w-4 ${w.accent}`} />
                      <span
                        className={`inline-flex h-4 w-7 items-center rounded-full p-0.5 transition ${
                          isOn ? "justify-end bg-[#30d158]" : "justify-start bg-white/15"
                        }`}
                      >
                        <span className="h-3 w-3 rounded-full bg-white shadow" />
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-white">{w.name}</p>
                    <p className="mt-0.5 text-[10px] text-[#86868b]">{w.meta}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-[#86868b]">
            {lang === "id"
              ? "Klik kartu untuk mengaktifkan pratinjau. Mendukung Magnetic Snap, Quick Editor (+), dan z-order di atas Depth Clock."
              : "Click any card to toggle its preview. Includes Magnetic Snap, Quick Editor (+), and z-ordering above Depth Clock."}
          </p>
        </motion.div>

        {/* Right: Apple Segmented Release Notes v0.1.1 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="apple-card flex flex-col rounded-[28px] p-6 lg:col-span-7"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/60 p-1">
              {(
                [
                  {
                    id: "added",
                    label:
                      lang === "id"
                        ? `Ditambahkan (${RELEASE_NOTES_V011.added.length})`
                        : `Added (${RELEASE_NOTES_V011.added.length})`,
                    icon: Sparkles,
                  },
                  {
                    id: "changed",
                    label:
                      lang === "id"
                        ? `Ditingkatkan (${RELEASE_NOTES_V011.changed.length})`
                        : `Improved (${RELEASE_NOTES_V011.changed.length})`,
                    icon: Zap,
                  },
                  {
                    id: "fixed",
                    label:
                      lang === "id"
                        ? `Diperbaiki (${RELEASE_NOTES_V011.fixed.length})`
                        : `Fixed (${RELEASE_NOTES_V011.fixed.length})`,
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
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                      activeTab === tab.id
                        ? "bg-white text-black shadow-sm"
                        : "text-[#a1a1a6] hover:text-white"
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
              className="max-h-[410px] space-y-2.5 overflow-y-auto pr-1"
            >
              {items.map((item) => (
                <div
                  key={item.title.en}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:bg-white/[0.04]"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#30d158]/15 text-[#30d158]">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    <div>
                      <h3 className="text-xs font-semibold text-[#f5f5f7] sm:text-sm">
                        {item.title[lang]}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#86868b]">
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
