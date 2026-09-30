---
title: F-16C Viper Grading Parameters
nextjs:
  metadata:
    title: F-16C Viper Grading Parameters
    description: RSO recovery grading parameters, pattern profiles, and touchdown criteria for the F-16C Block 50 Viper.
---

{% callout title="Aerobraking & Flared Profile" type="note" %}
The F-16C Viper utilizes a lightweight landing gear system. Pilots are expected to execute a gentle aerodynamic flare over the threshold, touch down on the main gear in the first 25% of the runway, and maintain a 13° nose-high aerobraking attitude.
{% /callout %}

## Supported Airframes

- `F-16C_50` — DCS F-16C Block 50 Viper

---

## Profile Highlights & Specifics

### 1. Flared Landing Touchdown Engine (`flared_landing: true`)
- **Aerodynamic Flare**: The Viper requires a smooth round-out and flare to cushion wheel contact sink rate below **-800 ft/min**.
- **Touchdown Zone Awareness**: Floating in ground effect is permitted near the threshold, but touching down **long or deep (> 25% of runway)** with a very flat sink rate (shallower than **-50 ft/min**) triggers the `FLT` float penalty (-0.2 pts).

### 2. High-Speed Approach Profile (145.0 kts)
- Evaluated against a nominal final approach target of **145.0 knots** (±15 kt window, 130–160 kt acceptable range).

### 3. Bank Angle Limits (Up to 75.0°)
- Pattern turns and overhead breaks permit bank angles up to **75.0°** (well above the 60° civil limit, tailored for Air Force tactical recoveries).

---

## Key Parameters & Tolerances

| Parameter | Value | Description |
| :--- | :--- | :--- |
| **Pattern Altitude Range** | `1,000 – 2,500 ft` | Standard Air Force overhead pattern floor |
| **Downwind Spacing** | `0.7 – 2.0 NM` | Optimal Viper downwind lateral displacement |
| **Max Bank Angle** | `75.0°` | High-performance tactical break bank limit |
| **Max Turn G** | `3.5 G` | Pattern turn load factor ceiling |
| **Final Glidepath Angle** | `3.0°` | Standard 3.0° glideslope |
| **Target Approach Speed** | `145.0 kt` | Evaluated against 145 ± 15 kt |
| **Hard Touchdown Limit** | `-800 ft/min` | Lightweight gear structural threshold |
| **Float Touchdown Limit** | `> -50 ft/min` | Penalized when landing deep/long past TDZ |
| **Touchdown Zone Target** | `3.0% – 25.0%` | First quarter of runway length |
| **Touchdown Lineup Tolerance**| `15.0 m` | Lateral centerline offset limit |

---

## Complete Configuration (`F-16C_50.json`)

```json
{
  "aircraft_type": "F-16C_50",
  "display_name": "F-16C Viper",
  "flared_landing": true,
  "pattern_alt_ft": 2500.0,
  "pattern_alt_min_ft": 1000.0,
  "pattern_alt_max_ft": 2500.0,
  "downwind_alt_tol_ft": 300.0,
  "downwind_spacing_min_nm": 0.7,
  "downwind_spacing_max_nm": 2.0,
  "max_turn_bank_deg": 75.0,
  "max_turn_g": 3.5,
  "final_glidepath_deg": 3.0,
  "final_glidepath_tol_ft": 80.0,
  "threshold_crossing_height_ft": 50.0,
  "final_lineup_mean_tol_m": 15.0,
  "final_lineup_rms_tol_m": 30.0,
  "final_speed_target_kts": 145.0,
  "final_speed_max_std_kts": 15.0,
  "touchdown_centerline_tol_m": 15.0,
  "sink_rate_hard_fpm": -800.0,
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
