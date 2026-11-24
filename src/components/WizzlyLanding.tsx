"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownToLine,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDashed,
  Copy,
  Cpu,
  Database,
  Download,
  ExternalLink,
  EyeOff,
  Globe,
  HardDrive,
  Heart,
  Lock,
  Monitor,
  QrCode,
  ShieldCheck,
  Sparkles,
  Star,
  Wifi,
} from "lucide-react";
import {
  FAQ_ITEMS,
  PRIVACY_ITEMS,
  ROADMAP_ITEMS,
  WIZZLY_META,
  type Lang,
} from "@/data/wizzlyData";
import { DesktopSandbox } from "@/components/DesktopSandbox";
import { VisualShowcase } from "@/components/VisualShowcase";
import { WhatsNewSection } from "@/components/WhatsNewSection";

const QUICK_SPECS = [
  { icon: Monitor, label: "Windows 10 / 11", sub: "1903+ (x64)" },
  { icon: Cpu, label: "Direct2D + D3D11", sub: "Rust + Tauri 2" },
  { icon: HardDrive, label: WIZZLY_META.installerSize, sub: "NSIS Installer" },
  { icon: Globe, label: "ID & EN", sub: "Multi-Monitor" },
];

interface DownloadStats {
  total: number;
  latest: number;
  cachedAt: number;
}

const STATS_CACHE_KEY = "wizzly_gh_download_stats_v1";
const STATS_CACHE_TTL_MS = 5 * 60 * 1000;

export function WizzlyLanding() {
  const [lang, setLang] = useState<Lang>("id");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedBinance, setCopiedBinance] = useState(false);
  const [copiedSha, setCopiedSha] = useState(false);
  const [qrisModalOpen, setQrisModalOpen] = useState(false);
  const [downloadStats, setDownloadStats] = useState<{ total: number; latest: number } | null>(null);

  useEffect(() => {
    let cancelled = false;

    const readCached = (): DownloadStats | null => {
      try {
        const raw = localStorage.getItem(STATS_CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as DownloadStats;
        if (typeof parsed.total === "number" && typeof parsed.cachedAt === "number") {
          return parsed;
        }
      } catch {
        // Ignore storage errors
      }
      return null;
    };

    const cached = readCached();
    if (cached) {
      setDownloadStats({ total: cached.total, latest: cached.latest ?? 0 });
      if (Date.now() - cached.cachedAt < STATS_CACHE_TTL_MS) {
        return;
      }
    }

    fetch("https://api.github.com/repos/loganmaxx/wizzly/releases?per_page=20", {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((releases: Array<{ tag_name?: string; assets?: Array<{ download_count?: number }> }>) => {
        if (cancelled || !Array.isArray(releases)) return;
        let total = 0;
        let latest = 0;
        for (const rel of releases) {
          const count = (rel.assets ?? []).reduce(
            (sum, asset) => sum + (typeof asset.download_count === "number" ? asset.download_count : 0),
            0
          );
          total += count;
          if (rel.tag_name?.toLowerCase() === `v${WIZZLY_META.version}`.toLowerCase()) {
            latest = count;
          }
        }
        const nextStats = { total, latest };
        setDownloadStats(nextStats);
        try {
          localStorage.setItem(
            STATS_CACHE_KEY,
            JSON.stringify({ ...nextStats, cachedAt: Date.now() })
          );
        } catch {
          // Ignore storage quota errors
        }
      })
      .catch(() => {
        // Keep cached value if available, or remain hidden gracefully
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCopySha = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(WIZZLY_META.sha256).catch(() => {});
    }
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 1800);
  };

  const handleCopyBinance = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(WIZZLY_META.donation.binancePayId).catch(() => {});
    }
    setCopiedBinance(true);
    setTimeout(() => setCopiedBinance(false), 1800);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#050609] text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 obsidian-grid"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[560px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(99, 102, 241, 0.22), transparent 75%)",
        }}
      />

      {/* Sticky Glass Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050609]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2.5">
            <img
              src="/images/wizzly-icon.png"
              alt="Wizzly Logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-xl border border-white/15 shadow-md"
            />
            <span className="text-base font-bold tracking-tight text-white">
              Wizzly
            </span>
            <span className="hidden rounded-full border border-sky-400/30 bg-sky-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-sky-200 sm:inline-block">
              v{WIZZLY_META.version}
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#preview" className="transition hover:text-white">
              Demo
            </a>
            <a href="#whats-new" className="transition hover:text-white">
              v{WIZZLY_META.version}
            </a>
            <a href="#features" className="transition hover:text-white">
              {lang === "id" ? "Fitur" : "Features"}
            </a>
            <a href="#specs" className="transition hover:text-white">
              {lang === "id" ? "Spek" : "Specs"}
            </a>
            <a href="#privacy" className="transition hover:text-white">
              {lang === "id" ? "Privasi" : "Privacy"}
            </a>
            <a href="#donate" className="transition hover:text-white">
              {lang === "id" ? "Donasi" : "Donate"}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={WIZZLY_META.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-xl border border-amber-400/25 bg-amber-500/10 px-2.5 py-1.5 text-xs font-medium text-amber-200 transition hover:bg-amber-500/20 sm:inline-flex"
            >
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              Star
            </a>
            <button
              type="button"
              onClick={() => setLang((prev) => (prev === "id" ? "en" : "id"))}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/10"
              aria-label="Switch language"
            >
              <Globe className="h-3.5 w-3.5 text-indigo-400" />
              {lang.toUpperCase()}
            </button>
            <a
              href="#download"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-950 shadow-sm transition hover:bg-slate-200 sm:text-sm"
            >
              <ArrowDownToLine className="h-3.5 w-3.5" />
              Download
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
        {/* Compact Visual Hero */}
        <section className="text-center">
          <div className="animate-float-slow mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/5 shadow-[0_0_40px_rgba(99,102,241,0.3)]">
            <img
              src="/images/wizzly-icon.png"
              alt="Wizzly"
              width={48}
              height={48}
              className="h-12 w-12 rounded-xl"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <motion.a
              href="#whats-new"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-3.5 py-1 text-xs font-medium text-indigo-200 transition hover:bg-indigo-500/20"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>
                v{WIZZLY_META.version} • Windows 10 & 11 • {WIZZLY_META.installerSize}
              </span>
            </motion.a>

            {downloadStats !== null && (
              <motion.a
                href="#download"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
              >
                <Download className="h-3.5 w-3.5 text-emerald-400" />
                <span>
                  {downloadStats.total.toLocaleString(lang === "id" ? "id-ID" : "en-US")}{" "}
                  {lang === "id" ? "Unduhan" : "Downloads"}
                </span>
              </motion.a>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="mx-auto mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.06]"
          >
            Notch,{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
              Liquid Dock
            </span>
            , Widgets & Spotlight.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base"
          >
            {lang === "id"
              ? "Desktop Windows lebih hidup dengan 4 Widget Native Direct2D, Animasi Genie GPU VSync, Floating Karaoke & Spotlight super ringan."
              : "A cleaner, faster, alive Windows desktop with 4 Native Direct2D Widgets, GPU VSync Genie Effect, Floating Karaoke & Spotlight."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#download"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_12px_40px_rgba(255,255,255,0.2)] transition hover:scale-[1.03]"
            >
              <ArrowDownToLine className="h-4 w-4" />
              {lang === "id"
                ? `Download v${WIZZLY_META.version} Gratis`
                : `Download v${WIZZLY_META.version} Free`}
            </a>
            <a
              href="#whats-new"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
            >
              {lang === "id" ? `Apa yang Baru di v${WIZZLY_META.version}` : `What's New in v${WIZZLY_META.version}`}
            </a>
            <a
              href={WIZZLY_META.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-amber-400/25 bg-amber-500/10 px-5 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-500/20"
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {lang === "id" ? "Beri Star di GitHub" : "Star on GitHub"}
            </a>
          </motion.div>
        </section>

        {/* Interactive Desktop Sandbox */}
        <motion.section
          id="preview"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-10 scroll-mt-24"
        >
          <DesktopSandbox lang={lang} />
        </motion.section>

        {/* What's New in v0.1.1 & Release Notes */}
        <WhatsNewSection lang={lang} />

        {/* Animated Visual Showcase */}
        <VisualShowcase lang={lang} />

        {/* Compact Specs & Roadmap Chips */}
        <section id="specs" className="mt-20 scroll-mt-24 space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {QUICK_SPECS.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{spec.label}</p>
                    <p className="text-[11px] text-slate-400">{spec.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            {ROADMAP_ITEMS.map((item) => (
              <span
                key={item.title.en}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${
                  item.done
                    ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200"
                    : "border-amber-400/25 bg-amber-500/10 text-amber-200"
                }`}
              >
                {item.done ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <CircleDashed className="h-3.5 w-3.5 text-amber-400" />
                )}
                {item.title[lang]}
              </span>
            ))}
          </div>
        </section>

        {/* Privacy & Local-First Transparency Section */}
        <section id="privacy" className="mt-20 scroll-mt-24">
          <div className="mb-8 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-emerald-300">
              <Lock className="h-3 w-3" />
              {lang === "id" ? "Privasi & Keamanan" : "Privacy & Transparency"}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {lang === "id"
                ? "Semua data tetap di PC kamu."
                : "Your data stays on your PC."}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PRIVACY_ITEMS.map((item, idx) => {
              const Icon =
                idx === 0
                  ? EyeOff
                  : idx === 1
                    ? Database
                    : idx === 2
                      ? ShieldCheck
                      : Wifi;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.title[lang]}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      {item.description[lang]}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Download & Donate */}
        <section
          id="download"
          className="mt-20 grid gap-5 scroll-mt-24 lg:grid-cols-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden rounded-3xl border border-indigo-400/30 bg-gradient-to-br from-indigo-950/60 via-[#0b0e18] to-[#080a10] p-7 sm:p-8 lg:col-span-7"
          >
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                {lang === "id" ? "Gratis • Semua Fitur Terbuka" : "Free • All Features Unlocked"}
              </div>
              {downloadStats !== null && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-200">
                  <Download className="h-3.5 w-3.5 text-sky-300" />
                  <span>
                    {downloadStats.total.toLocaleString(lang === "id" ? "id-ID" : "en-US")}{" "}
                    {lang === "id" ? "Total Unduhan" : "Total Downloads"}
                  </span>
                </div>
              )}
            </div>

            <h2 className="mt-4 text-3xl font-bold text-white">
              Wizzly v{WIZZLY_META.version}
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              {lang === "id"
                ? `Cukup ${WIZZLY_META.installerSize} untuk Windows 10 & 11. Gratis dipakai, terus hidup lewat dukungan komunitas.`
                : `Just ${WIZZLY_META.installerSize} for Windows 10 & 11. Free to use, sustained by community support.`}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <motion.a
                href={WIZZLY_META.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg"
              >
                <ArrowDownToLine className="h-4 w-4" />
                {WIZZLY_META.installerFile}
              </motion.a>
              <a
                href={WIZZLY_META.releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
              >
                <span>GitHub Releases</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <p className="mt-3 font-mono text-xs text-slate-400">
              {WIZZLY_META.installerSize} • x64 • Windows 10 & 11
              {downloadStats !== null && (
                <span className="text-sky-300">
                  {" "}
                  • v{WIZZLY_META.version}:{" "}
                  {downloadStats.latest.toLocaleString(lang === "id" ? "id-ID" : "en-US")}×
                </span>
              )}
            </p>
            <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2">
              <div className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  SHA-256 Checksum
                </span>
                <p className="truncate font-mono text-[11px] text-slate-300">
                  {WIZZLY_META.sha256}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopySha}
                aria-label="Copy SHA-256 checksum"
                className="shrink-0 rounded-lg bg-white/10 p-1.5 text-white transition hover:bg-white/20"
              >
                {copiedSha ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            id="donate"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8 lg:col-span-5"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/25 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-300">
                <Heart className="h-3.5 w-3.5" />
                {lang === "id" ? "Dukung Wizzly" : "Support Wizzly"}
              </span>
              <span className="text-[11px] text-slate-400">
                {lang === "id" ? "Tetap Gratis" : "Keep it Free"}
              </span>
            </div>

            <div className="mt-5 space-y-2.5">
              <a
                href={WIZZLY_META.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between rounded-2xl border border-amber-400/25 bg-amber-500/10 px-4 py-3 transition hover:bg-amber-500/20"
              >
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <div>
                    <span className="block text-sm font-semibold text-white">
                      {lang === "id" ? "Beri Star di GitHub" : "Star on GitHub"}
                    </span>
                    <span className="block text-[11px] text-amber-200/80">
                      {lang === "id" ? "Gratis & sangat membantu!" : "Free & helps a lot!"}
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-amber-300" />
              </a>

              <button
                type="button"
                onClick={() => setQrisModalOpen(true)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <QrCode className="h-5 w-5 text-indigo-400" />
                  <span className="text-sm font-semibold text-white">QRIS Indonesia</span>
                </div>
                <span className="rounded-lg bg-indigo-500/20 px-2.5 py-1 text-xs font-medium text-indigo-200">
                  QR
                </span>
              </button>

              <a
                href={WIZZLY_META.donation.paypalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                <span className="text-sm font-semibold text-white">PayPal</span>
                <ExternalLink className="h-4 w-4 text-slate-300" />
              </a>

              <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-xs text-slate-400">Binance Pay UID</p>
                  <p className="font-mono text-xs font-semibold text-amber-300">
                    {WIZZLY_META.donation.binancePayId}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyBinance}
                  className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
                >
                  {copiedBinance ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Minimal FAQ */}
        <section id="faq" className="mx-auto mt-16 max-w-3xl scroll-mt-24">
          <div className="space-y-2.5">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q.en}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left"
                  >
                    <span className="text-sm font-semibold text-white">
                      {item.q[lang]}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180 text-white" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-white/10 px-5 py-3.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
                          {item.a[lang]}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 text-xs text-slate-400 sm:px-6">
          <span>© {new Date().getFullYear()} Wizzly • Built by Adrian</span>
          <div className="flex items-center gap-4">
            <a
              href={WIZZLY_META.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>
            <a
              href={WIZZLY_META.releaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Releases
            </a>
            <span>Windows 10 & 11</span>
          </div>
        </div>
      </footer>

      {/* QRIS Modal */}
      <AnimatePresence>
        {qrisModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQrisModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl border border-white/15 bg-[#0e111a] p-6 text-center shadow-2xl"
            >
              <h4 className="text-lg font-bold text-white">Scan QRIS Wizzly</h4>
              <div className="mt-4 overflow-hidden rounded-2xl bg-white p-3">
                <img
                  src={WIZZLY_META.donation.qrisImage}
                  alt="QRIS Donasi Wizzly"
                  className="mx-auto h-auto w-full max-w-[260px] rounded-xl object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => setQrisModalOpen(false)}
                className="mt-5 w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                {lang === "id" ? "Tutup" : "Close"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
