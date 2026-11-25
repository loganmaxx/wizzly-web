"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownToLine,
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
  WIZZLY_META,
  type CoffeeTier,
  type Lang,
} from "@/data/wizzlyData";
import { DesktopSandbox } from "@/components/DesktopSandbox";
import { AppleHighlightsSection } from "@/components/AppleHighlightsSection";
import { DonateCard, PostDownloadModal, QrisModal } from "@/components/SupportSection";
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
  const [lang, setLang] = useState<Lang>("id");
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

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-[#f5f5f7]">
      {/* Subtle Apple Studio Ambient Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[680px]"
        style={{
          background:
            "radial-gradient(ellipse 65% 48% at 50% 0%, rgba(0, 113, 227, 0.2), rgba(99, 102, 241, 0.08) 48%, transparent 75%)",
        }}
      />

      {/* Sticky Apple Product Navigation Bar */}
      <header className="apple-glass sticky top-0 z-50 border-b border-white/[0.08]">
        <div className="mx-auto flex h-[52px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2.5">
            <img
              src="/images/wizzly-icon.png"
              alt="Wizzly Logo"
              width={26}
              height={26}
              className="h-6.5 w-6.5 rounded-lg border border-white/15"
            />
            <span className="text-[17px] font-semibold tracking-tight text-white">
              Wizzly
            </span>
            <span className="hidden rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] font-medium text-[#a1a1a6] sm:inline-block">
              v{WIZZLY_META.version}
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-xs font-normal text-[#a1a1a6] md:flex">
            <a href="#preview" className="transition hover:text-white">
              Demo
            </a>
            <a href="#highlights" className="transition hover:text-white">
              {lang === "id" ? "Sorotan" : "Highlights"}
            </a>
            <a href="#whats-new" className="transition hover:text-white">
              v{WIZZLY_META.version}
            </a>
            <a href="#features" className="transition hover:text-white">
              {lang === "id" ? "Fitur" : "Features"}
            </a>
            <a href="#specs" className="transition hover:text-white">
              {lang === "id" ? "Spesifikasi" : "Tech Specs"}
            </a>
            <a href="#privacy" className="transition hover:text-white">
              {lang === "id" ? "Privasi" : "Privacy"}
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#donate"
              className="inline-flex items-center gap-1 rounded-full border border-amber-400/25 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-200 transition hover:bg-amber-500/20"
            >
              <Coffee className="h-3 w-3 text-amber-400" />
              <span className="hidden sm:inline">
                {lang === "id" ? "Traktir Kopi" : "Buy Coffee"}
              </span>
            </a>
            <a
              href={WIZZLY_META.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-[#f5f5f7] transition hover:bg-white/10 sm:inline-flex"
            >
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              Star
            </a>
            <button
              type="button"
              onClick={() => setLang((prev) => (prev === "id" ? "en" : "id"))}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-[#f5f5f7] transition hover:bg-white/10"
              aria-label="Switch language"
            >
              <Globe className="h-3 w-3 text-[#2997ff]" />
              {lang.toUpperCase()}
            </button>
            <a
              href="#download"
              className="inline-flex items-center gap-1 rounded-full bg-[#0071e3] px-3.5 py-1 text-xs font-medium text-white transition hover:bg-[#0077ed]"
            >
              {lang === "id" ? "Unduh" : "Download"}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-14 sm:px-6 sm:pt-20">
        {/* Apple Keynote Hero */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="animate-float-slow mx-auto mb-6 flex h-18 w-18 items-center justify-center rounded-[22px] border border-white/20 bg-[#161617] shadow-[0_0_60px_rgba(0,113,227,0.38)]"
          >
            <img
              src="/images/wizzly-icon.png"
              alt="Wizzly"
              width={52}
              height={52}
              className="h-13 w-13 rounded-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            <a
              href="#whats-new"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#161617] px-3.5 py-1 text-xs font-medium text-[#a1a1a6] transition hover:border-white/25 hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2997ff]" />
              <span>
                Wizzly v{WIZZLY_META.version} • Windows 10 & 11 • {WIZZLY_META.installerSize}
              </span>
            </a>

            {downloadStats !== null && (
              <a
                href="#download"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20"
              >
                <Download className="h-3 w-3" />
                <span>
                  {downloadStats.total.toLocaleString(lang === "id" ? "id-ID" : "en-US")}{" "}
                  {lang === "id" ? "Unduhan" : "Downloads"}
                </span>
              </a>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-[#f5f5f7] sm:text-6xl lg:text-[5rem]"
          >
            {lang === "id" ? (
              <>
                Desktop Windows,{" "}
                <span className="apple-titanium-gradient">didefinisikan ulang.</span>
              </>
            ) : (
              <>
                Windows desktop,{" "}
                <span className="apple-titanium-gradient">reimagined.</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mx-auto mt-5 max-w-2xl text-base font-normal leading-relaxed text-[#a1a1a6] sm:text-xl"
          >
            {lang === "id"
              ? "Dynamic Island Notch, Liquid Dock dengan Genie Effect GPU VSync, 4 Desktop Widgets native Direct2D, Floating Karaoke & Spotlight — hanya 3.5 MB."
              : "Dynamic Island Notch, Liquid Dock with GPU VSync Genie Effect, 4 Native Direct2D Desktop Widgets, Floating Karaoke & Spotlight — in just 3.5 MB."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          >
            <a
              href="#download"
              className="inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-7 py-3 text-sm font-medium text-white shadow-[0_10px_35px_rgba(0,113,227,0.38)] transition hover:scale-[1.02] hover:bg-[#0077ed]"
            >
              <ArrowDownToLine className="h-4 w-4" />
              {lang === "id"
                ? `Download v${WIZZLY_META.version} Gratis`
                : `Download v${WIZZLY_META.version} Free`}
            </a>
            <a
              href="#whats-new"
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-[#2997ff] transition hover:bg-white/[0.08]"
            >
              {lang === "id" ? `Yang Baru di v${WIZZLY_META.version}` : `What's New in v${WIZZLY_META.version}`}
              <ChevronRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Subtle Apple Micro-Specs Line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-6 text-xs text-[#86868b]"
          >
            {lang === "id" ? (
              <>
                Rust + Tauri 2 • ~35 MB Core RAM (~185 MB dgn WebView2) • Direct2D & D3D11 •{" "}
                <a href="#donate" className="text-amber-300/90 transition hover:text-amber-200 hover:underline">
                  Gratis, didukung kopi komunitas ☕
                </a>
              </>
            ) : (
              <>
                Rust + Tauri 2 • ~35 MB Core RAM (~185 MB with WebView2) • Direct2D & D3D11 •{" "}
                <a href="#donate" className="text-amber-300/90 transition hover:text-amber-200 hover:underline">
                  Free, community coffee funded ☕
                </a>
              </>
            )}
          </motion.p>
        </section>

        {/* Interactive Desktop Studio Display Stage */}
        <motion.section
          id="preview"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 scroll-mt-20"
        >
          <DesktopSandbox lang={lang} />
        </motion.section>

        {/* Apple Highlights Carousel */}
        <AppleHighlightsSection lang={lang} />

        {/* v0.1.1 Interactive 2x2 Widget Gallery & Release Notes */}
        <WhatsNewSection lang={lang} />

        {/* Apple Bento Grid Showcase */}
        <VisualShowcase lang={lang} />

        {/* Apple-Style Tech Specs & Roadmap */}
        <section id="specs" className="mt-28 scroll-mt-20 sm:mt-36">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2997ff]">
              {lang === "id" ? "Spesifikasi Teknis" : "Tech Specs"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#f5f5f7] sm:text-5xl">
              {lang === "id" ? "Ringan di setiap angka." : "Lightweight by every measure."}
            </h2>
          </div>

          <div className="apple-card overflow-hidden rounded-[28px] px-6 py-2 sm:px-8">
            {SYSTEM_REQUIREMENTS.map((spec, idx) => (
              <div
                key={spec.label.en}
                className={`grid gap-2 py-5 sm:grid-cols-12 sm:items-center ${
                  idx !== SYSTEM_REQUIREMENTS.length - 1 ? "border-b border-white/[0.08]" : ""
                }`}
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b] sm:col-span-4">
                  {spec.label[lang]}
                </div>
                <div className="sm:col-span-8">
                  <p className="text-sm font-semibold text-[#f5f5f7] sm:text-base">
                    {spec.value}
                  </p>
                  <p className="mt-0.5 text-xs text-[#86868b]">{spec.detail[lang]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {ROADMAP_ITEMS.map((item) => (
              <span
                key={item.title.en}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs ${
                  item.done
                    ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                    : "border-amber-400/20 bg-amber-500/10 text-amber-200"
                }`}
              >
                {item.done ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#30d158]" />
                ) : (
                  <CircleDashed className="h-3.5 w-3.5 text-amber-400" />
                )}
                {item.title[lang]}
              </span>
            ))}
          </div>
        </section>

        {/* Apple Privacy Centerpiece */}
        <section id="privacy" className="mt-28 scroll-mt-20 sm:mt-36">
          <div className="mb-12 flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#161617] shadow-[0_0_40px_rgba(48,209,88,0.18)]">
              <Lock className="h-6 w-6 text-[#30d158]" />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#30d158]">
              {lang === "id" ? "Privasi & Transparansi" : "Privacy & Transparency"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#f5f5f7] sm:text-5xl">
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
                  className="apple-card flex items-start gap-4 rounded-[24px] p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#30d158]/15 text-[#30d158]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#f5f5f7]">
                      {item.title[lang]}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#86868b] sm:text-sm">
                      {item.description[lang]}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Flagship Download & Donate */}
        <section
          id="download"
          className="mt-28 grid gap-5 scroll-mt-20 sm:mt-36 lg:grid-cols-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden rounded-[30px] border border-white/15 bg-gradient-to-br from-[#0e172a] via-[#101014] to-[#08080a] p-7 sm:p-10 lg:col-span-7"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#0071e3]/20 blur-3xl"
            />

            <div className="relative z-10 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                {lang === "id" ? "Gratis • Semua Fitur Terbuka" : "Free • All Features Unlocked"}
              </div>
              {downloadStats !== null && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#2997ff]/30 bg-[#0071e3]/15 px-3 py-1 text-xs font-medium text-[#2997ff]">
                  <Download className="h-3.5 w-3.5" />
                  <span>
                    {downloadStats.total.toLocaleString(lang === "id" ? "id-ID" : "en-US")}{" "}
                    {lang === "id" ? "Total Unduhan" : "Total Downloads"}
                  </span>
                </div>
              )}
            </div>

            <h2 className="relative z-10 mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Wizzly v{WIZZLY_META.version}
            </h2>
            <p className="relative z-10 mt-2 max-w-md text-sm leading-relaxed text-[#a1a1a6]">
              {lang === "id"
                ? `Hanya ${WIZZLY_META.installerSize} untuk Windows 10 & 11 (64-bit). Gratis dipakai selamanya, didukung oleh komunitas.`
                : `Just ${WIZZLY_META.installerSize} for Windows 10 & 11 (64-bit). Free to use, sustained by community support.`}
            </p>

            <div className="relative z-10 mt-7 flex flex-wrap items-center gap-3">
              <motion.a
                href={WIZZLY_META.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setPostDownloadOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,113,227,0.35)] transition hover:bg-[#0077ed]"
              >
                <ArrowDownToLine className="h-4 w-4" />
                {WIZZLY_META.installerFile}
              </motion.a>
              <a
                href={WIZZLY_META.releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3.5 text-xs font-medium text-[#f5f5f7] transition hover:bg-white/10"
              >
                <span>GitHub Releases</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <p className="relative z-10 mt-4 font-mono text-xs text-[#86868b]">
              {WIZZLY_META.installerSize} • x64 • Windows 10 & 11
              {downloadStats !== null && (
                <span className="text-[#2997ff]">
                  {" "}
                  • v{WIZZLY_META.version}:{" "}
                  {downloadStats.latest.toLocaleString(lang === "id" ? "id-ID" : "en-US")}×
                </span>
              )}
            </p>

            <div className="relative z-10 mt-4 flex items-center justify-between gap-2 rounded-2xl border border-white/[0.08] bg-black/50 px-3.5 py-2.5">
              <div className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">
                  SHA-256 Checksum
                </span>
                <p className="truncate font-mono text-[11px] text-[#a1a1a6]">
                  {WIZZLY_META.sha256}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopySha}
                aria-label="Copy SHA-256 checksum"
                className="shrink-0 rounded-xl bg-white/10 p-2 text-white transition hover:bg-white/20"
              >
                {copiedSha ? (
                  <Check className="h-3.5 w-3.5 text-[#30d158]" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </motion.div>

          <DonateCard
            lang={lang}
            selectedTier={selectedTier}
            onSelectTier={setSelectedTier}
            onOpenQris={() => setQrisModalOpen(true)}
          />
        </section>

        {/* Apple-Style 2-Column FAQ */}
        <section id="faq" className="mt-28 scroll-mt-20 sm:mt-36">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Sticky Editorial Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2997ff]">
                FAQ
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#f5f5f7] sm:text-4xl">
                {lang === "id" ? "Pertanyaan yang sering diajukan." : "Questions & Answers."}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#86868b]">
                {lang === "id"
                  ? "Jawaban singkat seputar lisensi gratis, performa Direct2D, privasi data lokal, dan keamanan installer."
                  : "Quick answers on free access, Direct2D performance, local-first privacy, and installer verification."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaqs((prev) =>
                      prev.length === FAQ_ITEMS.length ? [] : FAQ_ITEMS.map((_, i) => i)
                    )
                  }
                  className="rounded-full border border-white/12 bg-[#161617] px-4 py-1.5 text-xs font-medium text-[#f5f5f7] transition hover:border-white/25 hover:bg-[#1d1d1f]"
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
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#2997ff] transition hover:underline"
                >
                  {lang === "id" ? "Tanya di GitHub" : "Ask on GitHub"}
                  <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Right Accordion Card */}
            <div className="apple-card overflow-hidden rounded-[28px] px-6 py-2 sm:px-8 lg:col-span-8">
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
                      idx !== FAQ_ITEMS.length - 1 ? "border-b border-white/[0.08]" : ""
                    }
                  >
                    <button
                      type="button"
                      onClick={toggleFaq}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <div className="flex items-baseline gap-3.5">
                        <span className="font-mono text-xs font-medium text-[#86868b]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-semibold text-[#f5f5f7] transition group-hover:text-white sm:text-base">
                          {item.q[lang]}
                        </span>
                      </div>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                          isOpen
                            ? "border-white/20 bg-white text-black"
                            : "border-white/10 bg-white/[0.04] text-[#a1a1a6] group-hover:border-white/20 group-hover:text-white"
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
                          <p className="pb-6 pl-8 pr-6 text-xs leading-relaxed text-[#a1a1a6] sm:text-sm">
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

      {/* Apple-Style Minimal Footer */}
      <footer className="border-t border-white/[0.08] bg-[#0a0a0c] py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#86868b]">
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
                className="inline-flex items-center gap-1 text-amber-300 transition hover:text-amber-200"
              >
                <Coffee className="h-3.5 w-3.5" />
                {lang === "id" ? "Traktir Kopi" : "Buy Me a Coffee"}
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
              <a href="#download" className="text-[#2997ff] transition hover:underline">
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
