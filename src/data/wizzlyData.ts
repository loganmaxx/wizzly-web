export type Lang = "id" | "en";

export const WIZZLY_META = {
  name: "Wizzly",
  version: "0.1.0",
  installerFile: "Wizzly_0.1.0_x64-setup.exe",
  installerSize: "3.4 MB",
  binarySize: "7.4 MB",
  sha256: "57162348b70f7a3cf71b6bb4d41f46898a90b8980d2df70614dbbc6a824a369b",
  osSupport: "Windows 10 (1903+) & Windows 11 (64-bit)",
  engine: "Rust + Tauri 2 + Win32 / WinRT",
  downloadUrl:
    "https://github.com/loganmaxx/wizzly/releases/download/v0.1.0/Wizzly_0.1.0_x64-setup.exe",
  releaseUrl: "https://github.com/loganmaxx/wizzly/releases/tag/v0.1.0",
  githubUrl: "https://github.com/loganmaxx/wizzly",
  siteUrl: "https://wizzly.web.id",
  donation: {
    paypalUrl: "https://paypal.me/adrn87",
    binancePayId: "977044132",
    qrisImage: "/images/qris.png",
  },
};

export interface FeatureItem {
  id: string;
  category: "notch" | "dock" | "system";
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  badge?: Record<Lang, string>;
}

export const WIZZLY_FEATURES: FeatureItem[] = [
  {
    id: "notch-media-switcher",
    category: "notch",
    title: {
      id: "Media Player, Source Switcher & Live Lyrics",
      en: "Media Player, Source Switcher & Synced Lyrics",
    },
    description: {
      id: "Kontrol musik dengan seekbar, pilih langsung sumber media aktif (mis. Spotify vs Browser), plus lirik tersinkronisasi real-time.",
      en: "Playback controls with seekbar, instant active media source switcher (e.g., Spotify vs browser), and real-time synced lyrics.",
    },
    badge: { id: "Notch", en: "Notch" },
  },
  {
    id: "notch-shelf",
    category: "notch",
    title: {
      id: "File Shelf (AirDrop-Style Tray)",
      en: "File Shelf (AirDrop-Style Tray)",
    },
    description: {
      id: "Drag file dari File Explorer ke Notch sebagai tempat transit sementara, lalu seret keluar ke Browser, WhatsApp, atau Discord.",
      en: "Drag files from Explorer onto the Notch for temporary staging, then drag them straight out into your browser, WhatsApp, or Discord.",
    },
    badge: { id: "Notch", en: "Notch" },
  },
  {
    id: "notch-clipboard",
    category: "notch",
    title: {
      id: "Clipboard History & Quick Paste",
      en: "Clipboard History & Quick Paste",
    },
    description: {
      id: "Simpan riwayat copy teks, link, dan gambar terakhir secara lokal di tab Clip. Cari, pin item penting, atau hapus kapan saja.",
      en: "Keep recent copied text, links, and images locally inside the Clip tab. Search, pin favorites, or clear anytime.",
    },
    badge: { id: "Notch", en: "Notch" },
  },
  {
    id: "notch-pomodoro",
    category: "notch",
    title: {
      id: "Timer & Pomodoro Focus",
      en: "Timer & Pomodoro Focus",
    },
    description: {
      id: "Preset Focus, Break, dan Deep Work dengan countdown di pill Notch, alarm selesai, serta pelacak sesi harian.",
      en: "Focus, Break, and Deep Work presets with live pill countdown, completion alarm, and daily session counter.",
    },
    badge: { id: "Notch", en: "Notch" },
  },
  {
    id: "notch-osd-alerts",
    category: "notch",
    title: {
      id: "Notifikasi Masuk, Bluetooth & OSD",
      en: "Live Alerts, Bluetooth & OSD",
    },
    description: {
      id: "Notifikasi pesan (WhatsApp/Telegram/Discord), pop-up koneksi TWS/Bluetooth & Wi-Fi, serta indikator Volume & Brightness.",
      en: "Incoming message pills (WhatsApp/Telegram/Discord), Bluetooth & Wi-Fi pop-ups, plus Volume & Brightness OSD.",
    },
    badge: { id: "Notch", en: "Notch" },
  },
  {
    id: "dock-glass",
    category: "dock",
    title: {
      id: "4 Material Kaca + 4 Gaya Ikon + Toggle Terpisah",
      en: "4 Glass Styles + 4 Icon Styles + Independent Toggles",
    },
    description: {
      id: "Material Frosted, Liquid, Matte, Classic + Wallpaper Tint; ikon Windows, Squircle, macOS Pack, atau Normalized. Dock & Notch bisa dinyalakan terpisah.",
      en: "Frosted, Liquid, Matte, Classic glass + Wallpaper Tint; Windows, Squircle, macOS Pack, or Normalized icons. Toggle Dock & Notch independently.",
    },
    badge: { id: "Dock", en: "Dock" },
  },
  {
    id: "dock-ux",
    category: "dock",
    title: {
      id: "Live Window Preview, Drag-to-Pin & Drop to Open",
      en: "Live Window Previews, Drag-to-Pin & Drop to Open",
    },
    description: {
      id: "Lihat thumbnail jendela saat hover, seret file langsung ke ikon Dock untuk membuka, plus Downloads Stack & Recycle Bin.",
      en: "Hover for live window thumbnails, drop files onto Dock icons to open, plus Downloads Stack and Recycle Bin.",
    },
    badge: { id: "Dock", en: "Dock" },
  },
  {
    id: "dock-game-multimonitor",
    category: "dock",
    title: {
      id: "Multi-Monitor, Game Mode & Onboarding 5-Langkah",
      en: "Multi-Monitor, Game Mode & 5-Step Onboarding",
    },
    description: {
      id: "Target monitor Primary/Cursor/Spesifik, auto-hide saat game borderless fullscreen, dan wizard onboarding otomatis sync Taskbar.",
      en: "Target Primary/Cursor/Specific monitors, auto-hide on borderless fullscreen games, plus guided onboarding with Taskbar auto-sync.",
    },
    badge: { id: "Dock", en: "Dock" },
  },
  {
    id: "system-spotlight",
    category: "system",
    title: {
      id: "Spotlight (Alt+Space), File Search, DND & Per-App Volume",
      en: "Spotlight (Alt+Space), File Search, DND & Per-App Volume",
    },
    description: {
      id: "Cari file lokal & aksi daya (Sleep/Lock/Restart), kalkulator instan, Do Not Disturb, Wi-Fi, Bluetooth, dan Per-App Volume Mixer.",
      en: "Search local files & power actions (Sleep/Lock/Restart), instant calculator, Do Not Disturb, Wi-Fi, Bluetooth, and Per-App Volume Mixer.",
    },
    badge: { id: "System", en: "System" },
  },
];

export const SYSTEM_REQUIREMENTS = [
  {
    label: { id: "Sistem Operasi", en: "Operating System" },
    value: "Windows 10 (64-bit, build 1903+) / Windows 11",
    detail: {
      id: "Menggunakan Windows Runtime API (Media, Notifications, Bluetooth)",
      en: "Uses native Windows Runtime APIs (Media, Notifications, Bluetooth)",
    },
  },
  {
    label: { id: "Arsitektur & Runtime", en: "Architecture & Runtime" },
    value: "x64 (64-bit) • Microsoft Edge WebView2",
    detail: {
      id: "WebView2 sudah bawaan di Windows 11 & otomatis terpasang di Windows 10",
      en: "WebView2 is preinstalled on Windows 11 & auto-handled on Windows 10",
    },
  },
  {
    label: { id: "Memori (RAM)", en: "Memory (RAM)" },
    value: "4 GB RAM (Rekomendasi 8 GB+)",
    detail: {
      id: "Engine Rust + Tauri 2 hemat memori (JS heap dibatasi 80 MB)",
      en: "Lightweight Rust + Tauri 2 engine (JS heap capped at 80 MB)",
    },
  },
  {
    label: { id: "Penyimpanan", en: "Storage" },
    value: "~25 MB Ruang Kosong",
    detail: {
      id: "Installer NSIS hanya 3.4 MB (binary release 7.4 MB)",
      en: "NSIS installer is only 3.4 MB (7.4 MB release binary)",
    },
  },
  {
    label: { id: "Bahasa & Display", en: "Language & Display" },
    value: "Bahasa Indonesia & English • HiDPI / Multi-Monitor",
    detail: {
      id: "Mendukung layar 1080p hingga 4K serta setup multi-monitor",
      en: "Supports 1080p up to 4K displays and multi-monitor setups",
    },
  },
];

export const ROADMAP_ITEMS = [
  {
    done: true,
    title: {
      id: "Quick Media Source Switcher (Spotify vs Browser) & Live Window Thumbnails",
      en: "Quick Media Source Switcher (Spotify vs Browser) & Live Window Thumbnails",
    },
  },
  {
    done: true,
    title: {
      id: "Spotlight Pencarian File Lokal, Power Actions & Do Not Disturb",
      en: "Spotlight Local File Search, Power Actions & Do Not Disturb",
    },
  },
  {
    done: true,
    title: {
      id: "Notch Shelf, Clipboard History, Per-App Mixer & Onboarding 5-Langkah",
      en: "Notch Shelf, Clipboard History, Per-App Mixer & 5-Step Onboarding",
    },
  },
  {
    done: true,
    title: {
      id: "Toggle Dock / Notch Terpisah, Gaya Ikon Windows Asli & Game Auto-Hide",
      en: "Independent Dock / Notch Toggles, Native Windows Icons & Game Auto-Hide",
    },
  },
  {
    done: false,
    title: {
      id: "Live System Stats HUD (CPU / RAM / Network Speed) di Notch",
      en: "Live System Stats HUD (CPU / RAM / Network Speed) in Notch",
    },
  },
];

export interface PrivacyItem {
  id: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
}

export const PRIVACY_ITEMS: PrivacyItem[] = [
  {
    id: "no-telemetry",
    title: {
      id: "Nol Telemetri & Tanpa Akun",
      en: "Zero Telemetry & No Account",
    },
    description: {
      id: "Tidak ada analytics, pelacakan penggunaan, iklan, atau kewajiban login. Semua berjalan langsung di PC Windows kamu.",
      en: "No usage analytics, tracking SDKs, ads, or sign-in required. Everything runs directly on your Windows PC.",
    },
  },
  {
    id: "local-clipboard",
    title: {
      id: "Clipboard & File Shelf Lokal",
      en: "Local-Only Clipboard & File Shelf",
    },
    description: {
      id: "Riwayat Clip (maks. 25 item biasa / 40 total) dan thumbnail disimpan lokal di folder %APPDATA% perangkatmu, bukan ke cloud, dan bisa dihapus 1 klik.",
      en: "Clipboard history (capped at 25 unpinned / 40 total) and thumbnails are stored strictly in your local %APPDATA% folder, never uploaded, and clearable in 1 click.",
    },
  },
  {
    id: "local-notifications",
    title: {
      id: "Notifikasi & Media Diproses Lokal",
      en: "Local Notification & Media Reading",
    },
    description: {
      id: "Akses Windows Notification Listener & Media Control hanya dipakai di memori lokal untuk menampilkan pill Notch dan kontrol audio.",
      en: "Windows Notification Listener & Media Control are processed strictly in local memory to display Notch pills and playback controls.",
    },
  },
  {
    id: "minimal-network",
    title: {
      id: "Koneksi Keluar Minimal & Transparan",
      en: "Minimal, Transparent Network Calls",
    },
    description: {
      id: "Permintaan jaringan otomatis hanya ke API publik lrclib.net (judul/artis) saat mencari lirik lagu — tanpa mengirim data pribadi apa pun.",
      en: "Automatic network requests only query the public lrclib.net API (track title/artist) when fetching lyrics — never sending personal data.",
    },
  },
];

export const FAQ_ITEMS: Array<{ q: Record<Lang, string>; a: Record<Lang, string> }> = [
  {
    q: {
      id: "Apakah Wizzly benar-benar gratis?",
      en: "Is Wizzly completely free?",
    },
    a: {
      id: "Ya, Wizzly v0.1.0 gratis untuk diunduh dan digunakan dengan seluruh fitur Notch, Dock, dan Spotlight. Jika dukungan donasi komunitas mencukupi biaya pengembangan dan sertifikat code-signing, Wizzly direncanakan tetap gratis tanpa paywall Pro.",
      en: "Yes! Wizzly v0.1.0 is free to download and use with full Notch, Dock, and Spotlight features. If community donations support ongoing development and code-signing costs, Wizzly aims to stay free without locking features behind a Pro paywall.",
    },
  },
  {
    q: {
      id: "Apakah data clipboard atau notifikasi saya dikirim ke server?",
      en: "Is my clipboard history or notification data sent to any server?",
    },
    a: {
      id: "Tidak sama sekali. Seluruh riwayat clipboard disimpan lokal di folder %APPDATA% Windows kamu dan notifikasi diproses di memori lokal. Satu-satunya request eksternal otomatis hanyalah pencarian lirik lagu ke lrclib.net.",
      en: "Never. Clipboard history stays strictly in your local Windows %APPDATA% directory and notifications are read purely in local memory. The only automatic external request is optional lyrics lookup via lrclib.net.",
    },
  },
  {
    q: {
      id: "Apakah Wizzly berat di RAM atau bikin lag saat main game?",
      en: "Does Wizzly use a lot of RAM or lag games?",
    },
    a: {
      id: "Tidak. Wizzly dibangun memakai Rust + Tauri 2 (bukan Electron), ukuran installernya hanya 3.4 MB, dan dilengkapi deteksi borderless fullscreen agar otomatis bersembunyi saat bermain game.",
      en: "No. Wizzly is built with Rust + Tauri 2 (not Electron), the installer is only 3.4 MB, and it includes borderless fullscreen detection so it hides automatically while gaming.",
    },
  },
  {
    q: {
      id: "Kenapa Windows SmartScreen atau 1–2 scanner VirusTotal (mis. Arctic Wolf / SecureAge) memberi peringatan?",
      en: "Why do Windows SmartScreen or 1–2 VirusTotal heuristics (e.g. Arctic Wolf / SecureAge) flag the installer?",
    },
    a: {
      id: "Ini adalah false positive umum pada installer NSIS dan binary Rust/Tauri indie yang belum memiliki sertifikat Code Signing berbayar, ditambah penggunaan Win32 API untuk shortcut global (Alt+Space) dan kontrol jendela. Pastikan kamu mengunduh hanya dari GitHub Releases resmi dan verifikasi hash SHA-256 file installer sebelum dijalankan.",
      en: "This is a common false positive on unsigned NSIS installers and stripped Rust/Tauri binaries using legitimate Win32 APIs for global shortcuts (Alt+Space) and window management. Always download only from official GitHub Releases and verify the installer SHA-256 checksum.",
    },
  },
];
