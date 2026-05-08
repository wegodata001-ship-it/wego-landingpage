import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function extractMeta(html: string, property: string): string | undefined {
  const esc = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tryMatch = (re: RegExp) => {
    const m = re.exec(html);
    return m?.[1] ? decodeHtmlEntities(m[1]) : undefined;
  };
  return (
    tryMatch(new RegExp(`property="${esc}"\\s+content="([^"]*)"`, "i")) ||
    tryMatch(new RegExp(`content="([^"]*)"\\s+property="${esc}"`, "i")) ||
    tryMatch(new RegExp(`property='${esc}'\\s+content='([^']*)'`, "i")) ||
    tryMatch(new RegExp(`content='([^']*)'\\s+property='${esc}'`, "i"))
  );
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)));
}

/** ערך מחרוזת מתוך JSON דולק בדף (כמו thumbnail_url — פריים מהסרטון) */
function extractJsonStringValue(html: string, key: string): string | undefined {
  const k = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const quoted = new RegExp(`"${k}"\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"`);
  const squoted = new RegExp(`'${k}'\\s*:\\s*'((?:\\\\.|[^'\\\\])*)'`);
  const m = quoted.exec(html) ?? squoted.exec(html);
  if (m?.[1]) {
    const raw = m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    const decoded = decodeHtmlEntities(raw);
    if (decoded.startsWith("http")) return decoded;
  }
  return undefined;
}

function pickVideoUrl(html: string): string | undefined {
  return (
    extractMeta(html, "og:video") ||
    extractMeta(html, "og:video:url") ||
    extractMeta(html, "og:video:secure_url") ||
    extractJsonStringValue(html, "video_url")
  );
}

/** תמונת תצוגה מקדימה — בדרך כלל פריים מהריל / פוסטר */
function pickThumbnailUrl(html: string): string | undefined {
  const og =
    extractMeta(html, "og:image") ||
    extractMeta(html, "og:image:url") ||
    extractMeta(html, "og:image:secure_url");

  if (og && !isUglyDefaultOg(og)) return og;

  const fromJson =
    extractJsonStringValue(html, "thumbnail_url") ||
    extractJsonStringValue(html, "display_url") ||
    extractJsonStringValue(html, "thumbnail_src") ||
    extractJsonStringValue(html, "display_src") ||
    extractJsonStringValue(html, "poster");

  if (fromJson) return fromJson;

  if (og) return og;

  return extractCdnInstagramStill(html);
}

/** תמונת ברירת מחדל גנרית של אינסטגרם — לא מועילה כריל */
function isUglyDefaultOg(url: string): boolean {
  return /\/rsrc\.php\//i.test(url) || /static\.instagram\.com\/rsrc\//i.test(url);
}

/** גיבוי: קישור ישיר לתמונה על CDN של מטא / פייסבוק */
function extractCdnInstagramStill(html: string): string | undefined {
  const candidates: string[] = [];
  const re =
    /https:\/\/(?:scontent|instagram)[^"'\\\s<>]*\.(?:cdninstagram\.com|fbcdn\.net)\/[^"'\\\s<>]+\.(?:jpg|jpeg|webp)/gi;
  for (const m of html.matchAll(re)) {
    const u = m[0];
    if (!u.includes("profile") && u.length > 40) candidates.push(u);
  }
  if (candidates.length === 0) return undefined;
  candidates.sort((a, b) => b.length - a.length);
  return candidates[0];
}

async function fetchHtml(url: string): Promise<string | null> {
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), 14000);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,he;q=0.8",
        Referer: "https://www.instagram.com/",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
      },
      signal: controller.signal,
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(tid);
  }
}

function shortcodeFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const m = u.pathname.match(/\/(?:reel|p)\/([^/]+)/i);
    return m?.[1] ?? null;
  } catch {
    return null;
  }
}

function mergePrefer<V>(a: V | undefined | null, b: V | undefined | null): V | undefined {
  if (a) return a;
  if (b) return b ?? undefined;
  return undefined;
}

/**
 * מחזיר thumbnailUrl (פריים/פוסטר מהריל) ו-videoUrl כשקיים בדף.
 * אינסטגרם עלול לחסום או ללא להכיל מטא — אז ייתכן null.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("url")?.trim();
  if (!raw || !raw.includes("instagram.com")) {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  let permalink: string;
  try {
    permalink = new URL(raw).href;
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  const code = shortcodeFromUrl(permalink);
  const urlsToTry: string[] = [permalink];
  if (code) {
    urlsToTry.push(`https://www.instagram.com/reel/${code}/embed/`);
    urlsToTry.push(`https://www.instagram.com/p/${code}/`);
    urlsToTry.push(`https://www.instagram.com/reel/${code}/embed/captioned/`);
  }

  let thumbnailUrl: string | undefined;
  let videoUrl: string | undefined;

  const seen = new Set<string>();
  for (const u of urlsToTry) {
    if (seen.has(u)) continue;
    seen.add(u);
    const html = await fetchHtml(u);
    if (!html) continue;

    thumbnailUrl = mergePrefer(thumbnailUrl, pickThumbnailUrl(html));
    videoUrl = mergePrefer(videoUrl, pickVideoUrl(html));

    if (thumbnailUrl && videoUrl) break;
  }

  return NextResponse.json(
    {
      thumbnailUrl: thumbnailUrl ?? null,
      videoUrl: videoUrl ?? null,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
