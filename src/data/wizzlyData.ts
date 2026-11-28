export type Lang = "id" | "en";

export const WIZZLY_META = {
  name: "Wizzly",
  version: "0.1.3",
  releaseDate: "2026-11-27",
  installerFile: "Wizzly_0.1.3_x64-setup.exe",
  installerSize: "3.9 MB",
  binarySize: "7.4 MB",
  sha256: "dfdfdc39925b9f452b22dd3e4677c973a666cff6711e3bbfc38f808f5e534eef",
  osSupport: "Windows 10 (1903+) & Windows 11 (64-bit)",
  engine: "Rust + Tauri 2 + Direct2D / D3D11",
  downloadUrl:
    "https://github.com/loganmaxx/wizzly/releases/download/v0.1.3/Wizzly_0.1.3_x64-setup.exe",
  msStoreUrl:
    "https://apps.microsoft.com/detail/9P55JHTK8K8K?hl=en-us&gl=ID&ocid=pdpshare",
  msStoreProductId: "9P55JHTK8K8K",
  releaseUrl: "https://github.com/loganmaxx/wizzly/releases/tag/v0.1.3",
  githubUrl: "https://github.com/loganmaxx/wizzly",
  siteUrl: "https://wizzly.web.id",
  donation: {
    paypalUrl: "https://paypal.me/adrn87",
    binancePayId: "977044132",
    qrisImage: "/images/qris.png",
    codeSigningGoal: {
      raisedUsd: 11,
      targetUsd: 200,
    },
    contact: {
      telegramHandle: "@ntpsbl",
      telegramUrl: "https://t.me/ntpsbl",
      email: "support@wizzly.web.id",
      discordUsername: "funblue",
      formSubmitEndpoint: "https://formsubmit.co/ajax/support@wizzly.web.id",
      formSubmitStandardEndpoint: "https://formsubmit.co/support@wizzly.web.id",
    },
  },
};

export const V012_SECURITY_ANNOUNCEMENT = {
  badge: {
    id: "Pengumuman Penting • Pengguna v0.1.2",
    en: "Important Notice • v0.1.2 Users",
  },
  title: {
    id: "Wajib Update ke v0.1.3 via Web — Auto-Update Dihapus (False Positive Defender)",
    en: "Please Update to v0.1.3 via Web — Auto-Updater Removed (Defender False Positive)",
  },
  body: {
    id: "Pada Wizzly v0.1.2, fitur auto-update dianggap malware (false positive) oleh Microsoft Defender sehingga aplikasi berhenti berjalan. Di v0.1.3, auto-update telah dihapus agar berjalan lancar. Sangat disarankan download langsung lewat web (.exe) — versi Microsoft Store saat ini kurang stabil dan Dock tidak langsung muncul saat PC pertama kali dinyalakan.",
    en: "In Wizzly v0.1.2, the auto-updater was falsely flagged as malware by Microsoft Defender, causing the app to stop running. In v0.1.3, auto-update has been removed for smooth operation. Downloading directly via the web (.exe) is strongly recommended — the Microsoft Store build is currently less stable and the Dock may not appear immediately on first PC startup.",
  },
  ctaDownload: {
    id: "Unduh via Web (Disarankan)",
    en: "Download via Web (Recommended)",
  },
  ctaMsStore: {
    id: "Microsoft Store",
    en: "Microsoft Store",
  },
  ctaChangelog: {
    id: "Changelog",
    en: "Changelog",
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

export type DonationChannel = "qris" | "paypal" | "binance" | "feedback";
export type SupporterFeatureStatus = "reviewing" | "planned" | "in-progress" | "shipped";

export interface SupporterWallItem {
  id: string;
  name: string;
  tierLabel: Record<Lang, string>;
  amountText?: string;
  channel: DonationChannel;
  date: string;
  message: string;
  featureRequest?: string;
  featureArea?: string;
  featureStatus?: SupporterFeatureStatus;
  devReply?: {
    author: string;
    date: string;
    message: string;
  };
}

/**
 * Verified Supporter Wall & Feature Requests.
 * Add verified donor messages, feature requests, and your developer replies here
 * after receiving confirmation via Email, Telegram (@ntpsbl), or Discord (funblue).
 */
export const SUPPORTER_WALL_ITEMS: SupporterWallItem[] = [];

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
  withdrawn?: boolean;
  notice?: {
    tone: "warning" | "info";
    title: Record<Lang, string>;
    detail: Record<Lang, string>;
  };
  summary: Record<Lang, string>;
  added: ReleaseNoteItem[];
  changed: ReleaseNoteItem[];
  fixed: ReleaseNoteItem[];
}

export const RELEASE_NOTES_V013: ReleaseNotes = {
  version: "0.1.3",
  date: "2026-11-27",
  notice: {
    tone: "warning",
    title: {
      id: "Pengumuman untuk Pengguna v0.1.2 — Auto-Update Dihapus",
      en: "Notice for v0.1.2 Users — Auto-Updater Removed",
    },
    detail: {
      id: "Fitur auto-update pada v0.1.2 sebelumnya dianggap malware (false positive) oleh Microsoft Defender sehingga membuat aplikasi berhenti berjalan. Di v0.1.3, auto-update telah dihapus sepenuhnya agar Wizzly bisa berjalan lebih lancar. Wajib update ke versi 0.1.3 ini.",
      en: "The auto-updater in v0.1.2 was falsely flagged as malware by Microsoft Defender, causing the app to stop running. In v0.1.3, auto-update has been completely removed so Wizzly runs smoothly. Please update to v0.1.3.",
    },
  },
  summary: {
    id: "Menghapus In-App Auto-Updater untuk mengatasi false positive Microsoft Defender dari v0.1.2, sekaligus membawa Jadwal Sholat & Adzan, Privacy Mic/Kamera, Spaces Switcher, Winamp, dan lokalisasi komunitas. Disarankan mengunduh lewat installer web (.exe) untuk stabilitas terbaik.",
    en: "Removes the In-App Auto-Updater to resolve Microsoft Defender false positives from v0.1.2, while shipping Prayer Times & Adhan reminders, live Mic/Camera privacy indicators, Spaces Switcher, Winamp support, and community locales. Direct web (.exe) download is recommended for best stability.",
  },
  added: [
    {
      title: {
        id: "Tersedia di Microsoft Store (Alternatif — Installer Web Tetap Disarankan)",
        en: "Listed on Microsoft Store (Alternative — Web Installer Recommended)",
      },
      detail: {
        id: "Wizzly v0.1.3 kini tersedia di Microsoft Store sebagai opsi alternatif. Namun versi Store saat ini masih kurang stabil dan Dock tidak langsung muncul saat pertama kali PC dihidupkan — sangat disarankan menggunakan installer langsung via web (.exe).",
        en: "Wizzly v0.1.3 is now listed on the Microsoft Store as an alternative. However, the Store build is currently less stable and the Dock does not appear immediately on first PC startup — downloading the direct web (.exe) installer is strongly recommended.",
      },
    },
    {
      title: {
        id: "Jadwal Sholat & Pengingat Adzan di Wizzly Notch",
        en: "Prayer Times & Adhan Reminders in Wizzly Notch",
      },
      detail: {
        id: "Tab Prayer Times di Notch & sub-tab Prayer di Settings (perhitungan lokal via adhan) untuk 5 waktu sholat, Sunrise, tanggal Hijriah, countdown & progress bar, metode Auto/Kemenag/MWL/ISNA/Umm Al-Qura, mazhab Shafi/Hanafi, mode pill ringkas, pengingat suara, pencarian kota, deteksi lokasi otomatis, serta koordinat manual.",
        en: "Dedicated Prayer Times tab in Notch & Prayer sub-tab in Settings powered locally by adhan: 5 daily prayers, Sunrise, Hijri date, countdown & progress bar, Auto/Kemenag/MWL/ISNA/Umm Al-Qura methods, Shafi/Hanafi madhab, compact pill mode, sound reminders, city search, auto-location, and manual coordinates.",
      },
    },
    {
      title: {
        id: "Mode Auto-Hide Seragam (Smart / Always / Never) untuk Dock & Notch",
        en: "Uniform Auto-Hide (Smart / Always / Never) for Dock & Notch",
      },
      detail: {
        id: "Mode Smart Dock tetap tampil rapi di desktop di atas Depth Clock & widget, mengalah di bawah jendela maximized, dan naik saat kursor menyentuh tepi bawah layar. Auto-Hide Notch kini memiliki 3 mode seragam (Smart, Always, Never).",
        en: "Refined Smart Dock auto-hide (stays on desktop above Depth Clock & widgets, yields cleanly beneath maximized windows, rises on bottom-edge hover), plus unified 3-mode Auto-Hide for Notch (Smart, Always, Never).",
      },
    },
    {
      title: {
        id: "Pemilih & Ganti Lirik Manual di Notch & Karaoke Mode",
        en: "Manual Lyrics Picker in Notch & Karaoke Mode",
      },
      detail: {
        id: "Tombol Ganti Lirik / Change Lyrics dengan pencarian kandidat LRCLIB (badge SYNC/TEXT/INST, durasi) serta penyimpanan pilihan lirik per lagu yang tersinkronisasi antara Notch dan Karaoke Mode.",
        en: "Added a Change Lyrics search picker backed by LRCLIB (SYNC/TEXT/INST badges, duration) with per-track saved overrides synced across Notch and Karaoke Mode.",
      },
    },
    {
      title: {
        id: "Indikator Aplikasi Berkedip (HSHELL_FLASH) & Deteksi UAC",
        en: "Window Attention Flash (HSHELL_FLASH) & Background UAC Detection",
      },
      detail: {
        id: "Animasi pantul & titik amber berkedip pada ikon Dock, auto-peek Dock sementara, alert Notch click-to-focus, serta pemantauan prompt UAC (consent.exe) di background saat Taskbar dalam mode Hide Total.",
        en: "Dock icon bounce + flashing amber indicator, temporary Dock auto-peek, click-to-focus Notch alert, and background UAC prompt (consent.exe) detection when the Windows Taskbar is set to Hide Total.",
      },
    },
    {
      title: {
        id: "Dukungan Media & Cover Art Winamp (Winamp v1.x)",
        en: "Classic Winamp (Winamp v1.x) Media & Cover Art Support",
      },
      detail: {
        id: "Integrasi pemutar Winamp klasik via Win32 IPC lengkap dengan judul, artis, kontrol Play/Pause/Next/Prev/Seek, durasi, timeline, dan ekstraksi cover art (ID3v2, FLAC, Shell Thumbnail, folder art).",
        en: "Classic Winamp integration via Win32 IPC with title, artist, Play/Pause/Next/Prev/Seek, duration, timeline, and cover art extraction from ID3v2 tags, FLAC metadata, Windows Shell Thumbnails, and local folder art.",
      },
    },
    {
      title: {
        id: "Opsi Tampilkan / Sembunyikan Jam di Notch",
        en: "Show / Hide Notch Clock Option",
      },
      detail: {
        id: "Toggle baru di Settings → Notch untuk menampilkan atau menyembunyikan jam digital pada pill Notch sesuai preferensi.",
        en: "Added a toggle in Settings → Notch to show or hide the digital clock in the compact Notch pill.",
      },
    },
    {
      title: {
        id: "Virtual Desktops / Spaces Switcher di Dock",
        en: "Virtual Desktops / Spaces Switcher in Dock",
      },
      detail: {
        id: "Tombol ikon monitor di pojok kanan Dock dengan popover Spaces untuk berpindah desktop (klik / scroll wheel), membuat & menutup desktop, serta membuka Task View (Win + Tab).",
        en: "Dedicated monitor button on the right side of the Dock with a Spaces popover to switch desktops (click or scroll wheel), create/close desktops, and open Task View (Win + Tab).",
      },
    },
    {
      title: {
        id: "OSD Volume & Kecerahan Eksklusif di Wizzly Notch",
        en: "Exclusive Volume & Brightness OSD in Wizzly Notch",
      },
      detail: {
        id: "Penyembunyian OSD bawaan Windows 11 yang lebih akurat & responsif, lengkap dengan toggle Notifikasi Volume & Kecerahan di Notch pada Settings.",
        en: "Faster, more accurate native Windows 11 flyout suppression paired with a dedicated Volume & Brightness OSD in Notch toggle in Settings.",
      },
    },
    {
      title: {
        id: "Sistem Lokalisasi Komunitas & Bahasa Eksternal (locales/*.json)",
        en: "Community Localization & External Languages (locales/*.json)",
      },
      detail: {
        id: "Dukungan file bahasa eksternal di %AppData%\\com.wizzly.app\\locales\\*.json lengkap dengan Import JSON..., Locales Folder, Reload, kredit penerjemah, dan deteksi otomatis bahasa Windows.",
        en: "External language file support in %AppData%\\com.wizzly.app\\locales\\*.json with Import JSON..., Locales Folder, Reload, translator credits, and automatic Windows locale detection.",
      },
    },
  ],
  changed: [
    {
      title: {
        id: "Penghapusan In-App Auto-Updater (Bebas False Positive Microsoft Defender)",
        en: "Removed In-App Auto-Updater (Microsoft Defender False-Positive Fix)",
      },
      detail: {
        id: "Menghapus modul pembaruan otomatis (tauri-plugin-updater) dari build v0.1.2 yang sebelumnya dianggap malware oleh Microsoft Defender dan membuat aplikasi berhenti berjalan. Pembaruan kini dilakukan secara aman via installer resmi GitHub Releases.",
        en: "Completely removed the built-in auto-updater (tauri-plugin-updater) from the withdrawn v0.1.2 build that triggered Microsoft Defender false positives and stopped the app. Updates are now distributed cleanly via official GitHub Releases.",
      },
    },
    {
      title: {
        id: "Optimasi Performa CPU & GPU WebView2 (Idle ~0% CPU)",
        en: "WebView2 CPU/GPU & Backend Idle Performance Optimizations (~0% Idle CPU)",
      },
      detail: {
        id: "Mengganti efek berat (backdrop-filter: blur, live blur wallpaper, drop-shadow per ikon, SVG noise inline) dengan tekstur noise PNG statis & pre-blur wallpaper sekali di canvas, memindahkan magnifikasi Dock ke rAF DOM (~60 FPS), serta melonggarkan polling Win32 saat idle.",
        en: "Replaced expensive live effects (backdrop-filter: blur, live wallpaper blur, per-icon drop-shadow, inline SVG noise) with static PNG noise & one-time canvas pre-blur, moved Dock magnification to rAF-batched DOM transforms (~60 FPS), and reduced idle Win32 polling.",
      },
    },
    {
      title: {
        id: "Live Privacy Indicators (Mikrofon & Kamera Aktif) di Notch",
        en: "Live Privacy Indicators (Active Mic & Camera) in Wizzly Notch",
      },
      detail: {
        id: "Indikator titik berdenyut oranye (Mic) & hijau (Kamera) secara real-time di pill Notch, alert animasi instan beserta nama aplikasi yang mengakses, dan badge ringkas saat Notch expanded.",
        en: "Real-time pulsing orange (Mic) & green (Camera) indicators in the compact Notch pill, instant animated alerts naming the active app, and compact header badges when expanded.",
      },
    },
    {
      title: {
        id: "Animasi Event Hardware, Ring Baterai Bluetooth & Equalizer WASAPI",
        en: "Richer Hardware Event Animations, Bluetooth Battery Ring & WASAPI Equalizer",
      },
      detail: {
        id: "Animasi pengisian daya, alert baterai penuh/lemah/Battery Saver, persentase perangkat Bluetooth dengan Circular SVG Battery Ring & ikon perangkat, deteksi perpindahan output audio anti-bentrok, equalizer audio WASAPI reaktif asli, serta animasi Volume/Brightness/Wi-Fi dinamis.",
        en: "Charging animation, Full/Low/Battery Saver alerts, Bluetooth battery readout with Circular SVG Ring & device icons, clash-free audio output switch detection, real WASAPI reactive equalizer, and dynamic Volume, Brightness & Wi-Fi animations.",
      },
    },
    {
      title: {
        id: "Penyempurnaan Start / Launchpad Popover 5×3",
        en: "Refined 5×3 Start / Launchpad Popover",
      },
      detail: {
        id: "Tata letak 5×3 yang lebih lega, kontras lebih baik di atas jendela aplikasi lain, rendering WebView2 lebih ringan, serta fallback inisial otomatis saat ikon gagal dimuat.",
        en: "Roomier 5×3 grid layout, improved contrast over background windows, lighter WebView2 rendering, and automatic initial fallback when an icon fails to load.",
      },
    },
  ],
  fixed: [
    {
      title: {
        id: "Aplikasi Berhenti Berjalan / Diblokir Microsoft Defender di v0.1.2",
        en: "App Stopped Running / Flagged by Microsoft Defender in v0.1.2",
      },
      detail: {
        id: "Menghapus komponen auto-updater yang memicu deteksi malware (false positive) pada Microsoft Defender sehingga Wizzly v0.1.3 kembali berjalan stabil dan lancar.",
        en: "Removed the auto-updater component that triggered Microsoft Defender malware false positives, allowing Wizzly v0.1.3 to run reliably without interruption.",
      },
    },
    {
      title: {
        id: "Auto-Hide Dock Mode Smart & Deteksi Fullscreen Saat Taskbar Tersembunyi",
        en: "Smart Auto-Hide Dock Focus Switching & False Fullscreen Detection",
      },
      detail: {
        id: "Dock mode Smart kini muncul andal saat berpindah fokus antar aplikasi maximized (mis. VS Code → Spotify) dan memperbaiki false positive fullscreen ketika Taskbar disembunyikan.",
        en: "Smart Auto-Hide Dock now reliably appears when switching focus between maximized apps (e.g. VS Code → Spotify) and no longer falsely triggers fullscreen mode when the Taskbar is hidden.",
      },
    },
    {
      title: {
        id: "Akurasi Pencocokan Lirik & Retry Cover Art SMTC + Fallback iTunes",
        en: "Lyrics Matching Accuracy & SMTC Album Art Retry with iTunes Fallback",
      },
      detail: {
        id: "Meningkatkan akurasi pencocokan judul Remastered / Mix / Radio Edit / Live agar tidak salah lagu, serta menambahkan retry otomatis dan fallback iTunes Search untuk cover art Notch.",
        en: "Improved lyrics matching for Remastered / Mix / Radio Edit / Live titles so mismatched songs no longer load, and added automatic SMTC thumbnail retries with iTunes Search fallback.",
      },
    },
    {
      title: {
        id: "Dialog Extract ZIP & Windows Shell Wizard di Bawah OSD Suppressor",
        en: "Extract ZIP & Windows Shell Wizards Under OSD Suppressor",
      },
      detail: {
        id: "Dialog Extract ZIP Windows Explorer dan wizard shell lainnya tidak lagi ikut tersembunyi saat OSD Suppressor aktif.",
        en: "Windows Explorer Extract ZIP dialogs and other shell wizards are no longer hidden while the native OSD suppressor is enabled.",
      },
    },
    {
      title: {
        id: "Material Kaca Launchpad, Depth Clock DND & Ikon UWP Minimize",
        en: "Launchpad Glass Surface, DND Quiet Moments & Minimized UWP Icons",
      },
      detail: {
        id: "Memperbaiki garis horizontal berulang & kaca Launchpad, mencegah DND menyala otomatis saat Depth Clock aktif serta membersihkan Quiet Moments Windows saat dimatikan, dan menjaga ikon aplikasi sistem/UWP tetap tampil di Dock saat di-minimize.",
        en: "Fixed Launchpad glass material & repeating line artifact, prevented unwanted DND activation with Depth Clock and properly cleared Windows Quiet Moments on turn-off, and kept minimized system/UWP app icons visible in the Dock.",
      },
    },
  ],
};

export const RELEASE_NOTES_V012: ReleaseNotes = {
  version: "0.1.2",
  date: "2026-11-26",
  withdrawn: true,
  notice: {
    tone: "warning",
    title: {
      id: "Rilis v0.1.2 Ditarik — Segera Update ke v0.1.3",
      en: "v0.1.2 Withdrawn — Please Update to v0.1.3",
    },
    detail: {
      id: "Fitur In-App Auto-Updater di v0.1.2 terdeteksi sebagai malware (false positive) oleh Microsoft Defender sehingga aplikasi berhenti berjalan. Gunakan v0.1.3 yang telah menghapus auto-update dan menyertakan semua fitur v0.1.2.",
      en: "The In-App Auto-Updater in v0.1.2 was falsely flagged as malware by Microsoft Defender, causing the app to stop running. Use v0.1.3, which removes auto-update while keeping every v0.1.2 feature.",
    },
  },
  summary: {
    id: "(Ditarik — digantikan oleh v0.1.3) Jadwal Sholat & Adzan di Notch, indikator privasi Mic/Kamera, Spaces Switcher, Winamp, dan sistem lokalisasi komunitas.",
    en: "(Withdrawn — superseded by v0.1.3) Prayer Times & Adhan reminders in Notch, live Mic/Camera privacy indicators, Spaces Switcher, Winamp, and community locales.",
  },
  added: [
    {
      title: {
        id: "Jadwal Sholat & Pengingat Adzan di Wizzly Notch",
        en: "Prayer Times & Adhan Reminders in Wizzly Notch",
      },
      detail: {
        id: "Tab Prayer Times di Notch & sub-tab Prayer di Settings (perhitungan lokal via adhan) untuk 5 waktu sholat, Sunrise, tanggal Hijriah, countdown & progress bar, metode Kemenag/MWL/ISNA/Umm Al-Qura, mazhab Shafi/Hanafi, mode pill ringkas, pengingat suara, pencarian kota, deteksi lokasi otomatis, serta koordinat manual.",
        en: "Dedicated Prayer Times tab in Notch & Prayer sub-tab in Settings powered locally by adhan: 5 daily prayers, Sunrise, Hijri date, countdown & progress bar, Kemenag/MWL/ISNA/Umm Al-Qura methods, Shafi/Hanafi madhab, compact pill mode, sound reminders, city search, auto-location, and manual coordinates.",
      },
    },
    {
      title: {
        id: "In-App Auto-Updater & Notifikasi Update di Notch",
        en: "In-App Auto-Updater & Notch Update Notifications",
      },
      detail: {
        id: "Pembaruan otomatis bertanda tangan dari GitHub Releases (latest.json) dalam mode NSIS passive dengan pemulihan Taskbar & widget bersih sebelum restart, kartu Software Update di Settings → About, dan notifikasi pill interaktif di Notch.",
        en: "Signed updates via GitHub Releases (latest.json) in NSIS passive mode with clean Taskbar & widget restoration before restart, a Software Update card in Settings → About, and interactive Notch update pills.",
      },
    },
    {
      title: {
        id: "Mode Auto-Hide Seragam (Smart / Always / Never) untuk Dock & Notch",
        en: "Uniform Auto-Hide (Smart / Always / Never) for Dock & Notch",
      },
      detail: {
        id: "Mode Smart Dock tetap tampil rapi di desktop di atas Depth Clock, mengalah di bawah jendela maximized, dan muncul saat kursor menyentuh tepi bawah layar, dilengkapi opsi seragam Smart / Always / Never untuk Notch.",
        en: "Improved Smart Dock auto-hide (stays on desktop above Depth Clock, yields cleanly beneath maximized windows, raises on bottom-edge hover), isolated hidden owners, and unified notchAutoHideMode (Smart, Always, Never).",
      },
    },
    {
      title: {
        id: "Pemilih & Ganti Lirik Manual di Notch & Karaoke Mode",
        en: "Manual Lyrics Picker in Notch & Karaoke Mode",
      },
      detail: {
        id: "Tombol Ganti Lirik / Change Lyrics dengan pencarian kandidat LRCLIB (badge SYNC/TEXT/INST, durasi) serta penyimpanan pilihan lirik per lagu.",
        en: "Added a Change Lyrics search picker backed by LRCLIB (SYNC/TEXT/INST badges, duration) with per-track saved overrides.",
      },
    },
    {
      title: {
        id: "Indikator Aplikasi Berkedip (HSHELL_FLASH) & Deteksi UAC",
        en: "Window Attention Flash (HSHELL_FLASH) & Background UAC Detection",
      },
      detail: {
        id: "Pantulan & indikator amber pada ikon Dock, auto-peek sementara, alert Notch click-to-focus, serta deteksi prompt UAC (consent.exe) di background saat Taskbar Windows disembunyikan.",
        en: "Dock icon bounce + amber flashing indicator, temporary Dock auto-peek, Notch click-to-focus alert, and background consent.exe UAC prompt detection when the Windows Taskbar is hidden.",
      },
    },
    {
      title: {
        id: "Dukungan Media & Cover Art Winamp (Winamp v1.x)",
        en: "Winamp Media & Cover Art Support",
      },
      detail: {
        id: "Integrasi Winamp klasik via Win32 IPC lengkap dengan judul/artis, kontrol Play/Pause/Next/Prev/Seek, dan ekstraksi cover art (ID3v2, FLAC, Shell Thumbnail, folder art).",
        en: "Classic Winamp integration via Win32 IPC with title/artist, playback/seek controls, and cover art extraction (ID3v2, FLAC, Shell Thumbnail, folder art).",
      },
    },
    {
      title: {
        id: "Toggle Jam di Notch & OSD Volume/Kecerahan Eksklusif",
        en: "Show/Hide Notch Clock & Exclusive Volume/Brightness OSD",
      },
      detail: {
        id: "Kontrol tampilkan/sembunyikan jam pada pill Notch (notchShowClock) serta penyembunyian OSD bawaan Windows 11 yang lebih akurat (SetWinEventHook + DWM cloak).",
        en: "Added clock toggle in Notch Settings (notchShowClock) and improved Windows 11 native OSD suppression (SetWinEventHook + DWM cloak) with exclusive Notch OSD.",
      },
    },
    {
      title: {
        id: "Spaces / Virtual Desktops Switcher di Dock",
        en: "Spaces / Virtual Desktops Switcher in Dock",
      },
      detail: {
        id: "Pindah, scroll-cycle, buat, tutup Virtual Desktop, atau buka Task View langsung dari pojok kanan Dock.",
        en: "Switch, scroll-cycle, create, close, and open Task View directly from the Dock via showSpacesButton.",
      },
    },
    {
      title: {
        id: "Sistem Lokalisasi Komunitas (locales/*.json)",
        en: "Community Localization System (locales/*.json)",
      },
      detail: {
        id: "Skema terjemahan JSON terpusat (en.json, id.json), panduan kontributor (locales/README.md), Import JSON... langsung dari folder eksternal, kredit penerjemah, dan deteksi bahasa Windows otomatis.",
        en: "Unified JSON translation schema (en.json, id.json), contributor guide (locales/README.md), live external folder loading, Import JSON..., translator credits, and automatic Windows locale detection.",
      },
    },
  ],
  changed: [
    {
      title: {
        id: "Optimasi Performa CPU & GPU WebView2 saat Idle",
        en: "CPU/GPU & Idle Performance Optimizations",
      },
      detail: {
        id: "Mengganti backdrop-filter: blur live & SVG turbulence dengan static 64×64 noise + wallpaper pre-blurred, memindahkan magnifikasi Dock ke rAF DOM transforms, dan melonggarkan polling backend saat idle.",
        en: "Replaced heavy live backdrop-filter: blur and SVG turbulence with static 64×64 noise + pre-blurred wallpaper, moved Dock magnification to rAF DOM transforms, and throttled idle backend pollers.",
      },
    },
    {
      title: {
        id: "Live Privacy Indicators (Mikrofon & Kamera)",
        en: "Live Privacy Indicators (Mic & Camera)",
      },
      detail: {
        id: "Pemantauan capture WASAPI & layanan kamera real-time dengan indikator berkedip di Notch dan notifikasi aplikasi yang mengaksesnya.",
        en: "Real-time WASAPI capture & camera service monitoring with pulsing Notch indicators and app alerts.",
      },
    },
    {
      title: {
        id: "Animasi Event Hardware, Ring Bluetooth & Equalizer WASAPI",
        en: "Hardware Event Animations, Bluetooth Ring & WASAPI Equalizer",
      },
      detail: {
        id: "Animasi pengisian baterai emerald & alert baterai, persentase perangkat Bluetooth dengan circular SVG ring, equalizer audio WASAPI real-time, serta animasi Volume/Brightness/Wi-Fi dinamis.",
        en: "Emerald charging surge & battery alerts, Bluetooth device battery levels with circular SVG ring, real-time WASAPI audio equalizer, and dynamic Volume/Brightness/Wi-Fi animations.",
      },
    },
  ],
  fixed: [
    {
      title: {
        id: "Fokus Mode Smart Dock & Ikon Aplikasi UWP Minimize",
        en: "Smart Dock Auto-Hide Focus Switching & Minimized UWP Icons",
      },
      detail: {
        id: "Perpindahan fokus antar aplikasi maximized di mode Smart kini berjalan mulus dan ikon aplikasi UWP yang di-minimize tampil benar di Dock.",
        en: "Improved Smart Dock auto-hide focus switching between maximized windows and fixed minimized UWP app icons in the Dock.",
      },
    },
    {
      title: {
        id: "Pencocokan Lirik, Fallback Cover Art SMTC & Dialog Extract ZIP",
        en: "Lyrics Matching, SMTC Cover Art Fallback & Extract ZIP Dialog",
      },
      detail: {
        id: "Meningkatkan akurasi lirik lagu Remastered/Mix, retry & fallback iTunes untuk cover art SMTC, serta memastikan wizard Extract ZIP Windows Explorer tetap terlihat di bawah OSD suppressor.",
        en: "Improved remastered/mix lyrics matching accuracy, added SMTC album art retry/iTunes fallback, and preserved Windows Explorer Extract ZIP wizard visibility under the OSD suppressor.",
      },
    },
    {
      title: {
        id: "Tampilan Kaca Launchpad, Depth Clock & DND Quiet Moments",
        en: "Launchpad Glass Surface, Depth Clock & DND Quiet Moments",
      },
      detail: {
        id: "Memperbaiki rendering kaca Launchpad, mencegah Focus Assist/DND aktif otomatis saat Depth Clock berjalan, serta memastikan DND Quiet Moments dapat dimatikan dengan bersih.",
        en: "Fixed Launchpad glass surface rendering, prevented unwanted Focus Assist DND triggers from Depth Clock, and fixed DND Quiet Moments turn-off.",
      },
    },
  ],
};

export const RELEASE_NOTES_V011: ReleaseNotes = {
  version: "0.1.1",
  date: "2026-11-24",
  summary: {
    id: "Galeri Widget 2×2 dengan pratinjau wallpaper langsung, 4 Native Desktop Widgets, animasi Genie GPU Direct3D11 VSync, dan Floating Karaoke.",
    en: "Visual 2×2 Widget Gallery with live wallpaper preview, 4 Native Desktop Widgets, VSync-locked Direct3D11 Genie animations, and Floating Karaoke.",
  },
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

export const RELEASE_NOTES_HISTORY: ReleaseNotes[] = [
  RELEASE_NOTES_V013,
  RELEASE_NOTES_V012,
  RELEASE_NOTES_V011,
];

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
      id: `Disarankan installer web NSIS ${WIZZLY_META.installerSize} (rilis v${WIZZLY_META.version}, paling stabil & Dock auto-start); tersedia pula alternatif Microsoft Store`,
      en: `Recommended direct NSIS web installer ${WIZZLY_META.installerSize} (v${WIZZLY_META.version} release, best stability & reliable Dock auto-start); Microsoft Store available as an alternative`,
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
      id: "Notch Shelf, Prayer Times, Privacy Mic/Cam, Winamp & Spaces",
      en: "Notch Shelf, Prayer Times, Mic/Cam Privacy, Winamp & Spaces",
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
      id: `Ya, Wizzly v${WIZZLY_META.version} gratis untuk diunduh dan digunakan dengan seluruh fitur Notch (termasuk Prayer Times & Live Privacy Indicators), Dock + Spaces Switcher, Desktop Widgets (Clock, Vinyl, Calendar, Memo), Genie Effect, dan Spotlight. Jika dukungan donasi komunitas mencukupi biaya pengembangan dan sertifikat code-signing, Wizzly direncanakan tetap gratis tanpa paywall Pro.`,
      en: `Yes! Wizzly v${WIZZLY_META.version} is free to download and use with full Notch (including Prayer Times & Live Privacy Indicators), Dock + Spaces Switcher, Desktop Widgets (Clock, Vinyl, Calendar, Memo), Genie Effect, and Spotlight features. If community donations cover development and code-signing costs, Wizzly aims to stay free without a Pro paywall.`,
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
      id: `Tidak. Wizzly dibangun memakai Rust + Tauri 2 (bukan Electron) dengan installer hanya ${WIZZLY_META.installerSize}. Di Windows, proses inti Wizzly hanya memakai sekitar ~35 MB RAM (atau total ~185 MB termasuk WebView2 saat Notch aktif, yang otomatis dibebaskan jika Notch dimatikan), dan langsung bersembunyi saat game borderless fullscreen.`,
      en: `No. Wizzly is built with Rust + Tauri 2 (not Electron) with a ${WIZZLY_META.installerSize} installer. On Windows, Wizzly's core process uses around ~35 MB RAM (~185 MB total including WebView2 while Notch is active, freed immediately when Notch is toggled off), and auto-hides during borderless fullscreen games.`,
    },
  },
  {
    q: {
      id: "Lebih baik download lewat Web (.exe) atau Microsoft Store?",
      en: "Should I download via the Web (.exe) or Microsoft Store?",
    },
    a: {
      id: "Sangat disarankan download langsung lewat Web (Wizzly_0.1.3_x64-setup.exe) karena jauh lebih stabil dan Dock langsung muncul otomatis saat PC pertama kali dihidupkan. Versi Microsoft Store saat ini masih kurang stabil (Dock sering tidak langsung muncul saat boot pertama) sehingga hanya disediakan sebagai alternatif.",
      en: "Downloading directly via the Web (Wizzly_0.1.3_x64-setup.exe) is strongly recommended for the best stability and reliable Dock auto-start when your PC boots. The Microsoft Store version is currently less stable and the Dock does not appear immediately on first PC startup, so it is only offered as an alternative.",
    },
  },
  {
    q: {
      id: "Kenapa Wizzly v0.1.2 berhenti berjalan / dianggap malware oleh Microsoft Defender?",
      en: "Why did Wizzly v0.1.2 stop running or get flagged by Microsoft Defender?",
    },
    a: {
      id: "Pada v0.1.2 sebelumnya, modul In-App Auto-Updater (tauri-plugin-updater) pada installer unsigned memicu false positive dari Microsoft Defender sehingga aplikasi dihentikan secara otomatis. Di v0.1.3, fitur auto-update telah dihapus sepenuhnya agar Wizzly bisa berjalan lancar dan aman. Silakan unduh dan perbarui lewat installer web v0.1.3.",
      en: "In v0.1.2, the built-in In-App Auto-Updater (tauri-plugin-updater) inside an unsigned installer triggered a Microsoft Defender false positive, causing Windows to block or stop the app. In v0.1.3, auto-update has been completely removed so Wizzly runs smoothly. Please download and update using the v0.1.3 web installer.",
    },
  },
  {
    q: {
      id: "Kenapa Windows SmartScreen atau 1–2 scanner VirusTotal memberi peringatan?",
      en: "Why do Windows SmartScreen or 1–2 VirusTotal heuristics flag the installer?",
    },
    a: {
      id: "Ini adalah false positive umum pada installer NSIS web dan binary Rust/Tauri indie yang belum memiliki sertifikat Code Signing berbayar, ditambah penggunaan Win32 API untuk shortcut global (Alt+Space / tombol Win opsional) dan animasi jendela. Installer web (.exe) tetap yang paling disarankan untuk stabilitas penuh — cukup klik More info → Run anyway dan verifikasi hash SHA-256 resmi.",
      en: "This is a common false positive on unsigned NSIS web installers and indie Rust/Tauri binaries using legitimate Win32 APIs for global shortcuts (Alt+Space / optional Win key) and window animations. The direct web (.exe) installer is still strongly recommended for full stability — simply click More info → Run anyway and verify the official SHA-256 checksum.",
    },
  },
];
