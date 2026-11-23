import React from "react";

export function DockAppSvg({ id }: { id: string }) {
  switch (id) {
    case "explorer":
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <defs>
            <linearGradient id="finderBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60B5FF" />
              <stop offset="100%" stopColor="#1E6BF1" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#finderBg)" />
          <path d="M32 6h18a8 8 0 0 1 8 8v36a8 8 0 0 1-8 8H32V6Z" fill="#E6F2FF" />
          <circle cx="22" cy="25" r="2.6" fill="#0F172A" />
          <circle cx="42" cy="25" r="2.6" fill="#0F172A" />
          <path d="M33 20c-2 6-2 10 0 14h4" fill="none" stroke="#1E6BF1" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M19 41c4 5 22 5 26 0" fill="none" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );
    case "edge":
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <rect width="64" height="64" rx="14" fill="#FFFFFF" />
          <defs>
            <linearGradient id="edgeTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="edgeBot" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="21" fill="url(#edgeTop)" />
          <path d="M12 36c2 11 13 18 24 16 7-1 13-6 15-12-5 4-13 5-19 2-7-3-10-10-8-17-6 2-11 6-12 11Z" fill="url(#edgeBot)" />
          <circle cx="35" cy="30" r="8" fill="#FFFFFF" />
        </svg>
      );
    case "vscode":
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <rect width="64" height="64" rx="14" fill="#0F172A" />
          <path d="M44 12 21 34l-7-5-4 3 8 8-8 8 4 3 7-5 23 22 10-5V17l-10-5Zm0 13v22L30 36l14-11Z" fill="#22A7F2" />
        </svg>
      );
    case "terminal":
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <rect width="64" height="64" rx="14" fill="#18181B" />
          <rect x="4" y="4" width="56" height="56" rx="11" fill="#27272A" />
          <path d="M18 22l10 10-10 10" fill="none" stroke="#F8FAFC" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="32" y1="42" x2="46" y2="42" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "spotify":
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <rect width="64" height="64" rx="14" fill="#1DB954" />
          <path d="M17 25c10-3 22-2 31 3" fill="none" stroke="#09090B" strokeWidth="4.2" strokeLinecap="round" />
          <path d="M19 34c8-2.4 18-1.6 25 2.4" fill="none" stroke="#09090B" strokeWidth="3.8" strokeLinecap="round" />
          <path d="M22 42c6-1.6 13-1 19 2" fill="none" stroke="#09090B" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <rect width="64" height="64" rx="14" fill="#5865F2" />
          <path d="M44 21a28 28 0 0 0-7-2l-1 2a24 24 0 0 0-8 0l-1-2a28 28 0 0 0-7 2c-4 6-5 13-5 19a28 28 0 0 0 8 4l2-3-3-1 1-1c5 2 11 2 16 0l1 1-3 1 2 3a28 28 0 0 0 8-4c0-7-2-14-5-19Z" fill="#FFFFFF" />
          <circle cx="26" cy="34" r="3" fill="#5865F2" />
          <circle cx="38" cy="34" r="3" fill="#5865F2" />
        </svg>
      );
    case "spotlight":
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <defs>
            <linearGradient id="spotBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="14" fill="url(#spotBg)" />
          <circle cx="29" cy="29" r="11" fill="none" stroke="#FFFFFF" strokeWidth="4" />
          <line x1="37" y1="37" x2="47" y2="47" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );
    case "trash":
    default:
      return (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <rect width="64" height="64" rx="14" fill="#E2E8F0" />
          <rect x="20" y="21" width="24" height="28" rx="4" fill="#94A3B8" />
          <rect x="17" y="17" width="30" height="4" rx="2" fill="#64748B" />
          <line x1="27" y1="27" x2="27" y2="43" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="32" y1="27" x2="32" y2="43" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="37" y1="27" x2="37" y2="43" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
}
