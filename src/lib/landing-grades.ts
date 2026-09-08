export type GradeMode = 'rso' | 'lso'

export type GradeTone =
  | 'excellent'
  | 'good'
  | 'fair'
  | 'poor'
  | 'waveoff'
  | 'cut'

export interface GradeResult {
  /** Display symbol as it appears on the board (e.g. "(OK)", "_OK_", "--", "WO") */
  symbol: string
  /** Human-readable grade name */
  name: string
  /** Canonical score for the grade */
  score: number
  /** Score band the grade maps to */
  scoreRange: string
  /** Visual tone used by the UI */
  tone: GradeTone
  /** What the grade means */
  remarks: string[]
  /** Optional actionable tip */
  tip?: string
}

export interface CalloutDecoding {
  /** The callout tokens found in the pasted text (e.g. "LO(DW)") */
  calls: string[]
  /** Per-call explanations in input order, or null for unknown tokens */
  explanations: Array<string | null>
}

export interface ParsedGrade {
  /** The overall grade, when a grade symbol or score was present */
  grade?: GradeResult
  /** The numeric score extracted from the pasted text, if any */
  parsedScore: number | null
  /** Decoded ATC/LSO callout shorthand, if any was found */
  calls?: CalloutDecoding
}

/* ------------------------------------------------------------------ */
/* RSO (Runway Safety Officer) — overhead pattern grading             */
/* ------------------------------------------------------------------ */

export const RSO_GRADES: Record<string, GradeResult> = {
  OK_: {
    symbol: '_OK_',
    name: 'Underlined OK — Perfect Pass',
    score: 5.0,
    scoreRange: '4.5 – 5.0',
    tone: 'excellent',
    remarks: [
      'Perfect / exemplary pass.',
      'Ideal pattern spacing and altitude, a stabilized 3.0° glidepath, crisp centerline tracking, and an on-target touchdown in the TDZ.',
    ],
    tip: 'Keep flying exactly like this.',
  },
  OK: {
    symbol: 'OK',
    name: 'OK — Above-Average Pass',
    score: 4.0,
    scoreRange: '3.5 – 4.4',
    tone: 'good',
    remarks: [
      'Above-average pass.',
      'Minor deviations with prompt, smooth corrections. Safe and stabilized throughout.',
    ],
    tip: 'Look at the callouts — any (H)/(LO)/(F) style calls tell you exactly which parameter drifted.',
  },
  '(OK)': {
    symbol: '(OK)',
    name: 'Fair — Average Pass',
    score: 3.0,
    scoreRange: '2.5 – 3.4',
    tone: 'fair',
    remarks: [
      'Average pass.',
      'Moderate deviations (slightly wide downwind, slight glidepath error, minor lineup offset) safely managed to touchdown.',
    ],
    tip: 'This is the pass that keeps you average. Pick one callout and fix it next pattern.',
  },
  '--': {
    symbol: '--',
    name: 'No Grade — Below Average Pass',
    score: 2.0,
    scoreRange: '1.5 – 2.4',
    tone: 'poor',
    remarks: [
      'Below-average pass.',
      'Significant deviations from standard parameters (excessive wander, flat approach, or landing long), but you landed safely.',
    ],
    tip: 'Study the radar scope panel before your next pass — it shows exactly where the line wandered.',
  },
  WO: {
    symbol: 'WO',
    name: 'Waveoff — Unsafe Pass',
    score: 1.0,
    scoreRange: '0.5 – 1.4',
    tone: 'waveoff',
    remarks: [
      'Unsafe pass / waveoff.',
      'Gross deviations inside the safety window — floating deep past the TDZ limit, severe wander, or dangerously high/low — but you landed anyway.',
      'An ATC would have waved you off.',
    ],
    tip: 'Before your next pass, check the touchdown classification (LONG / DEEP / SHORT) and the sink rate on your card.',
  },
  C: {
    symbol: 'C',
    name: 'Cut Pass — Gross Safety Violation',
    score: 0.0,
    scoreRange: '0.0 – 0.4',
    tone: 'cut',
    remarks: [
      'Gross safety violation / cut pass.',
      'Landed short of the threshold (undershoot / in the dirt), a severe hard landing, or loss of control.',
    ],
    tip: 'Stop, read the whole card, and slow your approach down. Short landings are the most dangerous calls on the board.',
  },
}

const RSO_BANDS: Array<{ min: number; grade: GradeResult }> = [
  { min: 4.5, grade: RSO_GRADES.OK_ },
  { min: 3.5, grade: RSO_GRADES.OK },
  { min: 2.5, grade: RSO_GRADES['(OK)'] },
  { min: 1.5, grade: RSO_GRADES['--'] },
  { min: 0.5, grade: RSO_GRADES.WO },
  { min: 0, grade: RSO_GRADES.C },
]

const RSO_TOKENS: Array<{ re: RegExp; grade: GradeResult }> = [
  { re: /\bWO\b/, grade: RSO_GRADES.WO },
  { re: /\bCUT\b/, grade: RSO_GRADES.C },
  { re: /(^|[\s\[:,])C(?=[\s\],]|$)/, grade: RSO_GRADES.C },
  { re: /_ok_/i, grade: RSO_GRADES.OK_ },
  { re: /\(ok\)/i, grade: RSO_GRADES['(OK)'] },
  { re: /\bOK\b/, grade: RSO_GRADES.OK },
  { re: /--/, grade: RSO_GRADES['--'] },
]

/* ------------------------------------------------------------------ */
/* LSO (AIRBOSS) — arrested landing groove grading                    */
/* ------------------------------------------------------------------ */

export const LSO_GRADES: Record<string, GradeResult> = {
  OK_: {
    symbol: '_OK_',
    name: 'Underlined OK — “The Unicorn”',
    score: 5.0,
    scoreRange: '5.0',
    tone: 'excellent',
    remarks: [
      'Okay, underlined — a perfect pass.',
      'No deviation calls at any of the groove evaluation steps: lined up with the deck, on the glideslope, at the right speed, all the way to the wires.',
      'This is the pass every LSO keeps a memory of. Rare enough to earn a nickname.',
    ],
    tip: 'Whatever you did, do not change a thing.',
  },
  OK: {
    symbol: 'OK',
    name: 'OK Pass',
    score: 4.0,
    scoreRange: '4.0',
    tone: 'good',
    remarks: [
      'An okay pass.',
      'Only minor (parenthesized) deviations — a (H), (LUL), (F) and the like mean “a little” high, off line, or fast.',
      'You were essentially where the LSO wanted you the whole way down.',
    ],
    tip: 'The Details column lists exactly which step you were “a little” off — smooth out that one segment.',
  },
  '(OK)': {
    symbol: '(OK)',
    name: 'Fair Pass',
    score: 3.0,
    scoreRange: '3.0',
    tone: 'fair',
    remarks: [
      'A fair pass — the “normal” pass.',
      'Unqualified deviation calls: normal, uncorrected-enough high/low/fast/slow or lineup errors.',
      'You made the deck and caught wires; nothing to be alarmed about.',
    ],
    tip: 'Fair is where most approaches start. Target the OK tier by trimming the flagged parameters.',
  },
  '--': {
    symbol: '--',
    name: 'No Grade',
    score: 2.0,
    scoreRange: '2.0',
    tone: 'poor',
    remarks: [
      'No grade.',
      'Larger (underlined) deviations — “a lot” high, low, fast, slow, or off line.',
      'You made it down, but the approach was well outside standard.',
    ],
    tip: 'Check your time-in-groove and your glideslope at IC — underlined errors usually come from an unstabilized entry.',
  },
  B: {
    symbol: 'B',
    name: 'Bolter',
    score: 2.5,
    scoreRange: '2.5',
    tone: 'waveoff',
    remarks: [
      'A bolter.',
      'You landed on the deck but caught no wires — the results column will show wire 99.',
      'Usually too fast, too low, or the flare started too late.',
    ],
    tip: 'Check your airspeed at the balls and start the flare earlier — the wires are there to save you.',
  },
  WOP: {
    symbol: 'WOP',
    name: 'Pattern Wave-Off',
    score: 2.0,
    scoreRange: '2.0',
    tone: 'waveoff',
    remarks: [
      'Pattern wave-off.',
      'Waved off in the pattern — far off at the abeam, an early or late break, wrong speed, or otherwise unrecoverable before the groove.',
      'The pass never reached the final approach groove.',
    ],
    tip: 'Work the pattern: abeam on speed, break on time, and be stabilized before you roll onto final.',
  },
  OWO: {
    symbol: 'OWO',
    name: 'Own Wave-Off',
    score: 2.0,
    scoreRange: '2.0',
    tone: 'waveoff',
    remarks: [
      'Own wave-off.',
      'You flew past the deck — you were the one who broke off.',
    ],
    tip: 'If you are self-waving-off, it is almost always being too low or too fast on final. Get on top of the glideslope at the abeam.',
  },
  WO: {
    symbol: 'WO',
    name: 'Technique Wave-Off',
    score: 1.0,
    scoreRange: '1.0',
    tone: 'waveoff',
    remarks: [
      'Technique wave-off.',
      'Waved off while in the final groove — e.g. more than 3° off the lineup, or more than 1.8° above / 1.2° below the glideslope between IC and AR.',
      'The LSO made the call for you; in a real recovery you would be going around.',
    ],
    tip: 'Study the step-by-step calls — the deviation you were waved off for is right there in the Details.',
  },
  LIG: {
    symbol: 'LIG',
    name: 'Long in the Groove',
    score: 1.0,
    scoreRange: '1.0',
    tone: 'poor',
    remarks: [
      'Long in the groove.',
      'You extended downwind and flew the final longer than standard — timing was off.',
    ],
    tip: 'Keep an eye on the Tgroove value: 15–18 seconds is the sweet spot.',
  },
  CUT: {
    symbol: 'CUT',
    name: 'Cut Pass',
    score: 0.0,
    scoreRange: '0.0',
    tone: 'cut',
    remarks: [
      'Cut pass.',
      'Waved off — but landed anyway — or a V/STOL landing without a “Cleared to Land” call.',
    ],
    tip: 'When you are waved off, break. The deck is not going anywhere.',
  },
}

const LSO_BANDS: Array<{ min: number; grade: GradeResult }> = [
  { min: 4.5, grade: LSO_GRADES.OK_ },
  { min: 3.5, grade: LSO_GRADES.OK },
  { min: 2.5, grade: LSO_GRADES['(OK)'] },
  { min: 1.5, grade: LSO_GRADES['--'] },
  { min: 0.5, grade: LSO_GRADES.WO },
  { min: 0, grade: LSO_GRADES.CUT },
]

const LSO_TOKENS: Array<{ re: RegExp; grade: GradeResult }> = [
  { re: /_ok_/i, grade: LSO_GRADES.OK_ },
  { re: /\(ok\)/i, grade: LSO_GRADES['(OK)'] },
  { re: /\bWOP\b/i, grade: LSO_GRADES.WOP },
  { re: /\bOWO\b/i, grade: LSO_GRADES.OWO },
  { re: /\bLIG\b/i, grade: LSO_GRADES.LIG },
  { re: /\bCUT\b/i, grade: LSO_GRADES.CUT },
  { re: /\bWO\b/i, grade: LSO_GRADES.WO },
  { re: /\bOK\b/, grade: LSO_GRADES.OK },
  { re: /(^|[\s\[:,])B(?=[\s\],]|$)/, grade: LSO_GRADES.B },
  { re: /--/, grade: LSO_GRADES['--'] },
]

/* ------------------------------------------------------------------ */
/* Callout shorthand dictionaries (decoded from pasted text)          */
/* ------------------------------------------------------------------ */

/** RSO callout codes. Keys match the callout exactly as it appears on the card. */
export const RSO_CALLOUTS: Record<string, string> = {
  'H(DW)': 'High on downwind — averaging more than 300 ft above your target pattern altitude.',
  'LO(DW)': 'Low on downwind — averaging more than 300 ft below your target pattern altitude.',
  'W(DW)': 'Wide downwind — flying more than 2.0 NM out from the runway centerline.',
  'TIGHT(DW)': 'Tight downwind — inside 0.7 NM of the runway centerline.',
  'LUL(F)': 'Lineup left on final — drifting more than 15 m left of the extended centerline.',
  'LUR(F)': 'Lineup right on final — drifting more than 15 m right of the extended centerline.',
  'H(F)': 'High on final — more than 80 ft above the standard 3.0° glidepath.',
  'LO(F)': 'Low on final — more than 80 ft below the standard 3.0° glidepath.',
  'NER(SPD)': 'Unstable airspeed — more than 15 kts of speed variation on final approach.',
  'LS': 'Landed short — touched down ahead of the threshold (in the dirt). Severe safety violation.',
  'EARLY_TDZ': 'Early touchdown — down right at the threshold (0–3% of runway length). No penalty, but no margin either.',
  'IN_TDZ': 'On target — touchdown inside the target box (3–25% of runway length).',
  'LL': 'Landed long — touchdown between 25% and 40% down the runway.',
  DLL: 'Deep landing — touchdown past 40% down the runway; an ATC would have waved you off.',
  'OF(TD)': 'Off centerline at touchdown — more than 15 m left or right of the centerline.',
  FLT: 'Floating — sink rate shallower than −100 ft/min at wheel contact (warning, no point deduction).',
  HRL: 'Hard landing — sink rate steeper than −800 ft/min at wheel contact.',
  'OB(T)': 'Overbanked turn — bank angle past the 60° / 2.0 G safety limit in the pattern.',
  // Standalone forms (when pasted without a phase modifier)
  H: 'High — above the target pattern altitude or the standard glidepath.',
  LO: 'Low — below the target pattern altitude or the standard glidepath.',
  LUL: 'Lineup left — drifting left of the extended runway centerline.',
  LUR: 'Lineup right — drifting right of the extended runway centerline.',
  W: 'Wide — downwind spacing more than 2.0 NM from the runway centerline.',
  TIGHT: 'Tight — downwind spacing inside 0.7 NM of the runway centerline.',
  OF: 'Off centerline — more than 15 m left or right of the centerline at touchdown.',
}

/** Matches any known RSO callout (phase-modified or standalone), longest first. */
const RSO_CALL_RE = (() => {
  const escaped = Object.keys(RSO_CALLOUTS)
    .sort((a, b) => b.length - a.length)
    .map((key) => key.replace(/\(/g, '\\s*\\(').replace(/\)/g, '\\s*\\)'))
  return new RegExp(`(?<![A-Z])(?:${escaped.join('|')})(?![A-Z0-9])`, 'g')
})()

/** LSO groove callouts. Keyed by the deviation code (qualifier parsed separately). */
const LSO_DEVIATIONS: Record<string, { aLittle: string; aLot: string }> = {
  LUL: {
    aLittle: 'a little left of the deck lineup',
    aLot: 'a lot left of the deck lineup',
  },
  LUR: {
    aLittle: 'a little right of the deck lineup',
    aLot: 'a lot right of the deck lineup',
  },
  H: { aLittle: 'a little high on the glideslope', aLot: 'a lot high on the glideslope' },
  LO: { aLittle: 'a little low on the glideslope', aLot: 'a lot low on the glideslope' },
  F: { aLittle: 'a little fast for the approach', aLot: 'a lot fast for the approach' },
  SLO: { aLittle: 'a little slow for the approach', aLot: 'a lot slow for the approach' },
  OS: {
    aLittle: 'overshoot at the start of the groove (X) — came in wide of the groove',
    aLot: 'overshoot at the start of the groove (X) — came in wide of the groove',
  },
  DL: { aLittle: 'drifting left', aLot: 'drifting left' },
  DR: { aLittle: 'drifting right', aLot: 'drifting right' },
  AA: { aLittle: 'angled approach — not square to the deck', aLot: 'angled approach — not square to the deck' },
}

/** Advisory glideslope fly-through calls. */
const LSO_FLYTHROUGH: Record<string, string> = {
  '\\': 'glideslope fly-through down — crossed the glideslope from above (advisory only)',
  '/': 'glideslope fly-through up — crossed the glideslope from below (advisory only)',
}

const LSO_STEP_LABELS: Record<string, string> = {
  X: 'at the start (X)',
  IM: 'in the middle (IM)',
  IC: 'in close (IC)',
  AR: 'at the ramp (AR)',
  IW: 'in the wires (IW)',
}

/* ------------------------------------------------------------------ */
/* Parsing                                                            */
/* ------------------------------------------------------------------ */

function extractScore(text: string): number | null {
  // "2.4 / 5.0", "2.4/5", "[2.4 / 5.0]", "2.4 of 5"
  const withMax = text.match(/(\d+(?:\.\d+)?)\s*(?:\/|of)\s*5(?:\.0)?/i)
  if (withMax) return parseFloat(withMax[1])
  // Bare score like "2.4" or "2"
  const bare = text.match(/^(\d+(?:\.\d+)?)$/)
  if (bare) return parseFloat(bare[1])
  // CSV-style rows: "Name,Pass,2.3,3.0,--,..." → first plausible 0–5 number
  const numbers = [...text.matchAll(/(\d+(?:\.\d+)?)/g)].map((m) =>
    parseFloat(m[1])
  )
  const plausible = numbers.find((n) => n >= 0 && n <= 5)
  return plausible ?? null
}

/** Decode RSO debrief callouts like "LO(DW) LUL(F) H(F) OF(TD) FLT". */
export function decodeRsoCalls(text: string): CalloutDecoding | null {
  const matches = [...text.matchAll(RSO_CALL_RE)].map((m) => m[0])
  if (matches.length === 0) return null
  const explanations = matches.map((call) => {
    const key = call.replace(/\s+/g, '')
    return RSO_CALLOUTS[key] ?? null
  })
  // Don't report on pure noise (nothing we actually know)
  if (explanations.every((e) => e === null)) return null
  return { calls: matches, explanations }
}

/** Decode LSO groove calls like "IM:(LUL) IC:H IC:(F) AR:_LO_" or bare "H LO". */
export function decodeLsoCalls(text: string): CalloutDecoding | null {
  const found: Array<{ call: string; explanation: string }> = []

  // Step-prefixed calls: IM:(LUL)  IC:_H_  AR:/
  const stepRe = /\b(X|IM|IC|AR|IW)\s*:\s*(_)?\(?([A-Z\\/]+)\)?(_)?/g
  for (const m of text.matchAll(stepRe)) {
    const [, step, u1, code, u2] = m
    const underlined = Boolean(u1) || Boolean(u2)
    const dev = LSO_DEVIATIONS[code]
    let explanation: string | null = null
    if (dev) {
      const base = underlined ? dev.aLot : dev.aLittle
      explanation = `${base} ${LSO_STEP_LABELS[step] ?? ''}`.trim()
    } else if (LSO_FLYTHROUGH[code]) {
      explanation = `${LSO_FLYTHROUGH[code]} ${LSO_STEP_LABELS[step] ?? ''}`.trim()
    }
    if (explanation) found.push({ call: m[0].trim(), explanation })
  }

  // Bare calls (no step prefix): "(LUL)", "_H_", "SLO", "/" …
  if (found.length === 0 && !/\b(?:X|IM|IC|AR|IW)\s*:/.test(text)) {
    const bareRe = /(_)?\(?([A-Z\\/]{1,4})\)?(_)?/g
    for (const m of text.matchAll(bareRe)) {
      const [, u1, code, u2] = m
      const underlined = Boolean(u1) || Boolean(u2)
      const dev = LSO_DEVIATIONS[code]
      let explanation: string | null = null
      if (dev) {
        explanation = underlined ? dev.aLot : dev.aLittle
      } else if (LSO_FLYTHROUGH[code]) {
        explanation = LSO_FLYTHROUGH[code]
      }
      if (explanation) found.push({ call: m[0].trim(), explanation })
    }
  }

  if (found.length === 0) return null
  return {
    calls: found.map((f) => f.call),
    explanations: found.map((f) => f.explanation),
  }
}

function byScore(
  bands: Array<{ min: number; grade: GradeResult }>,
  score: number
): GradeResult | null {
  const band = bands.find((b) => score >= b.min)
  return band ? band.grade : null
}

export function parseGrade(input: string, mode: GradeMode): ParsedGrade | null {
  const text = input.trim()
  if (!text) return null

  const tokens = mode === 'rso' ? RSO_TOKENS : LSO_TOKENS
  const bands = mode === 'rso' ? RSO_BANDS : LSO_BANDS

  for (const token of tokens) {
    if (token.re.test(text)) {
      const calls = (mode === 'rso' ? decodeRsoCalls(text) : decodeLsoCalls(text)) ?? undefined
      return { grade: token.grade, parsedScore: extractScore(text), calls }
    }
  }

  const score = extractScore(text)
  if (score !== null) {
    const grade = byScore(bands, score)
    if (grade) {
      const calls = (mode === 'rso' ? decodeRsoCalls(text) : decodeLsoCalls(text)) ?? undefined
      return { grade, parsedScore: score, calls }
    }
  }

  // No grade symbol or score — but the paste may still be a list of callouts.
  const calls = mode === 'rso' ? decodeRsoCalls(text) : decodeLsoCalls(text)
  if (calls) return { grade: undefined, parsedScore: score, calls }

  return null
}

/** Sample inputs offered as one-click chips in the tool */
export const GRADE_SAMPLES: Record<GradeMode, Array<{ label: string; value: string }>> = {
  rso: [
    { label: 'Perfect', value: '_OK_ [5.0 / 5.0]' },
    { label: 'OK', value: 'OK [4.2 / 5.0]' },
    { label: 'Fair', value: '(OK) [2.9 / 5.0]' },
    { label: 'No Grade', value: '-- [2.4 / 5.0]' },
    { label: 'Waveoff', value: 'WO [1.1 / 5.0]' },
    { label: 'Cut', value: 'C [0.3 / 5.0]' },
    { label: 'Calls', value: 'LO(DW) LUL(F) H(F) OF(TD) FLT' },
  ],
  lso: [
    { label: 'Unicorn', value: '5.0 _OK_' },
    { label: 'OK', value: '4.0 OK' },
    { label: 'Fair', value: '3.0 (OK)' },
    { label: 'No Grade', value: '2.0 --' },
    { label: 'Bolter', value: '2.5 B' },
    { label: 'Wave-Off', value: '1.0 WO' },
    { label: 'Cut', value: '0.0 CUT' },
    { label: 'Calls', value: 'IM:(LUL) IC:H IC:(F) AR:_LO_' },
  ],
}
