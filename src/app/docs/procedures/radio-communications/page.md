---
title: Radio Communications
nextjs:
  metadata:
    title: Radio Communications
    description: Standard Radio communication procedures to ensure we all know how to talk to each other over the radio.
---

## General Concept

Generally speaking, when utilizing the radio the two key things to keep in mind for every transmission are to ensure that it is **clear** and **concise**.

Radio calls that are mumbled are no good for anyone, and if you are reciting a novel over the net - this will clog it up for someone else to use and call out something that may be critical in nature, ie: SMOKE IN THE AIR.

## Radio Call Pattern

For the most part, all radio calls will follow the same basic pattern:

**Hey YOU, its ME, << whatever it is you are trying to convey >>**

There are some notable examples where this may not apply, for instance:

```radio
--- 351.500 ---

CHEVY 1-2 SMOKE IN THE AIR
EVADE
EVADE //
```

This is simply a call out on the tactical frequency, **351.500 MHz**, to **CHEVY 1-2** that someone is seeing a missile heading towards them and instructing them to evade. For instnaces like this, going through the **HEY YOU ITS ME** process is simply too long and could result in the loss of **CHEVY 1-2**.

{% callout title="Did you know..." %}
When displaying radio transmissions in **written** form, the line symbols mean something!

If you see a `//` after a line in the written radio transmission, that means to include a "break" or let go of your PTT.

This is done to allow for a pause in the transmission to allow someone else on the net to `break` into the sequence in case of emergency. Thats why you may hear someone shout out `BREAK BREAK BREAK` brevity call, which means "I have something important to say... all other non-emergency radio traffic should stop to allow me to say what I have to say".

The more you know!
{% /callout %}

### Uncontrolled Airfield Example

For example. taxing in at **uncontrolled airfield**:

```radio
--- 145.00 ---

ANDERSON TRAFFIC, CHEVY 1-1 //
  TAXING TO "06L" VIA "APRON", "ALPHA" //
ANDERSON TRAFFIC //
```

In this example, you **CHEVY 1-1** is talking to an airfield traffic, **ANDERSON TRAFFIC**, via CTAF frequency **145.000 MHz** AM. In the transmission, you are **declaring your intent** to taxi to the active runway **06L** via the **apron** and **alpha** taxiway. Given that in this example, Anderson AFB is "uncontrolled", you are declaring your intent and are able to proceed immediately unless someone else responds - remember from the [airfield operations](/docs/procedures/airfield-operations), other planes or vehicles in motion have priority over a stationary plane waiting to taxi.

### AWACS Example

Another example, calling AWACS:

```radio
--- 354.500 ---
OVERLORD, CHEVY 1-1 //
  BOGEY DOPE //
```

In this example, you **CHEVY 1-1** is asking **OVERLORD** or the AWACS controller, for a **BOGEY DOPE** - meaning a BRAA to the nearest threat.

## BRAA what now?

BRAA, similar to BOGEY DOPE, or SMOKE IN THE AIR, or WILCO are all examples of **radio brevity callouts**. As the name suggests, a **brevity** call out, is a commonly known term that is short and easy to say over the radio that generally means something that would take longer to say on the radio and therefore clog up the airwaves. We have a full working list of brevity call outs that can be found here: [Google Sheet - Radio Brevity & Definitions](https://docs.google.com/spreadsheets/d/1rfYB1Y0eudTlEUwIa04P4sdhCrGkhiyE4ur63Kry6w0/edit?usp=sharing){:target="\_blank"}

Some common brevity you may here are:

- **BINGO** - out of fuel
- **BRAA** - Give me the **BEARING**, **RANGE**, **ALTITUDE** and **ASPECT** of a target in relation to a friendly.
- **BOGEY** - an enemy aircraft
- **ANGELS** - Altitude in feet from sea level (MSL)

Take a look at the Google sheet for a fairly exhaustive list.

## Common Radio Freqencies

The following is a listing of common frequencies used throughout the Task Force. It is expected that all Task Force members will be using these frequencies while operating on the 24/7 servers as well as during any organized event (campaign, training, etc...):

| Frequency                 | Purpose           | TACAN | Callsign      |
| ------------------------- | ----------------- | ----- | ------------- |
| 145.000 VHF               | CTAF              |       | Airfield Name |
| 351.500 UHF / 127.000 VHF | Tactical          |       |               |
| 354.500 UHF               | AWACS             |       | Overlord      |
| 354.550 UHF               | SkyEye GCI        |       | Overlord      |
| 327.500 UHF               | CVN-71            | 71X   | Roosevelt     |
| 353.500 UHF               | Tanker (Drogue)   | 65Y   | Texaco        |
| 352.500 UHF               | Tanker (Boom)     | 66Y   | Shell         |
| 355.500 UHF               | Tanker (Recovery) | 64Y   | Arco          |

## Speciality Radio Frequencies

The following frequencies are used primarily for operations, specifically public events, to allow for decluttering of radio waves.

| Frequency   | Purpose           | Callsign   |
| ----------- | ----------------- | ---------- |
| 145.000 VHF | CTAF              | Common ATC |
| ---         | ATC Taxi / Ground | Ground     |
| ---         | ATC Tower         | Tower      |
| ---         | ATC Departure     | Departure  |

---

#### Revisions

| #     | Short Summary       | Date of Approval |
| :---- | ------------------- | ---------------: |
| 0.0.5 | KB Migration        |        17 Jul 25 |
| 0.0.4 | Add SkyEye GCI Freq |         1 Apr 25 |
| 0.0.3 | Tanker TACAN X > Y  |        19 Feb 25 |
| 0.0.2 | CVN72 > CVN71       |        01 Jan 25 |
| 0.0.2 | Frequency Updates   |        14 Dec 24 |
| 0.0.1 | Initial Creation    |        01 Dec 24 |
