"use client";

import { useEffect, useState } from "react";
import {
  ROADMAP_ITEMS,
  SUPPORTER_WALL_ITEMS,
  WIZZLY_META,
  type SupporterWallItem,
} from "@/data/wizzlyData";
import {
  getSupabaseClient,
  mapRoadmapRowToItem,
  mapSupporterRowToWallItem,
  type RoadmapItem,
  type WizzlyMilestoneData,
  type WizzlyRoadmapRow,
  type WizzlySettingsRow,
  type WizzlySupporterRow,
} from "@/lib/supabase";

export interface WizzlyLiveData {
  milestone: WizzlyMilestoneData;
  supporters: SupporterWallItem[];
  roadmapItems: RoadmapItem[];
  loaded: boolean;
}

const DEFAULT_MILESTONE: WizzlyMilestoneData = {
  raisedUsd: WIZZLY_META.donation.codeSigningGoal.raisedUsd,
  targetUsd: WIZZLY_META.donation.codeSigningGoal.targetUsd,
};

/**
 * Loads live milestone, supporter wall, and roadmap items from Supabase
 * while immediately seeding with static defaults from wizzlyData.ts.
 */
export function useWizzlyLiveData(): WizzlyLiveData {
  const [milestone, setMilestone] = useState<WizzlyMilestoneData>(DEFAULT_MILESTONE);
  const [supporters, setSupporters] = useState<SupporterWallItem[]>(SUPPORTER_WALL_ITEMS);
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>(ROADMAP_ITEMS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const supabase = getSupabaseClient();

    Promise.all([
      supabase
        .from("wizzly_settings")
        .select("id, raised_usd, target_usd, milestone_note_id, milestone_note_en, updated_at")
        .eq("id", "default")
        .maybeSingle<WizzlySettingsRow>(),
      supabase
        .from("wizzly_supporters")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: false })
        .order("supporter_date", { ascending: false })
        .order("id", { ascending: false })
        .returns<WizzlySupporterRow[]>(),
      supabase
        .from("wizzly_roadmap")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("id", { ascending: true })
        .returns<WizzlyRoadmapRow[]>(),
    ])
      .then(([settingsRes, supportersRes, roadmapRes]) => {
        if (cancelled) return;

        if (!settingsRes.error && settingsRes.data) {
          const raised = Number(settingsRes.data.raised_usd);
          const target = Number(settingsRes.data.target_usd);
          if (Number.isFinite(raised) && Number.isFinite(target) && target > 0) {
            const noteId = settingsRes.data.milestone_note_id?.trim() ?? "";
            const noteEn = settingsRes.data.milestone_note_en?.trim() ?? "";
            setMilestone({
              raisedUsd: raised,
              targetUsd: target,
              note:
                noteId || noteEn
                  ? {
                      id: noteId || noteEn,
                      en: noteEn || noteId,
                    }
                  : undefined,
              updatedAt: settingsRes.data.updated_at,
            });
          }
        }

        if (!supportersRes.error && Array.isArray(supportersRes.data)) {
          setSupporters(supportersRes.data.map(mapSupporterRowToWallItem));
        }

        if (!roadmapRes.error && Array.isArray(roadmapRes.data) && roadmapRes.data.length > 0) {
          setRoadmapItems(roadmapRes.data.map(mapRoadmapRowToItem));
        }
      })
      .catch(() => {
        // Keep static defaults gracefully if offline
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { milestone, supporters, roadmapItems, loaded };
}
