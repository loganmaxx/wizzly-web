"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bluetooth,
  Calculator,
  FileText,
  Gamepad2,
  Headphones,
  MessageCircle,
  Music,
  Search,
  UploadCloud,
  Volume2,
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
        <NotchMorphCard lang={lang} />
        <FileShelfCard lang={lang} />
        <DockGlassCard lang={lang} />
        <SpotlightTypingCard lang={lang} />
        <MixerAndGameCard lang={lang} />
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
      title={lang === "id" ? "Notch, Switcher & Alerts" : "Notch, Switcher & Alerts"}
      subtitle={
        lang === "id"
          ? "Media Switcher, Lirik, TWS Bluetooth & Chat."
          : "Media Switcher, Lyrics, TWS Bluetooth & Chat."
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
                <p className="text-[10px] text-indigo-300">Live Lyrics Synced</p>
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

function FileShelfCard({ lang }: { lang: Lang }) {
  return (
    <CardShell
      title={lang === "id" ? "File Shelf & Clip" : "File Shelf & Clip"}
      subtitle={
        lang === "id"
          ? "Drag file transit di Notch + riwayat clipboard."
          : "Drop files onto Notch + instant clipboard history."
      }
    >
      <div className="absolute top-3 flex items-center gap-2 rounded-b-2xl border border-t-0 border-indigo-400/35 bg-black px-4 py-2">
        <UploadCloud className="h-4 w-4 text-indigo-400" />
        <span className="text-[11px] font-semibold text-white">Notch Shelf</span>
      </div>

      <div className="animate-shelf-drop flex items-center gap-2 rounded-xl border border-indigo-400/40 bg-indigo-950/70 px-3 py-2">
        <FileText className="h-4 w-4 text-indigo-300" />
        <span className="text-xs font-medium text-white">Design_Final.zip</span>
      </div>
    </CardShell>
  );
}

function DockGlassCard({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0);
  const styles = ["Frosted", "Liquid", "Matte", "Classic"];

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
      title={lang === "id" ? "4 Kaca Dock & 4 Gaya Ikon" : "4 Dock Glass & 4 Icon Styles"}
      subtitle={
        lang === "id"
          ? "Frosted/Liquid/Matte/Classic + Live Window Preview."
          : "Frosted/Liquid/Matte/Classic + Live Window Previews."
      }
    >
      <span className="absolute top-3 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-sky-300">
        {styles[active]} Glass
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
      title="Spotlight (Alt + Space)"
      subtitle={
        lang === "id"
          ? "Cari file lokal, power action & kalkulator cepat."
          : "Local file search, power actions & instant math."
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

function MixerAndGameCard({ lang }: { lang: Lang }) {
  const bars = [
    { name: "Spotify", color: "bg-emerald-400", cls: "animate-bar-x-1" },
    { name: "Browser", color: "bg-sky-400", cls: "animate-bar-x-2" },
    { name: "Discord", color: "bg-indigo-400", cls: "animate-bar-x-3" },
  ];

  return (
    <CardShell
      title={lang === "id" ? "Per-App Mixer & Game Mode" : "Per-App Mixer & Game Mode"}
      subtitle={
        lang === "id"
          ? "Volume per aplikasi + auto-hide saat main game."
          : "Per-app volume sliders + fullscreen game auto-hide."
      }
    >
      <div className="w-[84%] space-y-2.5">
        {bars.map((bar) => (
          <div key={bar.name} className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-300">
              <span className="flex items-center gap-1">
                <Volume2 className="h-3 w-3 text-slate-400" /> {bar.name}
              </span>
              <Gamepad2 className="h-3 w-3 text-slate-500" />
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className={`${bar.cls} h-full w-full rounded-full ${bar.color}`} />
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function RustEngineCard({ lang }: { lang: Lang }) {
  return (
    <CardShell
      title="Rust + Tauri 2 Engine"
      subtitle={
        lang === "id"
          ? "Installer 3.4 MB • Hemat RAM • Multi-Monitor."
          : "3.4 MB Installer • Low RAM • Multi-Monitor."
      }
    >
      <div className="relative flex items-center justify-center">
        <div className="animate-spin-slow flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-indigo-400/50" />
        <div className="absolute flex h-14 w-14 flex-col items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/25 to-indigo-500/25">
          <Zap className="h-4 w-4 text-emerald-300" />
          <span className="font-mono text-[11px] font-bold text-white">3.4 MB</span>
        </div>
      </div>
    </CardShell>
  );
}
