/**
 * Permits a type T to be null.
 */
export type Nullable<T> = T | null;

export enum TrackType {
  Audio,
  Video,
}

export interface IMuteUnmuteOptions {
  audio: boolean;
  video: boolean;
}
