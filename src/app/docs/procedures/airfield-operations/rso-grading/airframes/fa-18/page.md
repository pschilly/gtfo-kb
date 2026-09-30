---
title: F/A-18C Hornet Grading Parameters
nextjs:
  metadata:
    title: F/A-18C Hornet Grading Parameters
    description: RSO recovery grading parameters, pattern profiles, and touchdown criteria for the F/A-18C Hornet.
---

{% callout title="Carrier Landing Gear Profile" type="note" %}
The F/A-18C Hornet features heavy-duty trailing-link landing gear designed for direct carrier-style recoveries. Fly on-speed angle-of-attack (amber donut / ~138 kts) directly down the 3.0° glideslope into the touchdown zone without leveling off.
{% /callout %}

## Supported Airframes

- `FA-18C_hornet` — DCS F/A-18C Lot 20 Hornet

---

## Profile Highlights & Specifics

### 1. Carrier Gear No-Flare Evaluation (`flared_landing: false`)
- **Sturdy Gear Limit**: Permissible sink rate up to **-900 ft/min** without triggering a hard landing deduction (`HRD` / -0.5 pts).
- **Zero-Float Expectation (`FLT`)**: The RSO engine expects a firm on-speed touchdown. Any wheel contact shallower than **-50 ft/min** triggers `FLT` (-0.2 pts) unconditionally.

### 2. Tactical Shore Pattern Altitudes (800 – 2,500 ft)
- Accommodates low-altitude naval shore-based break patterns (800 ft AGL) as well as standard military patterns (1,500–2,500 ft).

### 3. Bank Limits (Up to 90.0°)
- Permits full 90.0° bank angles throughout the overhead break, crosswind, and turn to final.

### 4. Approach Airspeed Target (138.0 kts)
- Graded against a nominal on-speed approach target of **138.0 knots** (±15 kt allowable window).

---

## Key Parameters & Tolerances

| Parameter | Value | Standard Baseline Comparison |
| :--- | :--- | :--- |
| **Pattern Altitude Range** | `800 – 2,500 ft` | 800 ft floor accommodates naval Case I shore patterns |
| **Downwind Spacing** | `0.7 – 2.0 NM` | Standard naval pattern spacing |
| **Max Bank Angle** | `90.0°` | Full 90° break authority |
| **Max Turn G** | `3.5 G` | Standard load limit |
| **Final Glidepath Angle** | `3.0°` | Standard 3.0° glideslope |
| **Target Approach Speed** | `138.0 kt` | Evaluated against 138 ± 15 kt |
| **Hard Touchdown Limit** | `-900 ft/min` | High-capacity carrier gear threshold |
| **Float Touchdown Limit** | `> -50 ft/min` | Strict carrier-style float penalty |
| **Touchdown Zone Target** | `3.0% – 25.0%` | First quarter of runway length |
| **Touchdown Lineup Tolerance**| `15.0 m` | Lateral centerline offset limit |

---

## Complete Configuration (`FA-18C_hornet.json`)

```json
{
  "aircraft_type": "FA-18C_hornet",
  "display_name": "F/A-18C Hornet",
  "flared_landing": false,
  "pattern_alt_ft": 2500.0,
  "pattern_alt_min_ft": 800.0,
  "pattern_alt_max_ft": 2500.0,
  "downwind_alt_tol_ft": 300.0,
  "downwind_spacing_min_nm": 0.7,
  "downwind_spacing_max_nm": 2.0,
  "max_turn_bank_deg": 90.0,
  "max_turn_g": 3.5,
  "final_glidepath_deg": 3.0,
  "final_glidepath_tol_ft": 80.0,
  "threshold_crossing_height_ft": 50.0,
  "final_lineup_mean_tol_m": 15.0,
  "final_lineup_rms_tol_m": 30.0,
  "final_speed_target_kts": 138.0,
  "final_speed_max_std_kts": 15.0,
  "touchdown_centerline_tol_m": 15.0,
  "sink_rate_hard_fpm": -900.0,
  "sink_rate_float_fpm": -50.0,
  "tdz_min_pct": 3.0,
  "tdz_target_max_pct": 25.0,
  "tdz_long_max_pct": 40.0,
  "score_weights": {
    "downwind_max_pts": 1.0,
    "turn_max_pts": 1.0,
    "final_max_pts": 1.5,
    "touchdown_max_pts": 1.5
  }
}
```
