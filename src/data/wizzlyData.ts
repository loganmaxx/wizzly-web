export type Lang = "id" | "en";

export const WIZZLY_META = {
  name: "Wizzly",
  version: "0.1.1",
  releaseDate: "2026-11-24",
  installerFile: "Wizzly_0.1.1_x64-setup.exe",
  installerSize: "3.5 MB",
  binarySize: "7.4 MB",
  sha256: "c2664a5009f6a90779725dc61e980a01d45a18c70452c85e972570eabc61334c",
  osSupport: "Windows 10 (1903+) & Windows 11 (64-bit)",
  engine: "Rust + Tauri 2 + Direct2D / D3D11",
  downloadUrl:
    "https://github.com/loganmaxx/wizzly/releases/download/V0.1.1/Wizzly_0.1.1_x64-setup.exe",
  releaseUrl: "https://github.com/loganmaxx/wizzly/releases/tag/V0.1.1",
  githubUrl: "https://github.com/loganmaxx/wizzly",
  siteUrl: "https://wizzly.web.id",
  donation: {
    paypalUrl: "https://paypal.me/adrn87",
    binancePayId: "977044132",
    qrisImage: "/images/qris.png",
    codeSigningGoal: {
      raisedUsd: 0,
      targetUsd: 200,
    },
  },
};

export interface CoffeeTier {
  id: string;
  cups: number;
  label: Record<Lang, string>;
  idrText: string;
  usdText: string;
  tagline: Record<Lang, string>;
  recommended?: boolean;
}

export const COFFEE_TIERS: CoffeeTier[] = [
  {
    id: "one-coffee",
    cups: 1,
    label: { id: "1 Kopi", en: "1 Coffee" },
    idrText: "Rp 15rb",
    usdText: "$3",
    tagline: { id: "Bensin ngoding malam", en: "Fuel a coding session" },
  },
  {
    id: "two-coffees",
    cups: 2,
    label: { id: "2 Kopi", en: "2 Coffees" },
    idrText: "Rp 30rb",
    usdText: "$5",
    tagline: { id: "Bantu fix bug & fitur baru", en: "Help ship fixes & features" },
    recommended: true,
  },
  {
    id: "code-signing",
    cups: 5,
    label: { id: "Code Sign", en: "Code Sign" },
    idrText: "Rp 100rb",
    usdText: "$15",
    tagline: { id: "Patungan hilangkan SmartScreen", en: "Fund SmartScreen removal" },
  },
];

export interface ReleaseNoteItem {
  title: Record<Lang, string>;
  detail: Record<Lang, string>;
}

export interface ReleaseNotes {
  version: string;
  date: string;
  added: ReleaseNoteItem[];
  changed: ReleaseNoteItem[];
  fixed: ReleaseNoteItem[];
}

export const RELEASE_NOTES_V011: ReleaseNotes = {
  version: "0.1.1",
  date: "2026-11-24",
  added: [
    {
      title: {
        id: "Rombakan Halaman Desktop Widget (Widget Gallery & Focused Inspector)",
        en: "Desktop Widget Page Overhaul (Widget Gallery & Focused Inspector)",
      },
      detail: {
        id: "Tab Widget di Settings kini berupa galeri visual 2×2 ala macOS dengan pratinjau langsung di atas wallpaper aktif, switch ON/OFF mandiri, badge status aktif (0/4–4/4), dan panel inspector terfokus per widget.",
        en: "Redesigned the Settings Widget tab into a macOS-style 2×2 visual gallery with live miniature previews over your active wallpaper, independent ON/OFF switches, active badge (0/4–4/4), and a focused inspector per widget.",
      },
    },
    {
      title: {
        id: "Desktop Clock Widget (Win32 + Direct2D / DirectWrite)",
        en: "Desktop Clock Widget (Win32 + Direct2D / DirectWrite)",
      },
      detail: {
        id: "Widget jam & tanggal native (~0% CPU saat idle) dengan 3 gaya (Liquid Glass, Glass Card, Sonoma), posisi Kiri/Tengah/Kanan, ukuran 56px–180px, jarak atas 24px–320px, dan Depth Effect PNG transparan.",
        en: "Native clock & date widget (~0% idle CPU) with 3 styles (Liquid Glass, Glass Card, Sonoma), Left/Center/Right alignment, 56px–180px sizing, 24px–320px top offset, and optional transparent PNG Depth Effect.",
      },
    },
    {
      title: {
        id: "Desktop Vinyl Turntable Music Widget",
        en: "Desktop Vinyl Turntable Music Widget",
      },
      detail: {
        id: "Pemutar musik native selebar 332px dengan piringan vinyl & cover album berputar, progress bar, kontrol Play/Pause/Prev/Next, serta gaya Nothing Light, Nothing Dark, dan Glass.",
        en: "332px-wide native music widget with spinning vinyl & album art, progress bar, clickable Play/Pause/Prev/Next controls, and Nothing Light, Nothing Dark, or Glass styles.",
      },
    },
    {
      title: {
        id: "Desktop Calendar & Agenda Widget",
        en: "Desktop Calendar & Agenda Widget",
      },
      detail: {
        id: "Kalender bulan ala macOS dalam tata letak Agenda (332px + agenda hari ini) atau Square (kompak), 3 gaya kartu (Glass / Nothing Light / Nothing Dark), agenda lokal, dan sinkronisasi URL iCal (.ics).",
        en: "Monthly macOS-style calendar in Agenda (332px + today's agenda) or Square (compact) layouts, 3 card styles (Glass / Nothing Light / Nothing Dark), local events, and iCal (.ics) URL sync.",
      },
    },
    {
      title: {
        id: "Desktop Sticky Memo & To-Do List Widget",
        en: "Desktop Sticky Memo & To-Do List Widget",
      },
      detail: {
        id: "Catatan cepat & checklist To-Do List selebar 332px dengan centang item langsung di kartu widget, tersedia dalam gaya Notes Yellow, Glass, Nothing Light, dan Nothing Dark.",
        en: "332px quick notes & To-Do List desktop widget supporting direct item checking on the card, styled in Notes Yellow, Glass, Nothing Light, or Nothing Dark.",
      },
    },
    {
      title: {
        id: "Quick Editor Popover, Magnetic Snap & Depth Layer Ordering",
        en: "Quick Editor Popover, Magnetic Snap & Depth Layer Ordering",
      },
      detail: {
        id: "Tombol Edit / + saat hover widget Kalender atau Memo membuka editor cepat langsung di desktop, dilengkapi Magnetic Snap antar widget dan z-order di atas lapisan Depth Clock.",
        en: "Hovering Calendar or Memo reveals an Edit / + quick editor popover directly on the desktop, paired with Magnetic Snap alignment across cards and z-ordering above the Depth Clock layer.",
      },
    },
    {
      title: {
        id: "Floating Karaoke Lyrics Window",
        en: "Floating Karaoke Lyrics Window",
      },
      detail: {
        id: "Mengganti tombol pin pada Wizzly Notch menjadi jendela lirik karaoke mengambang (shadowless) yang mendukung resize bebas 8 arah.",
        en: "Replaced the pin button on Wizzly Notch with a shadowless floating karaoke lyrics window supporting 8-direction free resizing.",
      },
    },
    {
      title: {
        id: "Animasi Genie Effect ala macOS (GPU Direct3D11 + DirectComposition VSync)",
        en: "macOS-Style Genie Effect (GPU Direct3D11 + DirectComposition VSync)",
      },
      detail: {
        id: "Animasi Minimize & Restore melengkung tepat ke koordinat ikon Dock terkunci VSync monitor dengan 0 MB overhead saat idle, mendukung tombol - titlebar, Auto-Hide Dock, pre-minimized restore, dan popover lembut.",
        en: "Curved VSync-locked Minimize & Restore animations directly into Dock icon coordinates with 0 MB idle overhead, supporting titlebar '-' button, Auto-Hide Dock, pre-minimized restore, and smooth popovers.",
      },
    },
    {
      title: {
        id: "Tab Sidebar Widget, Click-to-Minimize & Tombol Win untuk Launchpad",
        en: "Widget Sidebar Tab, Click-to-Minimize & Win-Key Launchpad",
      },
      detail: {
        id: "Kategori Widget terpisah di Settings, klik ulang ikon Dock fokus untuk minimize dengan animasi tuck, serta toggle opsional tombol Win untuk membuka Wizzly Launchpad (Win+E/D/R/L & Ctrl+Esc tetap normal).",
        en: "Dedicated Widget tab in Settings, click-to-minimize focused single-window Dock icons with tuck animation, plus optional Win-key tap to open Wizzly Launchpad (Win+E/D/R/L & Ctrl+Esc preserved).",
      },
    },
  ],
  changed: [
    {
      title: {
        id: "Auto-Adaptive Wallpaper Backdrop di Dock",
        en: "Auto-Adaptive Wallpaper Backdrop on Dock",
      },
      detail: {
        id: "Kalibrasi ulang warna wallpaper pada gaya Frosted & Liquid, serta transisi halus kembali ke kaca netral saat ada jendela aplikasi menutupi area Dock.",
        en: "Recalibrated wallpaper tint in Frosted & Liquid styles and added smooth fade back to neutral glass whenever an app window overlaps the Dock area.",
      },
    },
    {
      title: {
        id: "Responsivitas Slider Settings",
        en: "Settings Slider Responsiveness",
      },
      detail: {
        id: "Debounce penyimpanan konfigurasi dan penjagaan cache Direct2D/wallpaper agar geseran slider ukuran maupun posisi widget jam tetap mulus.",
        en: "Added config save debouncing and Direct2D/wallpaper cache preservation so dragging clock size or position sliders stays silky smooth.",
      },
    },
  ],
  fixed: [
    {
      title: {
        id: "Pencegahan Double Start Menu & Toggle Tombol Win",
        en: "Prevented Double Start Menu & Fixed Win Key Toggle",
      },
      detail: {
        id: "Menekan tombol Win saat Wizzly Launchpad terbuka kini langsung menutup Launchpad tanpa memunculkan Start/Search native Windows secara bersamaan.",
        en: "Pressing the Win key while Wizzly Launchpad is open now cleanly closes Launchpad without triggering native Windows Start/Search simultaneously.",
      },
    },
    {
      title: {
        id: "Toggle Aktif/Nonaktif Wizzly Notch Langsung Berlaku Tanpa Restart",
        en: "Instant Wizzly Notch Enable/Disable Without Restart",
      },
      detail: {
        id: "Mematikan atau menyalakan Wizzly Notch di Settings langsung diterapkan seketika dan membebaskan memori WebView2 Notch saat dimatikan.",
        en: "Toggling Wizzly Notch on or off in Settings now applies immediately and frees the Notch WebView2 memory when disabled.",
      },
    },
  ],
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
      id: "Media Player, Source Switcher & Floating Karaoke",
      en: "Media Player, Source Switcher & Floating Karaoke",
    },
    description: {
      id: "Kontrol musik dengan seekbar, pilih sumber media aktif (Spotify vs Browser), plus jendela lirik karaoke mengambang yang bisa di-resize 8 arah.",
      en: "Playback controls with seekbar, instant media source switcher (Spotify vs browser), plus a shadowless 8-way resizable floating karaoke lyrics window.",
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
      id: "Auto-Adaptive Dock, Genie Effect & Click-to-Minimize",
      en: "Auto-Adaptive Dock, Genie Effect & Click-to-Minimize",
    },
    description: {
      id: "Material Frosted, Liquid, Matte, Classic dengan adaptasi warna wallpaper otomatis, animasi Genie GPU Direct3D11 VSync, dan klik ulang untuk minimize.",
      en: "Frosted, Liquid, Matte, Classic glass with adaptive wallpaper backdrop, VSync-locked Direct3D11 Genie Effect, and click-to-minimize.",
    },
    badge: { id: "Dock", en: "Dock" },
  },
  {
    id: "desktop-widgets",
    category: "system",
    title: {
      id: "4 Native Desktop Widgets (Direct2D + Magnetic Snap)",
      en: "4 Native Desktop Widgets (Direct2D + Magnetic Snap)",
    },
    description: {
      id: "Clock dengan Depth Effect, Vinyl Turntable, Calendar & iCal (.ics), serta Sticky Memo To-Do dengan Quick Editor dan Magnetic Snap.",
      en: "Depth Effect Clock, Vinyl Turntable, Calendar with iCal (.ics) sync, and Sticky Memo To-Do with Quick Editor and Magnetic Snap.",
    },
    badge: { id: "Widgets", en: "Widgets" },
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
      id: "Spotlight (Alt+Space), Win-Key Launchpad & Per-App Mixer",
      en: "Spotlight (Alt+Space), Win-Key Launchpad & Per-App Mixer",
    },
    description: {
      id: "Cari file lokal & aksi daya, kalkulator instan, opsi tombol Win untuk Launchpad, Do Not Disturb, Wi-Fi, Bluetooth, dan Per-App Volume Mixer.",
      en: "Local file search & power actions, instant calculator, optional Win-key Launchpad trigger, DND, Wi-Fi, Bluetooth, and Per-App Volume Mixer.",
    },
    badge: { id: "System", en: "System" },
  },
];

export const SYSTEM_REQUIREMENTS = [
  {
    label: { id: "Sistem Operasi", en: "Operating System" },
    value: "Windows 10 (64-bit, build 1903+) / Windows 11",
    detail: {
      id: "Menggunakan Windows Runtime API, Direct2D & Direct3D11/DirectComposition",
      en: "Uses native Windows Runtime APIs, Direct2D & Direct3D11/DirectComposition",
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
    value: "~35 MB Core • ~185 MB Total (dengan WebView2 saat Notch aktif)",
    detail: {
      id: "Proses inti Rust hanya ~35 MB (+ ~150 MB WebView2 saat Notch aktif); Widget Direct2D ~0% CPU & Genie 0 MB saat idle",
      en: "Rust core process uses ~35 MB (+ ~150 MB WebView2 while Notch is active); Direct2D widgets ~0% idle CPU & 0 MB idle Genie",
    },
  },
  {
    label: { id: "Penyimpanan", en: "Storage" },
    value: "~25 MB Ruang Kosong",
    detail: {
      id: "Installer NSIS hanya 3.5 MB (rilis v0.1.1)",
      en: "NSIS installer is only 3.5 MB (v0.1.1 release)",
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
      id: "Desktop Widgets (Clock Depth, Vinyl, Calendar .ics & Memo To-Do)",
      en: "Desktop Widgets (Depth Clock, Vinyl, .ics Calendar & To-Do Memo)",
    },
  },
  {
    done: true,
    title: {
      id: "Animasi Genie Effect GPU Direct3D11 VSync & Floating Karaoke",
      en: "GPU Direct3D11 VSync Genie Effect & Floating Karaoke Lyrics",
    },
  },
  {
    done: true,
    title: {
      id: "Spotlight File Search, Tombol Win Launchpad & Click-to-Minimize",
      en: "Spotlight File Search, Win-Key Launchpad & Click-to-Minimize",
    },
  },
  {
    done: true,
    title: {
      id: "Notch Shelf, Clipboard History, Per-App Mixer & Game Auto-Hide",
      en: "Notch Shelf, Clipboard History, Per-App Mixer & Game Auto-Hide",
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
      id: "Clipboard, Shelf, Memo & Agenda Lokal",
      en: "Local-Only Clipboard, Shelf, Memo & Agenda",
    },
    description: {
      id: "Riwayat Clip, thumbnail Shelf, catatan Memo/To-Do, dan agenda kalender lokal disimpan di folder %APPDATA% perangkatmu, bukan ke cloud.",
      en: "Clipboard history, Shelf thumbnails, Memo/To-Do items, and local calendar events stay strictly in your local %APPDATA% folder, never uploaded.",
    },
  },
  {
    id: "local-notifications",
    title: {
      id: "Notifikasi & Media Diproses Lokal",
      en: "Local Notification & Media Reading",
    },
    description: {
      id: "Akses Windows Notification Listener & Media Control hanya dipakai di memori lokal untuk menampilkan pill Notch, kontrol audio, dan widget Vinyl.",
      en: "Windows Notification Listener & Media Control are processed strictly in local memory for Notch pills, audio controls, and the Vinyl widget.",
    },
  },
  {
    id: "minimal-network",
    title: {
      id: "Koneksi Keluar Minimal & Transparan",
      en: "Minimal, Transparent Network Calls",
    },
    description: {
      id: "Permintaan jaringan hanya ke API publik lrclib.net (judul/artis) untuk lirik serta URL iCal (.ics) pilihanmu sendiri bila sinkronisasi kalender diaktifkan.",
      en: "External requests only contact public lrclib.net (track title/artist) for lyrics and your own configured iCal (.ics) URL if calendar sync is enabled.",
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
      id: "Ya, Wizzly v0.1.1 gratis untuk diunduh dan digunakan dengan seluruh fitur Notch, Dock, Desktop Widgets (Clock, Vinyl, Calendar, Memo), Genie Effect, dan Spotlight. Jika dukungan donasi komunitas mencukupi biaya pengembangan dan sertifikat code-signing, Wizzly direncanakan tetap gratis tanpa paywall Pro.",
      en: "Yes! Wizzly v0.1.1 is free to download and use with full Notch, Dock, Desktop Widgets (Clock, Vinyl, Calendar, Memo), Genie Effect, and Spotlight features. If community donations cover development and code-signing costs, Wizzly aims to stay free without a Pro paywall.",
    },
  },
  {
    q: {
      id: "Apakah Desktop Widgets dan Genie Effect memakan banyak RAM/CPU?",
      en: "Do the new Desktop Widgets and Genie Effect use a lot of RAM or CPU?",
    },
    a: {
      id: "Tidak. Keempat Desktop Widget (Clock, Vinyl, Calendar, Memo) dirender native menggunakan Win32 + Direct2D/DirectWrite tanpa membuka proses WebView2 baru (~0% CPU saat idle). Animasi Genie Effect juga berjalan di GPU Direct3D11 + DirectComposition dengan 0 MB overhead saat idle.",
      en: "No. All four Desktop Widgets (Clock, Vinyl, Calendar, Memo) are rendered natively via Win32 + Direct2D/DirectWrite without spawning extra WebView2 processes (~0% idle CPU). The Genie Effect runs on Direct3D11 + DirectComposition with 0 MB idle overhead.",
    },
  },
  {
    q: {
      id: "Apakah data clipboard, memo, atau notifikasi saya dikirim ke server?",
      en: "Is my clipboard history, memo, or notification data sent to any server?",
    },
    a: {
      id: "Tidak sama sekali. Seluruh riwayat clipboard, sticky memo, dan agenda lokal disimpan di folder %APPDATA% Windows kamu dan notifikasi diproses di memori lokal. Request eksternal hanya terjadi saat mencari lirik ke lrclib.net atau mengambil URL iCal (.ics) yang kamu masukkan sendiri.",
      en: "Never. Clipboard history, sticky memos, and local events stay strictly in your local Windows %APPDATA% directory and notifications are read purely in local memory. External requests only happen for optional lrclib.net lyrics lookup or your own configured iCal (.ics) feed.",
    },
  },
  {
    q: {
      id: "Apakah Wizzly berat di RAM atau bikin lag saat main game?",
      en: "Does Wizzly use a lot of RAM or lag games?",
    },
    a: {
      id: "Tidak. Wizzly dibangun memakai Rust + Tauri 2 (bukan Electron) dengan installer hanya 3.5 MB. Di Windows, proses inti Wizzly hanya memakai sekitar ~35 MB RAM (atau total ~185 MB termasuk WebView2 saat Notch aktif, yang otomatis dibebaskan jika Notch dimatikan), dan langsung bersembunyi saat game borderless fullscreen.",
      en: "No. Wizzly is built with Rust + Tauri 2 (not Electron) with a 3.5 MB installer. On Windows, Wizzly's core process uses around ~35 MB RAM (~185 MB total including WebView2 while Notch is active, freed immediately when Notch is toggled off), and auto-hides during borderless fullscreen games.",
    },
  },
  {
    q: {
      id: "Kenapa Windows SmartScreen atau 1–2 scanner VirusTotal memberi peringatan?",
      en: "Why do Windows SmartScreen or 1–2 VirusTotal heuristics flag the installer?",
    },
    a: {
      id: "Ini adalah false positive umum pada installer NSIS dan binary Rust/Tauri indie yang belum memiliki sertifikat Code Signing berbayar, ditambah penggunaan Win32 API untuk shortcut global (Alt+Space / tombol Win opsional) dan animasi jendela. Pastikan kamu mengunduh hanya dari GitHub Releases resmi dan verifikasi hash SHA-256 sebelum dijalankan.",
      en: "This is a common false positive on unsigned NSIS installers and stripped Rust/Tauri binaries using legitimate Win32 APIs for global shortcuts (Alt+Space / optional Win key) and window animations. Always download only from official GitHub Releases and verify the installer SHA-256 checksum.",
    },
  },
];
