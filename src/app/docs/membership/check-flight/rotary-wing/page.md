---
title: Rotary Wing Check Flight
nextjs:
  metadata:
    title: Rotary Wing Check Flight
    description: A basic check flight conducted in a rotary wing aircraft. This ensures that prospective members have a base understanding of both airfield operations and radio communications. It also allows us to ensure folks are proficient in conversational English, which is a requirement for membership at Global Task Force Overlord.
---

In order to be successful in your check flight, please ensure the following is done prior to starting:

- All [required modifications](/docs/resources/modifications) installed and operational.
- Marianas Terrain installed and operational.
- DCS updated and functional.
- Run a "systems check" of your peripherals (HOTAS, Pedals, Track IR / VR, etc...) to ensure smooth operation.
- A [callsign](/docs/membership/check-flight#callsigns) selected.

{% callout title="Communication is Key" %}
By far, the most common reason for a do-over of your check flight is failure to ensure **clear**, **concise**, and **consistent** radio communications throughout all phases of the check flight.
{% /callout %}

This check flight can be done with any standard DCS rotary wing module.

It is suggested that you conduct this check flight in the airframe for which you are most comfortable.

## Getting Started & Overview

- Select a **dynamic** slot at **Anderson AFB**.
- Your helicopter should be preprogrammed with the radio frequencies needed to successfully complete the check flight, if not, get them ready.

{% callout title="Frequency Reminder" %}
The frequencies we will be using during the Check Flight are
**CTAF** 145.00 Mhz AM and
**Strike** 351.500 MHz AM
{% /callout %}

## Requirements to Pass

Given the nature of rotary wing aircraft, there are some unique items that must be checked off before you will receive your qualification:

- Clear, Concise, and Consistent Radio Communications
- Ability to Hover Taxi
- Ability to Hover in place (15 seconds min)
- React to Engine Failure

## Run-Up, Taxi & Takeoff

To begin, select the aircraft of your choice and dynamic spawn at Anderson AFB. You will be performing a cold start.

Departure for your check flight will take place on runway **06L** - ThIS the first time of the check flight where **clear** and **concise** radio communications come in play. Take a look here and familiarize yourself with the layout of Anderson AFB:

{% andersonchart /%}

- When you are ready to taxi the first thing you need to do is call into Anderson Traffic and request taxi instructions. Utilizing the [Radio Communications](/docs/procedures/radio-communications) procedures, transmit the following radio sequences on **CTAF**:

```radio
--145.00--

ANDERSON TRAFFIC //
  HEAVY 1-1 IS ON PARKING PAD "BRAVO" READY FOR TAXI //
ANDERSON TRAFFIC //
```

From there you will read back your taxi clearance.

Once cleared you will begin a ground taxi until you are clear of all other aircraft at which point you may begin to hover taxi to your hold short point.

At this point your instructor will call a brief tactical pause in which you will do your hover checks and hover practice.

### Hover Checks

You must hold a stable hover in place for **15 seconds**. Upon completion of the 15 second hover you will execute a **360 left hand** petal turn followed by a **360 right hand** pedal turn.

Once complete with all of your hover checks you will call **Anderson Tower** and declare that you are now ready for takeoff. Next you will be performing a left hand traffic pattern maintaining **600 feet AGL** and **100 KCAS**:

```radio
--145.00--

ANDERSON TRAFFIC //
  HEAVY 1-1 IS READY FOR TAKE OFF, HOLDING SHORT AT "BRAVO",
  FOR LEFT CLOSE TRAFFIC //
ANDERSON TRAFFIC //
```

From here you will receive your take off clearance. You will take off maintaining runway heading before reaching your cross wind turn. Then you will enter the downwind leg of your traffic pattern. At this point you will call tower again and state the following:

```radio
--145.00--

ANDERSON TRAFFIC //
  HEAVY 1-1 IS LEFT DOWNWIND, REQUESTING VMC APPROACH ABEAM
  THE TOWER AND REQUESTING RIGHT CLOSE TRAFFIC UPON TOUCHDOWN //
ANDERSON TRAFFIC //
```

At this point the tower operator will clear to land on the runway and once touching down will clear you again for take off this time with a right turn outbound for the right side traffic pattern.

## Emergency Landing Phase

Once in the downwind leg of your right side traffic pattern you will experience some sort of aircraft problem and need to contact tower and request an emergency landing:

```radio
--145.00--

ANDERSON TRAFFIC //
  HEAVY 1-1 IS IN THE RIGHT DOWNWIND OF RUNWAY "06L",
  DECLARING EMERGENCY AT THIS TIME DUE TO ENGINE FAILURE //
ANDERSON TRAFFIC //
```

Upon completion of the emergency landing you will fix whatever the induced error was and request take off from the run way with a left or right downwind departure to the east or west depending on what runway is in use:

```radio
--145.00--

ANDERSON TRAFFIC //
  HEAVY 1-1 IS ON RUNWAY "06L", EMERGENCY COMPLETE READY
  FOR TAKE OFF LEFT DEPARTURE TO THE WEST / EAST //
ANDERSON TRAFFIC //
```

## Cross Country Phase

At this point tower will clear you for whatever departure you need and you will exit the airspace. You will executing a VMC "cross country" to **Antonio B. Won Pat Intl.** airport which is directly to the south west of Anderson. Antonio is a non-towered airfield. During this portion of your flight you may experience some enemy engagements. Take a look at the Antonio Intl. Airfield chart:

{% antoniochart /%}

Once you have Antonio Airport in sight you will call on Antonio CTAF frequency 145.000 on you VHF radio and report that you are inbound from the north east.

```radio
--145.00--

ANTONIO TRAFFIC //
  HEAVY 1-1 IS 15 MILES INBOUND FROM THE NORTHEAST
  IN BOUND TO LAND //
ANTONIO TRAFFIC //
```

## Landing & Shutdown

From here you will continue to fly inbound using your wind considerations. For the purposes of this check flight, the active runway is **06L**. You will execute the proper pattern entry procedure for that runway wether its a straight in, 45 degree, cross wind, Base, or downwind entry. (Might help to note that being able to explain these will help you out alot). Once determined you will call the freq again stating what you plan to do.

```radio
--145.00--

ANTONIO TRAFFIC //
  HEAVY 1-1 IS ENTERING THE CROSSWIND/BASE/STRAIGHT IN/DOWNWIND/ 45
  FOR RUNWAY "06L", FULL STOP //
ANTONIO TRAFFIC //
```

At this point you will execute your landing using the appropriate pattern entry procedures. You will then call **Antonio Traffic** one more time to then call yourself into parking.

```radio
--145.00--

ANTONIO TRAFFIC //
  HEAVY 1-1 IS DEPARTING RUNWAY "06L" ON TAXIWAY "D"
  FOR HELICOPTER PARKING TERMINATION LAST CALL //
ANTONIO TRAFFIC //
```

Once you have departed the runway and have made it to your parking slot - shut down the aircraft and await full rotor halt before de-slotting and exiting the server.

## Conclusion

Once you have completed your check flight, your instructor will provide you some feedback as well as the much anticipated go / no-go decision. So long as they have no reservations, you will be assigned to a squadron based on the airframe you wish to fly the most and can immediately begin participating in more events within the task force.

---

#### Revisions

| #     | Short Summary                      | Date of Approval |
| :---- | ---------------------------------- | ---------------: |
| 0.0.2 | KB & Check Flight Procedure Update |        14 Jul 25 |
| 0.0.1 | Document Creation                  |        01 Dec 24 |
