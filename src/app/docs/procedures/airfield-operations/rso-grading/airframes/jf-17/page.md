---
title: JF-17 Thunder Grading Parameters
nextjs:
  metadata:
    title: JF-17 Thunder Grading Parameters
    description: RSO recovery grading parameters, pattern profiles, and touchdown criteria for the JF-17 Thunder.
---

{% callout title="Shallower 2.5° Glidepath & Flared Profile" type="note" %}
The JF-17 Thunder is configured with a shallower nominal final glidepath of 2.5° and a flared landing touchdown profile. Float sink rate sensitivity is stricter than default at -40 ft/min.
{% /callout %}

## Supported Airframes

- `JF-17` — Deka Ironwork Simulations JF-17 Thunder

---

## Profile Highlights & Specifics

### 1. 2.5° Final Glidepath Slope
- Calibrated to a nominal **2.5° glideslope angle** (compared to 3.0° on Western fighters), aligning with Chinese/Pakistani recovery standards and HUD bracket cues.

### 2. Flared Landing Touchdown Engine (`flared_landing: true`)
- **Aerodynamic Flare**: Flare is required to cushion touchdown below **-800 ft/min**.
- **Strict Float Limit**: Touching down long (> 25% TDZ) with a sink rate shallower than **-40 ft/min** triggers the `FLT` float penalty (-0.2 pts).

### 3. Bank Angle Limits (Up to 80.0°)
- Permits aggressive overhead pattern turns up to **80.0°** bank.

### 4. Dynamic Speed Consistency
- Evaluated on approach speed stability (standard deviation `≤ 15.0 kts`) rather than a fixed nominal knot target.

---

## Key Parameters & Tolerances

| Parameter | Value | Description |
| :--- | :--- | :--- |
| **Pattern Altitude Range** | `1,000 – 2,500 ft` | Standard military overhead pattern floor |
| **Downwind Spacing** | `0.7 – 2.0 NM` | Standard pattern lateral corridor |
| **Max Bank Angle** | `80.0°` | Tactical break bank limit |
| **Max Turn G** | `3.5 G` | Pattern turn load factor ceiling |
| **Final Glidepath Angle** | `2.5°` | **Shallower 2.5° nominal glideslope** |
| **Target Approach Speed** | *Dynamic* | Evaluated on speed consistency (Std Dev ≤ 15 kt) |
| **Hard Touchdown Limit** | `-800 ft/min` | Standard gear structural threshold |
| **Float Touchdown Limit** | `> -40 ft/min` | **Strict -40 fpm float threshold on deep landings** |
| **Touchdown Zone Target** | `3.0% – 25.0%` | First quarter of runway length |
| **Touchdown Lineup Tolerance**| `15.0 m` | Lateral centerline offset limit |

---

## Complete Configuration (`JF17.json`)

```json
{
  "aircraft_type": "JF-17",
  "display_name": "JF-17 Thunder",
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
  "max_turn_bank_deg": 80.0,
  "max_turn_g": 3.5,
  "final_glidepath_deg": 2.5,
  "final_glidepath_tol_ft": 80.0,
  "threshold_crossing_height_ft": 50.0,
  "final_lineup_mean_tol_m": 15.0,
  "final_lineup_rms_tol_m": 30.0,
  "final_speed_target_kts": null,
  "final_speed_max_std_kts": 15.0,
  "touchdown_centerline_tol_m": 15.0,
  "sink_rate_hard_fpm": -800.0,
  "sink_rate_float_fpm": -40.0,
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
