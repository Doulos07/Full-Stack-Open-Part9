/*
 *  export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";
 *  export type Visibility = "great" | "good" | "ok" | "poor";
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
