"use client";

import React, { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  CheckCircle2,
  CircleDashed,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { getSupabaseClient, type WizzlyRoadmapRow } from "@/lib/supabase";

interface RoadmapManagerProps {
  items: WizzlyRoadmapRow[];
  onRefresh: () => Promise<void>;
}

export function RoadmapManager({ items, onRefresh }: RoadmapManagerProps) {
  const [titleId, setTitleId] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [newDone, setNewDone] = useState(false);
  const [adding, setAdding] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitleId, setEditTitleId] = useState("");
  const [editTitleEn, setEditTitleEn] = useState("");
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleId.trim() && !titleEn.trim()) {
      setFeedback({ type: "err", text: "Isi minimal judul roadmap ID atau EN." });
      return;
    }

    setAdding(true);
    setFeedback(null);

    const maxOrder = items.reduce((max, it) => Math.max(max, it.sort_order), 0);

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.from("wizzly_roadmap").insert({
        title_id: titleId.trim() || titleEn.trim(),
        title_en: titleEn.trim() || titleId.trim(),
        done: newDone,
        sort_order: maxOrder + 1,
      });
      if (error) throw error;
      setTitleId("");
      setTitleEn("");
      setNewDone(false);
      await onRefresh();
      setFeedback({ type: "ok", text: "Item roadmap baru ditambahkan." });
    } catch (err) {
      setFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Gagal menambahkan roadmap.",
      });
    } finally {
      setAdding(false);
    }
  };

  const handleToggleDone = async (row: WizzlyRoadmapRow) => {
    setBusyId(row.id);
    setFeedback(null);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from("wizzly_roadmap")
        .update({ done: !row.done })
        .eq("id", row.id);
      if (error) throw error;
      await onRefresh();
    } catch (err) {
      setFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Gagal mengubah status roadmap.",
      });
    } finally {
      setBusyId(null);
    }
  };

  const startEdit = (row: WizzlyRoadmapRow) => {
    setEditingId(row.id);
    setEditTitleId(row.title_id);
    setEditTitleEn(row.title_en);
    setFeedback(null);
  };

  const handleSaveEdit = async (id: number) => {
    if (!editTitleId.trim() && !editTitleEn.trim()) return;
    setBusyId(id);
    setFeedback(null);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from("wizzly_roadmap")
        .update({
          title_id: editTitleId.trim() || editTitleEn.trim(),
          title_en: editTitleEn.trim() || editTitleId.trim(),
        })
        .eq("id", id);
      if (error) throw error;
      setEditingId(null);
      await onRefresh();
    } catch (err) {
      setFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Gagal menyimpan edit roadmap.",
      });
    } finally {
      setBusyId(null);
    }
  };

  const handleMove = async (index: number, direction: -1 | 1) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const current = items[index];
    const target = items[targetIdx];

    setBusyId(current.id);
    setFeedback(null);
    try {
      const supabase = getSupabaseClient();
      const currentOrder = current.sort_order === target.sort_order ? index + 1 : current.sort_order;
      const targetOrder = current.sort_order === target.sort_order ? targetIdx + 1 : target.sort_order;

      const [resA, resB] = await Promise.all([
        supabase
          .from("wizzly_roadmap")
          .update({ sort_order: targetOrder })
          .eq("id", current.id),
        supabase
          .from("wizzly_roadmap")
          .update({ sort_order: currentOrder })
          .eq("id", target.id),
      ]);
      if (resA.error) throw resA.error;
      if (resB.error) throw resB.error;
      await onRefresh();
    } catch (err) {
      setFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Gagal mengubah urutan.",
      });
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (row: WizzlyRoadmapRow) => {
    if (!window.confirm(`Hapus item roadmap "${row.title_id}"?`)) return;
    setBusyId(row.id);
    setFeedback(null);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.from("wizzly_roadmap").delete().eq("id", row.id);
      if (error) throw error;
      await onRefresh();
      setFeedback({ type: "ok", text: "Item roadmap dihapus." });
    } catch (err) {
      setFeedback({
        type: "err",
        text: err instanceof Error ? err.message : "Gagal menghapus roadmap.",
      });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add item form */}
      <form onSubmit={handleAdd} className="surface-card rounded-3xl p-6">
        <p className="font-mono text-[11px] uppercase tracking-wider text-amber-300">
          Roadmap Wizzly
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white">
          Tambah Item Roadmap Baru
        </h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-zinc-300">
              Judul Bahasa Indonesia
            </label>
            <input
              type="text"
              value={titleId}
              onChange={(e) => setTitleId(e.target.value)}
              placeholder="Misal: Live System Stats HUD di Notch"
              className="w-full rounded-xl border border-white/12 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:border-amber-400/60 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-zinc-300">
              English Title
            </label>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="e.g. Live System Stats HUD in Notch"
              className="w-full rounded-xl border border-white/12 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:border-amber-400/60 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-zinc-300">
            <input
              type="checkbox"
              checked={newDone}
              onChange={(e) => setNewDone(e.target.checked)}
              className="h-4 w-4 accent-emerald-400"
            />
            Tandai sudah rilis (Done)
          </label>

          <button
            type="submit"
            disabled={adding}
            className="donate-cta-btn inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition disabled:opacity-60"
          >
            {adding ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Plus className="h-3.5 w-3.5" />
            )}
            Tambah Roadmap
          </button>
        </div>

        {feedback && (
          <p
            className={`mt-3 text-xs ${
              feedback.type === "ok" ? "text-emerald-300" : "text-rose-300"
            }`}
          >
            {feedback.text}
          </p>
        )}
      </form>

      {/* Roadmap list */}
      <div className="surface-card divide-y divide-white/[0.06] overflow-hidden rounded-3xl">
        {items.map((row, idx) => {
          const busy = busyId === row.id;
          const isEditing = editingId === row.id;

          return (
            <div key={row.id} className="p-4 sm:p-5">
              {isEditing ? (
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={editTitleId}
                      onChange={(e) => setEditTitleId(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-xs text-white focus:border-amber-400/60 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={editTitleEn}
                      onChange={(e) => setEditTitleEn(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-xs text-white focus:border-amber-400/60 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => handleSaveEdit(row.id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-zinc-200"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Simpan
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/12 px-3 py-1.5 text-xs text-zinc-300 hover:text-white"
                    >
                      <X className="h-3.5 w-3.5" />
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => handleToggleDone(row)}
                      className={`mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                        row.done
                          ? "border-emerald-400/35 bg-emerald-500/12 text-emerald-300 hover:bg-emerald-500/20"
                          : "border-amber-400/35 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20"
                      }`}
                    >
                      {row.done ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Selesai
                        </>
                      ) : (
                        <>
                          <CircleDashed className="h-3.5 w-3.5" />
                          On Progress
                        </>
                      )}
                    </button>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white sm:text-sm">
                        {row.title_id}
                      </p>
                      <p className="mt-0.5 text-[11px] text-zinc-400">{row.title_en}</p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      disabled={busy || idx === 0}
                      onClick={() => handleMove(idx, -1)}
                      title="Naikkan urutan"
                      className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5 text-zinc-400 hover:text-white disabled:opacity-30"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={busy || idx === items.length - 1}
                      onClick={() => handleMove(idx, 1)}
                      title="Turunkan urutan"
                      className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5 text-zinc-400 hover:text-white disabled:opacity-30"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => startEdit(row)}
                      title="Edit"
                      className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5 text-zinc-300 hover:border-amber-400/40 hover:text-amber-300"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => handleDelete(row)}
                      title="Hapus"
                      className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5 text-zinc-400 hover:border-rose-400/40 hover:text-rose-300"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
