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
      "Wizzly brings a macOS-style Dock, Dynamic Island Notch with Media, Lyrics, File Shelf, Clipboard History & Pomodoro, plus Alt+Space Spotlight to Windows 10 and Windows 11.",
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
      "macOS-style Dock with magnification, live window previews, 4 glass styles (Frosted, Liquid, Matte, Classic) & 4 icon styles",
      "Dynamic Island Notch with Media Player, Quick Media Source Switcher, Synced Lyrics, File Shelf, Clipboard History & Pomodoro Timer",
      "Alt + Space Spotlight Launcher with local file search, quick power actions & instant calculator",
      "Per-App Volume Mixer, Do Not Disturb toggle, Wi-Fi, Bluetooth & Control Center",
      "Independent Dock/Notch toggles, 5-step onboarding wizard, Multi-Monitor support & Borderless Fullscreen Game Detection",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
