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
    <section id="features" className="mt-28 scroll-mt-20 sm:mt-36">
      <div className="mb-12 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2997ff]">
          {lang === "id" ? "Arsitektur & Kemampuan" : "Capabilities"}
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#f5f5f7] sm:text-5xl">
          {lang === "id"
            ? "Dirancang ringan. Memanjakan mata."
            : "Designed to disappear. Built to delight."}
        </h2>
        <p className="mt-3 text-base text-[#86868b] sm:text-lg">
          {lang === "id"
            ? "Setiap elemen dirender langsung dengan API native Windows — mulus di layar 60Hz hingga 144Hz+ tanpa membebani sistem."
            : "Every surface runs on native Windows rendering APIs — silky on 60Hz to 144Hz+ displays without dragging your system down."}
        </p>
      </div>

      {/* Apple Asymmetric Bento Grid */}
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
          <DockGlassCard lang={lang} />
        </div>
        <div className="lg:col-span-6">
          <SpotlightTypingCard lang={lang} />
        </div>
        <div className="lg:col-span-6">
          <RustEngineCard lang={lang} />
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="apple-card group flex h-full flex-col justify-between overflow-hidden rounded-[28px] p-6 transition-colors duration-300 hover:border-white/15 sm:p-8"
    >
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2997ff]">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#f5f5f7] sm:text-2xl">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[#86868b]">{subtitle}</p>
      </div>

      <div className="relative mt-6 flex h-44 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/[0.07] bg-black/70">
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
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <BentoShell
      eyebrow="Win32 + Direct2D / DirectWrite"
      title={lang === "id" ? "4 Native Desktop Widgets" : "4 Native Desktop Widgets"}
      subtitle={
        lang === "id"
          ? "Clock Depth Effect, Vinyl Turntable, Calendar .ics & Sticky Memo To-Do dengan Magnetic Snap."
          : "Depth Effect Clock, Vinyl Turntable, .ics Calendar & Sticky To-Do Memo with Magnetic Snap."
      }
    >
      <div className="absolute left-3 top-3 flex gap-1">
        {(["Clock", "Vinyl", "Calendar", "Memo"] as const).map((label, idx) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(idx as 0 | 1 | 2 | 3)}
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium transition ${
              step === idx
                ? "bg-white text-black"
                : "bg-white/[0.06] text-[#86868b] hover:text-white"
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
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.22 }}
            className="mt-4 flex flex-col items-center"
          >
            <span className="flex items-center gap-1 text-[10px] font-medium text-[#2997ff]">
              <Clock className="h-3 w-3" /> Liquid Glass Clock
            </span>
            <span className="mt-0.5 bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
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
            transition={{ duration: 0.22 }}
            className="mt-4 flex items-center gap-3.5 rounded-2xl border border-white/15 bg-white/10 px-4 py-3"
          >
            <div className="animate-spin-slow flex h-11 w-11 items-center justify-center rounded-full border-2 border-zinc-600 bg-zinc-900">
              <Disc3 className="h-5 w-5 text-[#2997ff]" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white">Vinyl Turntable</p>
              <p className="text-[11px] text-[#a1a1a6]">Nothing Light / Dark / Glass</p>
            </div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.22 }}
            className="mt-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3"
          >
            <CalendarIcon className="h-6 w-6 text-rose-400" />
            <div className="text-left">
              <p className="text-xs font-semibold text-white">Calendar & Agenda</p>
              <p className="text-[11px] text-rose-200">iCal (.ics) Sync Ready</p>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="memo"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.22 }}
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
    const id = setInterval(() => setMinimized((m) => !m), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <BentoShell
      eyebrow="GPU Direct3D11 + VSync"
      title={lang === "id" ? "Genie Effect Mulus" : "GPU Genie Effect"}
      subtitle={
        lang === "id"
          ? "Tutup & pulihkan jendela melengkung ke Dock dengan 0 MB overhead saat idle."
          : "Curved minimize & restore right into Dock slots with 0 MB idle overhead."
      }
    >
      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-purple-400/25 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[9px] text-purple-200">
        <Minimize2 className="h-2.5 w-2.5" /> D3D11 Shader
      </span>

      <motion.div
        animate={
          minimized
            ? { scaleX: 0.16, scaleY: 0.12, y: 50, skewX: -18, opacity: 0.1 }
            : { scaleX: 1, scaleY: 1, y: -8, skewX: 0, opacity: 1 }
        }
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-40 rounded-xl border border-white/20 bg-[#1d1d1f] p-2.5 shadow-xl"
      >
        <div className="mb-1.5 flex items-center justify-between">
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[8px] text-[#86868b]">−</span>
        </div>
        <div className="space-y-1">
          <div className="h-2 w-2/3 rounded bg-white/20" />
          <div className="h-2 w-full rounded bg-purple-400/35" />
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
        <div className="h-5 w-5 overflow-hidden rounded-lg">
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
      title={lang === "id" ? "Notch, Karaoke & Alerts" : "Notch, Karaoke & Alerts"}
      subtitle={
        lang === "id"
          ? "Media Switcher, Floating Karaoke, File Shelf & TWS Bluetooth."
          : "Media Switcher, Floating Karaoke, File Shelf & TWS Bluetooth."
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(41,151,255,0.22), transparent 65%)",
        }}
      />
      <div className="relative z-10 flex items-center justify-center rounded-2xl border border-white/15 bg-[#08080a] px-4 py-3 shadow-2xl">
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
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0071e3]">
                <Music className="h-4 w-4 text-white" />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Midnight Obsidian</p>
                <p className="flex items-center gap-1 text-[10px] text-pink-300">
                  <Sparkles className="h-2.5 w-2.5" /> Floating Karaoke
                </p>
              </div>
              <div className="flex h-4 items-end gap-0.5 pl-1">
                <span className="animate-eq-1 h-4 w-0.5 rounded-full bg-[#2997ff]" />
                <span className="animate-eq-2 h-4 w-0.5 rounded-full bg-[#2997ff]" />
                <span className="animate-eq-3 h-4 w-0.5 rounded-full bg-[#2997ff]" />
                <span className="animate-eq-4 h-4 w-0.5 rounded-full bg-[#2997ff]" />
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
              <Headphones className="h-5 w-5 text-[#2997ff]" />
              <div className="text-left">
                <p className="text-xs font-semibold text-white">AirPods Pro</p>
                <p className="text-[10px] text-[#2997ff]">Connected • 92%</p>
              </div>
              <Bluetooth className="h-3.5 w-3.5 text-[#2997ff]" />
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
    </BentoShell>
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
    <BentoShell
      eyebrow="Auto-Adaptive Backdrop"
      title={lang === "id" ? "Liquid Dock & Click-to-Minimize" : "Liquid Dock & Click-to-Minimize"}
      subtitle={
        lang === "id"
          ? "Kalibrasi warna wallpaper otomatis dan transisi kaca netral saat jendela aplikasi menutupi area Dock."
          : "Automatic wallpaper tint calibration with smooth neutral glass transitions whenever windows overlap the Dock."
      }
    >
      <div className="absolute top-3 flex gap-1.5">
        {styles.map((styleName, idx) => (
          <button
            key={styleName}
            type="button"
            onClick={() => setActive(idx)}
            className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] transition ${
              active === idx
                ? "bg-white text-black"
                : "border border-white/10 bg-white/[0.04] text-[#86868b] hover:text-white"
            }`}
          >
            {styleName.split(" ")[0]}
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-end gap-2.5 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 shadow-2xl backdrop-blur-xl">
        {icons.map((item) => (
          <div
            key={item.id}
            className={`${item.cls} h-10 w-10 overflow-hidden rounded-xl shadow-md`}
          >
            <DockAppSvg id={item.id} />
          </div>
        ))}
      </div>
    </BentoShell>
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
    <BentoShell
      eyebrow="Alt+Space & Win-Key"
      title="Spotlight & Launchpad"
      subtitle={
        lang === "id"
          ? "Pencarian file lokal, kalkulator instan, plus opsi tombol Win untuk Launchpad tanpa bentrok Start Menu."
          : "Local file search, instant calculator, plus optional Win-key Launchpad trigger without Start Menu conflict."
      }
    >
      <div className="w-[82%] rounded-2xl border border-white/15 bg-[#121215] p-3.5 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <Search className="h-3.5 w-3.5 text-[#2997ff]" />
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
        <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[#0071e3]/20 px-3 py-2">
          <Calculator className="h-3.5 w-3.5 text-[#2997ff]" />
          <span className="font-mono text-xs font-bold text-white">{current.res}</span>
        </div>
      </div>
    </BentoShell>
  );
}

function RustEngineCard({ lang }: { lang: Lang }) {
  return (
    <BentoShell
      eyebrow="Rust + Tauri 2 Core"
      title={lang === "id" ? "Ringan secara fundamental." : "Lightweight to the core."}
      subtitle={
        lang === "id"
          ? "Installer 3.5 MB dengan proses inti ~35 MB RAM (~185 MB dgn WebView2 saat Notch aktif). Aman untuk baterai & gaming."
          : "3.5 MB installer with a ~35 MB core RAM footprint (~185 MB with WebView2 while Notch is active). Built for battery & gaming."
      }
    >
      <div className="flex w-full items-center justify-around gap-3 px-4 sm:gap-5">
        <div className="text-center">
          <p className="apple-titanium-gradient text-2xl font-bold tracking-tight sm:text-4xl">
            3.5 MB
          </p>
          <p className="mt-1 text-[10px] font-medium text-[#86868b] sm:text-[11px]">
            {lang === "id" ? "Installer" : "Installer"}
          </p>
        </div>
        <div className="h-10 w-px bg-white/10" />
        <div className="text-center">
          <p className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            ~35 MB
          </p>
          <p className="mt-1 text-[10px] font-medium text-[#86868b] sm:text-[11px]">
            {lang === "id" ? "Core (+~150 MB WV2)" : "Core (+~150 MB WV2)"}
          </p>
        </div>
        <div className="h-10 w-px bg-white/10" />
        <div className="text-center">
          <p className="flex items-center justify-center gap-1 text-2xl font-bold tracking-tight text-white sm:text-4xl">
            <Zap className="h-4 w-4 text-emerald-400 sm:h-5 sm:w-5" /> ~0%
          </p>
          <p className="mt-1 text-[10px] font-medium text-[#86868b] sm:text-[11px]">
            {lang === "id" ? "CPU Idle" : "Idle CPU"}
          </p>
        </div>
      </div>
    </BentoShell>
  );
}
