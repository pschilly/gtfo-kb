// Data access for the GTFO member awards.
//
// Awards live on the Task Force members portal (Laravel + Filament) and are
// exposed through a public, CORS-enabled JSON endpoint. This module owns the
// API contract so the UI components stay free of network specifics.
//
// Award imagery is hosted on the Task Force R2 CDN, so the relative image
// paths returned by the API are resolved against AWARDS_STORAGE_BASE_URL.

export const AWARDS_API_URL =
  'https://members.globaltaskforceoverlord.org/api/getAllAwards'

export const AWARDS_STORAGE_BASE_URL =
  'https://cdn.globaltaskforceoverlord.org'

export interface AwardRequirement {
  requirement: string
}

export interface Award {
  id: number
  sort_order: number
  name: string
  category: string
  description: string
  requirements: AwardRequirement[]
  ribbon_image_path: string
  medal_image_path: string
  numeral_alignment: string
  numeral_type: string
  xp_value: number
  published_at: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface AwardGroup {
  category: string
  awards: Award[]
}

/**
 * Resolves a relative storage path (e.g. `awards/medals/xyz.png`) returned by
 * the API into an absolute, hot-linkable image URL.
 */
export function awardImageSrc(path?: string | null): string | undefined {
  if (!path) {
    return undefined
  }
  const cleaned = path.replace(/^\/+/, '')
  return `${AWARDS_STORAGE_BASE_URL}/${cleaned}`
}

/**
 * Fetches every published award from the members portal, ordered by their
 * configured sort order.
 */
export async function fetchAwards(): Promise<Award[]> {
  const response = await fetch(AWARDS_API_URL, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(
      `Failed to load awards (HTTP ${response.status} ${response.statusText})`,
    )
  }

  const awards = (await response.json()) as Award[]

  return [...awards].sort((a, b) => a.sort_order - b.sort_order)
}

/**
 * Buckets awards into their display categories, preserving the order in which
 * each category first appears (which follows the API sort order).
 */
export function groupAwardsByCategory(awards: Award[]): AwardGroup[] {
  const groups = new Map<string, Award[]>()

  for (const award of awards) {
    const category = award.category?.trim() || 'Awards'
    const bucket = groups.get(category)
    if (bucket) {
      bucket.push(award)
    } else {
      groups.set(category, [award])
    }
  }

  return [...groups.entries()].map(([category, groupAwards]) => ({
    category,
    awards: groupAwards,
  }))
}
