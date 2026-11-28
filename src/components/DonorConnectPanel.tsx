"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  ImagePlus,
  Loader2,
  Mail,
  MessageSquareHeart,
  Send,
  Sparkles,
  Trash2,
  Wrench,
} from "lucide-react";
import {
  SUPPORTER_WALL_ITEMS,
  WIZZLY_META,
  type CoffeeTier,
  type DonationChannel,
  type Lang,
  type SupporterFeatureStatus,
  type SupporterWallItem,
} from "@/data/wizzlyData";

const LOCAL_SUBMISSIONS_KEY = "wizzly_donor_submissions_v1";
const MAX_PROOF_BYTES = 4 * 1024 * 1024; // 4 MB limit for FormSubmit multipart AJAX

interface LocalPendingSubmission extends SupporterWallItem {
  pendingLocal: true;
}

const CHANNEL_LABELS: Record<DonationChannel, Record<Lang, string>> = {
  qris: { id: "QRIS", en: "QRIS" },
  paypal: { id: "PayPal", en: "PayPal" },
  binance: { id: "Binance Pay", en: "Binance Pay" },
  feedback: { id: "Ucapan / Request", en: "Note / Request" },
};

const FEATURE_AREAS = ["Notch", "Dock", "Widgets", "Spotlight", "Other"] as const;

const STATUS_BADGE_MAP: Record<
  SupporterFeatureStatus,
  { label: Record<Lang, string>; className: string }
> = {
  reviewing: {
    label: { id: "Ditinjau", en: "Reviewing" },
    className: "border-zinc-500/30 bg-zinc-500/15 text-zinc-300",
  },
  planned: {
    label: { id: "Direncanakan", en: "Planned" },
    className: "border-sky-400/30 bg-sky-400/12 text-sky-300",
  },
  "in-progress": {
    label: { id: "Dikerjakan", en: "In Progress" },
    className: "border-amber-400/35 bg-amber-400/15 text-amber-300",
  },
  shipped: {
    label: { id: "Rilis", en: "Shipped" },
    className: "border-emerald-400/35 bg-emerald-400/15 text-emerald-300",
  },
};

function TelegramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function DiscordIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

interface BuildMessageParams {
  lang: Lang;
  name: string;
  channel: DonationChannel;
  amount: string;
  message: string;
  featureArea: string;
  featureRequest: string;
  replyContact: string;
  hasProofFile: boolean;
}

function buildDonorMessageText({
  lang,
  name,
  channel,
  amount,
  message,
  featureArea,
  featureRequest,
  replyContact,
  hasProofFile,
}: BuildMessageParams): string {
  const displayName = name.trim() || (lang === "id" ? "Anonim" : "Anonymous");
  const channelLabel = CHANNEL_LABELS[channel][lang];
  const lines = [
    lang === "id" ? "Halo Adrian (Wizzly)," : "Hi Adrian (Wizzly),",
    `${lang === "id" ? "Nama" : "Name"}: ${displayName}`,
    `${lang === "id" ? "Metode" : "Channel"}: ${channelLabel}${amount.trim() ? ` (${amount.trim()})` : ""}`,
  ];
  if (message.trim()) {
    lines.push(`${lang === "id" ? "Ucapan" : "Message"}: ${message.trim()}`);
  }
  if (featureRequest.trim()) {
    lines.push(
      `${lang === "id" ? "Request Fitur" : "Feature Request"} [${featureArea}]: ${featureRequest.trim()}`
    );
  }
  if (replyContact.trim()) {
    lines.push(`${lang === "id" ? "Kontak Balasan" : "Reply Contact"}: ${replyContact.trim()}`);
  }
  if (hasProofFile) {
    lines.push(
      lang === "id"
        ? "(Saya punya screenshot bukti transfer untuk dilampirkan di chat ini)"
        : "(I have a transfer screenshot ready to attach in this chat)"
    );
  }
  return lines.join("\n");
}

function useCopyStatus() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = (key: string, value: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2200);
  };

  return { copiedKey, copy };
}

export function DirectContactStrip({
  lang,
  compact = false,
  prefillText,
}: {
  lang: Lang;
  compact?: boolean;
  prefillText?: string;
}) {
  const { copiedKey, copy } = useCopyStatus();
  const { telegramHandle, telegramUrl, email, discordUsername } = WIZZLY_META.donation.contact;

  const defaultText =
    prefillText ??
    (lang === "id"
      ? "Halo Adrian, saya mau kirim bukti donasi / ucapan / request fitur untuk Wizzly:"
      : "Hi Adrian, I'd like to share a donation proof / note / feature request for Wizzly:");

  const telegramHref = `${telegramUrl}?text=${encodeURIComponent(defaultText)}`;
  const emailHref = `mailto:${email}?subject=${encodeURIComponent(
    lang === "id" ? "Donasi & Masukan Wizzly" : "Wizzly Donation & Feedback"
  )}&body=${encodeURIComponent(defaultText)}`;

  return (
    <div className={compact ? "grid grid-cols-3 gap-2" : "grid gap-2.5 sm:grid-cols-3"}>
      <a
        href={telegramHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-2 rounded-xl border border-sky-400/25 bg-sky-400/[0.08] px-3 py-2.5 text-left transition hover:border-sky-400/50 hover:bg-sky-400/[0.14]"
      >
        <div className="min-w-0">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
            <TelegramIcon className="h-3.5 w-3.5 shrink-0 text-sky-400" />
            Telegram
          </span>
          <span className="mt-0.5 block truncate font-mono text-[10px] text-sky-300">
            {telegramHandle}
          </span>
        </div>
        {!compact && (
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-sky-300/70 transition group-hover:text-sky-200" />
        )}
      </a>

      <button
        type="button"
        onClick={() =>
          copy(
            "discord",
            prefillText
              ? `Discord: ${discordUsername}\n\n${prefillText}`
              : discordUsername
          )
        }
        className="group flex items-center justify-between gap-2 rounded-xl border border-indigo-400/25 bg-indigo-400/[0.08] px-3 py-2.5 text-left transition hover:border-indigo-400/50 hover:bg-indigo-400/[0.14]"
      >
        <div className="min-w-0">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
            <DiscordIcon className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
            Discord
          </span>
          <span className="mt-0.5 block truncate font-mono text-[10px] text-indigo-300">
            {copiedKey === "discord"
              ? lang === "id"
                ? "Disalin!"
                : "Copied!"
              : discordUsername}
          </span>
        </div>
        {!compact &&
          (copiedKey === "discord" ? (
            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5 shrink-0 text-indigo-300/70 transition group-hover:text-indigo-200" />
          ))}
      </button>

      <a
        href={emailHref}
        className="group flex items-center justify-between gap-2 rounded-xl border border-amber-400/25 bg-amber-400/[0.07] px-3 py-2.5 text-left transition hover:border-amber-400/50 hover:bg-amber-400/[0.13]"
      >
        <div className="min-w-0">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
            <Mail className="h-3.5 w-3.5 shrink-0 text-amber-400" />
            Email
          </span>
          <span className="mt-0.5 block truncate font-mono text-[10px] text-amber-200">
            {email}
          </span>
        </div>
        {!compact && (
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-amber-300/70 transition group-hover:text-amber-200" />
        )}
      </a>
    </div>
  );
}

interface DonorConnectPanelProps {
  lang: Lang;
  selectedTier: CoffeeTier;
  supporters?: SupporterWallItem[];
}

export function DonorConnectPanel({
  lang,
  selectedTier,
  supporters,
}: DonorConnectPanelProps) {
  const [name, setName] = useState("");
  const [channel, setChannel] = useState<DonationChannel>("qris");
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [featureArea, setFeatureArea] = useState<string>("Notch");
  const [featureRequest, setFeatureRequest] = useState("");
  const [replyContact, setReplyContact] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreviewUrl, setProofPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showStandardFallback, setShowStandardFallback] = useState(false);
  const [localSubmissions, setLocalSubmissions] = useState<LocalPendingSubmission[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { copiedKey, copy } = useCopyStatus();

  const defaultAmountText =
    channel === "qris"
      ? selectedTier.idrText
      : channel === "feedback"
        ? ""
        : selectedTier.usdText;

  const effectiveAmount = customAmount.trim() || defaultAmountText;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_SUBMISSIONS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as LocalPendingSubmission[];
        if (Array.isArray(parsed)) {
          setLocalSubmissions(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    return () => {
      if (proofPreviewUrl) {
        URL.revokeObjectURL(proofPreviewUrl);
      }
    };
  }, [proofPreviewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg(
        lang === "id"
          ? "File bukti harus berupa gambar (PNG, JPG, atau WebP)."
          : "Proof file must be an image (PNG, JPG, or WebP)."
      );
      return;
    }

    if (file.size > MAX_PROOF_BYTES) {
      setErrorMsg(
        lang === "id"
          ? "Ukuran gambar maksimal 4 MB. Jika lebih besar, kirim langsung lewat Telegram @ntpsbl."
          : "Maximum image size is 4 MB. For larger screenshots, send via Telegram @ntpsbl."
      );
      return;
    }

    setErrorMsg(null);
    if (proofPreviewUrl) URL.revokeObjectURL(proofPreviewUrl);
    setProofFile(file);
    setProofPreviewUrl(URL.createObjectURL(file));
  };

  const clearProofFile = () => {
    if (proofPreviewUrl) URL.revokeObjectURL(proofPreviewUrl);
    setProofFile(null);
    setProofPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formattedMessage = buildDonorMessageText({
    lang,
    name,
    channel,
    amount: effectiveAmount,
    message,
    featureArea,
    featureRequest,
    replyContact,
    hasProofFile: Boolean(proofFile),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setShowStandardFallback(false);

    if (!message.trim() && !featureRequest.trim() && !proofFile) {
      setErrorMsg(
        lang === "id"
          ? "Tulis ucapan, request fitur, atau lampirkan bukti transfer terlebih dahulu."
          : "Please enter a note, feature request, or attach a donation proof first."
      );
      return;
    }

    setSubmitting(true);
    setSubmitState("idle");

    const subjectText = `[Wizzly Support] ${name.trim() || "Supporter"} • ${
      CHANNEL_LABELS[channel].en
    }${effectiveAmount ? ` (${effectiveAmount})` : ""}`;

    // Build FormData cleanly so an unselected <input type="file"> never sends an empty 0-byte file
    const formData = new FormData();
    formData.set("name", name.trim() || (lang === "id" ? "Anonim" : "Anonymous"));
    formData.set("channel", CHANNEL_LABELS[channel][lang]);
    formData.set("amount", effectiveAmount || "-");
    formData.set("message", message.trim() || "-");
    formData.set("feature_area", featureRequest.trim() ? featureArea : "-");
    formData.set("feature_request", featureRequest.trim() || "-");
    formData.set("reply_contact", replyContact.trim() || "-");
    formData.set("_subject", subjectText);
    formData.set("_template", "table");
    formData.set("_captcha", "false");
    formData.set("_honey", "");
    if (typeof window !== "undefined") {
      formData.set("_url", window.location.href);
    }

    if (proofFile) {
      formData.set("attachment", proofFile, proofFile.name);
    }

    try {
      const response = await fetch(WIZZLY_META.donation.contact.formSubmitEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const result = (await response.json().catch(() => null)) as
        | { success?: boolean | string; message?: string }
        | null;

      const ok =
        response.ok &&
        result !== null &&
        (result.success === true || result.success === "true");

      if (!ok) {
        throw new Error(result?.message || `HTTP ${response.status}`);
      }

      const newEntry: LocalPendingSubmission = {
        id: `local-${Date.now()}`,
        name: name.trim() || (lang === "id" ? "Anonim" : "Anonymous"),
        tierLabel:
          channel === "feedback"
            ? { id: "Feedback", en: "Feedback" }
            : selectedTier.label,
        amountText: effectiveAmount || undefined,
        channel,
        date: new Date().toISOString().slice(0, 10),
        message:
          message.trim() ||
          (lang === "id"
            ? "Mengirim bukti dukungan untuk Wizzly."
            : "Sent a donation proof for Wizzly."),
        featureRequest: featureRequest.trim() || undefined,
        featureArea: featureRequest.trim() ? featureArea : undefined,
        featureStatus: featureRequest.trim() ? "reviewing" : undefined,
        pendingLocal: true,
      };

      const nextLocal = [newEntry, ...localSubmissions].slice(0, 5);
      setLocalSubmissions(nextLocal);
      try {
        localStorage.setItem(LOCAL_SUBMISSIONS_KEY, JSON.stringify(nextLocal));
      } catch {
        // Ignore storage errors
      }

      setSubmitState("success");
      setMessage("");
      setFeatureRequest("");
      clearProofFile();
    } catch (err) {
      setSubmitState("error");
      setShowStandardFallback(true);
      const rawReason = err instanceof Error ? err.message : "";
      const lower = rawReason.toLowerCase();

      if (lower.includes("activat")) {
        setErrorMsg(
          lang === "id"
            ? `FormSubmit butuh aktivasi email pertama kali (${rawReason}). Klik tombol "Aktivasi / Kirim via FormSubmit" di bawah atau cek inbox support@wizzly.web.id.`
            : `FormSubmit requires one-time email activation (${rawReason}). Click "Activate / Send via FormSubmit" below or check support@wizzly.web.id.`
        );
      } else {
        const detail = rawReason ? ` (${rawReason})` : "";
        setErrorMsg(
          lang === "id"
            ? `Pengiriman AJAX gagal${detail}. Klik "Kirim via FormSubmit" di bawah untuk mengirim lewat halaman standar (sekaligus aktivasi), atau kirim via Telegram (@ntpsbl), Discord (funblue), atau Email.`
            : `AJAX delivery failed${detail}. Click "Send via FormSubmit" below to submit via standard POST (also triggers activation), or reach out via Telegram (@ntpsbl), Discord (funblue), or Email.`
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleStandardFormSubmit = () => {
    formRef.current?.submit();
  };

  const combinedWallItems: Array<SupporterWallItem & { pendingLocal?: boolean }> = [
    ...localSubmissions,
    ...(supporters ?? SUPPORTER_WALL_ITEMS),
  ];

  return (
    <div
      id="donor-connect"
      className="relative z-10 mt-8 scroll-mt-24 border-t border-amber-400/20 pt-8"
    >
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-300">
            <MessageSquareHeart className="h-3.5 w-3.5" />
            {lang === "id"
              ? "Komunikasi Donatur & Request Fitur"
              : "Donor Notes & Feature Requests"}
          </span>
          <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {lang === "id"
              ? "Kirim bukti, ucapan, atau ide fitur ke developer."
              : "Send proof, a note, or a feature request directly."}
          </h3>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-zinc-400">
          {lang === "id"
            ? "Pesan & bukti masuk langsung ke developer. Tinggalkan kontak kalau ingin dibalas atau diskusi langsung."
            : "Messages and proofs go straight to the developer. Leave a contact handle if you'd like a reply."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Interactive Proof + Note + Feature Request Form */}
        <form
          ref={formRef}
          action={WIZZLY_META.donation.contact.formSubmitStandardEndpoint}
          method="POST"
          target="_blank"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="rounded-2xl border border-white/[0.08] bg-[#090807]/85 p-5 sm:p-6 lg:col-span-7"
        >
          {/* Standard FormSubmit hidden fields (used by native POST fallback / activation) */}
          <input
            type="hidden"
            name="_subject"
            value={`[Wizzly Support] ${name.trim() || "Supporter"} • ${CHANNEL_LABELS[channel].en}${
              effectiveAmount ? ` (${effectiveAmount})` : ""
            }`}
          />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="channel" value={CHANNEL_LABELS[channel][lang]} />
          <input type="hidden" name="feature_area" value={featureRequest.trim() ? featureArea : "-"} />
          {/* Honeypot anti-spam field for FormSubmit */}
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />

          <div className="grid gap-3.5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="donor-name"
                className="mb-1.5 block text-[11px] font-medium text-zinc-300"
              >
                {lang === "id" ? "Nama / Panggilan" : "Name / Nickname"}
              </label>
              <input
                id="donor-name"
                name="name"
                type="text"
                maxLength={60}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === "id" ? "Anonim / Nama kamu" : "Anonymous / Your name"}
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:border-amber-400/60 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="donor-contact"
                className="mb-1.5 block text-[11px] font-medium text-zinc-300"
              >
                {lang === "id"
                  ? "Kontak Balasan (opsional)"
                  : "Reply Contact (optional)"}
              </label>
              <input
                id="donor-contact"
                name="reply_contact"
                type="text"
                maxLength={80}
                value={replyContact}
                onChange={(e) => setReplyContact(e.target.value)}
                placeholder={
                  lang === "id"
                    ? "@telegram / discord / email"
                    : "@telegram / discord / email"
                }
                className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:border-amber-400/60 focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Channel + Amount */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-zinc-300">
                {lang === "id" ? "Metode & Nominal" : "Method & Amount"}
              </span>
              <span className="font-mono text-[10px] text-zinc-500">
                {lang === "id" ? "Opsional jika hanya request" : "Optional for feedback only"}
              </span>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-12">
              <div className="flex flex-wrap gap-1.5 sm:col-span-8">
                {(["qris", "paypal", "binance", "feedback"] as DonationChannel[]).map((ch) => {
                  const active = channel === ch;
                  return (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setChannel(ch)}
                      className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition ${
                        active
                          ? "border-amber-400/65 bg-amber-400/15 text-amber-200"
                          : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {CHANNEL_LABELS[ch][lang]}
                    </button>
                  );
                })}
              </div>
              <div className="sm:col-span-4">
                <input
                  name="amount"
                  type="text"
                  maxLength={32}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder={defaultAmountText || (lang === "id" ? "Nominal" : "Amount")}
                  disabled={channel === "feedback"}
                  aria-label={lang === "id" ? "Nominal donasi" : "Donation amount"}
                  className="w-full rounded-lg border border-white/10 bg-black/50 px-3 py-1.5 font-mono text-xs text-amber-200 placeholder:text-zinc-500 focus:border-amber-400/60 focus:outline-none disabled:opacity-40"
                />
              </div>
            </div>
          </div>

          {/* Message / Wish */}
          <div className="mt-4">
            <label
              htmlFor="donor-message"
              className="mb-1.5 block text-[11px] font-medium text-zinc-300"
            >
              {lang === "id" ? "Ucapan / Pesan" : "Note / Message"}
            </label>
            <textarea
              id="donor-message"
              name="message"
              rows={2}
              maxLength={500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                lang === "id"
                  ? "Semangat ngodingnya! Semoga target Code Signing cepat tercapai..."
                  : "Keep up the great work! Hope the Code Signing goal gets funded soon..."
              }
              className="w-full resize-none rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs leading-relaxed text-white placeholder:text-zinc-500 focus:border-amber-400/60 focus:outline-none"
            />
          </div>

          {/* Feature Request + Area */}
          <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="donor-feature"
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-200"
              >
                <Wrench className="h-3.5 w-3.5 text-amber-400" />
                {lang === "id"
                  ? "Request Fitur / Saran (opsional)"
                  : "Feature Request / Idea (optional)"}
              </label>
              <div className="flex flex-wrap gap-1">
                {FEATURE_AREAS.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => setFeatureArea(area)}
                    className={`rounded-md px-2 py-0.5 font-mono text-[10px] transition ${
                      featureArea === area
                        ? "bg-amber-400/20 text-amber-300 ring-1 ring-amber-400/40"
                        : "bg-white/[0.04] text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
            <input
              id="donor-feature"
              name="feature_request"
              type="text"
              maxLength={240}
              value={featureRequest}
              onChange={(e) => setFeatureRequest(e.target.value)}
              placeholder={
                lang === "id"
                  ? "Misal: Tambah widget cuaca / integrasi YouTube Music di Notch..."
                  : "e.g. Add a Weather widget / YouTube Music integration in Notch..."
              }
              className="mt-2.5 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:border-amber-400/60 focus:outline-none"
            />
          </div>

          {/* Proof Image Upload */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-medium text-zinc-300">
                {lang === "id"
                  ? "Upload Bukti Transfer (opsional, maks 4 MB)"
                  : "Upload Transfer Proof (optional, max 4 MB)"}
              </span>
              {proofFile && (
                <button
                  type="button"
                  onClick={clearProofFile}
                  className="inline-flex items-center gap-1 text-[11px] text-rose-300 hover:underline"
                >
                  <Trash2 className="h-3 w-3" />
                  {lang === "id" ? "Hapus" : "Remove"}
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              name="attachment"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
              className="hidden"
              id="donor-proof-file"
            />

            {proofPreviewUrl && proofFile ? (
              <div className="flex items-center gap-3 rounded-xl border border-amber-400/30 bg-amber-400/[0.06] p-2.5">
                <img
                  src={proofPreviewUrl}
                  alt={lang === "id" ? "Pratinjau bukti transfer" : "Transfer proof preview"}
                  className="h-14 w-14 shrink-0 rounded-lg border border-white/10 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-white">{proofFile.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-zinc-400">
                    {(proofFile.size / 1024).toFixed(0)} KB •{" "}
                    {lang === "id"
                      ? "Siap dikirim ke email developer"
                      : "Ready to send to developer"}
                  </p>
                </div>
              </div>
            ) : (
              <label
                htmlFor="donor-proof-file"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-black/35 px-4 py-3 text-xs text-zinc-400 transition hover:border-amber-400/45 hover:bg-amber-400/[0.04] hover:text-zinc-200"
              >
                <ImagePlus className="h-4 w-4 text-amber-400" />
                <span>
                  {lang === "id"
                    ? "Pilih screenshot bukti QRIS / PayPal / Binance"
                    : "Choose QRIS / PayPal / Binance screenshot"}
                </span>
              </label>
            )}
          </div>

          {/* Feedback banners */}
          {errorMsg && (
            <div className="mt-4 space-y-2.5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3.5 py-3 text-xs text-rose-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                <span className="leading-relaxed">{errorMsg}</span>
              </div>
              {showStandardFallback && (
                <button
                  type="button"
                  onClick={handleStandardFormSubmit}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300/35 bg-rose-400/15 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-rose-400/25"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {lang === "id"
                    ? "Aktivasi / Kirim via Halaman FormSubmit"
                    : "Activate / Send via FormSubmit Page"}
                </button>
              )}
            </div>
          )}

          {submitState === "success" && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs text-emerald-200">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>
                {lang === "id"
                  ? "Terkirim ke support@wizzly.web.id! Pratinjau ucapanmu sudah muncul di Supporter Wall."
                  : "Sent to support@wizzly.web.id! A local preview of your note is now shown on the Supporter Wall."}
              </span>
            </div>
          )}

          {/* Submit & Direct Chat Actions */}
          <div className="mt-5 space-y-3">
            <button
              type="submit"
              disabled={submitting}
              className="donate-cta-btn flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold transition disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {lang === "id" ? "Mengirim..." : "Sending..."}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {lang === "id"
                    ? "Kirim Bukti & Pesan ke Developer"
                    : "Send Proof & Note to Developer"}
                </>
              )}
            </button>

            <div className="pt-1">
              <div className="mb-2 flex items-center justify-between text-[11px] text-zinc-400">
                <span>
                  {lang === "id"
                    ? "Atau chat langsung (isi form otomatis ikut tersalin):"
                    : "Or chat directly (pre-filled with your note above):"}
                </span>
                <button
                  type="button"
                  onClick={() => copy("template", formattedMessage)}
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-amber-300 hover:underline"
                >
                  {copiedKey === "template" ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      {lang === "id" ? "Pesan disalin" : "Message copied"}
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      {lang === "id" ? "Salin teks" : "Copy text"}
                    </>
                  )}
                </button>
              </div>
              <DirectContactStrip lang={lang} prefillText={formattedMessage} />
            </div>
          </div>
        </form>

        {/* Right: Supporter Wall & Developer Replies */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#090807]/85 p-5 sm:p-6 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <h4 className="text-sm font-semibold text-white">
                  {lang === "id"
                    ? "Supporter Wall & Balasan Dev"
                    : "Supporter Wall & Dev Replies"}
                </h4>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] text-zinc-400">
                {combinedWallItems.length}{" "}
                {lang === "id" ? "catatan" : combinedWallItems.length === 1 ? "note" : "notes"}
              </span>
            </div>

            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              {lang === "id"
                ? "Ucapan donatur, request fitur terpilih, dan balasan langsung dari Adrian ditampilkan di sini."
                : "Donor notes, selected feature requests, and direct replies from Adrian appear here."}
            </p>

            {combinedWallItems.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-dashed border-amber-400/25 bg-amber-400/[0.03] p-5 text-center">
                <MessageSquareHeart className="mx-auto h-6 w-6 text-amber-400/80" />
                <p className="mt-3 text-xs font-semibold text-white">
                  {lang === "id"
                    ? "Jadilah supporter pertama yang tampil di sini"
                    : "Be the first supporter featured here"}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
                  {lang === "id"
                    ? "Kirim bukti donasi, ucapan, atau request fitur lewat form di samping — atau chat langsung via Telegram @ntpsbl & Discord funblue."
                    : "Send a proof, note, or feature request using the form — or reach out directly on Telegram @ntpsbl or Discord funblue."}
                </p>
              </div>
            ) : (
              <div className="mt-4 max-h-[420px] space-y-3 overflow-y-auto pr-1">
                {combinedWallItems.map((item) => {
                  const statusCfg = item.featureStatus
                    ? STATUS_BADGE_MAP[item.featureStatus]
                    : null;

                  return (
                    <article
                      key={item.id}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white">
                            {item.name}
                          </span>
                          <span className="rounded-full border border-amber-400/30 bg-amber-400/12 px-2 py-0.5 font-mono text-[10px] text-amber-300">
                            {item.tierLabel[lang]}
                            {item.amountText ? ` • ${item.amountText}` : ""}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-zinc-500">
                          {item.date}
                        </span>
                      </div>

                      {item.pendingLocal && (
                        <span className="mt-1.5 inline-block rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 font-mono text-[10px] text-amber-200">
                          {lang === "id"
                            ? "Pratinjau lokal • Menunggu verifikasi dev"
                            : "Local preview • Pending developer review"}
                        </span>
                      )}

                      <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                        {item.message}
                      </p>

                      {item.featureRequest && (
                        <div className="mt-2.5 flex flex-wrap items-start justify-between gap-2 rounded-lg border border-white/[0.07] bg-black/40 px-2.5 py-2">
                          <div className="min-w-0 flex-1 text-[11px] text-zinc-300">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-amber-300">
                              {item.featureArea ? `${item.featureArea} • ` : ""}
                              {lang === "id" ? "Request" : "Feature"}:{" "}
                            </span>
                            {item.featureRequest}
                          </div>
                          {statusCfg && (
                            <span
                              className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase ${statusCfg.className}`}
                            >
                              {statusCfg.label[lang]}
                            </span>
                          )}
                        </div>
                      )}

                      {item.devReply && (
                        <div className="mt-2.5 rounded-lg border-l-2 border-amber-400 bg-amber-400/[0.07] px-3 py-2">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-semibold text-amber-300">
                              {item.devReply.author} (Dev)
                            </span>
                            <span className="font-mono text-zinc-500">
                              {item.devReply.date}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] leading-relaxed text-zinc-200">
                            {item.devReply.message}
                          </p>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Direct Community Card */}
          <div className="mt-5 rounded-xl border border-white/[0.08] bg-black/45 p-3.5">
            <p className="text-[11px] font-semibold text-white">
              {lang === "id"
                ? "Butuh diskusi cepat dengan dev?"
                : "Want a quick 1-on-1 chat with the dev?"}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
              {lang === "id" ? (
                <>
                  Telegram{" "}
                  <span className="font-mono text-sky-300">
                    {WIZZLY_META.donation.contact.telegramHandle}
                  </span>{" "}
                  • Discord{" "}
                  <span className="font-mono text-indigo-300">
                    {WIZZLY_META.donation.contact.discordUsername}
                  </span>{" "}
                  • Email{" "}
                  <span className="font-mono text-amber-200">
                    {WIZZLY_META.donation.contact.email}
                  </span>
                </>
              ) : (
                <>
                  Telegram{" "}
                  <span className="font-mono text-sky-300">
                    {WIZZLY_META.donation.contact.telegramHandle}
                  </span>{" "}
                  • Discord{" "}
                  <span className="font-mono text-indigo-300">
                    {WIZZLY_META.donation.contact.discordUsername}
                  </span>{" "}
                  • Email{" "}
                  <span className="font-mono text-amber-200">
                    {WIZZLY_META.donation.contact.email}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
