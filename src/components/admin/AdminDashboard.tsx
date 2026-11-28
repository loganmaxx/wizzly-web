"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  ListChecks,
  Loader2,
  Lock,
  LogOut,
  MessageSquareHeart,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import {
  formatUsdAmount,
  getSupabaseClient,
  type WizzlyRoadmapRow,
  type WizzlySettingsRow,
  type WizzlySupporterRow,
} from "@/lib/supabase";
import { MilestoneEditor } from "@/components/admin/MilestoneEditor";
import { RoadmapManager } from "@/components/admin/RoadmapManager";
import { SupporterManager } from "@/components/admin/SupporterManager";

type AdminTab = "milestone" | "supporters" | "roadmap";

export function AdminDashboard() {
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>("milestone");
  const [loadingData, setLoadingData] = useState(false);
  const [settings, setSettings] = useState<WizzlySettingsRow | null>(null);
  const [supporters, setSupporters] = useState<WizzlySupporterRow[]>([]);
  const [roadmapItems, setRoadmapItems] = useState<WizzlyRoadmapRow[]>([]);

  const verifyAdminAndLoad = useCallback(async (currentUser: User | null) => {
    if (!currentUser) {
      setIsAdmin(null);
      return;
    }

    const supabase = getSupabaseClient();
    const { data: adminRow, error: adminErr } = await supabase
      .from("wizzly_admins")
      .select("user_id")
      .eq("user_id", currentUser.id)
      .maybeSingle();

    if (adminErr || !adminRow) {
      setIsAdmin(false);
      return;
    }

    setIsAdmin(true);
    setLoadingData(true);
    try {
      const [settingsRes, supportersRes, roadmapRes] = await Promise.all([
        supabase
          .from("wizzly_settings")
          .select("*")
          .eq("id", "default")
          .maybeSingle<WizzlySettingsRow>(),
        supabase
          .from("wizzly_supporters")
          .select("*")
          .order("sort_order", { ascending: false })
          .order("supporter_date", { ascending: false })
          .order("id", { ascending: false })
          .returns<WizzlySupporterRow[]>(),
        supabase
          .from("wizzly_roadmap")
          .select("*")
          .order("sort_order", { ascending: true })
          .order("id", { ascending: true })
          .returns<WizzlyRoadmapRow[]>(),
      ]);

      if (!settingsRes.error && settingsRes.data) setSettings(settingsRes.data);
      if (!supportersRes.error && supportersRes.data) setSupporters(supportersRes.data);
      if (!roadmapRes.error && roadmapRes.data) setRoadmapItems(roadmapRes.data);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    const supabase = getSupabaseClient();

    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);
      setAuthReady(true);
      void verifyAdminAndLoad(sessionUser);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      setAuthReady(true);
      void verifyAdminAndLoad(sessionUser);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [verifyAdminAndLoad]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setSigningIn(true);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : "Email atau password tidak sesuai."
      );
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    setSettings(null);
    setSupporters([]);
    setRoadmapItems([]);
  };

  const refreshData = async () => {
    await verifyAdminAndLoad(user);
  };

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070708] text-zinc-400">
        <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[#070708] px-4 py-12 text-[#fafafa]">
        <div className="bg-architectural-grid pointer-events-none fixed inset-0 -z-10 opacity-70" />
        <div className="donate-spotlight w-full max-w-md rounded-[28px] p-7 sm:p-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke Wizzly
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <img
              src="/images/wizzly-icon.png"
              alt="Wizzly"
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl border border-white/15"
            />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-amber-300">
                Wizzly Admin Studio
              </p>
              <h1 className="text-xl font-semibold tracking-tight text-white">
                Masuk Dashboard
              </h1>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-zinc-400">
            Update milestone Code Signing, Supporter Wall, dan Roadmap secara langsung tanpa rebuild.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-1.5 block text-xs font-medium text-zinc-300"
              >
                Email Admin
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@wizzly.web.id"
                className="w-full rounded-xl border border-white/12 bg-black/55 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-amber-400/65 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-xs font-medium text-zinc-300"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/12 bg-black/55 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-amber-400/65 focus:outline-none"
              />
            </div>

            {authError && (
              <div className="rounded-xl border border-rose-400/35 bg-rose-500/10 px-3.5 py-2.5 text-xs text-rose-200">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={signingIn}
              className="donate-cta-btn flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold transition disabled:opacity-60"
            >
              {signingIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Masuk ke Admin Studio
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isAdmin === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070708] text-zinc-400">
        <Loader2 className="h-5 w-5 animate-spin text-amber-400" />
      </div>
    );
  }

  if (isAdmin === false) {
    const grantSql = `insert into public.wizzly_admins (user_id, email)\nvalues ('${user.id}', '${user.email ?? ""}');`;
    const handleCopySql = () => {
      navigator.clipboard?.writeText(grantSql).catch(() => {});
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    };

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070708] px-4 py-12 text-[#fafafa]">
        <div className="surface-card w-full max-w-lg rounded-3xl p-7">
          <div className="flex items-center gap-3 text-amber-300">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <h1 className="text-lg font-semibold text-white">
              Akun Belum Terdaftar Sebagai Admin Wizzly
            </h1>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-zinc-400">
            Login berhasil sebagai <span className="font-mono text-white">{user.email}</span>, tetapi
            akun ini belum ada di tabel <span className="font-mono text-amber-300">public.wizzly_admins</span>.
            Jalankan SQL berikut sekali di Supabase SQL Editor untuk mengaktifkannya:
          </p>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/60 p-4">
            <pre className="overflow-x-auto font-mono text-[11px] text-amber-200">
              {grantSql}
            </pre>
            <button
              type="button"
              onClick={handleCopySql}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium text-white hover:bg-white/10"
            >
              {copiedSql ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  SQL Disalin
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Salin SQL
                </>
              )}
            </button>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={refreshData}
              className="donate-cta-btn inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Cek Lagi
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/12 px-4 py-2 text-xs text-zinc-300 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              Keluar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const raisedVal = settings ? Number(settings.raised_usd) : 11;
  const targetVal = settings ? Number(settings.target_usd) : 200;
  const publishedCount = supporters.filter((s) => s.is_published).length;
  const roadmapDoneCount = roadmapItems.filter((r) => r.done).length;

  return (
    <div className="min-h-screen bg-[#070708] text-[#fafafa]">
      <header className="studio-nav sticky top-0 z-40 border-b border-white/[0.08]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/images/wizzly-icon.png"
                alt="Wizzly"
                width={24}
                height={24}
                className="h-6 w-6 rounded-md border border-white/15"
              />
              <span className="text-sm font-semibold text-white">Wizzly</span>
            </Link>
            <span className="rounded-full border border-amber-400/35 bg-amber-400/12 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-amber-300">
              Admin Studio
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden font-mono text-[11px] text-zinc-400 sm:inline">
              {user.email}
            </span>
            <button
              type="button"
              onClick={refreshData}
              disabled={loadingData}
              title="Refresh data"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 transition hover:border-white/25 hover:text-white"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loadingData ? "animate-spin text-amber-300" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-200 transition hover:border-white/25 hover:text-white"
            >
              Lihat Web
              <ExternalLink className="h-3 w-3" />
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 transition hover:border-rose-400/40 hover:text-rose-200"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Top Summary Strip */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="surface-card rounded-2xl p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              Code Signing Milestone
            </p>
            <p className="mt-1.5 font-mono text-2xl font-semibold tabular-nums text-amber-300">
              ${formatUsdAmount(raisedVal)}{" "}
              <span className="text-sm text-zinc-500">/ ${formatUsdAmount(targetVal)}</span>
            </p>
          </div>
          <div className="surface-card rounded-2xl p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              Supporter Wall
            </p>
            <p className="mt-1.5 font-mono text-2xl font-semibold tabular-nums text-white">
              {publishedCount}{" "}
              <span className="text-xs font-normal text-zinc-400">
                tampil ({supporters.length} total)
              </span>
            </p>
          </div>
          <div className="surface-card rounded-2xl p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              Roadmap Progress
            </p>
            <p className="mt-1.5 font-mono text-2xl font-semibold tabular-nums text-white">
              {roadmapDoneCount}/{roadmapItems.length}{" "}
              <span className="text-xs font-normal text-zinc-400">selesai</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-4">
          {(
            [
              { id: "milestone", label: "Milestone Code Signing", icon: ShieldCheck },
              {
                id: "supporters",
                label: `Supporter Wall (${supporters.length})`,
                icon: MessageSquareHeart,
              },
              {
                id: "roadmap",
                label: `Roadmap (${roadmapItems.length})`,
                icon: ListChecks,
              },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  active
                    ? "bg-white text-zinc-950"
                    : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          {activeTab === "milestone" && (
            <MilestoneEditor
              settings={settings}
              onUpdated={(next) => setSettings(next)}
            />
          )}
          {activeTab === "supporters" && (
            <SupporterManager supporters={supporters} onRefresh={refreshData} />
          )}
          {activeTab === "roadmap" && (
            <RoadmapManager items={roadmapItems} onRefresh={refreshData} />
          )}
        </div>
      </main>
    </div>
  );
}
