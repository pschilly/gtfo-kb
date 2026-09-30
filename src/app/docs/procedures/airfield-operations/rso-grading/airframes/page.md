---
title: Airframe Grading Parameters
nextjs:
  metadata:
    title: Airframe Grading Parameters
    description: Airframe-specific grading tolerances, pattern altitudes, approach speeds, sink rates, and touchdown criteria used by the RSO recovery daemon.
---

{% callout title="Server-Side Dynamic Scaling" type="note" %}
The Runway Safety Officer (RSO) daemon loads airframe profiles from individual JSON definitions. When an aircraft performs a recovery, its parameters (pattern limits, bank angles, glideslope angles, approach speed, touchdown tolerances, and float detection) scale automatically according to the airframe being flown.
{% /callout %}

## Overview

Different airframes have vastly distinct flight characteristics, wing loadings, landing gear structural limits, and recovery procedures. A naval fighter with heavy-duty carrier landing gear (such as the F-14 Tomcat or F/A-18C Hornet) is flown on-speed directly onto the runway without a traditional flare, whereas land-based fighters (such as the F-16C Viper or JF-17 Thunder) require a smooth flare and aerobraking rollout to protect lightweight gear and prevent bouncing.

To ensure objective and fair grading across the entire fleet, the RSO grading engine evaluates each flight pass against tailored parameters:

{% quick-links %}
  {% quick-link title="Default / Baseline Profile" description="Universal fallback tolerances applied to standard aircraft and unconfigured airframes." href="/docs/procedures/airfield-operations/rso-grading/airframes/default" icon="charter" /%}
  {% quick-link title="F-14 Tomcat Series" description="Carrier gear, 800–2,500 ft pattern, 90° max bank, 135 kt approach, wide spacing." href="/docs/procedures/airfield-operations/rso-grading/airframes/f-14" icon="lightbulb" /%}
  {% quick-link title="F-16C Viper" description="Flared touchdown, 75° max bank, 145 kt approach, strict aerobraking profile." href="/docs/procedures/airfield-operations/rso-grading/airframes/f-16" icon="lightbulb" /%}
  {% quick-link title="F/A-18C Hornet" description="Carrier gear, 800–2,500 ft pattern, 90° max bank, 138 kt approach, standard spacing." href="/docs/procedures/airfield-operations/rso-grading/airframes/fa-18" icon="lightbulb" /%}
  {% quick-link title="JF-17 Thunder" description="Flared touchdown, 2.5° glidepath slope, 80° max bank, -40 fpm float threshold." href="/docs/procedures/airfield-operations/rso-grading/airframes/jf-17" icon="lightbulb" /%}
{% /quick-links %}

---

## Airframe Parameters Master Matrix

The table below summarizes the key grading parameters, target values, and tolerances across all currently configured aircraft profiles.

| Parameter | Standard / Default | F-14 Tomcat (A/B/BU) | F-16C Viper | F/A-18C Hornet | JF-17 Thunder |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Aircraft Type ID** | `DEFAULT` | `F-14A-135-GR` / `F-14B` / `F-14BU` | `F-16C_50` | `FA-18C_hornet` | `JF-17` |
| **Touchdown Flare** | **Flared (Yes)** | **No Flare (Carrier Gear)** | **Flared (Yes)** | **No Flare (Carrier Gear)** | **Flared (Yes)** |
| **Pattern Alt Range** | 1,000 – 2,500 ft | 800 – 2,500 ft | 1,000 – 2,500 ft | 800 – 2,500 ft | 1,000 – 2,500 ft |
| **Downwind Spacing** | 0.7 – 2.0 NM | 0.8 – 2.2 NM | 0.7 – 2.0 NM | 0.7 – 2.0 NM | 0.7 – 2.0 NM |
| **Max Turn Bank** | 60.0° | 90.0° | 75.0° | 90.0° | 80.0° |
| **Max Turn G** | 3.5 G | 3.5 G | 3.5 G | 3.5 G | 3.5 G |
| **Glidepath Angle** | 3.0° | 3.0° | 3.0° | 3.0° | **2.5°** |
| **Target Approach Speed** | *Dynamic (Std ≤ 15 kt)* | **135.0 kt** (±15 kt) | **145.0 kt** (±15 kt) | **138.0 kt** (±15 kt) | *Dynamic (Std ≤ 15 kt)* |
| **Hard Touchdown Limit** | -800 ft/min | **-900 ft/min** | -800 ft/min | **-900 ft/min** | -800 ft/min |
| **Float Touchdown Limit** | > -70 ft/min | > -50 ft/min | > -50 ft/min | > -50 ft/min | **> -40 ft/min** |
| **Target TDZ Range** | 3.0% – 25.0% | 3.0% – 25.0% | 3.0% – 25.0% | 3.0% – 25.0% | 3.0% – 25.0% |
| **Deep TDZ Limit** | > 40.0% | > 40.0% | > 40.0% | > 40.0% | > 40.0% |

---

## Core Grading Differences Explained

### 1. Carrier Gear vs. Flared Touchdown Engine (`flared_landing`)

- **Carrier Gear (`flared_landing: false`)**: Used by the **F-14 Tomcat** and **F/A-18C Hornet**. These aircraft have robust trailing-link or high-energy absorption landing gear. The pilot is expected to fly the aircraft on-speed directly onto the runway touchdown zone without leveling off to float.
  - **Float Penalty (`FLT` / -0.2 pts)**: Always triggers if wheel contact sink rate is shallower than **-50 ft/min**, regardless of where on the runway the touchdown occurs.
  - **Hard Landing (`HRD` / -0.5 pts)**: Triggers if sink rate exceeds **-900 ft/min**.
- **Flared Landing (`flared_landing: true`)**: Used by the **F-16C Viper**, **JF-17 Thunder**, and the **Default** profile.
  - **Float Penalty (`FLT` / -0.2 pts)**: Floating is permitted near the runway threshold to bleed off energy. However, if the pilot floats excessively and touches down **past the target Touchdown Zone** (long/deep, > 25% of runway length) with a very flat sink rate (shallower than -40 to -70 ft/min), `FLT` is assessed.
  - **Hard Landing (`HRD` / -0.5 pts)**: Triggers if sink rate exceeds **-800 ft/min**.

### 2. Pattern Altitudes & Spacing

- **Tactical Altitudes (800–2,500 ft)**: Naval fighters (Tomcat, Hornet) support shore-based tactical break patterns down to 800 ft AGL without receiving altitude excursion penalties (`LO(DW)` / `LO(UW)`).
- **Standard Altitudes (1,000–2,500 ft)**: Air Force fighters and the Default profile expect pattern legs to remain above 1,000 ft AGL.
- **Turn Spacing**: The F-14 is allowed up to **2.2 NM** downwind lateral displacement to accommodate wide turning radiuses with wings swept forward during dirty configuration.

### 3. Final Approach Speeds & Consistency

- **Nominal Speed Targets**: Airframes with calibrated weight ranges (F-14 @ 135 kt, F-16 @ 145 kt, F/A-18 @ 138 kt) are graded on maintaining nominal approach airspeed within ±15 knots.
- **Speed Consistency (Standard Deviation)**: For airframes without a fixed nominal target (Default and JF-17), the engine evaluates speed stability—penalizing erratic throttle pumping or airspeed instability exceeding a 15-knot standard deviation (`NER(SPD)`).

### 4. Glidepath Angles

- **Standard 3.0° Glideslope**: Applied to most aircraft, aligned with standard ILS / PAPI glideslope geometry.
- **2.5° Glideslope**: Configured specifically for the **JF-17 Thunder** to match standard PAC/CAC recovery procedures.

---

## Scoring System Weight Distribution

Regardless of airframe profile, the RSO grading engine distributes the 5.0 total points across four distinct phases of the recovery:

| Phase | Max Points | Monitored Parameters & Deductions |
| :--- | :---: | :--- |
| **Downwind & Pattern Legs** | **1.0 pt** | Altitude stability, downwind displacement/spacing, leg height consistency. |
| **Turn Dynamics** | **1.0 pt** | Bank angle limits (60°–90° per airframe), G load (≤ 3.5 G), base ballooning. |
| **Final Approach** | **1.5 pts** | Glideslope tracking (3.0° / 2.5°), centerline lineup, speed stability, TCH (50 ft). |
| **Touchdown** | **1.5 pts** | TDZ longitudinal position (3%–25%), centerline alignment (≤ 15 m), sink rate. |
| **Total Possible** | **5.0 pts** | Combined recovery score mapped to Letter Grades (`OK`, `(OK)`, `---`, `CUT`). |
