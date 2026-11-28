"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Plus, RotateCcw, Save, ShieldCheck } from "lucide-react";
import { formatUsdAmount, getSupabaseClient, type WizzlySettingsRow } from "@/lib/supabase";

interface MilestoneEditorProps {
  settings: WizzlySettingsRow | null;
  onUpdated: (next: WizzlySettingsRow) => void;
}

const QUICK_ADD_PRESETS = [
  { label: "+$3 (1 Kopi)", delta: 3 },
  { label: "+$5 (2 Kopi)", delta: 5 },
  { label: "+$10", delta: 10 },
  { label: "+$15 (Code Sign)", delta: 15 },
];

export function MilestoneEditor({ settings, onUpdated }: MilestoneEditorProps) {
  const [raisedInput, setRaisedInput] = useState("11");
  const [targetInput, setTargetInput] = useState("200");
  const [noteId, setNoteId] = useState("");
  const [noteEn, setNoteEn] = useState("");
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    if (!settings) return;
    setRaisedInput(formatUsdAmount(Number(settings.raised_usd)));
    setTargetInput(formatUsdAmount(Number(settings.target_usd)));
    setNoteId(settings.milestone_note_id ?? "");
    setNoteEn(settings.milestone_note_en ?? "");
  }, [settings]);

  const parsedRaised = Number(raisedInput);
  const parsedTarget = Number(targetInput);
  const valid =
    Number.isFinite(parsedRaised) &&
    parsedRaised >= 0 &&
    Number.isFinite(parsedTarget) &&
    parsedTarget > 0;

  const progressPct = valid
    ? Math.min(100, Math.max(4, Math.round((parsedRaised / parsedTarget) * 100)))
    : 0;

  const isDirty = settings
    ? Number(settings.raised_usd) !== parsedRaised ||
      Number(settings.target_usd) !== parsedTarget ||
      (settings.milestone_note_id ?? "") !== noteId.trim() ||
      (settings.milestone_note_en ?? "") !== noteEn.trim()
    : true;

  const handleQuickAdd = (delta: number) => {
    const base = Number.isFinite(parsedRaised) && parsedRaised >= 0 ? parsedRaised : 0;
    const next = Math.round((base + delta) * 100) / 100;
    setRaisedInput(formatUsdAmount(next));
    setStatusMsg(null);
  };

  const handleReset = () => {
    if (!settings) return;
    setRaisedInput(formatUsdAmount(Number(settings.raised_usd)));
    setTargetInput(formatUsdAmount(Number(settings.target_usd)));
    setNoteId(settings.milestone_note_id ?? "");
    setNoteEn(settings.milestone_note_en ?? "");
    setStatusMsg(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) {
      setStatusMsg({
        type: "err",
        text: "Masukkan nominal raised (>= 0) dan target (> 0) yang valid.",
      });
      return;
    }

    setSaving(true);
    setStatusMsg(null);

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("wizzly_settings")
        .upsert(
          {
            id: "default",
            raised_usd: parsedRaised,
            target_usd: parsedTarget,
            milestone_note_id: noteId.trim(),
            milestone_note_en: noteEn.trim(),
          },
          { onConflict: "id" }
        )
        .select("*")
        .single<WizzlySettingsRow>();

      if (error) throw error;
      onUpdated(data);
      setStatusMsg({
        type: "ok",
        text: `Milestone tersimpan! Live di web sekarang: $${formatUsdAmount(parsedRaised)} / $${formatUsdAmount(parsedTarget)} USD.`,
      });
    } catch (err) {
      setStatusMsg({
        type: "err",
        text: err instanceof Error ? err.message : "Gagal menyimpan milestone.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Form */}
      <form
        onSubmit={handleSave}
        className="surface-card rounded-3xl p-6 sm:p-7 lg:col-span-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-amber-300">
              Code Signing Milestone
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">
              Update Dana Terkumpul & Target
            </h2>
          </div>
          {isDirty && (
            <span className="rounded-full border border-amber-400/40 bg-amber-400/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-amber-200">
              Belum disimpan
            </span>
          )}
        </div>

        {/* Quick add buttons */}
        <div className="mt-5">
          <span className="block text-[11px] font-medium text-zinc-400">
            Tambah cepat dari donasi masuk:
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {QUICK_ADD_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleQuickAdd(preset.delta)}
                className="inline-flex items-center gap-1 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 font-mono text-xs font-semibold text-amber-200 transition hover:border-amber-400/60 hover:bg-amber-400/20"
              >
                <Plus className="h-3 w-3 text-amber-400" />
                {preset.label.replace("+", "")}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="milestone-raised"
              className="mb-1.5 block text-xs font-medium text-zinc-300"
            >
              Dana Terkumpul (USD)
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-zinc-500">
                $
              </span>
              <input
                id="milestone-raised"
                type="number"
                step="0.01"
                min="0"
                value={raisedInput}
                onChange={(e) => {
                  setRaisedInput(e.target.value);
                  setStatusMsg(null);
                }}
                className="w-full rounded-xl border border-white/12 bg-black/50 py-2.5 pl-8 pr-4 font-mono text-sm font-semibold text-amber-300 focus:border-amber-400/65 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="milestone-target"
              className="mb-1.5 block text-xs font-medium text-zinc-300"
            >
              Target Sertifikat (USD)
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-zinc-500">
                $
              </span>
              <input
                id="milestone-target"
                type="number"
                step="0.01"
                min="1"
                value={targetInput}
                onChange={(e) => {
                  setTargetInput(e.target.value);
                  setStatusMsg(null);
                }}
                className="w-full rounded-xl border border-white/12 bg-black/50 py-2.5 pl-8 pr-4 font-mono text-sm font-semibold text-white focus:border-amber-400/65 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="milestone-note-id"
              className="mb-1.5 block text-xs font-medium text-zinc-300"
            >
              Catatan Singkat ID (opsional)
            </label>
            <input
              id="milestone-note-id"
              type="text"
              maxLength={160}
              value={noteId}
              onChange={(e) => {
                setNoteId(e.target.value);
                setStatusMsg(null);
              }}
              placeholder="Misal: Update 29 Nov • Terima kasih supporter!"
              className="w-full rounded-xl border border-white/12 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:border-amber-400/65 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="milestone-note-en"
              className="mb-1.5 block text-xs font-medium text-zinc-300"
            >
              Short Note EN (optional)
            </label>
            <input
              id="milestone-note-en"
              type="text"
              maxLength={160}
              value={noteEn}
              onChange={(e) => {
                setNoteEn(e.target.value);
                setStatusMsg(null);
              }}
              placeholder="e.g. Updated Nov 29 • Thank you supporters!"
              className="w-full rounded-xl border border-white/12 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:border-amber-400/65 focus:outline-none"
            />
          </div>
        </div>

        {statusMsg && (
          <div
            className={`mt-4 flex items-start gap-2 rounded-xl border px-3.5 py-2.5 text-xs ${
              statusMsg.type === "ok"
                ? "border-emerald-400/35 bg-emerald-500/10 text-emerald-200"
                : "border-rose-400/35 bg-rose-500/10 text-rose-200"
            }`}
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{statusMsg.text}</span>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={saving || !valid}
            className="donate-cta-btn inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Simpan Milestone
              </>
            )}
          </button>

          {isDirty && settings && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-zinc-300 transition hover:border-white/25 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
        </div>
      </form>

      {/* Live Preview */}
      <div className="donate-spotlight rounded-3xl p-6 sm:p-7 lg:col-span-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-amber-300">
          Live Preview di Web
        </p>
        <p className="mt-1 text-xs text-zinc-400">
          Tampilan kotak milestone di section Donasi & strip Hero.
        </p>

        <div className="mt-5 rounded-2xl border border-amber-400/25 bg-black/50 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-semibold text-white">
                Target Sertifikat Code Signing Windows
              </span>
            </div>
            <span className="font-mono text-xs font-semibold tabular-nums text-amber-300">
              ${valid ? formatUsdAmount(parsedRaised) : "0"}{" "}
              <span className="text-zinc-500">
                / ${valid ? formatUsdAmount(parsedTarget) : "200"} USD
              </span>
            </span>
          </div>

          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] text-zinc-400">
            <span>Progress</span>
            <span className="text-amber-300">{progressPct}%</span>
          </div>

          {(noteId.trim() || noteEn.trim()) && (
            <p className="mt-3 border-t border-white/[0.07] pt-2.5 text-[11px] text-amber-200/90">
              {noteId.trim() || noteEn.trim()}
            </p>
          )}
        </div>

        <div className="mt-4 rounded-xl border border-white/[0.08] bg-black/40 p-3.5 text-[11px] text-zinc-400">
          <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            Hero Callout Preview
          </p>
          <p className="mt-1.5 text-zinc-200">
            Bantu target Code Signing ($
            {valid ? formatUsdAmount(parsedRaised) : "0"}/$
            {valid ? formatUsdAmount(parsedTarget) : "200"})
          </p>
          {settings?.updated_at && (
            <p className="mt-2 font-mono text-[10px] text-zinc-500">
              Terakhir disimpan:{" "}
              {new Date(settings.updated_at).toLocaleString("id-ID", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
