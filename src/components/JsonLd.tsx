import { WIZZLY_META } from "@/data/wizzlyData";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: WIZZLY_META.name,
    operatingSystem: "Windows 10, Windows 11",
    applicationCategory: "UtilitiesApplication",
    softwareVersion: WIZZLY_META.version,
    fileSize: WIZZLY_META.installerSize,
    description:
      "Wizzly brings a macOS-style Dock with GPU Genie Effect & Spaces Switcher, Dynamic Island Notch with Media, Floating Karaoke Lyrics, Prayer Times, Live Mic/Camera Privacy Indicators, File Shelf, Clipboard History & Pomodoro, 4 Native Direct2D Desktop Widgets (Clock, Vinyl, Calendar, Memo), plus Alt+Space Spotlight to Windows 10 and Windows 11.",
    url: WIZZLY_META.siteUrl,
    downloadUrl: WIZZLY_META.downloadUrl,
    image: `${WIZZLY_META.siteUrl}/images/wizzly-icon.png`,
    author: {
      "@type": "Person",
      name: "Adrian",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "macOS-style Auto-Adaptive Dock with Direct3D11 VSync Genie Effect, Spaces Virtual Desktops Switcher, Click-to-Minimize, 4 glass styles & 4 icon styles",
      "4 Native Win32 Direct2D Desktop Widgets: Depth Clock, Vinyl Turntable, Calendar with iCal (.ics) sync & Sticky Memo To-Do with Magnetic Snap",
      "Dynamic Island Notch with Media Player (incl. Winamp), Manual Lyrics Picker, Floating Karaoke Lyrics Window, Prayer Times & Adhan Reminders, Live Mic/Camera Privacy Indicators, File Shelf, Clipboard History & Pomodoro Timer",
      "Alt + Space Spotlight Launcher, optional Win-Key Launchpad trigger, Per-App Volume Mixer & Do Not Disturb",
      "Community Localization (locales/*.json), Multi-Monitor support & Borderless Fullscreen Game Detection",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
