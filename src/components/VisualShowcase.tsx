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
  Zap,
} from "lucide-react";
import type { Lang } from "@/data/wizzlyData";
import { DockAppSvg } from "@/components/AppIcons";

export function VisualShowcase({ lang }: { lang: Lang }) {
  return (
    <section id="features" className="mt-20 scroll-mt-24">
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="rounded-full border border-indigo-400/25 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
          Live Motion Showcase
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {lang === "id" ? "Lihat langsung cara kerjanya." : "See every interaction in motion."}
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DesktopWidgetsCard lang={lang} />
        <GenieEffectCard lang={lang} />
        <NotchMorphCard lang={lang} />
        <DockGlassCard lang={lang} />
        <SpotlightTypingCard lang={lang} />
        <RustEngineCard lang={lang} />
      </div>
    </section>
  );
}

function CardShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0a0c12] p-5 transition-transform duration-200 hover:-translate-y-1 hover:border-indigo-400/35"
    >
      <div className="relative mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#06080e]">
        {children}
      </div>
      <div>
        <h3 className="text-base font-bold text-white">{title}</h3>
        <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function DesktopWidgetsCard({ lang }: { lang: Lang }) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => ((s + 1) % 4) as 0 | 1 | 2 | 3);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <CardShell
      title={lang === "id" ? "4 Native Desktop Widgets" : "4 Native Desktop Widgets"}
      subtitle={
        lang === "id"
          ? "Clock Depth, Vinyl, Calendar .ics & Memo To-Do."
          : "Depth Clock, Vinyl, .ics Calendar & To-Do Memo."
      }
    >
      <span className="absolute right-3 top-2.5 rounded-full border border-indigo-400/30 bg-indigo-500/15 px-2 py-0.5 font-mono text-[9px] text-indigo-200">
        Direct2D • Magnetic Snap
      </span>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="clock"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center"
          >
            <span className="flex items-center gap-1 text-[10px] text-sky-300">
              <Clock className="h-3 w-3" /> Liquid Glass Clock
            </span>
            <span className="mt-0.5 bg-gradient-to-b from-white to-indigo-200/70 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
              09:41
            </span>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div
            key="vinyl"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-3.5 py-2.5"
          >
            <div className="animate-spin-slow flex h-10 w-10 items-center justify-center rounded-full border-2 border-zinc-600 bg-zinc-900">
              <Disc3 className="h-5 w-5 text-indigo-400" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Vinyl Turntable</p>
              <p className="text-[10px] text-slate-300">Nothing / Glass</p>
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-3.5 py-2.5"
          >
            <CalendarIcon className="h-6 w-6 text-rose-400" />
            <div className="text-left">
              <p className="text-xs font-bold text-white">Calendar & Agenda</p>
              <p className="text-[10px] text-rose-200">iCal (.ics) Sync Ready</p>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="memo"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2.5 rounded-2xl border border-amber-300/40 bg-amber-200 px-3.5 py-2.5 text-amber-950"
          >
            <StickyNote className="h-5 w-5" />
            <div className="text-left">
              <p className="text-xs font-bold">Sticky To-Do</p>
              <p className="flex items-center gap-1 text-[10px] font-medium">
                <Check className="h-3 w-3 text-emerald-700" /> Click to check
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CardShell>
  );
}

function GenieEffectCard({ lang }: { lang: Lang }) {
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setMinimized((m) => !m), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <CardShell
      title={lang === "id" ? "GPU Genie Effect (VSync)" : "GPU Genie Effect (VSync)"}
      subtitle={
        lang === "id"
          ? "Direct3D11 + DirectComposition • 0 MB saat idle."
          : "Direct3D11 + DirectComposition • 0 MB idle."
      }
    >
      <span className="absolute left-3 top-2.5 inline-flex items-center gap-1 rounded-full border border-purple-400/30 bg-purple-500/15 px-2 py-0.5 font-mono text-[9px] text-purple-200">
        <Minimize2 className="h-2.5 w-2.5" /> D3D11 Shader
      </span>

      <motion.div
        animate={
          minimized
            ? { scaleX: 0.16, scaleY: 0.12, y: 46, skewX: -18, opacity: 0.1 }
            : { scaleX: 1, scaleY: 1, y: -8, skewX: 0, opacity: 1 }
        }
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-40 rounded-xl border border-white/20 bg-gradient-to-b from-slate-800 to-slate-900 p-2 shadow-xl"
      >
        <div className="mb-1.5 flex items-center justify-between">
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[8px] font-mono text-slate-400">−</span>
        </div>
        <div className="space-y-1">
          <div className="h-2 w-2/3 rounded bg-white/20" />
          <div className="h-2 w-full rounded bg-indigo-400/25" />
          <div className="h-2 w-4/5 rounded bg-white/10" />
        </div>
      </motion.div>

      <div className="absolute bottom-2.5 flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-2.5 py-1">
        <div className="h-5 w-5 overflow-hidden rounded-md">
          <DockAppSvg id="explorer" />
        </div>
        <div className="h-5 w-5 overflow-hidden rounded-md ring-1 ring-purple-400/70">
          <DockAppSvg id="vscode" />
        </div>
        <div className="h-5 w-5 overflow-hidden rounded-md">
          <DockAppSvg id="spotify" />
        </div>
      </div>
    </CardShell>
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
    <CardShell
      title={lang === "id" ? "Notch, Karaoke & Alerts" : "Notch, Karaoke & Alerts"}
      subtitle={
        lang === "id"
          ? "Media Switcher, Floating Karaoke & TWS Bluetooth."
          : "Media Switcher, Floating Karaoke & TWS Bluetooth."
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.22), transparent 65%)",
        }}
      />
      <div className="relative z-10 flex items-center justify-center rounded-2xl border border-white/15 bg-black px-4 py-2.5 shadow-xl">
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
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500">
                <Music className="h-3.5 w-3.5 text-white" />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Midnight Obsidian</p>
                <p className="flex items-center gap-1 text-[10px] text-pink-300">
                  <Sparkles className="h-2.5 w-2.5" /> Floating Karaoke
                </p>
              </div>
              <div className="flex h-4 items-end gap-0.5 pl-1">
                <span className="animate-eq-1 h-4 w-0.5 rounded-full bg-indigo-400" />
                <span className="animate-eq-2 h-4 w-0.5 rounded-full bg-indigo-400" />
                <span className="animate-eq-3 h-4 w-0.5 rounded-full bg-indigo-400" />
                <span className="animate-eq-4 h-4 w-0.5 rounded-full bg-indigo-400" />
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
              <Headphones className="h-5 w-5 text-sky-400" />
              <div className="text-left">
                <p className="text-xs font-semibold text-white">AirPods Pro</p>
                <p className="text-[10px] text-sky-300">Connected • 92%</p>
              </div>
              <Bluetooth className="h-3.5 w-3.5 text-sky-400" />
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
                <p className="text-[10px] text-emerald-300">File sudah dikirim!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CardShell>
  );
}

function DockGlassCard({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0);
  const styles = ["Frosted (Adaptive)", "Liquid (Adaptive)", "Matte", "Classic"];

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % styles.length), 2400);
    return () => clearInterval(id);
  }, [styles.length]);

  const icons = [
    { id: "explorer", cls: "animate-dock-bob-0" },
    { id: "edge", cls: "animate-dock-bob-1" },
    { id: "vscode", cls: "animate-dock-bob-2" },
    { id: "spotify", cls: "animate-dock-bob-3" },
  ];

  return (
    <CardShell
      title={lang === "id" ? "Auto-Adaptive Dock & Tuck" : "Auto-Adaptive Dock & Tuck"}
      subtitle={
        lang === "id"
          ? "Kalibrasi wallpaper otomatis + Click-to-Minimize."
          : "Auto wallpaper tinting + Click-to-Minimize."
      }
    >
      <span className="absolute top-3 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-sky-300">
        {styles[active]}
      </span>

      <div className="mt-4 flex items-end gap-2 rounded-2xl border border-white/20 bg-white/10 px-3.5 py-2.5 shadow-xl">
        {icons.map((item) => (
          <div
            key={item.id}
            className={`${item.cls} h-9 w-9 overflow-hidden rounded-xl shadow-md`}
          >
            <DockAppSvg id={item.id} />
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function SpotlightTypingCard({ lang }: { lang: Lang }) {
  const [step, setStep] = useState(0);
  const queries = [
    { q: "128 * 4", res: "= 512" },
    { q: "2048 / 8", res: "= 256" },
    { q: "64 ^ 2", res: "= 4096" },
  ];

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % queries.length), 2500);
    return () => clearInterval(id);
  }, [queries.length]);

  const current = queries[step];

  return (
    <CardShell
      title="Spotlight & Win-Key Launchpad"
      subtitle={
        lang === "id"
          ? "Alt+Space Spotlight + opsi tombol Win untuk Launchpad."
          : "Alt+Space Spotlight + optional Win-key Launchpad."
      }
    >
      <div className="w-[85%] rounded-2xl border border-white/15 bg-black/90 p-3 shadow-xl">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <Search className="h-3.5 w-3.5 text-indigo-400" />
          <AnimatePresence mode="wait">
            <motion.span
              key={current.q}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-xs text-white"
            >
              {current.q}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="mt-2 flex items-center justify-between rounded-xl bg-indigo-500/20 px-2.5 py-1.5">
          <Calculator className="h-3.5 w-3.5 text-indigo-300" />
          <span className="font-mono text-xs font-bold text-white">{current.res}</span>
        </div>
      </div>
    </CardShell>
  );
}

function RustEngineCard({ lang }: { lang: Lang }) {
  return (
    <CardShell
      title="Rust + Direct2D / D3D11 Engine"
      subtitle={
        lang === "id"
          ? "Installer 3.5 MB • ~0% CPU saat idle • Multi-Monitor."
          : "3.5 MB Installer • ~0% Idle CPU • Multi-Monitor."
      }
    >
      <div className="relative flex items-center justify-center">
        <div className="animate-spin-slow flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-indigo-400/50" />
        <div className="absolute flex h-14 w-14 flex-col items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/25 to-indigo-500/25">
          <Zap className="h-4 w-4 text-emerald-300" />
          <span className="font-mono text-[11px] font-bold text-white">3.5 MB</span>
        </div>
      </div>
    </CardShell>
  );
}
