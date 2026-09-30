---
title: Default / Baseline Airframe Profile
nextjs:
  metadata:
    title: Default / Baseline Airframe Profile
    description: The baseline RSO recovery and traffic pattern grading parameters applied to all standard aircraft without dedicated custom profiles.
---

{% callout title="Universal Fallback Profile" type="note" %}
The `default.json` profile is automatically applied whenever an aircraft connects without a dedicated airframe profile (e.g. A-10C, AV-8B, M-2000C, trainers, transport aircraft, and community mods).
{% /callout %}

## Profile Summary

The **Default Baseline** profile establishes standard, balanced recovery parameters suitable for conventional fixed-wing aircraft. It features standard traffic pattern altitudes (1,000–2,500 ft), a standard 3.0° final glideslope, a flared landing touchdown model, and speed consistency evaluation.

```json
{
  "aircraft_type": "DEFAULT",
  "display_name": "Standard Aircraft",
  "flared_landing": true
}
```

---

## Pattern Parameters & Tolerances

| Parameter | Value | Description |
| :--- | :--- | :--- |
| **Pattern Altitude Ceiling** | `2,500 ft` | Maximum allowable pattern altitude before altitude callouts. |
| **Pattern Altitude Floor** | `1,000 ft` | Minimum allowable pattern altitude during upwind/downwind legs. |
| **Downwind Alt Tolerance** | `±300 ft` | Allowable deviation from the nominal pattern altitude. |
| **Downwind Alt Max Std Dev** | `75 ft` | Maximum standard deviation of altitude on the downwind leg. |
| **Downwind Alt Max Spread** | `200 ft` | Peak-to-peak altitude variation allowed on downwind. |
| **Upwind Alt Max Std Dev** | `80 ft` | Maximum standard deviation of altitude on upwind. |
| **Upwind Alt Max Spread** | `250 ft` | Peak-to-peak altitude variation allowed on upwind. |
| **Crosswind Alt Spread** | `500 ft` | Maximum altitude variation permitted through crosswind. |
| **Base Balloon Tolerance** | `150 ft` | Maximum altitude climb permitted while turning base. |
| **Downwind Spacing** | `0.7 – 2.0 NM` | Acceptable lateral displacement distance from the runway. |

---

## Turn Dynamics & Bank Limits

- **Max Turn Bank Angle**: `60.0°` — Standard civil/military pattern bank limit. Exceeding 60° triggers `NER(BNK)` (-0.4 pts).
- **Max Turn G**: `3.5 G` — Excessive load factor limit during pattern turns. Exceeding 3.5 G triggers `NER(G)` (-0.3 pts).

---

## Final Approach & Lineup

- **Final Glidepath Angle**: `3.0°` (Standard three-degree glideslope).
- **Glidepath Tolerance**: `±80 ft` instantaneous glideslope corridor.
- **Glidepath RMS Error Tolerance**: `50 ft` root-mean-square error along final approach.
- **Threshold Crossing Height (TCH)**: `50 ft` target wheel height when crossing the runway threshold.
- **Final Lineup Mean Tolerance**: `15.0 m` (lateral deviation from runway extended centerline).
- **Final Lineup RMS Tolerance**: `30.0 m` root-mean-square tracking accuracy.
- **Target Approach Speed**: *Dynamic* (No fixed knot target; evaluated on speed stability: standard deviation must be `≤ 15.0 kts`).

---

## Touchdown & Flare Evaluation

- **Landing Flare Mode**: `flared_landing: true`
- **Hard Landing Sink Rate**: `≤ -800 ft/min` (Sink rate exceeding -800 fpm triggers `HRD` / -0.5 pts).
- **Float Sink Rate**: `> -70 ft/min` (Assessed as `FLT` / -0.2 pts only if touchdown occurs deep/long past the target touchdown zone).
- **Touchdown Centerline Tolerance**: `15.0 m` maximum lateral offset from runway centerline at touchdown.
- **Touchdown Zone (TDZ) Min**: `3.0%` of total runway length (touchdowns before 3% are `SH(TD)` / -0.5 pts).
- **Touchdown Zone (TDZ) Target Max**: `25.0%` of total runway length (optimal landing window).
- **Touchdown Zone (TDZ) Long Max**: `40.0%` of runway length (touchdowns between 25%–40% are `LO(TD)` / -0.3 pts; past 40% are `DP(TD)` / -0.6 pts).

---

## Complete Configuration (`default.json`)

```json
{
  "aircraft_type": "DEFAULT",
  "display_name": "Standard Aircraft",
  "flared_landing": true,
  "pattern_alt_ft": 2500.0,
  "pattern_alt_min_ft": 1000.0,
  "pattern_alt_max_ft": 2500.0,
  "downwind_alt_tol_ft": 300.0,
  "downwind_alt_max_std_ft": 75.0,
  "downwind_alt_max_spread_ft": 200.0,
  "upwind_alt_max_std_ft": 80.0,
  "upwind_alt_max_spread_ft": 250.0,
  "crosswind_alt_max_spread_ft": 500.0,
  "base_alt_balloon_tol_ft": 150.0,
  "final_glidepath_rms_tol_ft": 50.0,
  "downwind_spacing_min_nm": 0.7,
  "downwind_spacing_max_nm": 2.0,
  "max_turn_bank_deg": 60.0,
  "max_turn_g": 3.5,
  "final_glidepath_deg": 3.0,
  "final_glidepath_tol_ft": 80.0,
  "threshold_crossing_height_ft": 50.0,
  "final_lineup_mean_tol_m": 15.0,
  "final_lineup_rms_tol_m": 30.0,
  "final_speed_target_kts": null,
  "final_speed_max_std_kts": 15.0,
  "touchdown_centerline_tol_m": 15.0,
  "sink_rate_hard_fpm": -800.0,
  "sink_rate_float_fpm": -70.0,
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
