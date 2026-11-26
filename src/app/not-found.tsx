import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#070708] px-4 text-center text-[#fafafa]">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">
        Wizzly
      </p>
      <h1 className="mt-3 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
        404
      </h1>
      <p className="mt-3 max-w-xs text-sm text-zinc-400">
        Halaman yang kamu cari tidak ditemukan.
      </p>
      <Link
        href="/"
        className="mt-7 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-zinc-950 transition hover:bg-zinc-200"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
