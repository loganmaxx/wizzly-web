"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Coffee,
  Copy,
  ExternalLink,
  Heart,
  Maximize2,
  MessageSquareHeart,
  QrCode,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import {
  COFFEE_TIERS,
  WIZZLY_META,
  type CoffeeTier,
  type Lang,
  type SupporterWallItem,
} from "@/data/wizzlyData";
import { DirectContactStrip, DonorConnectPanel } from "@/components/DonorConnectPanel";
import { formatUsdAmount, type WizzlyMilestoneData } from "@/lib/supabase";

function useCopyBinance() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(WIZZLY_META.donation.binancePayId).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return { copied, copy };
}

interface CoffeeTierPickerProps {
  lang: Lang;
  selectedTier: CoffeeTier;
  onSelectTier: (tier: CoffeeTier) => void;
  compact?: boolean;
}

function CoffeeTierPicker({
  lang,
  selectedTier,
  onSelectTier,
  compact = false,
}: CoffeeTierPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {COFFEE_TIERS.map((tier) => {
        const active = tier.id === selectedTier.id;
        return (
          <button
            key={tier.id}
            type="button"
            onClick={() => onSelectTier(tier)}
            className={`relative rounded-xl border transition-all duration-200 ${
              compact ? "px-2.5 py-2.5 text-center" : "px-3.5 py-3 text-left"
            } ${
              active
                ? "border-amber-400/75 bg-amber-400/[0.14] shadow-[0_0_24px_-6px_rgba(245,158,11,0.45)]"
                : "border-white/[0.09] bg-black/35 hover:border-amber-400/35 hover:bg-amber-400/[0.05]"
            }`}
          >
            {!compact && tier.recommended && (
              <span className="absolute -top-2.5 right-2.5 rounded-full bg-amber-400 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-950">
                {lang === "id" ? "Populer" : "Popular"}
              </span>
            )}
            <span className="block text-xs font-semibold text-white">
              {tier.label[lang]}
            </span>
            <span className="mt-0.5 block font-mono text-xs font-semibold tabular-nums text-amber-300">
              {lang === "id" ? tier.idrText : tier.usdText}
            </span>
            {!compact && (
              <span className="mt-1 block truncate text-[10px] text-zinc-400">
                {tier.tagline[lang]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

interface SupportProps {
  lang: Lang;
  selectedTier: CoffeeTier;
  onSelectTier: (tier: CoffeeTier) => void;
  onOpenQris: () => void;
  milestone?: WizzlyMilestoneData;
  supporters?: SupporterWallItem[];
}

export function DonateShowcase({
  lang,
  selectedTier,
  onSelectTier,
  onOpenQris,
  milestone,
  supporters,
}: SupportProps) {
  const { copied: copiedBinance, copy: handleCopyBinance } = useCopyBinance();

  const raisedUsd = milestone?.raisedUsd ?? WIZZLY_META.donation.codeSigningGoal.raisedUsd;
  const targetUsd = milestone?.targetUsd ?? WIZZLY_META.donation.codeSigningGoal.targetUsd;
  const progressPct = Math.min(100, Math.max(4, Math.round((raisedUsd / targetUsd) * 100)));

  return (
    <section id="donate" className="mt-28 scroll-mt-24 sm:mt-36">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="donate-spotlight relative overflow-hidden rounded-[28px] p-6 sm:p-10 lg:p-12"
      >
        {/* Subtle Warm Top Accent Line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
        />

        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left Column: Mission, Transparency & Tier Picker */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-amber-400/12 px-3 py-1 text-[11px] font-semibold tracking-wide text-amber-300">
                <span className="animate-gold-pulse h-1.5 w-1.5 rounded-full bg-amber-400" />
                {lang === "id" ? "Dukungan Komunitas" : "Support Independent Dev"}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
                <Heart className="h-3 w-3 text-amber-400" />
                {lang === "id" ? "100% Gratis • Tanpa Paywall" : "100% Free • Zero Paywalls"}
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]">
              {lang === "id" ? (
                <>
                  Suka pakai Wizzly?{" "}
                  <span className="text-amber-300">Traktir kopi</span> biar tetap gratis.
                </>
              ) : (
                <>
                  Enjoying Wizzly?{" "}
                  <span className="text-amber-300">Fuel the next release.</span>
                </>
              )}
            </h2>

            <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              {lang === "id"
                ? "Wizzly dibangun secara independen tanpa iklan, tanpa langganan, dan tanpa telemetri. Setiap traktiran langsung dialokasikan untuk sertifikat Code Signing resmi agar peringatan Windows SmartScreen hilang permanen."
                : "Wizzly is built independently with zero ads, zero subscriptions, and zero telemetry. Every coffee goes directly toward an official Code Signing certificate to eliminate Windows SmartScreen warnings."}
            </p>

            {/* Transparent Code Signing Milestone */}
            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-black/45 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-semibold text-white sm:text-sm">
                    {lang === "id"
                      ? "Target Sertifikat Code Signing Windows"
                      : "Windows Code Signing Certificate Goal"}
                  </span>
                </div>
                <span className="font-mono text-xs font-semibold tabular-nums text-amber-300">
                  ${formatUsdAmount(raisedUsd)}{" "}
                  <span className="text-zinc-500">/ ${formatUsdAmount(targetUsd)} USD</span>
                </span>
              </div>

              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {milestone?.note?.[lang] && (
                <p className="mt-2.5 text-[11px] leading-relaxed text-amber-200/90">
                  {milestone.note[lang]}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-amber-400" />
                  {lang === "id" ? "Hapus peringatan SmartScreen" : "Remove SmartScreen warning"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-amber-400" />
                  {lang === "id" ? "Tetap gratis tanpa Pro lock" : "Keep every feature unlocked"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-amber-400" />
                  {lang === "id" ? "Update rutin Windows 10 & 11" : "Ongoing Windows 10 & 11 updates"}
                </span>
              </div>
            </div>

            {/* Interactive Coffee Tier Picker */}
            <div className="mt-6">
              <div className="mb-2.5 flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-300">
                  {lang === "id" ? "Pilih takaran dukungan" : "Choose a coffee size"}
                </span>
                <span className="font-mono text-[11px] text-amber-300/90">
                  {lang === "id" ? "Bebas isi nominal apa saja" : "Any amount is appreciated"}
                </span>
              </div>
              <CoffeeTierPicker
                lang={lang}
                selectedTier={selectedTier}
                onSelectTier={onSelectTier}
              />
            </div>
          </div>

          {/* Right Column: Instant Frictionless Donation Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-amber-400/25 bg-[#090807]/85 p-5 shadow-2xl backdrop-blur-md sm:p-6">
              {/* Inline Scannable QRIS Card */}
              <div className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5">
                <button
                  type="button"
                  onClick={onOpenQris}
                  aria-label={lang === "id" ? "Perbesar QRIS" : "Enlarge QRIS"}
                  className="group relative h-22 w-22 shrink-0 overflow-hidden rounded-xl bg-white p-1.5 transition hover:scale-[1.03]"
                >
                  <img
                    src={WIZZLY_META.donation.qrisImage}
                    alt="QRIS Donasi Wizzly"
                    className="h-full w-full rounded-md object-contain"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/45 group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4 text-white" />
                  </span>
                </button>
                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                    <QrCode className="h-3 w-3" /> QRIS Indonesia
                  </span>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {lang === "id" ? "Scan langsung dari HP" : "Scan directly from mobile"}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-zinc-400">
                    GoPay • OVO • DANA • ShopeePay • BCA / Mandiri / BRI
                  </p>
                </div>
              </div>

              {/* Primary Warm Gold CTA */}
              <button
                type="button"
                onClick={onOpenQris}
                className="donate-cta-btn mt-4 flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition active:scale-[0.99]"
              >
                <div className="flex items-center gap-2.5">
                  <Coffee className="h-4.5 w-4.5 shrink-0" />
                  <div>
                    <span className="block text-sm font-bold leading-tight">
                      {lang === "id"
                        ? `Traktir ${selectedTier.label.id} via QRIS`
                        : `Donate ${selectedTier.label.en} via QRIS`}
                    </span>
                    <span className="block text-[11px] font-medium text-zinc-900/75">
                      {lang === "id" ? "Klik untuk perbesar kode QR" : "Click to enlarge QR code"}
                    </span>
                  </div>
                </div>
                <span className="rounded-lg bg-black/15 px-2.5 py-1 font-mono text-xs font-bold tabular-nums">
                  {selectedTier.idrText}
                </span>
              </button>

              {/* Secondary Global Channels */}
              <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                <a
                  href={WIZZLY_META.donation.paypalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 transition hover:border-amber-400/40 hover:bg-white/[0.08]"
                >
                  <div>
                    <span className="block text-xs font-semibold text-white">PayPal</span>
                    <span className="mt-0.5 block font-mono text-[11px] text-zinc-400">
                      {selectedTier.usdText} USD
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-300" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyBinance}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-left transition hover:border-amber-400/40 hover:bg-white/[0.08]"
                >
                  <div className="min-w-0">
                    <span className="block text-xs font-semibold text-white">Binance Pay</span>
                    <span className="mt-0.5 block truncate font-mono text-[11px] text-amber-300">
                      {copiedBinance
                        ? lang === "id"
                          ? "UID Disalin!"
                          : "UID Copied!"
                        : WIZZLY_META.donation.binancePayId}
                    </span>
                  </div>
                  {copiedBinance ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 shrink-0 text-zinc-400 transition group-hover:text-amber-300" />
                  )}
                </button>
              </div>

              {/* Zero-Cost Community Support */}
              <a
                href={WIZZLY_META.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5 text-xs text-zinc-300 transition hover:border-amber-400/30 hover:bg-amber-400/[0.06] hover:text-white"
              >
                <span className="inline-flex items-center gap-2">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {lang === "id"
                    ? "Belum bisa donasi? Kasih Star di GitHub"
                    : "Can't donate? Star on GitHub (free)"}
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
              </a>

              {/* Jump to Donor Communication Form & Chat Channels */}
              <a
                href="#donor-connect"
                className="mt-2.5 flex w-full items-center justify-between rounded-xl border border-amber-400/30 bg-amber-400/[0.08] px-3.5 py-2.5 text-xs font-medium text-amber-200 transition hover:border-amber-400/55 hover:bg-amber-400/[0.14]"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageSquareHeart className="h-3.5 w-3.5 text-amber-400" />
                  {lang === "id"
                    ? "Kirim bukti, ucapan & request fitur"
                    : "Send proof, note or feature request"}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-amber-300" />
              </a>
            </div>
          </div>
        </div>

        <DonorConnectPanel lang={lang} selectedTier={selectedTier} supporters={supporters} />
      </motion.div>
    </section>
  );
}

interface PostDownloadModalProps {
  open: boolean;
  onClose: () => void;
  lang: Lang;
  selectedTier: CoffeeTier;
  onSelectTier: (tier: CoffeeTier) => void;
}

export function PostDownloadModal({
  open,
  onClose,
  lang,
  selectedTier,
  onSelectTier,
}: PostDownloadModalProps) {
  const [showQris, setShowQris] = useState(false);
  const { copied: copiedBinance, copy: handleCopyBinance } = useCopyBinance();

  const handleClose = () => {
    setShowQris(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="donate-spotlight relative w-full max-w-md overflow-hidden rounded-[24px] p-6 shadow-2xl sm:p-7"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label={lang === "id" ? "Tutup" : "Close"}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-zinc-400 transition hover:bg-white/15 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 pr-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-emerald-400">
                  {lang === "id" ? "Unduhan dimulai" : "Download started"}
                </p>
                <h4 className="text-base font-semibold text-white">
                  {lang === "id"
                    ? `Terima kasih mencoba Wizzly v${WIZZLY_META.version}`
                    : `Thanks for trying Wizzly v${WIZZLY_META.version}`}
                </h4>
              </div>
            </div>

            {/* SmartScreen Tip */}
            <div className="mt-4 rounded-xl border border-white/10 bg-black/45 px-3.5 py-2.5 text-xs leading-relaxed text-zinc-300">
              <span className="font-semibold text-white">Windows SmartScreen: </span>
              {lang === "id"
                ? 'Jika muncul "Windows protected your PC", klik More info → Run anyway. Installer web (.exe) ini adalah versi paling stabil dengan auto-start Dock yang andal.'
                : 'If "Windows protected your PC" appears, click More info → Run anyway. This direct web (.exe) installer is the most stable build with reliable Dock auto-start.'}
            </div>

            {showQris ? (
              <div className="mt-5 text-center">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
                  <Coffee className="h-3.5 w-3.5" />
                  {lang === "id"
                    ? `Saran: ${selectedTier.idrText} (${selectedTier.label.id})`
                    : `Suggested: ${selectedTier.idrText} (${selectedTier.label.en})`}
                </div>
                <div className="mt-3 overflow-hidden rounded-2xl bg-white p-3">
                  <img
                    src={WIZZLY_META.donation.qrisImage}
                    alt="QRIS Donasi Wizzly"
                    className="mx-auto h-auto w-full max-w-[230px] rounded-xl object-contain"
                  />
                </div>
                <div className="mt-3 text-left">
                  <DirectContactStrip lang={lang} compact />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setShowQris(false)}
                    className="text-xs font-medium text-zinc-400 hover:text-white"
                  >
                    {lang === "id" ? "← Kembali" : "← Back"}
                  </button>
                  <a
                    href="#donor-connect"
                    onClick={handleClose}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/35 bg-amber-400/12 px-3 py-1.5 text-xs font-semibold text-amber-200 transition hover:bg-amber-400/20"
                  >
                    <MessageSquareHeart className="h-3.5 w-3.5 text-amber-400" />
                    {lang === "id" ? "Kirim bukti & request →" : "Send proof & note →"}
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span>
                    {lang === "id"
                      ? "Sambil menunggu, traktir kopi dev?"
                      : "While it downloads, buy the dev a coffee?"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-400">
                  {lang === "id"
                    ? "Bantu Wizzly tetap gratis & kumpulkan dana sertifikat Code Signing."
                    : "Help keep Wizzly free and fund the Code Signing certificate."}
                </p>

                <div className="mt-3.5">
                  <CoffeeTierPicker
                    lang={lang}
                    selectedTier={selectedTier}
                    onSelectTier={onSelectTier}
                    compact
                  />
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setShowQris(true)}
                    className="donate-cta-btn inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition"
                  >
                    <QrCode className="h-4 w-4" />
                    QRIS ({selectedTier.idrText})
                  </button>
                  <a
                    href={WIZZLY_META.donation.paypalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/14 bg-white/[0.06] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-white/12"
                  >
                    <span>PayPal ({selectedTier.usdText})</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleCopyBinance}
                  className="mt-2 flex w-full items-center justify-between rounded-xl border border-white/10 bg-black/35 px-3.5 py-2 text-xs transition hover:border-amber-400/35"
                >
                  <span className="text-zinc-400">
                    Binance Pay:{" "}
                    <span className="font-mono font-semibold text-amber-300">
                      {WIZZLY_META.donation.binancePayId}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-white">
                    {copiedBinance ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        {lang === "id" ? "Disalin" : "Copied"}
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-zinc-400" />
                        {lang === "id" ? "Salin" : "Copy"}
                      </>
                    )}
                  </span>
                </button>

                <div className="mt-3">
                  <a
                    href="#donor-connect"
                    onClick={handleClose}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-amber-400/30 bg-amber-400/[0.08] px-3.5 py-2 text-xs font-medium text-amber-200 transition hover:border-amber-400/55 hover:bg-amber-400/[0.14]"
                  >
                    <MessageSquareHeart className="h-3.5 w-3.5 text-amber-400" />
                    {lang === "id"
                      ? "Kirim bukti transfer, ucapan / request fitur"
                      : "Send proof, note or feature request"}
                  </a>
                </div>

                <div className="mt-4 flex items-center justify-between pt-1">
                  <a
                    href={WIZZLY_META.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-300 transition hover:underline"
                  >
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {lang === "id" ? "Star di GitHub" : "Star on GitHub"}
                  </a>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-xs text-zinc-500 transition hover:text-white"
                  >
                    {lang === "id" ? "Nanti saja →" : "Maybe later →"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface QrisModalProps {
  open: boolean;
  onClose: () => void;
  lang: Lang;
  selectedTier: CoffeeTier;
}

export function QrisModal({ open, onClose, lang, selectedTier }: QrisModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="donate-spotlight relative w-full max-w-sm rounded-[24px] p-6 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={lang === "id" ? "Tutup" : "Close"}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-zinc-400 transition hover:bg-white/15 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-300">
              <QrCode className="h-3 w-3" /> QRIS Indonesia
            </span>
            <h4 className="mt-3 text-lg font-semibold text-white">
              {lang === "id" ? "Scan untuk Traktir Wizzly" : "Scan to Support Wizzly"}
            </h4>
            <p className="mt-1 text-xs text-zinc-400">
              {lang === "id"
                ? `Pilihan: ${selectedTier.label.id} (${selectedTier.idrText}) — bebas isi nominal`
                : `Suggested: ${selectedTier.label.en} (${selectedTier.idrText}) — any amount welcome`}
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl bg-white p-3.5 shadow-inner">
              <img
                src={WIZZLY_META.donation.qrisImage}
                alt="QRIS Donasi Wizzly"
                className="mx-auto h-auto w-full max-w-[260px] rounded-xl object-contain"
              />
            </div>
            <p className="mt-3 text-[11px] text-zinc-400">
              GoPay • OVO • DANA • ShopeePay • Mobile Banking
            </p>
            <div className="mt-3 text-left">
              <DirectContactStrip lang={lang} compact />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href="#donor-connect"
                onClick={onClose}
                className="donate-cta-btn inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold transition"
              >
                <MessageSquareHeart className="h-3.5 w-3.5" />
                {lang === "id" ? "Kirim Bukti" : "Send Proof"}
              </a>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-white py-2.5 text-xs font-semibold text-zinc-950 transition hover:bg-zinc-200"
              >
                {lang === "id" ? "Selesai" : "Done"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
