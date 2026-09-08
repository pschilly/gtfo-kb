'use client'

import { useMemo, useState } from 'react'
import clsx from 'clsx'

import {
  GRADE_SAMPLES,
  parseGrade,
  type GradeMode,
  type GradeResult,
  type GradeTone,
} from '@/lib/landing-grades'

const toneStyles: Record<
  GradeTone,
  { badge: string; border: string; label: string }
> = {
  excellent: {
    badge: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-400',
    border: 'border-emerald-500',
    label: 'Top Shelf',
  },
  good: {
    badge: 'bg-green-100 text-green-900 dark:bg-green-500/15 dark:text-green-400',
    border: 'border-green-500',
    label: 'Good',
  },
  fair: {
    badge: 'bg-teal-100 text-teal-900 dark:bg-teal-500/15 dark:text-teal-400',
    border: 'border-teal-500',
    label: 'Average',
  },
  poor: {
    badge: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-500/15 dark:text-yellow-400',
    border: 'border-yellow-500',
    label: 'Needs Work',
  },
  waveoff: {
    badge: 'bg-red-100 text-red-900 dark:bg-red-500/15 dark:text-red-400',
    border: 'border-red-500',
    label: 'Waved Off',
  },
  cut: {
    badge: 'bg-red-200 text-red-950 dark:bg-red-600/20 dark:text-red-300',
    border: 'border-red-700',
    label: 'Gross Violation',
  },
}

function GradeResultCard({ grade }: { grade: GradeResult }) {
  const tone = toneStyles[grade.tone]
  return (
    <div
      className={clsx(
        'rounded-xl border-l-4 bg-white p-4 shadow-sm dark:bg-stone-900/60',
        tone.border,
        'border border-stone-200 dark:border-stone-800'
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={clsx(
            'rounded-md px-2 py-0.5 font-mono text-sm font-bold',
            tone.badge
          )}
        >
          {grade.symbol}
        </span>
        <span className="font-display text-lg text-stone-900 dark:text-stone-100">
          {grade.name}
        </span>
      </div>
      <div className="mt-3 space-y-2 text-sm text-stone-700 dark:text-stone-300">
        {grade.remarks.map((remark) => (
          <p key={remark}>{remark}</p>
        ))}
        {grade.tip && (
          <p className="border-t border-stone-200 pt-2 italic dark:border-stone-800">
            {grade.tip}
          </p>
        )}
      </div>
    </div>
  )
}

export function GradeLookup({
  mode,
  title = 'Grade Lookup',
}: {
  mode: GradeMode
  title?: string
}) {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState('')

  const result = useMemo(
    () => (submitted ? parseGrade(submitted, mode) : null),
    [submitted, mode]
  )
  const calls = result?.calls ?? null
  const unknown = submitted.trim() !== '' && !result

  const samples = GRADE_SAMPLES[mode]

  return (
    <div className="not-prose my-8 rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900/60">
      <h2 className="font-display text-xl text-stone-900 dark:text-stone-100">
        {title}
      </h2>
      <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
        Paste your {mode === 'rso' ? 'RSO pass card' : 'LSO result'} — the
        grade symbol, a numeric score, or a whole debrief line — and see what
        it means.
      </p>

      <div className="mt-4">
        <label
          htmlFor={`grade-lookup-${mode}`}
          className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400"
        >
          Grade / Score
        </label>
        <textarea
          id={`grade-lookup-${mode}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              setSubmitted(value)
            }
          }}
          rows={2}
          placeholder={
            mode === 'rso'
              ? 'e.g.  ATC GRADE: -- [2.4 / 5.0]   or   WO'
              : 'e.g.  3.0 (OK)   or   2.5 B   or   5.0 _OK_'
          }
          className="w-full resize-y rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 font-mono text-sm text-stone-900 placeholder:font-sans placeholder:text-stone-400 focus:border-stone-500 focus:outline-none dark:border-stone-700 dark:bg-stone-950/50 dark:text-stone-100 dark:placeholder:text-stone-500"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-stone-500 dark:text-stone-400">
          Try:
        </span>
        {samples.map((sample) => (
          <button
            key={sample.label}
            type="button"
            onClick={() => {
              setValue(sample.value)
              setSubmitted(sample.value)
            }}
            className="rounded-md border border-stone-200 bg-stone-100 px-2 py-0.5 font-mono text-xs text-stone-700 transition hover:border-stone-400 hover:bg-stone-200 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-stone-500"
          >
            {sample.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setSubmitted(value)}
          className="ml-auto rounded-lg bg-stone-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
        >
          Decode
        </button>
      </div>

      {result && (
        <div className="mt-4 space-y-4">
          {result.grade && (
            <>
              <GradeResultCard grade={result.grade} />
              {result.parsedScore !== null && (
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Parsed score: {result.parsedScore.toFixed(1)} / 5.0 — grade
                  band {result.grade.scoreRange}
                </p>
              )}
            </>
          )}
          {calls && calls.calls.length > 0 && (
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-950/40">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                What your calls mean
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-stone-700 dark:text-stone-300">
                {calls.calls.map((call, i) => (
                  <li key={`${call}-${i}`} className="flex gap-2">
                    <code className="flex-none font-mono text-xs font-bold text-stone-900 dark:text-stone-100">
                      {call}
                    </code>
                    <span>{calls.explanations[i] ?? 'Unknown callout.'}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!result.grade && (
            <p className="text-xs text-stone-500 dark:text-stone-400">
              No grade symbol or score found in that text.
              {calls && (
                <>
                  {' '}
                  Showing the callout breakdown only — add the grade (e.g.{' '}
                  <code>-- [2.4 / 5.0]</code>) to get the full grade explanation
                  too.
                </>
              )}
            </p>
          )}
        </div>
      )}
      {unknown && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-stone-700 dark:bg-stone-800/60 dark:text-stone-300">
          Could not recognize that grade. Try the grade symbol (e.g. <code>OK</code>,{' '}
          <code>(OK)</code>, <code>--</code>, <code>WO</code>, <code>B</code>,{' '}
          <code>CUT</code>) or a plain numeric score between 0 and 5.
        </p>
      )}
    </div>
  )
}
