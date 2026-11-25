"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Coffee,
  Copy,
  ExternalLink,
  Heart,
  QrCode,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { COFFEE_TIERS, WIZZLY_META, type CoffeeTier, type Lang } from "@/data/wizzlyData";

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
    <div className="grid grid-cols-3 gap-2">
      {COFFEE_TIERS.map((tier) => {
        const active = tier.id === selectedTier.id;
        return (
          <button
            key={tier.id}
            type="button"
            onClick={() => onSelectTier(tier)}
            className={`relative rounded-2xl border transition ${
              compact ? "px-2 py-2 text-center" : "px-2.5 py-2.5 text-left"
            } ${
              active
                ? "border-amber-400/50 bg-amber-500/15 shadow-[0_0_20px_rgba(245,158,11,0.14)]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
            }`}
          >
            {!compact && tier.recommended && (
              <span className="absolute -top-2 right-2 rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black">
                {lang === "id" ? "Populer" : "Popular"}
              </span>
            )}
            <span className="block text-xs font-semibold text-white">
              {tier.label[lang]}
            </span>
            <span className="mt-0.5 block font-mono text-[11px] text-amber-300">
              {lang === "id" ? tier.idrText : tier.usdText}
            </span>
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
}

export function DonateCard({
  lang,
  selectedTier,
  onSelectTier,
  onOpenQris,
}: SupportProps) {
  const { copied: copiedBinance, copy: handleCopyBinance } = useCopyBinance();

  const { raisedUsd, targetUsd } = WIZZLY_META.donation.codeSigningGoal;
  const progressPct = Math.min(100, Math.max(4, Math.round((raisedUsd / targetUsd) * 100)));

  return (
    <motion.div
      id="donate"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="apple-card relative flex flex-col justify-between overflow-hidden rounded-[30px] p-7 sm:p-8 lg:col-span-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none -right-16 -top-16 absolute h-44 w-44 rounded-full bg-amber-500/10 blur-3xl"
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
            <Coffee className="h-3.5 w-3.5" />
            {lang === "id" ? "Traktir Kopi Dev" : "Buy Me a Coffee"}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-[#86868b]">
            <Heart className="h-3 w-3 text-rose-400" />
            {lang === "id" ? "Tanpa Paywall" : "No Paywall"}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">
          {lang === "id"
            ? "Suka Wizzly? Traktir kopi yuk."
            : "Enjoying Wizzly? Fuel the next update."}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-[#a1a1a6]">
          {lang === "id"
            ? "Setiap kopi membantu biaya sertifikat Code Signing agar peringatan Windows SmartScreen hilang dan Wizzly tetap gratis."
            : "Every coffee funds an official Code Signing certificate to remove Windows SmartScreen warnings and keep Wizzly free."}
        </p>

        {/* Code Signing Goal Progress */}
        <div className="mt-4 rounded-2xl border border-white/[0.08] bg-black/40 p-3.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#f5f5f7]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#30d158]" />
              {lang === "id" ? "Target Code Signing Cert" : "Code Signing Cert Goal"}
            </span>
            <span className="font-mono text-[#a1a1a6]">
              ${raisedUsd} / ${targetUsd}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-[#30d158] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="mt-1.5 text-[10px] text-[#86868b]">
            {lang === "id"
              ? "100% donasi dialokasikan ke sertifikat keamanan & pengembangan."
              : "100% goes toward code-signing & ongoing Windows maintenance."}
          </p>
        </div>

        {/* Interactive Coffee Tier Picker */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-[11px] text-[#86868b]">
            <span>{lang === "id" ? "Pilih takaran dukungan" : "Pick a coffee size"}</span>
            <span className="text-amber-300/90">{selectedTier.tagline[lang]}</span>
          </div>
          <CoffeeTierPicker
            lang={lang}
            selectedTier={selectedTier}
            onSelectTier={onSelectTier}
          />
        </div>
      </div>

      {/* Payment Channels */}
      <div className="relative z-10 mt-5 space-y-2">
        <button
          type="button"
          onClick={onOpenQris}
          className="flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-3 text-left text-black shadow-[0_10px_28px_rgba(245,158,11,0.25)] transition hover:brightness-105 active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <QrCode className="h-5 w-5 shrink-0" />
            <div>
              <span className="block text-sm font-bold leading-tight">
                {lang === "id"
                  ? `Traktir ${selectedTier.label.id} via QRIS`
                  : `QRIS Indonesia (${selectedTier.idrText})`}
              </span>
              <span className="block text-[11px] font-medium text-black/75">
                GoPay • OVO • DANA • ShopeePay • Bank
              </span>
            </div>
          </div>
          <span className="rounded-full bg-black/15 px-2.5 py-0.5 font-mono text-xs font-bold">
            {selectedTier.idrText}
          </span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={WIZZLY_META.donation.paypalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            <div>
              <span className="block text-xs font-semibold text-white">PayPal</span>
              <span className="block font-mono text-[10px] text-[#86868b]">
                {selectedTier.usdText} USD
              </span>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-[#a1a1a6]" />
          </a>

          <button
            type="button"
            onClick={handleCopyBinance}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-left transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-white">Binance Pay</span>
              <span className="block truncate font-mono text-[10px] text-amber-300">
                {copiedBinance
                  ? lang === "id"
                    ? "UID Disalin!"
                    : "UID Copied!"
                  : WIZZLY_META.donation.binancePayId}
              </span>
            </div>
            {copiedBinance ? (
              <Check className="h-3.5 w-3.5 shrink-0 text-[#30d158]" />
            ) : (
              <Copy className="h-3.5 w-3.5 shrink-0 text-[#a1a1a6]" />
            )}
          </button>
        </div>

        <a
          href={WIZZLY_META.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 transition hover:border-amber-400/30 hover:bg-amber-500/10"
        >
          <div className="flex items-center gap-2.5">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-[#f5f5f7]">
              {lang === "id"
                ? "Belum bisa donasi? Kasih Star di GitHub!"
                : "Can't donate? Star on GitHub (free!)"}
            </span>
          </div>
          <ExternalLink className="h-3.5 w-3.5 text-amber-300" />
        </a>
      </div>
    </motion.div>
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
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="apple-card relative w-full max-w-md overflow-hidden rounded-[28px] p-6 shadow-2xl sm:p-7"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label={lang === "id" ? "Tutup" : "Close"}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-[#a1a1a6] transition hover:bg-white/15 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 pr-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#30d158]/15 text-[#30d158]">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#30d158]">
                  {lang === "id" ? "Unduhan dimulai" : "Download started"}
                </p>
                <h4 className="text-base font-semibold text-white">
                  {lang === "id"
                    ? `Terima kasih sudah mencoba Wizzly v${WIZZLY_META.version}!`
                    : `Thanks for downloading Wizzly v${WIZZLY_META.version}!`}
                </h4>
              </div>
            </div>

            {/* SmartScreen Tip */}
            <div className="mt-4 rounded-2xl border border-[#2997ff]/20 bg-[#0071e3]/10 px-3.5 py-2.5 text-xs leading-relaxed text-[#a1d2ff]">
              <span className="font-semibold text-white">Tip Windows SmartScreen: </span>
              {lang === "id"
                ? 'Jika muncul "Windows protected your PC", klik More info → Run anyway. Sertifikat Code Signing masih dalam pengumpulan dana.'
                : 'If "Windows protected your PC" appears, click More info → Run anyway while we fund our Code Signing cert.'}
            </div>

            {showQris ? (
              <div className="mt-5 text-center">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
                  <Coffee className="h-3.5 w-3.5" />
                  {lang === "id"
                    ? `Nominal saran: ${selectedTier.idrText} (${selectedTier.label.id})`
                    : `Suggested: ${selectedTier.idrText} (${selectedTier.label.en})`}
                </div>
                <div className="mt-3 overflow-hidden rounded-2xl bg-white p-3">
                  <img
                    src={WIZZLY_META.donation.qrisImage}
                    alt="QRIS Donasi Wizzly"
                    className="mx-auto h-auto w-full max-w-[230px] rounded-xl object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowQris(false)}
                  className="mt-4 text-xs font-medium text-[#2997ff] hover:underline"
                >
                  {lang === "id" ? "← Kembali ke pilihan kopi" : "← Back to coffee options"}
                </button>
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
                <p className="mt-1 text-xs text-[#86868b]">
                  {lang === "id"
                    ? "Bantu Wizzly tetap gratis & kumpulkan dana sertifikat Code Signing."
                    : "Help keep Wizzly free and fund the Code Signing certificate."}
                </p>

                <div className="mt-3">
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
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-2.5 text-xs font-bold text-black transition hover:brightness-105"
                  >
                    <QrCode className="h-4 w-4" />
                    QRIS ({selectedTier.idrText})
                  </button>
                  <a
                    href={WIZZLY_META.donation.paypalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-white/10"
                  >
                    <span>PayPal ({selectedTier.usdText})</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleCopyBinance}
                  className="mt-2 flex w-full items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs transition hover:bg-white/[0.07]"
                >
                  <span className="text-[#a1a1a6]">
                    Binance Pay UID:{" "}
                    <span className="font-mono font-semibold text-amber-300">
                      {WIZZLY_META.donation.binancePayId}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-white">
                    {copiedBinance ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#30d158]" />
                        {lang === "id" ? "Disalin" : "Copied"}
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#a1a1a6]" />
                        {lang === "id" ? "Salin" : "Copy"}
                      </>
                    )}
                  </span>
                </button>

                <div className="mt-3 flex items-center justify-between pt-1">
                  <a
                    href={WIZZLY_META.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-300 transition hover:underline"
                  >
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {lang === "id" ? "Kasih Star di GitHub" : "Star on GitHub"}
                  </a>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-xs text-[#86868b] transition hover:text-white"
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
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="apple-card w-full max-w-sm rounded-[28px] p-6 text-center shadow-2xl"
          >
            <h4 className="text-lg font-semibold text-white">
              {lang === "id" ? "Scan QRIS Wizzly" : "Scan Wizzly QRIS"}
            </h4>
            <p className="mt-1 text-xs text-amber-300">
              {lang === "id"
                ? `Pilihan: ${selectedTier.label.id} (${selectedTier.idrText}) — bebas isi nominal`
                : `Selected: ${selectedTier.label.en} (${selectedTier.idrText}) — any amount welcome`}
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl bg-white p-3">
              <img
                src={WIZZLY_META.donation.qrisImage}
                alt="QRIS Donasi Wizzly"
                className="mx-auto h-auto w-full max-w-[260px] rounded-xl object-contain"
              />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-full bg-[#0071e3] py-2.5 text-sm font-medium text-white transition hover:bg-[#0077ed]"
            >
              {lang === "id" ? "Tutup" : "Close"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
