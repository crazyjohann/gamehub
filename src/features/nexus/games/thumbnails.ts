export type NexusThumbnailCache = Record<string, string>

const CACHE_KEY = 'nx_game_thumbs_v1'

function safeParseJson<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function loadThumbnailCache(): NexusThumbnailCache {
  if (typeof window === 'undefined') return {}
  try {
    const parsed = safeParseJson<NexusThumbnailCache>(localStorage.getItem(CACHE_KEY))
    if (!parsed || typeof parsed !== 'object') return {}
    return parsed
  } catch {
    return {}
  }
}

export function saveThumbnailCache(cache: NexusThumbnailCache) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {
    // ignore (storage unavailable)
  }
}

function normalizeThumbnailUrl(url: string, width: number) {
  const cleaned = url.replace(/&amp;/g, '&')

  // Ensure common resize params exist for consistent loading.
  if (cleaned.includes('?')) {
    const u = new URL(cleaned)
    if (!u.searchParams.get('metadata')) u.searchParams.set('metadata', 'none')
    if (!u.searchParams.get('quality')) u.searchParams.set('quality', '85')
    if (!u.searchParams.get('fit')) u.searchParams.set('fit', 'crop')
    u.searchParams.set('width', String(width))
    return u.toString()
  }

  return `${cleaned}?metadata=none&quality=85&width=${width}&fit=crop`
}

/**
 * Fetches a thumbnail for a CrazyGames game slug by scraping via the r.jina.ai proxy.
 * This avoids CORS issues and lets us cache results in localStorage.
 */
export async function fetchCrazyGamesThumbnail(slug: string, width = 640): Promise<string | null> {
  const pageUrl = `https://r.jina.ai/https://www.crazygames.com/game/${slug}`

  const res = await fetch(pageUrl)
  if (!res.ok) return null

  const html = await res.text()

  // Prefer matches that include the slug and look like a cover.
  const strong = new RegExp(
    `https:\\/\\/imgs\\.crazygames\\.com[^"'\\s>]*${escapeRegExp(slug)}[^"'\\s>]*(?:cover[^"'\\s>]*)`,
    'i',
  )
  const strongMatch = html.match(strong)?.[0]
  if (strongMatch) return normalizeThumbnailUrl(strongMatch, width)

  // Fallback: some covers live under /games/<slug>/cover...
  const gamesPath = new RegExp(
    `https:\\/\\/imgs\\.crazygames\\.com\\/games\\/${escapeRegExp(slug)}\\/[^"'\\s>]*cover[^"'\\s>]*`,
    'i',
  )
  const fallbackMatch = html.match(gamesPath)?.[0]
  if (fallbackMatch) return normalizeThumbnailUrl(fallbackMatch, width)

  return null
}
