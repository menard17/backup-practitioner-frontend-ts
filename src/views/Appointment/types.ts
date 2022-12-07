import { CreateLocalTrackOptions } from "twilio-video";
/**
 * Permits a type T to be null.
 */
export type Nullable<T> = T | null;

export enum TrackType {
  Audio,
  Video,
}

export const localOptions: CreateLocalTrackOptions = {
  height: 720,
  frameRate: 24,
  width: 1280,
};

export interface IMuteUnmuteOptions {
  audio: boolean;
  video: boolean;
}
