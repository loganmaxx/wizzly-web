"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bluetooth,
  Calculator,
  Calendar as CalendarIcon,
  Check,
  Clock,
  Disc3,
  Headphones,
  MessageCircle,
  Minimize2,
  Music,
  Search,
  Sparkles,
  StickyNote,
} from "lucide-react";
import type { Lang } from "@/data/wizzlyData";
import { DockAppSvg } from "@/components/AppIcons";

export function VisualShowcase({ lang }: { lang: Lang }) {
  return (
    <section id="features" className="mt-28 scroll-mt-24 sm:mt-36">
      <div className="mb-12 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          {lang === "id" ? "Kemampuan Inti" : "Core Capabilities"}
        </p>
        <h2 className="mt-2.5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
          {lang === "id"
            ? "Performa native. Tanpa distraksi."
            : "Native speed. Zero visual clutter."}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
          {lang === "id"
            ? "Dirender langsung dengan Win32, Direct2D, dan Direct3D11 agar terasa mulus di layar 60Hz hingga 144Hz+."
            : "Rendered natively via Win32, Direct2D, and Direct3D11 — staying effortlessly smooth from 60Hz to 144Hz+."}
        </p>
      </div>

      {/* Minimalist Architectural 4-Card Bento */}
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <DesktopWidgetsCard lang={lang} />
        </div>
        <div className="lg:col-span-5">
          <GenieEffectCard lang={lang} />
        </div>
        <div className="lg:col-span-5">
          <NotchMorphCard lang={lang} />
        </div>
        <div className="lg:col-span-7">
          <DockAndSpotlightCard lang={lang} />
        </div>
      </div>
    </section>
  );
}

function BentoShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card flex h-full flex-col justify-between overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:border-white/[0.15] sm:p-7"
    >
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{subtitle}</p>
      </div>

      <div className="relative mt-6 flex h-44 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-[#08080a]">
        {children}
      </div>
    </motion.div>
  );
}

function DesktopWidgetsCard({ lang }: { lang: Lang }) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => ((s + 1) % 4) as 0 | 1 | 2 | 3);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <BentoShell
      eyebrow="Win32 + Direct2D / DirectWrite"
      title={lang === "id" ? "4 Native Desktop Widgets" : "4 Native Desktop Widgets"}
      subtitle={
        lang === "id"
          ? "Clock Depth Effect, Vinyl Turntable, Calendar .ics, dan Sticky Memo To-Do dengan Magnetic Snap (~0% CPU saat idle)."
          : "Depth Effect Clock, Vinyl Turntable, .ics Calendar, and Sticky To-Do Memo with Magnetic Snap (~0% idle CPU)."
      }
    >
      <div className="absolute left-3 top-3 flex gap-1">
        {(["Clock", "Vinyl", "Calendar", "Memo"] as const).map((label, idx) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(idx as 0 | 1 | 2 | 3)}
            className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition ${
              step === idx
                ? "bg-white text-zinc-950"
                : "bg-white/[0.05] text-zinc-500 hover:text-zinc-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="clock"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mt-4 flex flex-col items-center"
          >
            <span className="flex items-center gap-1 font-mono text-[10px] text-zinc-400">
              <Clock className="h-3 w-3" /> Liquid Glass Clock
            </span>
            <span className="mt-1 bg-gradient-to-b from-white to-white/50 bg-clip-text text-5xl font-bold tracking-tight text-transparent tabular-nums">
              09:41
            </span>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div
            key="vinyl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mt-4 flex items-center gap-3.5 rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3"
          >
            <div className="animate-spin-slow flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">
              <Disc3 className="h-5 w-5 text-zinc-200" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white">Vinyl Turntable</p>
              <p className="text-[11px] text-zinc-400">Nothing Light / Dark / Glass</p>
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mt-4 flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3"
          >
            <CalendarIcon className="h-5 w-5 text-rose-400" />
            <div className="text-left">
              <p className="text-xs font-semibold text-white">Calendar & Agenda</p>
              <p className="text-[11px] text-zinc-400">iCal (.ics) Sync Ready</p>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="memo"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mt-4 flex items-center gap-3 rounded-2xl border border-amber-300/40 bg-amber-200 px-4 py-3 text-amber-950"
          >
            <StickyNote className="h-5 w-5" />
            <div className="text-left">
              <p className="text-xs font-bold">Sticky To-Do</p>
              <p className="flex items-center gap-1 text-[11px] font-medium">
                <Check className="h-3 w-3 text-emerald-700" /> Direct click-to-check
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BentoShell>
  );
}

function GenieEffectCard({ lang }: { lang: Lang }) {
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setMinimized((m) => !m), 2300);
    return () => clearInterval(id);
  }, []);

  return (
    <BentoShell
      eyebrow="GPU Direct3D11 + VSync"
      title={lang === "id" ? "Animasi Genie Effect" : "VSync Genie Effect"}
      subtitle={
        lang === "id"
          ? "Minimize & restore melengkung tepat ke koordinat ikon Dock dengan 0 MB overhead saat idle."
          : "Curved minimize & restore directly into Dock coordinates with 0 MB idle memory overhead."
      }
    >
      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] text-zinc-400">
        <Minimize2 className="h-2.5 w-2.5" /> 0 MB Idle
      </span>

      <motion.div
        animate={
          minimized
            ? { scaleX: 0.16, scaleY: 0.12, y: 50, skewX: -18, opacity: 0.08 }
            : { scaleX: 1, scaleY: 1, y: -8, skewX: 0, opacity: 1 }
        }
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setMinimized((m) => !m)}
        className="w-40 cursor-pointer rounded-xl border border-white/16 bg-[#141418] p-2.5 shadow-xl"
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
          </div>
          <span className="font-mono text-[8px] text-zinc-500">genie.rs</span>
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-2/3 rounded bg-white/25" />
          <div className="h-1.5 w-full rounded bg-white/12" />
          <div className="h-1.5 w-4/5 rounded bg-white/10" />
        </div>
      </motion.div>

      <div className="absolute bottom-2.5 flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/[0.06] px-2.5 py-1">
        <div className="h-5 w-5 overflow-hidden rounded-md">
          <DockAppSvg id="explorer" />
        </div>
        <div className="h-5 w-5 overflow-hidden rounded-md ring-1 ring-white/70">
          <DockAppSvg id="vscode" />
        </div>
        <div className="h-5 w-5 overflow-hidden rounded-md">
          <DockAppSvg id="spotify" />
        </div>
      </div>
    </BentoShell>
  );
}

function NotchMorphCard({ lang }: { lang: Lang }) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => ((p + 1) % 3) as 0 | 1 | 2);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <BentoShell
      eyebrow="Dynamic Island"
      title={lang === "id" ? "Notch, Karaoke & File Shelf" : "Notch, Karaoke & File Shelf"}
      subtitle={
        lang === "id"
          ? "Kontrol media, lirik karaoke mengambang 8-arah, tray drag-and-drop, clipboard history, dan alert TWS."
          : "Media switcher, 8-way floating karaoke lyrics, AirDrop-style file shelf, clipboard history, and live alerts."
      }
    >
      <div className="relative z-10 flex items-center justify-center rounded-2xl border border-white/14 bg-[#0d0d10] px-4 py-3 shadow-2xl">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div
              key="music"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-zinc-950">
                <Music className="h-4 w-4" />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Midnight Obsidian</p>
                <p className="flex items-center gap-1 text-[10px] text-zinc-400">
                  <Sparkles className="h-2.5 w-2.5" /> Floating Karaoke
                </p>
              </div>
              <div className="flex h-4 items-end gap-0.5 pl-1">
                <span className="animate-eq-1 h-4 w-0.5 rounded-full bg-zinc-300" />
                <span className="animate-eq-2 h-4 w-0.5 rounded-full bg-zinc-300" />
                <span className="animate-eq-3 h-4 w-0.5 rounded-full bg-zinc-300" />
                <span className="animate-eq-4 h-4 w-0.5 rounded-full bg-zinc-300" />
              </div>
            </motion.div>
          )}
          {phase === 1 && (
            <motion.div
              key="tws"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <Headphones className="h-5 w-5 text-white" />
              <div className="text-left">
                <p className="text-xs font-semibold text-white">AirPods Pro</p>
                <p className="font-mono text-[10px] text-zinc-400">Connected • 92%</p>
              </div>
              <Bluetooth className="h-3.5 w-3.5 text-zinc-400" />
            </motion.div>
          )}
          {phase === 2 && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <MessageCircle className="h-5 w-5 text-emerald-400" />
              <div className="text-left">
                <p className="text-xs font-semibold text-white">WhatsApp • Raka</p>
                <p className="text-[10px] text-zinc-400">File sudah dikirim!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BentoShell>
  );
}

function DockAndSpotlightCard({ lang }: { lang: Lang }) {
  const [mode, setMode] = useState<"dock" | "spotlight">("dock");

  useEffect(() => {
    const id = setInterval(() => setMode((m) => (m === "dock" ? "spotlight" : "dock")), 3400);
    return () => clearInterval(id);
  }, []);

  const icons = [
    { id: "explorer", cls: "animate-dock-bob-0" },
    { id: "edge", cls: "animate-dock-bob-1" },
    { id: "vscode", cls: "animate-dock-bob-2" },
    { id: "spotify", cls: "animate-dock-bob-3" },
  ];

  return (
    <BentoShell
      eyebrow="Adaptive Dock • Alt+Space • Win-Key"
      title={lang === "id" ? "Liquid Dock, Spotlight & Game Mode" : "Liquid Dock, Spotlight & Game Mode"}
      subtitle={
        lang === "id"
          ? "Backdrop adaptif mengikuti wallpaper, pencarian file + kalkulator instan, opsi tombol Win Launchpad, dan auto-hide saat game."
          : "Wallpaper-adaptive glass, instant file search & calculator, optional Win-key Launchpad, and fullscreen game auto-hide."
      }
    >
      <div className="absolute left-3 top-3 flex gap-1">
        <button
          type="button"
          onClick={() => setMode("dock")}
          className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition ${
            mode === "dock"
              ? "bg-white text-zinc-950"
              : "bg-white/[0.05] text-zinc-500 hover:text-zinc-200"
          }`}
        >
          Adaptive Dock
        </button>
        <button
          type="button"
          onClick={() => setMode("spotlight")}
          className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition ${
            mode === "spotlight"
              ? "bg-white text-zinc-950"
              : "bg-white/[0.05] text-zinc-500 hover:text-zinc-200"
          }`}
        >
          Alt+Space
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === "dock" ? (
          <motion.div
            key="dock-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-4 flex items-end gap-2.5 rounded-2xl border border-white/16 bg-white/[0.08] px-4 py-2.5 shadow-2xl backdrop-blur-xl"
          >
            {icons.map((item) => (
              <div
                key={item.id}
                className={`${item.cls} h-10 w-10 overflow-hidden rounded-xl shadow-md`}
              >
                <DockAppSvg id={item.id} />
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="spotlight-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-4 w-[80%] max-w-xs rounded-2xl border border-white/14 bg-[#111115] p-3 shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <Search className="h-3.5 w-3.5 text-zinc-400" />
              <span className="font-mono text-xs text-white">128 * 4</span>
              <span className="ml-auto rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[9px] text-zinc-400">
                Alt+Space
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-lg bg-white/[0.06] px-2.5 py-1.5">
              <Calculator className="h-3.5 w-3.5 text-zinc-300" />
              <span className="font-mono text-xs font-semibold text-white">= 512</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BentoShell>
  );
}
