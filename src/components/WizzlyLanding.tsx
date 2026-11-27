"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Coffee,
  Copy,
  Database,
  Download,
  ExternalLink,
  EyeOff,
  Globe,
  Lock,
  Plus,
  ShieldAlert,
  ShieldCheck,
  Star,
  Wifi,
} from "lucide-react";
import {
  COFFEE_TIERS,
  FAQ_ITEMS,
  PRIVACY_ITEMS,
  ROADMAP_ITEMS,
  SYSTEM_REQUIREMENTS,
  V012_SECURITY_ANNOUNCEMENT,
  WIZZLY_META,
  type CoffeeTier,
  type Lang,
} from "@/data/wizzlyData";
import { DesktopSandbox } from "@/components/DesktopSandbox";
import { DonateShowcase, PostDownloadModal, QrisModal } from "@/components/SupportSection";
import { VisualShowcase } from "@/components/VisualShowcase";
import { WhatsNewSection } from "@/components/WhatsNewSection";

interface DownloadStats {
  total: number;
  latest: number;
  cachedAt: number;
}

const STATS_CACHE_KEY = "wizzly_gh_download_stats_v1";
const STATS_CACHE_TTL_MS = 5 * 60 * 1000;

export function WizzlyLanding() {
  const [lang, setLang] = useState<Lang>("en");
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);
  const [copiedSha, setCopiedSha] = useState(false);
  const [qrisModalOpen, setQrisModalOpen] = useState(false);
  const [postDownloadOpen, setPostDownloadOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<CoffeeTier>(
    COFFEE_TIERS.find((t) => t.recommended) ?? COFFEE_TIERS[0]
  );
  const [downloadStats, setDownloadStats] = useState<{ total: number; latest: number } | null>(
    null
  );

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
      .then(
        (releases: Array<{ tag_name?: string; assets?: Array<{ download_count?: number }> }>) => {
          if (cancelled || !Array.isArray(releases)) return;
          let total = 0;
          let latest = 0;
          for (const rel of releases) {
            const count = (rel.assets ?? []).reduce(
              (sum, asset) =>
                sum + (typeof asset.download_count === "number" ? asset.download_count : 0),
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
        }
      )
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

  const { raisedUsd, targetUsd } = WIZZLY_META.donation.codeSigningGoal;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#070708] text-[#fafafa]">
      {/* Subtle Architectural Grid Wash at Top */}
      <div
        aria-hidden="true"
        className="bg-architectural-grid pointer-events-none fixed inset-x-0 top-0 -z-10 h-[620px]"
        style={{
          maskImage: "radial-gradient(ellipse 72% 65% at 50% 0%, black 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 65% at 50% 0%, black 20%, transparent 78%)",
        }}
      />

      {/* Minimalist Sticky Navigation */}
      <header className="studio-nav sticky top-0 z-50 border-b border-white/[0.07]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2.5">
            <img
              src="/images/wizzly-icon.png"
              alt="Wizzly Logo"
              width={24}
              height={24}
              className="h-6 w-6 rounded-md border border-white/15"
            />
            <span className="text-[15px] font-semibold tracking-tight text-white">
              Wizzly
            </span>
            <span className="hidden rounded border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 sm:inline-block">
              v{WIZZLY_META.version}
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-xs font-medium text-zinc-400 md:flex">
            <a href="#preview" className="transition hover:text-white">
              Sandbox
            </a>
            <a href="#features" className="transition hover:text-white">
              {lang === "id" ? "Fitur" : "Features"}
            </a>
            <a href="#whats-new" className="transition hover:text-white">
              {lang === "id" ? "Rilis" : "Changelog"}
            </a>
            <a href="#specs" className="transition hover:text-white">
              {lang === "id" ? "Spesifikasi" : "Specs"}
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            {/* Signature Stand-Out Donate Pill in Navbar */}
            <a
              href="#donate"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/45 bg-amber-400/12 px-3 py-1.5 text-[11px] font-semibold text-amber-300 shadow-[0_0_20px_-6px_rgba(245,158,11,0.45)] transition hover:border-amber-400/70 hover:bg-amber-400/20"
            >
              <Coffee className="h-3 w-3 text-amber-400" />
              <span>{lang === "id" ? "Donasi" : "Donate"}</span>
            </a>

            <button
              type="button"
              onClick={() => setLang((prev) => (prev === "id" ? "en" : "id"))}
              className="inline-flex items-center gap-1 rounded-full border border-white/[0.09] bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] font-medium text-zinc-300 transition hover:border-white/20 hover:text-white"
              aria-label="Switch language"
            >
              <Globe className="h-3 w-3 text-zinc-400" />
              {lang.toUpperCase()}
            </button>

            <a
              href="#download"
              className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              {lang === "id" ? "Unduh" : "Download"}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 sm:pt-12">
        {/* Important v0.1.2 Microsoft Defender & Auto-Updater Removal Announcement */}
        <motion.section
          aria-label={V012_SECURITY_ANNOUNCEMENT.badge[lang]}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative mb-12 overflow-hidden rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-500/[0.11] via-rose-950/[0.22] to-[#0e0e11] p-4 shadow-[0_18px_50px_-24px_rgba(244,63,94,0.45)] sm:mb-16 sm:p-5"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-rose-400/60 to-transparent"
          />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-400/30 bg-rose-500/15 text-rose-300">
                <ShieldAlert className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/35 bg-rose-500/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-rose-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                    {V012_SECURITY_ANNOUNCEMENT.badge[lang]}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400">
                    v0.1.2 → v{WIZZLY_META.version}
                  </span>
                </div>
                <h2 className="mt-2 text-sm font-semibold text-white sm:text-[15px]">
                  {V012_SECURITY_ANNOUNCEMENT.title[lang]}
                </h2>
                <p className="mt-1 max-w-3xl text-xs leading-relaxed text-zinc-300 sm:text-[13px]">
                  {V012_SECURITY_ANNOUNCEMENT.body[lang]}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 pl-12.5 lg:pl-0">
              <a
                href={WIZZLY_META.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setPostDownloadOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-200 active:scale-[0.99]"
              >
                <ArrowDownToLine className="h-3.5 w-3.5" />
                {V012_SECURITY_ANNOUNCEMENT.ctaDownload[lang]}
              </a>
              <a
                href="#whats-new"
                className="inline-flex items-center gap-1 rounded-full border border-white/14 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-200 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              >
                {V012_SECURITY_ANNOUNCEMENT.ctaChangelog[lang]}
                <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
              </a>
            </div>
          </div>
        </motion.section>

        {/* Minimalist Editorial Hero */}
        <section className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-[#0e0e11] px-3.5 py-1 text-xs text-zinc-400"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="font-mono text-[11px] text-zinc-300">
              v{WIZZLY_META.version}
            </span>
            <span className="text-zinc-600">•</span>
            <span>Windows 10 & 11</span>
            <span className="text-zinc-600">•</span>
            <span className="font-mono text-[11px]">{WIZZLY_META.installerSize}</span>
            {downloadStats !== null && (
              <>
                <span className="text-zinc-600">•</span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-200">
                  <Download className="h-3 w-3 text-zinc-400" />
                  {downloadStats.total.toLocaleString(lang === "id" ? "id-ID" : "en-US")}
                </span>
              </>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.65rem]"
          >
            {lang === "id" ? (
              <>
                Desktop Windows,{" "}
                <span className="text-zinc-500">lebih rapi dan hidup.</span>
              </>
            ) : (
              <>
                Windows desktop,{" "}
                <span className="text-zinc-500">refined to the pixel.</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-lg"
          >
            {lang === "id"
              ? "Dynamic Island Notch (dengan Jadwal Sholat & Privacy Mic/Kamera), Liquid Dock + Spaces & Genie Effect GPU VSync, 4 Native Direct2D Widgets, dan Alt+Space Spotlight — dibangun dengan Rust."
              : "Dynamic Island Notch (with Prayer Times & Mic/Camera Privacy), Liquid Dock with Spaces & GPU VSync Genie Effect, 4 Native Direct2D Widgets, and Alt+Space Spotlight — engineered in Rust."}
          </motion.p>

          {/* Primary Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={WIZZLY_META.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setPostDownloadOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 shadow-[0_12px_32px_-10px_rgba(255,255,255,0.35)] transition hover:bg-zinc-200 active:scale-[0.99]"
            >
              <ArrowDownToLine className="h-4 w-4" />
              {lang === "id"
                ? `Download v${WIZZLY_META.version} Gratis`
                : `Download v${WIZZLY_META.version} Free`}
            </a>

            <a
              href="#preview"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
            >
              {lang === "id" ? "Coba Live Sandbox" : "Try Live Sandbox"}
              <ChevronRight className="h-4 w-4 text-zinc-400" />
            </a>

            <a
              href={WIZZLY_META.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] px-4 py-3 text-sm font-medium text-zinc-400 transition hover:border-white/20 hover:text-white"
            >
              <Star className="h-3.5 w-3.5" />
              GitHub
            </a>
          </motion.div>

          {/* Tasteful Stand-Out Above-the-Fold Donation Callout Strip */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-7 flex justify-center"
          >
            <a
              href="#donate"
              className="group inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-amber-400/35 bg-amber-400/[0.08] px-4 py-2 text-xs text-amber-200/95 transition hover:border-amber-400/60 hover:bg-amber-400/[0.14]"
            >
              <span className="inline-flex items-center gap-1.5 font-semibold text-amber-300">
                <Coffee className="h-3.5 w-3.5" />
                {lang === "id" ? "100% Gratis & Independen" : "100% Free & Community Funded"}
              </span>
              <span className="hidden text-amber-400/40 sm:inline">•</span>
              <span className="text-zinc-300">
                {lang === "id"
                  ? `Bantu target Code Signing ($${raisedUsd}/$${targetUsd})`
                  : `Help fund Code Signing ($${raisedUsd}/$${targetUsd})`}
              </span>
              <span className="inline-flex items-center gap-0.5 font-semibold text-amber-300">
                {lang === "id" ? "Traktir Kopi" : "Support"}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </motion.div>
        </section>

        {/* Architectural Metric Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-14 grid grid-cols-2 divide-y divide-white/[0.07] border-y border-white/[0.07] sm:grid-cols-4 sm:divide-x sm:divide-y-0"
        >
          {[
            {
              value: WIZZLY_META.installerSize,
              label: lang === "id" ? "Ukuran Installer" : "Installer Size",
            },
            {
              value: "~35 MB",
              label: lang === "id" ? "RAM Proses Inti Rust" : "Rust Core Memory",
            },
            {
              value: "~0%",
              label: lang === "id" ? "CPU Widget saat Idle" : "Direct2D Idle CPU",
            },
            {
              value: "100%",
              label: lang === "id" ? "Lokal & Tanpa Akun" : "Local-First & Free",
            },
          ].map((stat) => (
            <div key={stat.label} className="px-4 py-5 text-center">
              <p className="font-mono text-xl font-semibold tracking-tight tabular-nums text-white sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Interactive Desktop Sandbox */}
        <motion.section
          id="preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 scroll-mt-24"
        >
          <DesktopSandbox lang={lang} />
        </motion.section>

        {/* Unified Minimalist Capabilities Bento */}
        <VisualShowcase lang={lang} />

        {/* STAND-OUT Flagship Donation & Patronage Showcase */}
        <DonateShowcase
          lang={lang}
          selectedTier={selectedTier}
          onSelectTier={setSelectedTier}
          onOpenQris={() => setQrisModalOpen(true)}
        />

        {/* Changelog & 2x2 Widget Gallery */}
        <WhatsNewSection lang={lang} />

        {/* Technical Specifications & Roadmap */}
        <section id="specs" className="mt-28 scroll-mt-24 sm:mt-36">
          <div className="mb-10 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              {lang === "id" ? "Spesifikasi Teknis" : "Technical Specifications"}
            </p>
            <h2 className="mt-2.5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              {lang === "id" ? "Ringan di setiap angka." : "Lightweight by design."}
            </h2>
          </div>

          <div className="surface-card overflow-hidden rounded-3xl px-6 py-1 sm:px-8">
            {SYSTEM_REQUIREMENTS.map((spec, idx) => (
              <div
                key={spec.label.en}
                className={`grid gap-2 py-5 sm:grid-cols-12 sm:items-center ${
                  idx !== SYSTEM_REQUIREMENTS.length - 1 ? "border-b border-white/[0.06]" : ""
                }`}
              >
                <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 sm:col-span-4">
                  {spec.label[lang]}
                </div>
                <div className="sm:col-span-8">
                  <p className="text-sm font-semibold text-white sm:text-base">{spec.value}</p>
                  <p className="mt-0.5 text-xs text-zinc-400">{spec.detail[lang]}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Minimalist Roadmap Strip */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {ROADMAP_ITEMS.map((item) => (
              <span
                key={item.title.en}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs ${
                  item.done
                    ? "border-white/[0.08] bg-[#0e0e11] text-zinc-300"
                    : "border-white/20 bg-white/[0.06] text-white"
                }`}
              >
                {item.done ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <CircleDashed className="h-3.5 w-3.5 text-zinc-400" />
                )}
                {item.title[lang]}
              </span>
            ))}
          </div>
        </section>

        {/* Local-First Privacy */}
        <section id="privacy" className="mt-28 scroll-mt-24 sm:mt-36">
          <div className="mb-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              <Lock className="h-3.5 w-3.5 text-zinc-400" />
              {lang === "id" ? "Privasi & Transparansi" : "Privacy & Transparency"}
            </div>
            <h2 className="mt-2.5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              {lang === "id" ? "Semua data tetap di PC kamu." : "Your data stays on your PC."}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PRIVACY_ITEMS.map((item, idx) => {
              const Icon =
                idx === 0 ? EyeOff : idx === 1 ? Database : idx === 2 ? ShieldCheck : Wifi;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="surface-card flex items-start gap-4 rounded-3xl p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-200">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white sm:text-base">
                      {item.title[lang]}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                      {item.description[lang]}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Clean Flagship Download Section */}
        <section id="download" className="mt-28 scroll-mt-24 sm:mt-36">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="surface-card overflow-hidden rounded-[28px] p-7 sm:p-10 lg:p-12"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-zinc-300">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    {lang === "id" ? "Gratis • Semua Fitur Terbuka" : "Free • All Features Unlocked"}
                  </span>
                  {downloadStats !== null && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-zinc-400">
                      <Download className="h-3 w-3" />
                      {downloadStats.total.toLocaleString(lang === "id" ? "id-ID" : "en-US")}{" "}
                      {lang === "id" ? "unduhan" : "downloads"}
                    </span>
                  )}
                </div>

                <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  {lang === "id"
                    ? `Download Wizzly v${WIZZLY_META.version}`
                    : `Download Wizzly v${WIZZLY_META.version}`}
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-400">
                  {lang === "id"
                    ? `Installer ${WIZZLY_META.installerSize} untuk Windows 10 & 11 (64-bit). Verifikasi SHA-256 tersedia untuk keamanan penuh.`
                    : `${WIZZLY_META.installerSize} installer for Windows 10 & 11 (64-bit). Verify the SHA-256 checksum anytime.`}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={WIZZLY_META.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setPostDownloadOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 active:scale-[0.99]"
                  >
                    <ArrowDownToLine className="h-4 w-4" />
                    {WIZZLY_META.installerFile}
                  </a>
                  <a
                    href={WIZZLY_META.releaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3.5 text-xs font-medium text-zinc-200 transition hover:border-white/25 hover:text-white"
                  >
                    <span>GitHub Releases</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="space-y-3 lg:col-span-5">
                {/* SHA-256 Verification Box */}
                <div className="rounded-2xl border border-white/[0.08] bg-black/50 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      SHA-256 Checksum
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySha}
                      aria-label="Copy SHA-256 checksum"
                      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-zinc-200 transition hover:bg-white/12"
                    >
                      {copiedSha ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          {lang === "id" ? "Disalin" : "Copied"}
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          {lang === "id" ? "Salin" : "Copy"}
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-2 break-all font-mono text-[11px] leading-relaxed text-zinc-400">
                    {WIZZLY_META.sha256}
                  </p>
                </div>

                {/* Subtle Warm-Gold Support Bridge */}
                <a
                  href="#donate"
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/[0.07] px-4 py-3.5 transition hover:border-amber-400/55 hover:bg-amber-400/[0.12]"
                >
                  <div className="flex items-center gap-2.5">
                    <Coffee className="h-4 w-4 shrink-0 text-amber-400" />
                    <div>
                      <p className="text-xs font-semibold text-amber-200">
                        {lang === "id" ? "Gratis selamanya — traktir kopi dev?" : "Free forever — buy the dev a coffee?"}
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        {lang === "id"
                          ? "QRIS • PayPal • Binance Pay"
                          : "QRIS • PayPal • Binance Pay"}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-amber-300 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Minimalist 2-Column FAQ */}
        <section id="faq" className="mt-28 scroll-mt-24 sm:mt-36">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">FAQ</p>
              <h2 className="mt-2.5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                {lang === "id" ? "Pertanyaan umum." : "Questions & answers."}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {lang === "id"
                  ? "Ringkasan seputar lisensi gratis, performa Direct2D, privasi lokal, dan verifikasi SmartScreen."
                  : "Quick clarity on free access, Direct2D performance, local privacy, and installer security."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaqs((prev) =>
                      prev.length === FAQ_ITEMS.length ? [] : FAQ_ITEMS.map((_, i) => i)
                    )
                  }
                  className="rounded-full border border-white/10 bg-[#0e0e11] px-4 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-white/25 hover:text-white"
                >
                  {openFaqs.length === FAQ_ITEMS.length
                    ? lang === "id"
                      ? "Tutup Semua"
                      : "Collapse All"
                    : lang === "id"
                      ? "Buka Semua"
                      : "Expand All"}
                </button>
                <a
                  href={`${WIZZLY_META.githubUrl}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 transition hover:text-white"
                >
                  {lang === "id" ? "Tanya di GitHub" : "Ask on GitHub"}
                  <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="surface-card overflow-hidden rounded-3xl px-6 py-1 sm:px-8 lg:col-span-8">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqs.includes(idx);
                const toggleFaq = () => {
                  setOpenFaqs((prev) =>
                    prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
                  );
                };
                return (
                  <div
                    key={item.q.en}
                    className={
                      idx !== FAQ_ITEMS.length - 1 ? "border-b border-white/[0.06]" : ""
                    }
                  >
                    <button
                      type="button"
                      onClick={toggleFaq}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <div className="flex items-baseline gap-3.5">
                        <span className="font-mono text-[11px] text-zinc-600">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium text-zinc-200 transition group-hover:text-white sm:text-base">
                          {item.q[lang]}
                        </span>
                      </div>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                          isOpen
                            ? "border-white bg-white text-zinc-950"
                            : "border-white/10 bg-white/[0.03] text-zinc-400 group-hover:border-white/25 group-hover:text-white"
                        }`}
                      >
                        <Plus
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 pl-8 pr-6 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                            {item.a[lang]}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Minimalist Architectural Footer */}
      <footer className="border-t border-white/[0.07] bg-[#070708] py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <img
                src="/images/wizzly-icon.png"
                alt="Wizzly"
                width={18}
                height={18}
                className="h-4.5 w-4.5 rounded"
              />
              <span>
                © {new Date().getFullYear()} Wizzly • Built by Adrian for Windows 10 & 11.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <a
                href="#donate"
                className="inline-flex items-center gap-1.5 font-medium text-amber-300 transition hover:text-amber-200"
              >
                <Coffee className="h-3.5 w-3.5" />
                {lang === "id" ? "Traktir Kopi" : "Donate"}
              </a>
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
              <a href="#download" className="font-mono text-zinc-300 transition hover:text-white">
                v{WIZZLY_META.version}
              </a>
            </div>
          </div>
        </div>
      </footer>

      <PostDownloadModal
        open={postDownloadOpen}
        onClose={() => setPostDownloadOpen(false)}
        lang={lang}
        selectedTier={selectedTier}
        onSelectTier={setSelectedTier}
      />

      <QrisModal
        open={qrisModalOpen}
        onClose={() => setQrisModalOpen(false)}
        lang={lang}
        selectedTier={selectedTier}
      />
    </div>
  );
}
