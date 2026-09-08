---
title: Reading LSO Grading
nextjs:
  metadata:
    title: Reading LSO Grading
    description: A guide to understanding LSO (AIRBOSS) arrested landing grades — groove evaluation steps, deviation calls, wave-offs, wires and the results board.
---

{% grade_lookup mode="lso" /%}

{% callout title="Subject to Change" type="warning" %}
These values describe the standard MOOSE AIRBOSS grading as it runs on the GTFO carrier. Tolerances and thresholds can change between DCS updates — if your results start showing something that doesn't match this guide, this page will be updated to keep up.
{% /callout %}

## Overview

The **LSO (Landing Signal Officer)** — the **AIRBOSS** in DCS — is the person on the deck who watches you come in and decides whether you catch the wires or go around. In GTFO the carrier runs the standard MOOSE AIRBOSS, so the LSO grades every approach the same way a real carrier would, and the results are logged for every pilot.

For every pass the LSO:

1. **Contacts you at abeam** — on a standard Case I approach you'll hear “Paddles, contact” as you cross abeam.
2. **Calls the ball** — once you're in the groove the LSO tells you to “Call the ball”, you answer with your ball call (high, low, lined up, etc.), and the LSO answers “Roger ball”.
3. **Grades the groove** — your position is sampled at fixed evaluation points all the way down the final approach and a grade is assigned for the whole pass.

Think of it as the most opinionated observer in the room: the LSO does not care how the rest of your sortie went. All it cares about is the last two minutes and whether you put the hooks through the wires.

## Where in the Groove You're Graded

The approach is sampled at five evaluation steps, measured from the **rundown** (the end of the trap). You're graded at each one — so an approach that starts off but recovers gets graded on the recovery, and vice versa:

| Step | Distance from Rundown | Name         | Notes                                                        |
| :--- | :-------------------- | :----------- | :----------------------------------------------------------- |
| `X`  | 0.75 NM (1,390 m)     | At the Start | First evaluation. The only step where `OS` (overshoot) is called. |
| `IM` | 0.5 NM (926 m)        | In the Middle | Middle of the final groove.                                  |
| `IC` | 0.25 NM (463 m)       | In Close     | From here to AR, wave-off thresholds apply.                  |
| `AR` | 0.027 NM (50 m)       | At the Ramp  | Last evaluation before the wires.                            |
| `IW` | at the landing spot   | In the Wires | The actual trap — which wires you caught is logged.          |

The optimal approach the LSO is looking for is a **~3.5° glideslope** with **touchdown between the 2nd and 3rd wire**. Deck height and wire locations are factored into the math, so the numbers you should be flying stay the same on every carrier.

## The Grading Calls

At each step the LSO calls out every deviation it sees, using standard carrier shorthand:

| Call | Meaning                          | Notes                                                    |
| :--- | :------------------------------- | :------------------------------------------------------- |
| `LUL`| Lineup Left — left of the centerline |                                                          |
| `LUR`| Lineup Right — right of the centerline |                                                       |
| `H`  | Too high                         | Above the glideslope                                     |
| `LO` | Too low                          | Below the glideslope                                     |
| `F`  | Too fast                         | Over the target approach speed                           |
| `SLO`| Too slow                         | Under the target approach speed                          |
| `OS` | Overshoot                        | **Only called at X** — you came in wide of the groove start |

Advisory calls (they appear in the details but don't drive the grade):

| Call  | Meaning                                             |
| :---- | :-------------------------------------------------- |
| `\`   | Glideslope fly-through **down** — you crossed the slope from above |
| `/`   | Glideslope fly-through **up** — you crossed the slope from below   |
| `DL`  | Drifting left                                        |
| `DR`  | Drifting right                                       |
| `AA`  | Angled approach — not square to the deck             |

### “A Little” vs “A Lot”

Every call comes with a qualifier that tells you how bad it was:

- **Parentheses — “a little”**: `(H)` means you were a little high. Minor.
- **Underline — “a lot”**: `_H_` means you were a lot high. Major.

So a details string like `IM:(LUL) IC:H IC:(F) AR:_LO_` reads as: a little left of line at the middle, a normal high and a little fast in close, and a **lot** low at the ramp.

## The Grade Scale

Once all the calls are in, the pass gets a single grade and a score out of 5.0:

| Grade | Symbol | Score | Meaning & Flight Quality                                                                                              |
| :---- | :----: | :---- | :------------------------------------------------------------------------------------------------------------------- |
| **Underlined OK** | `_OK_` | 5.0 | **The unicorn.** No deviation calls at any step — lined up, on the slope, on speed, all the way to the wires.        |
| **OK**            | `OK`   | 4.0 | **Okay pass.** Only minor (parenthesized) deviations. Essentially on the money the whole way down.                   |
| **Fair**          | `(OK)` | 3.0 | **Fair pass — the “normal” pass.** Normal deviations, no qualifiers. You made it, nothing to fix in a hurry.         |
| **No Grade**      | `--`   | 2.0 | **No grade.** Larger (underlined) deviations — “a lot” off line, off the slope, or off speed.                         |
| **Bolter**        | `B`    | 2.5 | **Landed, caught no wires** (wire `99` on the board). Usually fast, low, or the flare started too late.               |
| **Pattern Wave-Off** | `WOP` | 2.0 | **Waved off in the pattern** — far off at abeam, early/late break, wrong speed; never reached the groove.             |
| **Own Wave-Off**  | `OWO`  | 2.0 | **You waved yourself off** — you broke it because you knew it wasn't there.                                           |
| **Technique Wave-Off** | `WO` | 1.0 | **Waved off in the final groove** — e.g. too far off the lineup or the glideslope inside the wave-off window.          |
| **Long in the Groove** | `LIG` | 1.0 | **Extended downwind** — you flew the final longer than standard and the timing went to pot.                           |
| **Cut Pass**      | `CUT`  | 0.0 | **Cut.** Waved off but landed anyway — or a V/STOL landing without being cleared to land.                              |

{% callout title="Wave-Off vs Cut Pass" type="warning" %}
A **WO** (technique wave-off) means the LSO made the call: you were outside the wave-off thresholds in the groove and in real life you'd be going around. A **CUT** means the pass was supposed to be cut but you put it down anyway — on a real deck that's an incident, not a grade.
{% /callout %}

## Wave-Off Conditions

Between **IC** (in close) and **AR** (at the ramp), the LSO waves you off (technique wave-off) when:

- **Lineup error** is more than **3.0°** to the left or right, **and/or**
- **Glideslope error** is below **−1.2°** (a lot low) or above **+1.8°** (a lot high), **and/or**
- **Angle of attack** is exceeded (only evaluated for TOPGUN-graduate skill level).

Waves can also come from the pattern itself — **pattern wave-offs** are called for a bad break entry, an early or late break, being out of position at abeam, the ninety, wake issues, or a fouled deck (aircraft on the deck while you're between IM and IC).

## Time in the Groove

A clean approach is also a *timed* approach. The LSO measures how long you spend in the groove and grades it:

| Time in Groove | Groove Grade |
| :------------- | :----------- |
| < 9 s          | `--`         |
| 9 – 11 s       | `(OK)`       |
| 12 – 21 s      | `OK` (15 – 18 s is the sweet spot) |
| 22 – 24 s      | `(OK)`       |
| > 24 s         | `--`         |
| 16.4 – 16.6 s  | `_OK_`       |

If you're consistently fast or slow, the groove grade drags your overall result down — keep an eye on the `Tgroove` column. (For the AV-8B the reference is different: under ~55 s is fast, ~75 s is okay, over ~76 s is slow.)

## Error Thresholds

For reference, here is how the LSO interprets your position (the same table the tool above uses):

**Glideslope error (GLE)**

| Range        | Call    |
| :----------- | :------ |
| −0.3° … +0.4°| OK      |
| −0.6°        | `(L)`   |
| +0.8°        | `(H)`   |
| −0.9°        | `L`     |
| +1.5°        | `H`     |

**Lineup error (LUE)**

| Range        | Call     |
| :----------- | :------- |
| −0.5° … +0.5°| OK       |
| −1.0°        | `(LUR)`  |
| +1.0°        | `(LUL)`  |
| −3.0°        | `LUR`    |
| +3.0°        | `LUL`    |

(±2.0° is where `AA` / `OS` start being measured.)

## Skill Levels

The AIRBOSS knows what it's grading. Three skill levels adjust how tight the error margins are:

| Skill Level       | Lineup Margin | Glideslope Margin |
| :---------------- | :------------ | :---------------- |
| Flight Student    | 10%           | 20%               |
| Naval Aviator     | 5%            | 10%               |
| TOPGUN Graduate   | 2.5%          | 5%                |

Higher skill level = tighter tolerances and more evaluation (TOPGUN graduates also get AoA evaluated).

## The Wires

When you trap, the LSO logs **which wires you caught** — wires 1 through 4. If the board shows **wire `99`**, you caught none of them: a bolter. Touchdown between the **2nd and 3rd wire** is the goal.

## Reading Your Results

Your results show up in three places:

1. **In sim** — F10 → **Kneeboard → Results** gives you the Greenie Board, “My LSO Grades”, and the last debrief.
2. **The results CSV**, with one row per pass:

| Column | What it tells you                                                                 |
| :----- | :-------------------------------------------------------------------------------- |
| `Name`     | Callsign.                                                                       |
| `Pass`     | Pass number in the session.                                                       |
| `Points Final` | Final score out of 5.0 after all deductions.                               |
| `Points Pass`  | Base pass score before adjustments.                                             |
| `Grade`    | The grade symbol — `_OK_`, `OK`, `(OK)`, `--`, `B`, `WO`, `CUT`, etc.            |
| `Details`  | The step-by-step calls, e.g. `IM:(LUL) IC:H IC:(F) AR:_LO_`.                     |
| `Wire`     | Which wires you trapped (1–4), or `99` for a bolter.                              |
| `Tgroove`  | Time in the groove, in seconds.                                                   |
| `Case`     | Recovery case flown (I, II, or III).                                              |
| `Wind`     | Wind over the deck during the pass.                                               |
| `Modex`    | Your modemex.                                                                     |
| `Airframe` | The aircraft you flew.                                                            |

Here's what a couple of rows look like:

```text
Name,Pass,Points Final,Points Pass,Grade,Details,Wire,Tgroove,Case,Wind,Modex,Airframe
GTFO | Pilot Man,3,3.0,3.0,(OK),IM:(LUL) IC:(H) IC:(F),2,16.2,II,12L,444,F-14A
GTFO | Pilot Man,4,5.0,5.0,_OK_,,3,17.1,I,8C,444,F-14A
```

3. **Recovery case** — the approach profile depends on the weather: **Case I** (day, ceiling > 3,000 ft, vis > 5 NM), **Case II** (day, ceiling > 1,000 ft, vis > 5 NM), and **Case III** (night or below Case II minimums). Your `Case` column tells you which profile you were graded against.

## Putting It All Together

A quick reference for what the LSO expects from a clean pass:

- **Abeam**: on speed, lined up with the deck, on time for the break.
- **In the groove**: call the ball when asked, answer high/low/lineup honestly.
- **Glideslope**: ~3.5°, stable — no fly-throughs, no crossing back and over.
- **Speed**: on the approach speed at IC and holding it to the deck.
- **Touchdown**: between the 2nd and 3rd wire, with the speed right to trap.

Hit all of those and the grade takes care of itself. If your results show calls you don't understand, paste them into the lookup at the top of this page.

For the standard operating procedures behind all of this, see [Airfield Operations](/docs/procedures/airfield-operations) and [Reading RSO Grading](/docs/procedures/airfield-operations/rso-grading) for the land-based equivalent.
