"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bluetooth,
  Calculator,
  Calendar as CalendarIcon,
  Check,
  Clipboard,
  Copy,
  Disc3,
  FileText,
  Headphones,
  Image as ImageIcon,
  Layers,
  MessageCircle,
  Minimize2,
  Music,
  Pause,
  Pin,
  Play,
  Plus,
  RotateCcw,
  Search,
  SkipBack,
  SkipForward,
  Sparkles,
  StickyNote,
  Timer,
  UploadCloud,
  Volume2,
  Wifi,
} from "lucide-react";
import type { Lang } from "@/data/wizzlyData";
import { DockAppSvg } from "@/components/AppIcons";

type NotchTab = "media" | "lyrics" | "timer" | "shelf" | "clip";
type NotchStyle = "notch" | "island";
type GlassStyle = "frosted" | "liquid" | "matte" | "classic";
type WidgetTheme = "glass" | "nothing-dark" | "nothing-light" | "notes-yellow";

interface DesktopSandboxProps {
  lang: Lang;
}

const SAMPLE_TRACKS = [
  {
    title: "Midnight Obsidian",
    artist: "Nujabes & Chillwave",
    accent: "from-indigo-500/40 via-purple-500/20 to-transparent",
    vinylAccent: "from-indigo-500 to-purple-600",
    pillDot: "bg-indigo-400",
    lyrics: [
      "Floating above the taskbar glow",
      "Every window settles smooth and slow",
      "Glass reflections catch the late-night sky",
      "One shortcut away as pixels fly",
    ],
  },
  {
    title: "Liquid Glass Horizon",
    artist: "Synthwave Studio",
    accent: "from-emerald-500/35 via-cyan-500/20 to-transparent",
    vinylAccent: "from-emerald-500 to-cyan-500",
    pillDot: "bg-emerald-400",
    lyrics: [
      "Zero clutter across the open screen",
      "Rust engine humming quiet and clean",
      "Drop a file into the upper shelf",
      "Desktop workflow built for your best self",
    ],
  },
];

const INITIAL_CLIP_ITEMS = [
  { id: "c1", text: "https://wizzly.web.id", tag: "URL", pinned: true },
  { id: "c2", text: "Alt + Space — Wizzly Spotlight", tag: "Shortcut", pinned: false },
  { id: "c3", text: "cargo build --release", tag: "CLI", pinned: false },
];

const INITIAL_SHELF_FILES = [
  { id: "s1", name: "Wizzly_0.1.1_Setup.exe", size: "3.5 MB", kind: "app" },
  { id: "s2", name: "Wallpaper_4K.png", size: "2.1 MB", kind: "img" },
  { id: "s3", name: "Notes.md", size: "14 KB", kind: "doc" },
];

const INITIAL_TODOS = [
  { id: "t1", text: "Try Depth Clock & Vinyl widget", done: true },
  { id: "t2", text: "Sync Google Calendar (.ics)", done: false },
  { id: "t3", text: "Enable Genie Effect & Win-Key", done: false },
];

const DOCK_APPS = [
  { id: "explorer", name: "File Explorer", active: true },
  { id: "edge", name: "Microsoft Edge", active: true },
  { id: "vscode", name: "VS Code", active: true },
  { id: "terminal", name: "Terminal", active: false },
  { id: "spotify", name: "Spotify", active: true },
  { id: "discord", name: "Discord", active: false },
  { id: "spotlight", name: "Spotlight", active: false },
  { id: "trash", name: "Recycle Bin", active: false },
];

function safeEvalMath(input: string): string | null {
  const cleaned = input.trim().replace(/\s+/g, "");
  if (!cleaned || !/^[0-9+\-*/().]+$/.test(cleaned) || !/[+\-*/]/.test(cleaned)) {
    return null;
  }
  try {
    const fn = new Function(`"use strict"; return (${cleaned});`);
    const result = fn();
    if (typeof result === "number" && Number.isFinite(result)) {
      return Number.isInteger(result) ? String(result) : result.toFixed(2);
    }
    return null;
  } catch {
    return null;
  }
}

export function DesktopSandbox({ lang }: DesktopSandboxProps) {
  const [autoDemo, setAutoDemo] = useState(true);
  const [notchExpanded, setNotchExpanded] = useState(false);
  const [notchTab, setNotchTab] = useState<NotchTab>("media");
  const [notchStyle, setNotchStyle] = useState<NotchStyle>("notch");
  const [glassStyle, setGlassStyle] = useState<GlassStyle>("frosted");

  const [widgetsVisible, setWidgetsVisible] = useState(true);
  const [widgetTheme, setWidgetTheme] = useState<WidgetTheme>("glass");
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [memoEditorOpen, setMemoEditorOpen] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");
  const [karaokeOpen, setKaraokeOpen] = useState(false);
  const [genieWindowState, setGenieWindowState] = useState<"hidden" | "open" | "minimized">("hidden");

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const [clipItems, setClipItems] = useState(INITIAL_CLIP_ITEMS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [liveToast, setLiveToast] = useState<
    null | { kind: "bluetooth" | "whatsapp" | "volume"; title: string; subtitle: string }
  >(null);

  const [bouncingId, setBouncingId] = useState<string | null>(null);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState("128 * 4");
  const [mixerOpen, setMixerOpen] = useState(false);
  const [appVolumes, setAppVolumes] = useState({
    Spotify: 76,
    Browser: 58,
    Discord: 85,
  });

  const track = SAMPLE_TRACKS[trackIndex];

  const stopAutoDemo = () => {
    if (autoDemo) setAutoDemo(false);
  };

  useEffect(() => {
    if (!autoDemo) return;
    let step = 0;
    const sequence = () => {
      step = (step + 1) % 6;
      if (step === 0) {
        setLiveToast(null);
        setSpotlightOpen(false);
        setNotchExpanded(false);
      } else if (step === 1) {
        setNotchExpanded(true);
        setNotchTab("media");
      } else if (step === 2) {
        setNotchTab("lyrics");
      } else if (step === 3) {
        setNotchExpanded(false);
        setLiveToast({
          kind: "bluetooth",
          title: "AirPods Pro Connected",
          subtitle: "Battery 92% • Bluetooth Audio",
        });
      } else if (step === 4) {
        setLiveToast(null);
        setNotchExpanded(true);
        setNotchTab("shelf");
      } else if (step === 5) {
        setNotchTab("clip");
      }
    };
    const id = setInterval(sequence, 3400);
    return () => clearInterval(id);
  }, [autoDemo]);

  const triggerToast = (kind: "bluetooth" | "whatsapp" | "volume") => {
    stopAutoDemo();
    setNotchExpanded(false);
    if (kind === "bluetooth") {
      setLiveToast({
        kind,
        title: "AirPods Pro Connected",
        subtitle: "Battery 92% • Bluetooth Audio",
      });
    } else if (kind === "whatsapp") {
      setLiveToast({
        kind,
        title: "WhatsApp • Raka",
        subtitle: lang === "id" ? "Widget v0.1.1-nya cakep!" : "v0.1.1 widgets look super clean!",
      });
    } else {
      setLiveToast({
        kind,
        title: "Volume 75%",
        subtitle: "Speakers (Realtek Audio)",
      });
    }
    setTimeout(() => {
      setLiveToast(null);
    }, 3200);
  };

  const handleDockClick = (id: string) => {
    stopAutoDemo();
    setBouncingId(id);
    setTimeout(() => setBouncingId(null), 500);
    if (id === "spotlight") {
      setMixerOpen(false);
      setSpotlightOpen((v) => !v);
    } else if (id === "spotify") {
      setNotchTab("media");
      setNotchExpanded(true);
    } else if (id === "vscode") {
      setGenieWindowState((prev) => (prev === "open" ? "minimized" : "open"));
    }
  };

  const triggerGenieDemo = () => {
    stopAutoDemo();
    setSpotlightOpen(false);
    setMixerOpen(false);
    if (genieWindowState === "open") {
      setGenieWindowState("minimized");
    } else {
      setGenieWindowState("open");
    }
  };

  const handleCopyClip = (id: string, text: string) => {
    stopAutoDemo();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const togglePinClip = (id: string) => {
    stopAutoDemo();
    setClipItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, pinned: !item.pinned } : item))
    );
  };

  const toggleTodo = (id: string) => {
    stopAutoDemo();
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTodoText.trim();
    if (!trimmed) return;
    stopAutoDemo();
    setTodos((prev) => [
      ...prev.slice(-3),
      { id: `t-${Date.now()}`, text: trimmed, done: false },
    ]);
    setNewTodoText("");
    setMemoEditorOpen(false);
  };

  const dockGlassClass = useMemo(() => {
    switch (glassStyle) {
      case "liquid":
        return "bg-gradient-to-b from-white/22 via-white/10 to-black/45 border-white/25 shadow-[0_14px_36px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.35)]";
      case "matte":
        return "bg-zinc-900/95 border-white/12 shadow-[0_14px_34px_rgba(0,0,0,0.6)]";
      case "classic":
        return "bg-slate-950/80 border-white/18 shadow-[0_12px_30px_rgba(0,0,0,0.5)]";
      case "frosted":
      default:
        return "bg-white/14 border-white/20 shadow-[0_14px_36px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.22)]";
    }
  }, [glassStyle]);

  const cardSurfaceClass = useMemo(() => {
    switch (widgetTheme) {
      case "nothing-dark":
        return "border-white/15 bg-[#121318]/95 text-white";
      case "nothing-light":
        return "border-black/10 bg-[#f4f4f6]/95 text-slate-900";
      case "notes-yellow":
        return "border-amber-300/40 bg-gradient-to-b from-[#fef3c7] to-[#fde68a] text-amber-950";
      case "glass":
      default:
        return "border-white/20 bg-white/10 text-white backdrop-blur-xl";
    }
  }, [widgetTheme]);

  const mathResult = useMemo(() => safeEvalMath(spotlightQuery), [spotlightQuery]);
  const filteredApps = useMemo(() => {
    const q = spotlightQuery.trim().toLowerCase();
    if (!q) return DOCK_APPS.slice(0, 4);
    return DOCK_APPS.filter((a) => a.name.toLowerCase().includes(q)).slice(0, 4);
  }, [spotlightQuery]);

  return (
    <div className="w-full">
      {/* Interactive Toolbar Controls */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-white/10 bg-[#0b0d14] px-3.5 py-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {(["notch", "island"] as const).map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => {
                stopAutoDemo();
                setNotchStyle(style);
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition ${
                notchStyle === style
                  ? "bg-white text-slate-950"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {style}
            </button>
          ))}

          <span className="mx-1 h-4 w-px bg-white/10" />

          {(["frosted", "liquid", "matte", "classic"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => {
                stopAutoDemo();
                setGlassStyle(g);
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition ${
                glassStyle === g
                  ? "bg-indigo-500 text-white"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {g}
            </button>
          ))}

          <span className="mx-1 hidden h-4 w-px bg-white/10 sm:inline-block" />

          <button
            type="button"
            onClick={() => {
              stopAutoDemo();
              setWidgetsVisible((v) => !v);
            }}
            className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
              widgetsVisible
                ? "border-sky-400/40 bg-sky-500/15 text-sky-200"
                : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            <Layers className="h-3 w-3" />
            Widgets
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setAutoDemo((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
              autoDemo
                ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
                : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                autoDemo ? "bg-emerald-400" : "bg-slate-400"
              }`}
            />
            Auto Demo
          </button>
          <button
            type="button"
            onClick={triggerGenieDemo}
            className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
              genieWindowState === "open"
                ? "border-purple-400/40 bg-purple-500/20 text-purple-200"
                : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            }`}
          >
            <Minimize2 className="h-3 w-3 text-purple-300" /> Genie
          </button>
          <button
            type="button"
            onClick={() => {
              stopAutoDemo();
              setKaraokeOpen((v) => !v);
            }}
            className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
              karaokeOpen
                ? "border-pink-400/40 bg-pink-500/20 text-pink-200"
                : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            }`}
          >
            <Sparkles className="h-3 w-3 text-pink-300" /> Karaoke
          </button>
          <button
            type="button"
            onClick={() => triggerToast("bluetooth")}
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200 transition hover:bg-white/10"
          >
            <Bluetooth className="h-3 w-3 text-sky-400" /> TWS
          </button>
          <button
            type="button"
            onClick={() => triggerToast("whatsapp")}
            className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200 transition hover:bg-white/10 sm:inline-flex"
          >
            <MessageCircle className="h-3 w-3 text-emerald-400" /> Chat
          </button>
          <button
            type="button"
            onClick={() => {
              stopAutoDemo();
              setMixerOpen(false);
              setSpotlightOpen((v) => !v);
            }}
            className="inline-flex items-center gap-1 rounded-lg border border-indigo-400/30 bg-indigo-500/15 px-2.5 py-1 text-xs font-medium text-indigo-200 transition hover:bg-indigo-500/25"
          >
            <Search className="h-3 w-3" /> Alt + Space
          </button>
        </div>
      </div>

      {/* Simulated Windows Desktop Frame */}
      <div
        className="relative h-[490px] w-full overflow-hidden rounded-3xl border border-white/15 bg-[#090b12] shadow-[0_24px_70px_rgba(0,0,0,0.7)] sm:h-[530px]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 25%, rgba(79, 70, 229, 0.36), transparent 48%), radial-gradient(circle at 82% 32%, rgba(14, 165, 233, 0.25), transparent 46%), radial-gradient(circle at 50% 90%, rgba(168, 85, 247, 0.28), transparent 52%), linear-gradient(160deg, #090d1a 0%, #05060b 65%, #0c0a18 100%)",
        }}
      >
        {/* v0.1.1 Native Desktop Widgets Layer (Direct2D + Magnetic Snap Preview) */}
        <AnimatePresence>
          {widgetsVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-none absolute inset-0 z-10 px-4 pb-24 pt-14 sm:px-7"
            >
              {/* Desktop Clock Widget (Sonoma / Liquid Glass) */}
              <div className="mb-3 flex items-start justify-between">
                <div className="pointer-events-auto select-none">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-indigo-200/75">
                    Tuesday, Nov 24
                  </p>
                  <p className="bg-gradient-to-b from-white via-white/90 to-indigo-200/60 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:text-6xl">
                    09:41
                  </p>
                </div>

                {/* Quick Widget Theme Switcher Pill */}
                <div className="pointer-events-auto hidden items-center gap-1 rounded-full border border-white/15 bg-black/45 p-1 backdrop-blur-md sm:flex">
                  {(
                    [
                      { id: "glass", label: "Glass" },
                      { id: "nothing-dark", label: "Nothing Dark" },
                      { id: "nothing-light", label: "Light" },
                      { id: "notes-yellow", label: "Yellow" },
                    ] as const
                  ).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        stopAutoDemo();
                        setWidgetTheme(t.id);
                      }}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition ${
                        widgetTheme === t.id
                          ? "bg-white text-slate-950"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Interactive Widget Cards (Vinyl Turntable, Calendar & Agenda, Sticky Memo To-Do) */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {/* 1. Desktop Vinyl Turntable Music Widget */}
                <div
                  className={`pointer-events-auto flex items-center gap-3 rounded-2xl border p-3 shadow-xl transition-colors ${
                    widgetTheme === "notes-yellow"
                      ? "border-white/20 bg-white/10 text-white backdrop-blur-xl"
                      : cardSurfaceClass
                  }`}
                >
                  <div
                    className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-zinc-700 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black shadow-lg ${
                      isPlaying ? "animate-spin-slow" : ""
                    }`}
                  >
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${track.vinylAccent}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-black" />
                    </div>
                    <Disc3 className="pointer-events-none absolute inset-0 h-full w-full text-white/10" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-semibold uppercase tracking-wider opacity-60">
                        Vinyl Widget
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <p className="truncate text-xs font-bold">{track.title}</p>
                    <p className="truncate text-[10px] opacity-70">{track.artist}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-current/15">
                        <div className="h-full w-2/5 rounded-full bg-indigo-400" />
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          aria-label="Previous track on vinyl"
                          onClick={() => {
                            stopAutoDemo();
                            setTrackIndex((i) => (i === 0 ? SAMPLE_TRACKS.length - 1 : i - 1));
                          }}
                          className="rounded p-0.5 opacity-75 hover:opacity-100"
                        >
                          <SkipBack className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          aria-label={isPlaying ? "Pause vinyl" : "Play vinyl"}
                          onClick={() => {
                            stopAutoDemo();
                            setIsPlaying((p) => !p);
                          }}
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white hover:bg-indigo-400"
                        >
                          {isPlaying ? (
                            <Pause className="h-2.5 w-2.5" />
                          ) : (
                            <Play className="ml-0.5 h-2.5 w-2.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          aria-label="Next track on vinyl"
                          onClick={() => {
                            stopAutoDemo();
                            setTrackIndex((i) => (i + 1) % SAMPLE_TRACKS.length);
                          }}
                          className="rounded p-0.5 opacity-75 hover:opacity-100"
                        >
                          <SkipForward className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Desktop Calendar & Agenda Widget */}
                <div
                  className={`pointer-events-auto hidden rounded-2xl border p-3 shadow-xl transition-colors lg:block ${
                    widgetTheme === "notes-yellow"
                      ? "border-white/20 bg-white/10 text-white backdrop-blur-xl"
                      : cardSurfaceClass
                  }`}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-400">
                      <CalendarIcon className="h-3 w-3" /> Nov 2026
                    </span>
                    <span className="rounded-full bg-current/10 px-1.5 py-0.5 text-[9px] font-medium opacity-75">
                      iCal Synced
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="grid grid-cols-7 gap-0.5 text-center text-[9px] opacity-85">
                      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                        <span key={i} className="font-semibold opacity-50">
                          {d}
                        </span>
                      ))}
                      {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1].map((day, idx) => (
                        <span
                          key={idx}
                          className={`rounded-full py-0.5 ${
                            day === 24
                              ? "bg-rose-500 font-bold text-white"
                              : idx > 12
                                ? "opacity-35"
                                : ""
                          }`}
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-1 border-l border-current/15 pl-2">
                      <p className="text-[9px] font-semibold uppercase tracking-wider opacity-60">
                        Today
                      </p>
                      <div className="rounded-lg bg-indigo-500/20 px-1.5 py-1 text-[10px]">
                        <p className="font-semibold leading-tight">Wizzly v0.1.1</p>
                        <p className="text-[9px] opacity-75">15:00 • Release</p>
                      </div>
                      <div className="rounded-lg bg-emerald-500/20 px-1.5 py-1 text-[10px]">
                        <p className="font-semibold leading-tight">Design Review</p>
                        <p className="text-[9px] opacity-75">19:30 • Local</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Desktop Sticky Memo & To-Do List Widget */}
                <div
                  className={`pointer-events-auto relative hidden rounded-2xl border p-3 shadow-xl transition-colors sm:block ${cardSurfaceClass}`}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider opacity-80">
                      <StickyNote className="h-3 w-3" /> Sticky To-Do
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        stopAutoDemo();
                        setMemoEditorOpen((v) => !v);
                      }}
                      title="Quick Editor Popover"
                      className="inline-flex items-center gap-0.5 rounded-md bg-current/10 px-1.5 py-0.5 text-[9px] font-semibold transition hover:bg-current/20"
                    >
                      <Plus className="h-2.5 w-2.5" /> Edit
                    </button>
                  </div>

                  {memoEditorOpen ? (
                    <form onSubmit={handleAddTodo} className="mt-2 space-y-1.5">
                      <input
                        type="text"
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        placeholder={lang === "id" ? "Tambah item to-do..." : "Add to-do item..."}
                        className="w-full rounded-lg border border-current/20 bg-black/15 px-2 py-1 text-[11px] placeholder:opacity-60 focus:outline-none"
                      />
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setMemoEditorOpen(false)}
                          className="rounded px-2 py-0.5 text-[10px] opacity-70 hover:opacity-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded bg-indigo-500 px-2 py-0.5 text-[10px] font-semibold text-white"
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-1.5">
                      {todos.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleTodo(item.id)}
                          className="flex w-full items-center gap-2 text-left text-[11px] transition hover:opacity-90"
                        >
                          <span
                            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${
                              item.done
                                ? "border-emerald-500 bg-emerald-500 text-white"
                                : "border-current/35"
                            }`}
                          >
                            {item.done && <Check className="h-2.5 w-2.5" />}
                          </span>
                          <span className={`truncate ${item.done ? "line-through opacity-50" : ""}`}>
                            {item.text}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top-Center Interactive Wizzly Notch */}
        <div
          className={`relative z-30 flex justify-center transition-all duration-300 ${
            notchStyle === "island" ? "pt-3" : "pt-0"
          }`}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className={`relative overflow-hidden border border-white/15 bg-gradient-to-b from-[#0d0e13] to-[#07080b] text-slate-100 shadow-[0_16px_45px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.12)] ${
              notchStyle === "island"
                ? notchExpanded
                  ? "w-[92%] max-w-[460px] rounded-[26px]"
                  : "w-auto rounded-full"
                : notchExpanded
                  ? "w-[92%] max-w-[460px] rounded-b-[26px] border-t-0"
                  : "w-auto rounded-b-2xl border-t-0"
            }`}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${track.accent} opacity-75 transition-opacity duration-300`}
            />

            {!notchExpanded ? (
              <button
                type="button"
                onClick={() => {
                  stopAutoDemo();
                  setNotchExpanded(true);
                }}
                className="relative z-10 flex items-center gap-3 px-4 py-2 text-left"
              >
                {liveToast ? (
                  <div className="flex items-center gap-2.5">
                    {liveToast.kind === "bluetooth" && (
                      <Headphones className="h-4 w-4 text-sky-400" />
                    )}
                    {liveToast.kind === "whatsapp" && (
                      <MessageCircle className="h-4 w-4 text-emerald-400" />
                    )}
                    {liveToast.kind === "volume" && (
                      <Volume2 className="h-4 w-4 text-amber-400" />
                    )}
                    <div>
                      <p className="text-xs font-semibold leading-tight text-white">
                        {liveToast.title}
                      </p>
                      <p className="text-[10px] text-slate-300">{liveToast.subtitle}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className={`h-2.5 w-2.5 rounded-full ${track.pillDot}`} />
                    <span className="max-w-[140px] truncate text-xs font-medium text-white">
                      {track.title}
                    </span>
                    <div className="flex h-3.5 items-end gap-0.5">
                      <span className="animate-eq-1 h-3.5 w-0.5 rounded-full bg-indigo-300" />
                      <span className="animate-eq-2 h-3.5 w-0.5 rounded-full bg-indigo-300" />
                      <span className="animate-eq-3 h-3.5 w-0.5 rounded-full bg-indigo-300" />
                      <span className="animate-eq-4 h-3.5 w-0.5 rounded-full bg-indigo-300" />
                    </div>
                  </>
                )}
              </button>
            ) : (
              <div className="relative z-10 p-3.5 sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1">
                    {(
                      [
                        { id: "media", label: "Media", icon: Music },
                        { id: "lyrics", label: "Lyrics", icon: Sparkles },
                        { id: "timer", label: "Timer", icon: Timer },
                        { id: "shelf", label: "Shelf", icon: UploadCloud },
                        { id: "clip", label: "Clip", icon: Clipboard },
                      ] as const
                    ).map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          stopAutoDemo();
                          setNotchTab(id);
                        }}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                          notchTab === id
                            ? "bg-white text-slate-950 shadow-sm"
                            : "text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <Icon className="h-3 w-3" />
                        {label}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      stopAutoDemo();
                      setNotchExpanded(false);
                    }}
                    className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-slate-300 hover:bg-white/20"
                  >
                    {lang === "id" ? "Lipat" : "Pill"}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {notchTab === "media" && (
                    <motion.div
                      key="media"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                      className="flex items-center gap-3.5"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg ${
                          isPlaying ? "animate-spin-slow" : ""
                        }`}
                      >
                        <Music className="h-5 w-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">
                          {track.title}
                        </p>
                        <p className="truncate text-xs text-slate-300">{track.artist}</p>
                        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/15">
                          <div className="h-full w-2/5 rounded-full bg-white" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          aria-label="Previous track"
                          onClick={() => {
                            stopAutoDemo();
                            setTrackIndex((i) => (i === 0 ? SAMPLE_TRACKS.length - 1 : i - 1));
                          }}
                          className="rounded-full p-1.5 text-slate-300 hover:bg-white/10"
                        >
                          <SkipBack className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={isPlaying ? "Pause" : "Play"}
                          onClick={() => {
                            stopAutoDemo();
                            setIsPlaying((p) => !p);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-950 transition hover:scale-105"
                        >
                          {isPlaying ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="ml-0.5 h-4 w-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          aria-label="Next track"
                          onClick={() => {
                            stopAutoDemo();
                            setTrackIndex((i) => (i + 1) % SAMPLE_TRACKS.length);
                          }}
                          className="rounded-full p-1.5 text-slate-300 hover:bg-white/10"
                        >
                          <SkipForward className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {notchTab === "lyrics" && (
                    <motion.div
                      key="lyrics"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                      className="space-y-1.5 py-1 text-center"
                    >
                      {track.lyrics.map((line, i) => (
                        <p
                          key={line}
                          className={`text-xs font-medium ${
                            i === 1 ? "text-white" : "text-slate-400/60"
                          }`}
                        >
                          {line}
                        </p>
                      ))}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            stopAutoDemo();
                            setKaraokeOpen((v) => !v);
                          }}
                          className="inline-flex items-center gap-1 rounded-full border border-pink-400/35 bg-pink-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-pink-200 hover:bg-pink-500/25"
                        >
                          <Sparkles className="h-2.5 w-2.5" />
                          {lang === "id" ? "Buka Floating Karaoke" : "Pop Out Karaoke Window"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {notchTab === "timer" && (
                    <IsolatedPomodoroTab onInteract={stopAutoDemo} />
                  )}

                  {notchTab === "shelf" && (
                    <motion.div
                      key="shelf"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                      className="grid grid-cols-3 gap-2"
                    >
                      {INITIAL_SHELF_FILES.map((file) => (
                        <div
                          key={file.id}
                          className="rounded-xl border border-white/10 bg-white/5 p-2 text-left transition hover:-translate-y-0.5 hover:border-indigo-400/40"
                        >
                          {file.kind === "img" ? (
                            <ImageIcon className="mb-1 h-4 w-4 text-sky-400" />
                          ) : (
                            <FileText className="mb-1 h-4 w-4 text-indigo-300" />
                          )}
                          <p className="truncate text-[11px] font-medium text-white">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-slate-400">{file.size}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {notchTab === "clip" && (
                    <motion.div
                      key="clip"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                      className="space-y-1.5"
                    >
                      {clipItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5"
                        >
                          <p className="min-w-0 flex-1 truncate font-mono text-[11px] text-slate-100">
                            {item.text}
                          </p>
                          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-slate-300">
                            {item.tag}
                          </span>
                          <button
                            type="button"
                            aria-label="Pin clipboard item"
                            onClick={() => togglePinClip(item.id)}
                            className={`rounded p-1 transition ${
                              item.pinned ? "text-amber-400" : "text-slate-400 hover:text-white"
                            }`}
                          >
                            <Pin className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            aria-label="Copy clipboard item"
                            onClick={() => handleCopyClip(item.id, item.text)}
                            className="rounded bg-white/10 p-1 text-slate-200 hover:bg-white/20"
                          >
                            {copiedId === item.id ? (
                              <Check className="h-3 w-3 text-emerald-400" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>

        {/* Floating Karaoke Lyrics Window (v0.1.1 Shadowless 8-way Resizable) */}
        <AnimatePresence>
          {karaokeOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-24 left-1/2 z-30 w-[86%] max-w-[360px] -translate-x-1/2 rounded-2xl border border-white/15 bg-black/45 px-4 py-3 text-center backdrop-blur-md"
            >
              <div className="mb-1 flex items-center justify-between text-[9px] uppercase tracking-widest text-pink-300/80">
                <span>Floating Karaoke • 8-Way Resize</span>
                <button
                  type="button"
                  onClick={() => setKaraokeOpen(false)}
                  className="rounded px-1.5 py-0.5 text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  ×
                </button>
              </div>
              <p className="text-xs text-slate-400/70">{track.lyrics[0]}</p>
              <p className="my-0.5 text-sm font-bold text-white drop-shadow-[0_0_12px_rgba(244,114,182,0.55)]">
                {track.lyrics[1]}
              </p>
              <p className="text-xs text-slate-400/70">{track.lyrics[2]}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Genie Effect Demo Window (Direct3D11 + DirectComposition VSync) */}
        <AnimatePresence>
          {genieWindowState === "open" && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0.14, scaleY: 0.12, y: 210, x: -72, skewX: 16 }}
              animate={{ opacity: 1, scaleX: 1, scaleY: 1, y: 0, x: 0, skewX: 0 }}
              exit={{ opacity: 0, scaleX: 0.14, scaleY: 0.1, y: 220, x: -72, skewX: -18 }}
              transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-24 z-30 w-[88%] max-w-[350px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/20 bg-[#0d111a]/95 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-3 py-2">
                <span className="text-xs font-semibold text-slate-200">
                  VS Code — Wizzly Genie Effect
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setGenieWindowState("minimized")}
                    aria-label="Minimize with Genie Effect"
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400/20 text-xs font-bold text-amber-300 hover:bg-amber-400/35"
                  >
                    −
                  </button>
                </div>
              </div>
              <div className="space-y-2 p-4 text-left">
                <p className="font-mono text-[11px] text-indigo-300">
                  native_ui/genie.rs • Direct3D11 + VSync
                </p>
                <p className="text-xs text-slate-300">
                  {lang === "id"
                    ? "Klik tombol − atau ikon VS Code di Dock untuk melihat animasi Genie melengkung masuk ke koordinat ikon."
                    : "Click the − button or the VS Code Dock icon to trigger curved Genie suction straight into the Dock slot."}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center Interactive Spotlight Overlay */}
        <AnimatePresence>
          {spotlightOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute left-1/2 top-1/2 z-40 w-[90%] max-w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/20 bg-[#0d1018]/95 p-3 shadow-2xl"
            >
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-2.5">
                <Search className="h-4 w-4 text-indigo-400" />
                <input
                  type="text"
                  value={spotlightQuery}
                  onChange={(e) => setSpotlightQuery(e.target.value)}
                  placeholder="128 * 4..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSpotlightOpen(false)}
                  className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-slate-300"
                >
                  ESC
                </button>
              </div>
              <div className="mt-2 space-y-1">
                {mathResult && (
                  <div className="flex items-center justify-between rounded-xl bg-indigo-500/20 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-indigo-300" />
                      <span className="text-xs text-slate-200">{spotlightQuery}</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-white">
                      = {mathResult}
                    </span>
                  </div>
                )}
                {filteredApps.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => {
                      setSpotlightOpen(false);
                      handleDockClick(app.id);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-left hover:bg-white/10"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="h-6 w-6 overflow-hidden rounded-lg">
                        <DockAppSvg id={app.id} />
                      </span>
                      <span className="text-xs font-medium text-slate-100">{app.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Launch</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Per-App Volume Mixer Popover */}
        <AnimatePresence>
          {mixerOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-24 right-4 z-40 w-64 rounded-2xl border border-white/20 bg-[#0d1018]/95 p-3.5 shadow-2xl sm:right-8"
            >
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Per-App Mixer</span>
                <button
                  type="button"
                  onClick={() => setMixerOpen(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              <div className="space-y-2.5">
                {Object.entries(appVolumes).map(([app, val]) => (
                  <div key={app} className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>{app}</span>
                      <span className="font-mono">{val}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={val}
                      onChange={(e) =>
                        setAppVolumes((prev) => ({
                          ...prev,
                          [app]: Number(e.target.value),
                        }))
                      }
                      className="h-1.5 w-full cursor-pointer accent-indigo-400"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zero-Re-Render macOS Magnification Dock with Crisp App SVGs */}
        <ZeroRerenderDock
          dockGlassClass={dockGlassClass}
          bouncingId={bouncingId}
          onAppClick={handleDockClick}
          onToggleMixer={() => {
            stopAutoDemo();
            setSpotlightOpen(false);
            setMixerOpen((v) => !v);
          }}
        />
      </div>
    </div>
  );
}

function IsolatedPomodoroTab({ onInteract }: { onInteract: () => void }) {
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      setTimerSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  const mins = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
  const secs = String(timerSeconds % 60).padStart(2, "0");

  return (
    <motion.div
      key="timer"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.16 }}
      className="flex flex-wrap items-center justify-between gap-3"
    >
      <div>
        <p className="text-[11px] uppercase tracking-wider text-amber-300">
          Pomodoro Focus
        </p>
        <p className="font-mono text-2xl font-bold text-white">
          {mins}:{secs}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {[
          { label: "5m", sec: 5 * 60 },
          { label: "25m", sec: 25 * 60 },
          { label: "50m", sec: 50 * 60 },
        ].map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              onInteract();
              setTimerRunning(false);
              setTimerSeconds(preset.sec);
            }}
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 hover:bg-white/15"
          >
            {preset.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            onInteract();
            setTimerRunning((r) => !r);
          }}
          className="rounded-lg bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-950 hover:bg-amber-300"
        >
          {timerRunning ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          aria-label="Reset timer"
          onClick={() => {
            onInteract();
            setTimerRunning(false);
            setTimerSeconds(25 * 60);
          }}
          className="rounded-lg bg-white/10 p-1.5 text-slate-200 hover:bg-white/20"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

function ZeroRerenderDock({
  dockGlassClass,
  bouncingId,
  onAppClick,
  onToggleMixer,
}: {
  dockGlassClass: string;
  bouncingId: string | null;
  onAppClick: (id: string) => void;
  onToggleMixer: () => void;
}) {
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const clientX = e.clientX;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      itemRefs.current.forEach((btn) => {
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = Math.abs(clientX - center);
        if (distance < 95) {
          const factor = Math.cos((distance / 95) * (Math.PI / 2));
          const scale = 1 + 0.4 * factor;
          const lift = factor * 11;
          btn.style.transform = `translate3d(0, -${lift.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        } else {
          btn.style.transform = "translate3d(0, 0, 0) scale(1)";
        }
      });
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    itemRefs.current.forEach((btn) => {
      if (btn) btn.style.transform = "translate3d(0, 0, 0) scale(1)";
    });
  };

  return (
    <div className="absolute inset-x-0 bottom-3.5 z-30 flex justify-center px-3">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`flex items-end gap-2 rounded-2xl border px-3 py-2 transition-colors duration-200 ${dockGlassClass}`}
      >
        {DOCK_APPS.map((app, index) => {
          const isBouncing = bouncingId === app.id;
          return (
            <div key={app.id} className="group relative flex flex-col items-center">
              <span className="pointer-events-none absolute -top-9 hidden whitespace-nowrap rounded-lg border border-white/15 bg-black/90 px-2 py-0.5 text-[10px] font-medium text-white shadow-lg group-hover:block">
                {app.name}
              </span>
              <button
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                type="button"
                onClick={() => onAppClick(app.id)}
                style={{ willChange: "transform" }}
                className={`h-10 w-10 overflow-hidden rounded-xl shadow-md transition-transform duration-150 ease-out sm:h-11 sm:w-11 ${
                  isBouncing ? "-translate-y-3" : ""
                }`}
                aria-label={app.name}
              >
                <DockAppSvg id={app.id} />
              </button>
              <span
                className={`mt-1 h-1 w-1 rounded-full ${
                  app.active ? "bg-white/90" : "bg-transparent"
                }`}
              />
            </div>
          );
        })}

        <div className="mx-1 h-8 w-px self-center bg-white/15" />
        <button
          type="button"
          onClick={onToggleMixer}
          className="hidden items-center gap-2 self-center rounded-xl border border-white/10 bg-white/10 px-2.5 py-1.5 text-[11px] text-slate-100 transition hover:bg-white/20 sm:flex"
        >
          <Wifi className="h-3.5 w-3.5 text-sky-300" />
          <Volume2 className="h-3.5 w-3.5 text-emerald-300" />
          <span className="font-mono font-medium">09:41</span>
        </button>
      </div>
    </div>
  );
}
