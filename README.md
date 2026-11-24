# Wizzly Website

Official landing & download page for **Wizzly** (Dynamic Island Notch, macOS-style Liquid Glass Dock & `Alt + Space` Spotlight for Windows 10 & 11).

Built with **Next.js (App Router)**, **Tailwind CSS v4**, and **Framer Motion**, configured with `output: "export"` for free static hosting on **Cloudflare Pages** with full SEO (`Metadata`, `sitemap.xml`, `robots.txt`, and `SoftwareApplication` JSON-LD).

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Updating Download Link & Details

Edit `src/data/wizzlyData.ts`:
- `WIZZLY_META.downloadUrl`: Set to your GitHub Releases `.exe` URL (or Cloudflare R2 link) for `Wizzly_0.1.1_x64-setup.exe`.
- `WIZZLY_META.siteUrl`: Set to your production domain (e.g. `https://wizzly.pages.dev` or your custom domain) so `sitemap.xml`, `robots.txt`, and Open Graph tags point to the right URL.

## Deploy to Cloudflare Pages (Free)

1. Push this repository to GitHub/GitLab.
2. In Cloudflare Dashboard -> **Workers & Pages** -> **Create** -> **Pages** -> **Connect to Git**.
3. Configure build settings:
   - **Framework preset:** `Next.js (Static HTML Export)`
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
4. Click **Save and Deploy**.
