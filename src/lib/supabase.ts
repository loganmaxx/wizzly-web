import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  DonationChannel,
  Lang,
  SupporterFeatureStatus,
  SupporterWallItem,
} from "@/data/wizzlyData";

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bimhoedwfukbsovesolt.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_dNytcduRosYOqohjKTFigg_kRiuP--L";

let cachedClient: SupabaseClient | null = null;

/**
 * Returns a singleton browser-safe Supabase client using the publishable key.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!cachedClient) {
    cachedClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return cachedClient;
}

export interface WizzlyAdminRow {
  user_id: string;
  email: string;
  created_at: string;
}

export interface WizzlySettingsRow {
  id: string;
  raised_usd: number | string;
  target_usd: number | string;
  milestone_note_id: string;
  milestone_note_en: string;
  updated_at: string;
}

export interface WizzlySupporterRow {
  id: number;
  name: string;
  tier_label_id: string;
  tier_label_en: string;
  amount_text: string | null;
  channel: DonationChannel;
  supporter_date: string;
  message: string;
  feature_request: string | null;
  feature_area: string | null;
  feature_status: SupporterFeatureStatus | null;
  dev_reply_author: string | null;
  dev_reply_date: string | null;
  dev_reply_message: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface WizzlyRoadmapRow {
  id: number;
  title_id: string;
  title_en: string;
  done: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface WizzlyMilestoneData {
  raisedUsd: number;
  targetUsd: number;
  note?: Record<Lang, string>;
  updatedAt?: string;
}

export interface RoadmapItem {
  id?: number;
  done: boolean;
  title: Record<Lang, string>;
}

export function formatUsdAmount(value: number): string {
  if (!Number.isFinite(value)) return "0";
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.?0+$/, "");
}

export function mapSupporterRowToWallItem(row: WizzlySupporterRow): SupporterWallItem {
  return {
    id: `sb-${row.id}`,
    name: row.name,
    tierLabel: {
      id: row.tier_label_id,
      en: row.tier_label_en,
    },
    amountText: row.amount_text ?? undefined,
    channel: row.channel,
    date: row.supporter_date,
    message: row.message,
    featureRequest: row.feature_request ?? undefined,
    featureArea: row.feature_area ?? undefined,
    featureStatus: row.feature_status ?? undefined,
    devReply:
      row.dev_reply_message && row.dev_reply_message.trim()
        ? {
            author: row.dev_reply_author?.trim() || "Adrian",
            date: row.dev_reply_date || row.supporter_date,
            message: row.dev_reply_message,
          }
        : undefined,
  };
}

export function mapRoadmapRowToItem(row: WizzlyRoadmapRow): RoadmapItem {
  return {
    id: row.id,
    done: row.done,
    title: {
      id: row.title_id,
      en: row.title_en,
    },
  };
}
