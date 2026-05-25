/**
 * Portfolio reels — local files in /public/video-markit/
 * For best cross-browser performance, prefer H.264 MP4 (same basename).
 */

export type PortfolioVideo = {
  id: string;
  /** Filename in /public/video-markit/ */
  file: string;
  /** i18n key: reels.videos.{id}.title */
  titleKey: string;
};

export function portfolioVideoSrc(file: string): string {
  return `/video-markit/${encodeURIComponent(file)}`;
}

export const PORTFOLIO_VIDEOS: PortfolioVideo[] = [
  { id: "reel2", file: "Reel 2.mp4", titleKey: "reel2" },
  { id: "reel3", file: "Reel 3.mp4", titleKey: "reel3" },
  { id: "reel5", file: "Reel5.mp4", titleKey: "reel5" },
  { id: "reel6", file: "Reel 6.mp4", titleKey: "reel6" },
  { id: "reel7", file: "Reel 7.mp4", titleKey: "reel7" },
];
