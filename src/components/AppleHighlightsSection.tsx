"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calculator,
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Disc3,
  Minimize2,
  Music,
  Pause,
  Play,
  Search,
  Sparkles,
  StickyNote,
} from "lucide-react";
import type { Lang } from "@/data/wizzlyData";
import { DockAppSvg } from "@/components/AppIcons";

interface HighlightSlide {
  id: string;
  eyebrow: Record<Lang, string>;
  title: Record<Lang, string>;
  subtitle: Record<Lang, string>;
  glow: string;
}

const SLIDES: HighlightSlide[] = [
  {
    id: "widgets",
    eyebrow: {
      id: "Desktop Widgets Native",
      en: "Native Desktop Widgets",
    },
    title: {
      id: "Empat widget Direct2D. Nyaris 0% CPU saat idle.",
      en: "Four Direct2D widgets. Near-zero idle CPU.",
    },
    subtitle: {
      id: "Clock dengan Depth Effect, Vinyl Turntable, Calendar iCal (.ics), dan Sticky Memo To-Do dengan Magnetic Snap & Quick Editor.",
      en: "Depth Effect Clock, Vinyl Turntable, iCal (.ics) Calendar, and Sticky To-Do Memo with Magnetic Snap & Quick Editor.",
    },
    glow: "radial-gradient(ellipse 65% 55% at 70% 50%, rgba(41, 151, 255, 0.22), transparent 72%)",
  },
  {
    id: "genie",
    eyebrow: {
      id: "Direct3D11 + DirectComposition",
      en: "Direct3D11 + DirectComposition",
    },
    title: {
      id: "Animasi Genie Effect terkunci VSync layar.",
      en: "VSync-locked Genie Effect straight to your Dock.",
    },
    subtitle: {
      id: "Minimize dan Restore melengkung mulus tepat ke koordinat ikon Dock dengan 0 MB overhead saat idle.",
      en: "Smooth curved minimize and restore directly into Dock icon coordinates with 0 MB idle memory overhead.",
    },
    glow: "radial-gradient(ellipse 65% 55% at 70% 50%, rgba(168, 85, 247, 0.24), transparent 72%)",
  },
  {
    id: "notch",
    eyebrow: {
      id: "Dynamic Island + Floating Karaoke",
      en: "Dynamic Island + Floating Karaoke",
    },
    title: {
      id: "Notch serbaguna dengan lirik karaoke mengambang.",
      en: "A living Notch with floating karaoke lyrics.",
    },
    subtitle: {
      id: "Kontrol media, source switcher, File Shelf ala AirDrop, Clipboard History, Pomodoro, dan jendela lirik resize 8 arah.",
      en: "Media controls, source switcher, AirDrop-style File Shelf, Clipboard History, Pomodoro, plus an 8-way resizable lyrics window.",
    },
    glow: "radial-gradient(ellipse 65% 55% at 70% 50%, rgba(236, 72, 153, 0.2), transparent 72%)",
  },
  {
    id: "spotlight",
    eyebrow: {
      id: "Spotlight & Launchpad",
      en: "Spotlight & Launchpad",
    },
    title: {
      id: "Alt+Space instan. Opsi tombol Win untuk Launchpad.",
      en: "Instant Alt+Space. Optional Win-key Launchpad.",
    },
    subtitle: {
      id: "Cari file lokal, hitung cepat, atur volume per-aplikasi, dan auto-hide saat game borderless fullscreen — hanya 3.5 MB.",
      en: "Local file search, instant math, per-app volume mixer, and automatic Game Mode hiding — all in a 3.5 MB installer.",
    },
    glow: "radial-gradient(ellipse 65% 55% at 70% 50%, rgba(52, 211, 153, 0.18), transparent 72%)",
  },
];

export function AppleHighlightsSection({ lang }: { lang: Lang }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [genieMinimized, setGenieMinimized] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5200);
    return () => clearInterval(id);
  }, [autoPlay]);

  useEffect(() => {
    if (SLIDES[activeIndex].id !== "genie") return;
    const id = setInterval(() => setGenieMinimized((m) => !m), 2100);
    return () => clearInterval(id);
  }, [activeIndex]);

  const current = SLIDES[activeIndex];

  const goTo = (idx: number) => {
    setAutoPlay(false);
    setActiveIndex((idx + SLIDES.length) % SLIDES.length);
  };

  return (
    <section id="highlights" className="mt-28 scroll-mt-20 sm:mt-36">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2997ff]">
            {lang === "id" ? "Sorotan Utama" : "Get the highlights"}
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#f5f5f7] sm:text-5xl">
            {lang === "id" ? "Semua detail terasa hidup." : "Every detail, elevated."}
          </h2>
        </div>
        <a
          href="#preview"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#2997ff] transition hover:underline"
        >
          {lang === "id" ? "Coba langsung di Sandbox" : "Try the live Sandbox"}
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>

      {/* Main Cinematic Highlight Stage */}
      <div className="apple-card relative overflow-hidden rounded-[28px] sm:rounded-[34px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-all duration-700"
          style={{ background: current.glow }}
        />

        <div className="relative z-10 grid min-h-[390px] items-center gap-8 p-6 sm:min-h-[430px] sm:p-10 lg:grid-cols-12 lg:p-14">
          {/* Editorial Copy */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-block rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium text-[#a1a1a6]">
                  {current.eyebrow[lang]}
                </span>
                <h3 className="mt-4 text-2xl font-semibold leading-[1.15] tracking-[-0.025em] text-white sm:text-4xl">
                  {current.title[lang]}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#a1a1a6] sm:text-base">
                  {current.subtitle[lang]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Live Stage Visual */}
          <div className="flex items-center justify-center lg:col-span-6">
            <AnimatePresence mode="wait">
              {current.id === "widgets" && (
                <motion.div
                  key="stage-widgets"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="grid w-full max-w-md grid-cols-2 gap-3"
                >
                  <div className="col-span-2 flex items-center justify-between rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-4 backdrop-blur-xl">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#86868b]">
                        Depth Clock • Direct2D
                      </p>
                      <p className="mt-1 bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                        09:41
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-[#2997ff]" />
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-[#161617]/90 p-3.5">
                    <div className="animate-spin-slow flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black">
                      <Disc3 className="h-5 w-5 text-[#2997ff]" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-white">Vinyl</p>
                      <p className="text-[10px] text-[#86868b]">Nothing / Glass</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border border-amber-300/30 bg-amber-200 p-3.5 text-amber-950">
                    <StickyNote className="h-5 w-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold">Sticky Memo</p>
                      <p className="flex items-center gap-1 text-[10px] font-medium">
                        <Check className="h-3 w-3 text-emerald-700" /> To-Do Ready
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-between rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-rose-400" />
                      <span className="text-xs font-medium text-white">
                        Calendar & Agenda • iCal (.ics) Sync
                      </span>
                    </div>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] text-[#a1a1a6]">
                      Snap
                    </span>
                  </div>
                </motion.div>
              )}

              {current.id === "genie" && (
                <motion.div
                  key="stage-genie"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex h-64 w-full max-w-md flex-col items-center justify-between rounded-3xl border border-white/10 bg-black/50 p-5"
                >
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/25 bg-purple-500/10 px-3 py-1 font-mono text-[10px] text-purple-200">
                    <Minimize2 className="h-3 w-3" /> 0 MB Idle • VSync Locked
                  </span>

                  <motion.div
                    animate={
                      genieMinimized
                        ? { scaleX: 0.14, scaleY: 0.1, y: 84, skewX: -18, opacity: 0.08 }
                        : { scaleX: 1, scaleY: 1, y: 0, skewX: 0, opacity: 1 }
                    }
                    transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setGenieMinimized((m) => !m)}
                    className="w-56 cursor-pointer rounded-2xl border border-white/20 bg-[#1d1d1f] p-3 shadow-2xl"
                  >
                    <div className="mb-2.5 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <span className="font-mono text-[10px] text-[#86868b]">genie.rs</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2.5 w-2/3 rounded-full bg-white/20" />
                      <div className="h-2.5 w-full rounded-full bg-purple-400/35" />
                      <div className="h-2.5 w-4/5 rounded-full bg-white/10" />
                    </div>
                  </motion.div>

                  <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-md">
                    <div className="h-7 w-7 overflow-hidden rounded-lg">
                      <DockAppSvg id="explorer" />
                    </div>
                    <div className="h-7 w-7 overflow-hidden rounded-lg ring-2 ring-purple-400/80">
                      <DockAppSvg id="vscode" />
                    </div>
                    <div className="h-7 w-7 overflow-hidden rounded-lg">
                      <DockAppSvg id="spotify" />
                    </div>
                    <div className="h-7 w-7 overflow-hidden rounded-lg">
                      <DockAppSvg id="terminal" />
                    </div>
                  </div>
                </motion.div>
              )}

              {current.id === "notch" && (
                <motion.div
                  key="stage-notch"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="flex w-full max-w-md flex-col items-center gap-4"
                >
                  <div className="w-full rounded-[26px] border border-white/15 bg-[#08080a] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500">
                        <Music className="h-6 w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">
                          Midnight Obsidian
                        </p>
                        <p className="truncate text-xs text-[#86868b]">
                          Spotify • Source Switcher
                        </p>
                      </div>
                      <div className="flex h-5 items-end gap-0.5">
                        <span className="animate-eq-1 h-5 w-1 rounded-full bg-[#2997ff]" />
                        <span className="animate-eq-2 h-5 w-1 rounded-full bg-[#2997ff]" />
                        <span className="animate-eq-3 h-5 w-1 rounded-full bg-[#2997ff]" />
                        <span className="animate-eq-4 h-5 w-1 rounded-full bg-[#2997ff]" />
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {["Media", "Lyrics", "Timer", "Shelf", "Clip"].map((tab, idx) => (
                        <span
                          key={tab}
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                            idx === 1
                              ? "bg-white text-black"
                              : "bg-white/10 text-[#a1a1a6]"
                          }`}
                        >
                          {tab}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-[88%] rounded-2xl border border-pink-400/20 bg-black/75 px-5 py-3.5 text-center backdrop-blur-xl">
                    <p className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-pink-300">
                      <Sparkles className="h-3 w-3" /> Floating Karaoke • 8-Way Resize
                    </p>
                    <p className="mt-2 text-xs text-[#86868b]">Floating above the taskbar glow</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      Every window settles smooth and slow
                    </p>
                  </div>
                </motion.div>
              )}

              {current.id === "spotlight" && (
                <motion.div
                  key="stage-spotlight"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-md rounded-3xl border border-white/15 bg-[#121215]/95 p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                    <Search className="h-4 w-4 text-[#2997ff]" />
                    <span className="font-mono text-sm text-white">128 * 4</span>
                    <span className="ml-auto rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] text-[#a1a1a6]">
                      Alt + Space
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between rounded-2xl bg-[#0071e3]/20 px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Calculator className="h-4 w-4 text-[#2997ff]" />
                      <span className="text-xs text-[#f5f5f7]">Instant Calculator</span>
                    </div>
                    <span className="font-mono text-base font-bold text-white">= 512</span>
                  </div>
                  <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px] text-[#a1a1a6]">
                    <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
                      Win-Key Launchpad
                    </div>
                    <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
                      Per-App Volume Mixer
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Apple-Style Floating Carousel Controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setAutoPlay((v) => !v)}
          aria-label={autoPlay ? "Pause highlights" : "Play highlights"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#1d1d1f] text-[#f5f5f7] transition hover:bg-[#2c2c2e]"
        >
          {autoPlay ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}
        </button>

        <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#1d1d1f] px-4 py-2.5">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous highlight"
            className="text-[#86868b] transition hover:text-white"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          <div className="flex items-center gap-2">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Slide ${idx + 1}: ${slide.eyebrow[lang]}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "w-7 bg-[#f5f5f7]" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next highlight"
            className="text-[#86868b] transition hover:text-white"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
