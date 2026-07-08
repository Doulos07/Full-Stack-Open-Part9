/*
 *  export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";
 *  export type Visibility = "great" | "good" | "ok" | "poor";
 */

/**
 * Single source of truth pattern: derive the union type directly from
 * a runtime array (via `as const` + indexed access) instead of declaring
 * the type separately. This avoids the array and the type getting out
 * of sync when a new value is added.
 * See: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
 * (Solution figured out with help from Claude/Anthropic.)
 */
export const weathers = ["sunny", "rainy", "cloudy", "stormy", "windy"] as const;
export type Weather = (typeof weathers)[number];

export const visibilities = ["great", "good", "ok", "poor"] as const;
export type Visibility = (typeof visibilities)[number];

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
