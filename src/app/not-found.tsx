import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center text-[#f5f5f7]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#86868b]">
        Wizzly
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        404
      </h1>
      <p className="mt-2 text-sm text-[#86868b]">
        Halaman yang kamu cari tidak ditemukan.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-[#0071e3] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#0077ed]"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
