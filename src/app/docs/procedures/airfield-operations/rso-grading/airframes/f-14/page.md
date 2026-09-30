---
title: F-14 Tomcat Grading Parameters
nextjs:
  metadata:
    title: F-14 Tomcat Grading Parameters
    description: RSO recovery grading parameters, pattern profiles, and touchdown criteria for the F-14A, F-14B, and F-14BU Tomcat.
---

{% callout title="Carrier Landing Gear Profile" type="note" %}
The F-14 Tomcat is configured with carrier-style no-flare touchdown evaluation. Pilots must fly on-speed AOA (~135 kts) directly down the 3.0° glideslope onto the runway. Do not level off or hold off into an extended flare.
{% /callout %}

## Supported Airframes

This configuration profile applies to all Heatblur F-14 Tomcat variants in DCS World:
- `F-14A-135-GR` — F-14A Tomcat (TF30 engines)
- `F-14B` — F-14B Tomcat (F110 engines)
- `F-14BU` — F-14B Upgrade (PTID / Sparrowhawk HUD)

---

## Profile Highlights & Specifics

### 1. Carrier Gear No-Flare Evaluation (`flared_landing: false`)
- **Sturdy Gear Allowance**: The heavy carrier gear allows a hard landing limit of **-900 ft/min** (compared to -800 fpm on land-based fighters).
- **Strict Float Penalty (`FLT`)**: Touching down with a sink rate shallower than **-50 ft/min** triggers the `FLT` penalty (-0.2 pts) unconditionally, reinforcing proper carrier landing technique on runway recoveries.

### 2. Widened Downwind Spacing (0.8 – 2.2 NM)
- Because of the Tomcat's gross landing weight, sweep-wing dirty aerodynamics, and higher turn inertia, the lateral downwind corridor is expanded to **0.8 – 2.2 NM** (vs 0.7 – 2.0 NM default).

### 3. Aggressive Bank Limits (Up to 90.0°)
- Supports military overhead tactical break turns with bank angles up to **90.0°** without triggering bank penalties.

### 4. Approach Airspeed Target (135.0 kts)
- Final approach speed is graded against a nominal target of **135.0 knots** (±15 kt window, 120–150 kt acceptable range).

---

## Key Parameters & Tolerances

| Parameter | Value | Standard Baseline Comparison |
| :--- | :--- | :--- |
| **Pattern Altitude Range** | `800 – 2,500 ft` | 800 ft floor accommodates tactical overhead patterns |
| **Downwind Spacing** | `0.8 – 2.2 NM` | +0.2 NM wider corridor for swing-wing turns |
| **Max Bank Angle** | `90.0°` | Expanded from 60° for tactical breaks |
| **Max Turn G** | `3.5 G` | Standard load limit |
| **Final Glidepath Angle** | `3.0°` | Standard 3.0° glideslope |
| **Target Approach Speed** | `135.0 kt` | Evaluated against 135 ± 15 kt |
| **Hard Touchdown Limit** | `-900 ft/min` | High-capacity carrier gear threshold |
| **Float Touchdown Limit** | `> -50 ft/min` | Strict carrier-style float penalty |
| **Touchdown Zone Target** | `3.0% – 25.0%` | First quarter of runway length |
| **Touchdown Lineup Tolerance**| `15.0 m` | Lateral centerline offset limit |

---

## Complete Configuration (`F-14B.json`)

```json
{
  "aircraft_type": "F-14B",
  "display_name": "F-14B Tomcat",
  "flared_landing": false,
  "pattern_alt_ft": 2500.0,
  "pattern_alt_min_ft": 800.0,
  "pattern_alt_max_ft": 2500.0,
  "downwind_alt_tol_ft": 300.0,
  "downwind_spacing_min_nm": 0.8,
  "downwind_spacing_max_nm": 2.2,
  "max_turn_bank_deg": 90.0,
  "max_turn_g": 3.5,
  "final_glidepath_deg": 3.0,
  "final_glidepath_tol_ft": 80.0,
  "threshold_crossing_height_ft": 50.0,
  "final_lineup_mean_tol_m": 15.0,
  "final_lineup_rms_tol_m": 30.0,
  "final_speed_target_kts": 135.0,
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
