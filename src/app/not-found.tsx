import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#050609] px-4 text-center text-white">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-2 text-sm text-slate-400">Halaman tidak ditemukan.</p>
      <Link
        href="/"
        className="mt-5 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-950"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
