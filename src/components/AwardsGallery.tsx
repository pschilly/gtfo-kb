'use client'

import { useEffect, useState } from 'react'

import {
  awardImageSrc,
  fetchAwards,
  groupAwardsByCategory,
  type Award,
  type AwardGroup,
} from '@/lib/awards'

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; groups: AwardGroup[] }

function AwardCard({ award }: { award: Award }) {
  const medalSrc = awardImageSrc(award.medal_image_path)
  const ribbonSrc = awardImageSrc(award.ribbon_image_path)
  const xp = award.xp_value
    ? award.xp_value.toLocaleString('en-US')
    : undefined

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-stone-800 dark:bg-stone-900/60">
      {/* Medal + ribbon — min height keeps every card header the same size,
          regardless of how many lines the title wraps to. */}
      <div className="flex min-h-44 items-center gap-4 border-b border-stone-100 bg-stone-50/80 px-5 py-4 dark:border-stone-800 dark:bg-stone-950/40">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center">
          {medalSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={medalSrc}
              alt={`${award.name} medal`}
              className="max-h-24 max-w-24 object-contain drop-shadow-sm transition-transform duration-200 ease-out hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="h-24 w-24 rounded-lg border border-dashed border-stone-300 dark:border-stone-700" />
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
          <h3 className="line-clamp-3 text-center font-display text-lg font-normal text-stone-900 dark:text-white">
            {award.name}
          </h3>
          {ribbonSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={ribbonSrc}
              alt={`${award.name} ribbon`}
              className="h-6 object-contain"
              loading="lazy"
            />
          ) : null}
          {xp ? (
            <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
              {xp} XP
            </span>
          ) : null}
        </div>
      </div>

      {/* Description + requirements */}
      <div className="flex flex-1 flex-col gap-4 px-5 py-4">
        <div
          className="prose prose-sm prose-stone max-w-none dark:prose-invert dark:text-stone-400 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
          dangerouslySetInnerHTML={{ __html: award.description }}
        />
        {award.requirements?.length ? (
          <div>
            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Requirements
            </h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-stone-600 marker:text-stone-400 dark:text-stone-400 dark:marker:text-stone-600">
              {award.requirements.map((item, index) => (
                <li key={index}>{item.requirement}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  )
}

function AwardGroupSection({ group }: { group: AwardGroup }) {
  return (
    <section className="not-prose mb-12">
      <h2 className="mb-5 scroll-mt-28 font-display text-2xl font-normal text-stone-900 dark:text-white lg:scroll-mt-34">
        {group.category}
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {group.awards.map((award) => (
          <AwardCard key={award.id} award={award} />
        ))}
      </div>
    </section>
  )
}

function LoadingSkeleton() {
  return (
    <div className="not-prose animate-pulse">
      <div className="mb-5 h-7 w-40 rounded bg-stone-200 dark:bg-stone-800" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-xl border border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-800/50"
          />
        ))}
      </div>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="not-prose rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-200">
      <p className="font-semibold">Unable to load awards</p>
      <p className="mt-1">{message}</p>
      <p className="mt-1 text-amber-800/80 dark:text-amber-300/80">
        The awards list is loaded live from the Task Force members portal.
        Please check your connection and reload the page.
      </p>
    </div>
  )
}

/**
 * Client-rendered gallery of GTFO awards. Because the knowledge base is a
 * static export, this component fetches the public, CORS-enabled awards
 * endpoint in the browser at runtime.
 */
export function AwardsGallery() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    fetchAwards()
      .then((awards) => {
        setState({ status: 'ready', groups: groupAwardsByCategory(awards) })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return
        }
        const message =
          error instanceof Error ? error.message : 'An unexpected error occurred.'
        setState({ status: 'error', message })
      })

    return () => controller.abort()
  }, [])

  if (state.status === 'loading') {
    return <LoadingSkeleton />
  }

  if (state.status === 'error') {
    return <ErrorState message={state.message} />
  }

  if (state.groups.length === 0) {
    return (
      <p className="not-prose text-stone-500 dark:text-stone-400">
        No awards have been published yet. Check back soon!
      </p>
    )
  }

  return (
    <div>
      {state.groups.map((group) => (
        <AwardGroupSection key={group.category} group={group} />
      ))}
    </div>
  )
}
