"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  MessageSquareHeart,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import {
  COFFEE_TIERS,
  type DonationChannel,
  type SupporterFeatureStatus,
} from "@/data/wizzlyData";
import { getSupabaseClient, type WizzlySupporterRow } from "@/lib/supabase";

interface SupporterManagerProps {
  supporters: WizzlySupporterRow[];
  onRefresh: () => Promise<void>;
}

interface SupporterFormState {
  id: number | null;
  name: string;
  tier_label_id: string;
  tier_label_en: string;
  amount_text: string;
  channel: DonationChannel;
  supporter_date: string;
  message: string;
  feature_request: string;
  feature_area: string;
  feature_status: SupporterFeatureStatus | "";
  dev_reply_author: string;
  dev_reply_date: string;
  dev_reply_message: string;
  is_published: boolean;
  sort_order: number;
}

const CHANNEL_OPTIONS: Array<{ value: DonationChannel; label: string }> = [
  { value: "qris", label: "QRIS" },
  { value: "paypal", label: "PayPal" },
  { value: "binance", label: "Binance Pay" },
  { value: "feedback", label: "Feedback / Request" },
];

const FEATURE_AREAS = ["Notch", "Dock", "Widgets", "Spotlight", "Other"];

const FEATURE_STATUS_OPTIONS: Array<{ value: SupporterFeatureStatus; label: string }> = [
  { value: "reviewing", label: "Ditinjau / Reviewing" },
  { value: "planned", label: "Direncanakan / Planned" },
  { value: "in-progress", label: "Dikerjakan / In Progress" },
  { value: "shipped", label: "Rilis / Shipped" },
];

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function emptyForm(): SupporterFormState {
  return {
    id: null,
    name: "",
    tier_label_id: "1 Kopi",
    tier_label_en: "1 Coffee",
    amount_text: "Rp 15rb",
    channel: "qris",
    supporter_date: todayIso(),
    message: "",
    feature_request: "",
    feature_area: "Notch",
    feature_status: "reviewing",
    dev_reply_author: "Adrian",
    dev_reply_date: todayIso(),
    dev_reply_message: "",
    is_published: true,
    sort_order: 0,
  };
}

function rowToForm(row: WizzlySupporterRow): SupporterFormState {
  return {
    id: row.id,
    name: row.name,
    tier_label_id: row.tier_label_id,
    tier_label_en: row.tier_label_en,
    amount_text: row.amount_text ?? "",
    channel: row.channel,
    supporter_date: row.supporter_date,
    message: row.message,
    feature_request: row.feature_request ?? "",
    feature_area: row.feature_area ?? "Notch",
    feature_status: row.feature_status ?? "",
    dev_reply_author: row.dev_reply_author ?? "Adrian",
    dev_reply_date: row.dev_reply_date ?? todayIso(),
    dev_reply_message: row.dev_reply_message ?? "",
    is_published: row.is_published,
    sort_order: row.sort_order,
  };
}

export function SupporterManager({ supporters, onRefresh }: SupporterManagerProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<SupporterFormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const openCreate = () => {
    setForm(emptyForm());
    setFormOpen(true);
    setFeedback(null);
  };

  const openEdit = (row: WizzlySupporterRow) => {
    setForm(rowToForm(row));
    setFormOpen(true);
    setFeedback(null);
  };

  const applyTierPreset = (tierId: string) => {
    if (tierId === "feedback") {
      setForm((prev) => ({
        ...prev,
        channel: "feedback",
        tier_label_id: "Feedback",
        tier_label_en: "Feedback",
        amount_text: "",
      }));
      return;
    }
    const tier = COFFEE_TIERS.find((t) => t.id === tierId);
    if (!tier) return;
    setForm((prev) => ({
      ...prev,
      tier_label_id: tier.label.id,
      tier_label_en: tier.label.en,
      amount_text: prev.channel === "qris" ? tier.idrText : tier.usdText,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setFeedback({ type: "err", text: "Nama supporter dan pesan wajib diisi." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    const hasFeature = Boolean(form.feature_request.trim());
    const hasReply = Boolean(form.dev_reply_message.trim());

    const payload = {
      name: form.name.trim(),
      tier_label_id: form.tier_label_id.trim() || "1 Kopi",
      tier_label_en: form.tier_label_en.trim() || "1 Coffee",
      amount_text: form.amount_text.trim() || null,
      channel: form.channel,
      supporter_date: form.supporter_date || todayIso(),
      message: form.message.trim(),
      feature_request: hasFeature ? form.feature_request.trim() : null,
      feature_area: hasFeature ? form.feature_area || "Other" : null,
      feature_status: hasFeature ? form.feature_status || "reviewing" : null,
      dev_reply_author: hasReply ? form.dev_reply_author.trim() || "Adrian" : null,
      dev_reply_date: hasReply ? form.dev_reply_date || todayIso() : null,
      dev_reply_message: hasReply ? form.dev_reply_message.trim() : null,
      is_published: form.is_published,
      sort_order: Number.isFinite(form.sort_order) ? form.sort_order : 0,
    };

    try {
      const supabase = getSupabaseClient();
      if (form.id !== null) {
        const { error } = await supabase
          .from("wizzly_supporters")
          .update(payload)
          .eq("id", form.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("wizzly_supporters").insert(payload);
        if (error) throw error;
      }
      await onRefresh();
      setFormOpen(false);
      setFeedback({
        type: "ok",
        text:
          form.id !== null
            ? "Supporter berhasil diperbarui."
            : "Supporter baru berhasil ditambahkan ke wall!",
      });
    } catch (err) {
      setFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Gagal menyimpan supporter.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublished = async (row: WizzlySupporterRow) => {
    setBusyId(row.id);
    setFeedback(null);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from("wizzly_supporters")
        .update({ is_published: !row.is_published })
        .eq("id", row.id);
      if (error) throw error;
      await onRefresh();
    } catch (err) {
      setFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Gagal mengubah visibilitas.",
      });
    } finally {
      setBusyId(null);
    }
  };

  const handleQuickStatusChange = async (
    row: WizzlySupporterRow,
    nextStatus: SupporterFeatureStatus
  ) => {
    setBusyId(row.id);
    setFeedback(null);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from("wizzly_supporters")
        .update({ feature_status: nextStatus })
        .eq("id", row.id);
      if (error) throw error;
      await onRefresh();
    } catch (err) {
      setFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Gagal mengubah status fitur.",
      });
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (row: WizzlySupporterRow) => {
    if (!window.confirm(`Hapus catatan dari "${row.name}"?`)) return;
    setBusyId(row.id);
    setFeedback(null);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.from("wizzly_supporters").delete().eq("id", row.id);
      if (error) throw error;
      await onRefresh();
      setFeedback({ type: "ok", text: `Catatan "${row.name}" dihapus.` });
    } catch (err) {
      setFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Gagal menghapus catatan.",
      });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="surface-card flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-amber-300">
            Supporter Wall & Balasan Dev
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">
            Kelola Ucapan Donatur, Request Fitur & Balasan
          </h2>
          <p className="mt-1 text-xs text-zinc-400">
            Item yang statusnya Published langsung tampil di Supporter Wall halaman utama.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="donate-cta-btn inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition"
        >
          <Plus className="h-4 w-4" />
          Tambah Supporter / Balasan
        </button>
      </div>

      {feedback && !formOpen && (
        <div
          className={`flex items-start gap-2 rounded-2xl border px-4 py-3 text-xs ${
            feedback.type === "ok"
              ? "border-emerald-400/35 bg-emerald-500/10 text-emerald-200"
              : "border-rose-400/35 bg-rose-500/10 text-rose-200"
          }`}
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{feedback.text}</span>
        </div>
      )}

      {formOpen && (
        <form
          onSubmit={handleSave}
          className="donate-spotlight rounded-3xl p-6 sm:p-7"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-white">
              {form.id !== null ? `Edit Supporter: ${form.name}` : "Tambah Supporter Baru"}
            </h3>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-zinc-400 hover:bg-white/15 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Preset Tier Pills */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-zinc-400">Preset cepat:</span>
            {COFFEE_TIERS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => applyTierPreset(tier.id)}
                className="rounded-lg border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 text-[11px] font-medium text-amber-200 hover:bg-amber-400/20"
              >
                {tier.label.id} ({tier.idrText} / {tier.usdText})
              </button>
            ))}
            <button
              type="button"
              onClick={() => applyTierPreset("feedback")}
              className="rounded-lg border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:bg-white/[0.08]"
            >
              Feedback Saja
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-zinc-300">
                Nama Supporter *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Misal: Rizky / Anonim"
                className="w-full rounded-xl border border-white/12 bg-black/50 px-3.5 py-2 text-xs text-white focus:border-amber-400/60 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-zinc-300">
                Channel
              </label>
              <select
                value={form.channel}
                onChange={(e) =>
                  setForm({ ...form, channel: e.target.value as DonationChannel })
                }
                className="w-full rounded-xl border border-white/12 bg-[#0c0b0a] px-3.5 py-2 text-xs text-white focus:border-amber-400/60 focus:outline-none"
              >
                {CHANNEL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-zinc-300">
                Tanggal
              </label>
              <input
                type="date"
                value={form.supporter_date}
                onChange={(e) => setForm({ ...form, supporter_date: e.target.value })}
                className="w-full rounded-xl border border-white/12 bg-black/50 px-3.5 py-2 font-mono text-xs text-white focus:border-amber-400/60 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-zinc-300">
                Label Tier (ID)
              </label>
              <input
                type="text"
                value={form.tier_label_id}
                onChange={(e) => setForm({ ...form, tier_label_id: e.target.value })}
                className="w-full rounded-xl border border-white/12 bg-black/50 px-3.5 py-2 text-xs text-white focus:border-amber-400/60 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-zinc-300">
                Tier Label (EN)
              </label>
              <input
                type="text"
                value={form.tier_label_en}
                onChange={(e) => setForm({ ...form, tier_label_en: e.target.value })}
                className="w-full rounded-xl border border-white/12 bg-black/50 px-3.5 py-2 text-xs text-white focus:border-amber-400/60 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-zinc-300">
                Nominal Tampil (opsional)
              </label>
              <input
                type="text"
                value={form.amount_text}
                onChange={(e) => setForm({ ...form, amount_text: e.target.value })}
                placeholder="Rp 30rb / $5"
                className="w-full rounded-xl border border-white/12 bg-black/50 px-3.5 py-2 font-mono text-xs text-amber-200 focus:border-amber-400/60 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1.5 block text-[11px] font-medium text-zinc-300">
              Ucapan / Pesan Supporter *
            </label>
            <textarea
              rows={2}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Semangat terus kembangin Wizzly!"
              className="w-full rounded-xl border border-white/12 bg-black/50 px-3.5 py-2 text-xs text-white focus:border-amber-400/60 focus:outline-none"
            />
          </div>

          <div className="mt-4 rounded-2xl border border-white/[0.08] bg-black/35 p-4">
            <p className="text-xs font-semibold text-zinc-200">
              Request Fitur (opsional)
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-12">
              <div className="sm:col-span-6">
                <input
                  type="text"
                  value={form.feature_request}
                  onChange={(e) => setForm({ ...form, feature_request: e.target.value })}
                  placeholder="Isi request fitur (kosongkan jika tidak ada)"
                  className="w-full rounded-xl border border-white/12 bg-black/50 px-3 py-2 text-xs text-white focus:border-amber-400/60 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-3">
                <select
                  value={form.feature_area}
                  onChange={(e) => setForm({ ...form, feature_area: e.target.value })}
                  className="w-full rounded-xl border border-white/12 bg-[#0c0b0a] px-3 py-2 text-xs text-white focus:border-amber-400/60 focus:outline-none"
                >
                  {FEATURE_AREAS.map((area) => (
                    <option key={area} value={area}>
                      Area: {area}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-3">
                <select
                  value={form.feature_status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      feature_status: e.target.value as SupporterFeatureStatus | "",
                    })
                  }
                  className="w-full rounded-xl border border-white/12 bg-[#0c0b0a] px-3 py-2 text-xs text-white focus:border-amber-400/60 focus:outline-none"
                >
                  {FEATURE_STATUS_OPTIONS.map((st) => (
                    <option key={st.value} value={st.value}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-4">
            <p className="text-xs font-semibold text-amber-200">
              Balasan Developer (opsional)
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-12">
              <div className="sm:col-span-3">
                <input
                  type="text"
                  value={form.dev_reply_author}
                  onChange={(e) => setForm({ ...form, dev_reply_author: e.target.value })}
                  placeholder="Adrian"
                  className="w-full rounded-xl border border-white/12 bg-black/50 px-3 py-2 text-xs text-white focus:border-amber-400/60 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-3">
                <input
                  type="date"
                  value={form.dev_reply_date}
                  onChange={(e) => setForm({ ...form, dev_reply_date: e.target.value })}
                  className="w-full rounded-xl border border-white/12 bg-black/50 px-3 py-2 font-mono text-xs text-white focus:border-amber-400/60 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-6">
                <input
                  type="text"
                  value={form.dev_reply_message}
                  onChange={(e) => setForm({ ...form, dev_reply_message: e.target.value })}
                  placeholder="Terima kasih! Fitur ini masuk antrean v0.1.4..."
                  className="w-full rounded-xl border border-white/12 bg-black/50 px-3 py-2 text-xs text-white focus:border-amber-400/60 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-zinc-200">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                  className="h-4 w-4 accent-amber-400"
                />
                Tampilkan di Supporter Wall (Publish)
              </label>

              <label className="inline-flex items-center gap-2 text-xs text-zinc-400">
                Prioritas pin:
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) =>
                    setForm({ ...form, sort_order: Number(e.target.value) || 0 })
                  }
                  className="w-20 rounded-lg border border-white/12 bg-black/50 px-2.5 py-1 font-mono text-xs text-white"
                />
              </label>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded-xl border border-white/12 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="donate-cta-btn inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition disabled:opacity-60"
              >
                {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {form.id !== null ? "Simpan Perubahan" : "Publikasikan"}
              </button>
            </div>
          </div>

          {feedback && (
            <p className="mt-3 text-xs text-rose-300">{feedback.text}</p>
          )}
        </form>
      )}

      {/* Supporter list */}
      {supporters.length === 0 ? (
        <div className="surface-card rounded-3xl p-10 text-center">
          <MessageSquareHeart className="mx-auto h-7 w-7 text-amber-400/80" />
          <p className="mt-3 text-sm font-semibold text-white">
            Belum ada catatan supporter di database
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Klik &ldquo;Tambah Supporter / Balasan&rdquo; untuk menampilkan ucapan donatur pertama.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {supporters.map((item) => {
            const busy = busyId === item.id;
            return (
              <div
                key={item.id}
                className={`surface-card rounded-2xl p-4 sm:p-5 ${
                  item.is_published ? "" : "opacity-65"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-white">{item.name}</span>
                      <span className="rounded-full border border-amber-400/30 bg-amber-400/12 px-2 py-0.5 font-mono text-[10px] text-amber-300">
                        {item.tier_label_id}
                        {item.amount_text ? ` • ${item.amount_text}` : ""}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase text-zinc-400">
                        {item.channel}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500">
                        {item.supporter_date}
                      </span>
                      {!item.is_published && (
                        <span className="rounded-full border border-zinc-500/40 bg-zinc-500/15 px-2 py-0.5 font-mono text-[10px] text-zinc-300">
                          Draft (Tersembunyi)
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                      {item.message}
                    </p>

                    {item.feature_request && (
                      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-black/40 px-3 py-2">
                        <p className="text-xs text-zinc-300">
                          <span className="font-mono text-[10px] uppercase text-amber-300">
                            {item.feature_area ? `${item.feature_area} • ` : ""}Request:{" "}
                          </span>
                          {item.feature_request}
                        </p>
                        <select
                          aria-label="Feature status"
                          disabled={busy}
                          value={item.feature_status ?? "reviewing"}
                          onChange={(e) =>
                            handleQuickStatusChange(
                              item,
                              e.target.value as SupporterFeatureStatus
                            )
                          }
                          className="rounded-lg border border-white/12 bg-[#0c0b0a] px-2 py-1 font-mono text-[10px] text-zinc-200 focus:border-amber-400/60 focus:outline-none"
                        >
                          {FEATURE_STATUS_OPTIONS.map((st) => (
                            <option key={st.value} value={st.value}>
                              {st.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {item.dev_reply_message && (
                      <div className="mt-2.5 rounded-lg border-l-2 border-amber-400 bg-amber-400/[0.07] px-3 py-2 text-xs text-zinc-200">
                        <span className="font-semibold text-amber-300">
                          {item.dev_reply_author || "Adrian"} (Dev):{" "}
                        </span>
                        {item.dev_reply_message}
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => handleTogglePublished(item)}
                      title={item.is_published ? "Sembunyikan" : "Tampilkan"}
                      className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-zinc-300 transition hover:border-white/25 hover:text-white disabled:opacity-40"
                    >
                      {item.is_published ? (
                        <Eye className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5 text-zinc-400" />
                      )}
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => openEdit(item)}
                      title="Edit / Balas"
                      className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-zinc-300 transition hover:border-amber-400/40 hover:text-amber-300 disabled:opacity-40"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => handleDelete(item)}
                      title="Hapus"
                      className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-zinc-400 transition hover:border-rose-400/40 hover:text-rose-300 disabled:opacity-40"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
