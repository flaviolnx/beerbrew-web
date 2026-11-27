🌐 **Language / Idioma:** [🇺🇸 English](Brewing-Fundamentals) | [🇧🇷 Português](Brewing-Fundamentals-PT) | [🇪🇸 Español](Brewing-Fundamentals-ES)

# Brewing Fundamentals

Grain-to-glass process overview, core brewing metrics, and the most impactful process controls.

## The Grain-to-Glass Process

All-grain brewing follows a defined sequence. Understanding each stage helps you troubleshoot problems and make informed recipe decisions.

### 1. Milling

Crushed malt — collectively called the **grist** — exposes starch granules for enzymatic conversion in the mash. The grind should be coarse enough to keep husks largely intact (for wort filtration) while crushing the endosperm. A gap setting of roughly 0.9–1.1 mm is typical for a two-roll mill, though optimal crush depends on your mill and grain moisture content.

### 2. Mashing

The **mash** is the controlled steeping of the grist in hot water. Amylase enzymes — primarily alpha-amylase and beta-amylase — break down starch into fermentable and non-fermentable sugars.

**Enzyme activity ranges:**

| Enzyme        | Peak Range            | Effect                                            |
| ------------- | --------------------- | ------------------------------------------------- |
| Beta-amylase  | 60–65 °C (140–149 °F) | Produces fermentable maltose; thinner, drier beer |
| Alpha-amylase | 68–72 °C (154–162 °F) | Produces longer dextrins; fuller body, higher FG  |

In practice most single-infusion mashes target 64–69 °C (147–156 °F) to balance fermentability and body. Beta-amylase denatures relatively quickly as mash temperatures move into the low 70s °C, while alpha-amylase remains active longer but also declines near mash-out temperatures. Typical mash time is 45–60 minutes for well-modified modern malt.

**Mash pH** (measured at room temperature) should fall between **5.2–5.6** for optimal enzyme activity, wort quality, and yeast health. This is covered in detail in [**Water Chemistry & Adjustments**](Water-Chemistry-and-Adjustments).

### 3. Lautering and Sparging

**Lautering** separates sweet wort from the grain bed. The first cloudy runnings may be recirculated (**Vorlauf**) until the wort clears. After collecting the first runnings, the grain bed is rinsed with hot water (**sparging**) to recover residual sugars.

Common sparging methods:

* **Fly sparge**: Continuous slow rinse of the grain bed while simultaneously draining — maximizes efficiency but requires careful management.
* **Batch sparge**: Drain, add all sparge water at once, stir, rest briefly, drain again — faster and simpler, slightly less efficient.
* **No-sparge**: Collect all wort from the initial mash volume; uses more grain but simplifies the process.

Sparge water temperature is typically 75–77 °C (167–170 °F). Keep grain-bed temperature and runoff pH in range during sparging to limit tannin extraction and astringency.

### 4. The Boil

The **wort boil** (typically 60–90 minutes) achieves several goals:

* **Sanitation**: Eliminates unwanted microorganisms.
* **Hop utilization**: Isomerization of alpha acids from hops gives **IBU** bitterness (requires sustained boiling).
* **Protein coagulation**: Hot break removes haze-forming proteins and precipitates as **trub**.
* **DMS (dimethyl sulfide) evaporation**: Drives off precursors of cooked-corn off-flavors from lighter malts — requires an open, vigorous, uncovered boil.
* **Concentration**: Evaporates water to reach target pre-boil volume and **OG**.

### 5. Whirlpool and Chilling

After the boil, a **whirlpool** rotates the wort to collect trub in a central cone. Hops added at flameout or during a hot-side hop stand (typically 79–88 °C / 174–190 °F) extract aroma compounds and some additional bitterness.

The wort is then chilled to pitching temperature — typically 18–20 °C (64–68 °F) for ales, 8–12 °C (46–54 °F) for lagers.

### 6. Fermentation

**Pitching** yeast into chilled wort begins fermentation. Yeast converts fermentable sugars into alcohol and CO₂ while producing flavor compounds (esters, fusel alcohols, organic acids). **Krausen** — a foamy head — forms during peak activity.

**Primary fermentation** lasts from a few days to two weeks depending on yeast strain, pitch rate, and temperature. For most ale strains this is complete when gravity stabilizes and **Krausen** drops.

**Conditioning** follows: the beer clears, off-flavor precursors (including **diacetyl**) are reabsorbed or metabolized, and flavors integrate. This can occur in the primary vessel or after transfer.

### 7. Packaging

Beer is packaged by bottling or kegging. **Priming sugar** added at bottling enables **bottle conditioning** (natural carbonation). Kegged beer is force-carbonated with CO₂. Oxygen exposure at this stage is the primary driver of staling — minimize it.

***

## Core Brewing Metrics

### Original Gravity (OG) and Final Gravity (FG)

**Gravity** measures wort or beer density relative to pure water (density = 1.000 SG). OG is the wort density before fermentation; **FG** is the density after fermentation is complete.

* OG of most beers falls between 1.030 (light session) and 1.120 (strong ales/barleywines).
* FG typically falls between 1.006 and 1.025, depending on yeast strain and fermentability.
* Both can also be expressed on the **Plato** scale (°P), where 1 °P ≈ 1.004 SG.

### ABV (Alcohol by Volume)

The simplified formula used by most homebrewing software:

> **ABV = (OG − FG) × 131.25**

A more accurate version for higher-gravity worts (Balling-derived formula):

> **ABV = (76.08 × (OG − FG) / (1.775 − OG)) × (FG / 0.794)**

The simplified formula is accurate to within \~0.1–0.2% ABV for most standard-gravity beers. The Balling-derived formula is more accurate at higher gravities.

### Attenuation

**Attenuation** measures how much of the wort's fermentable sugar was consumed. *Apparent attenuation* (the most commonly reported value) is:

> **Apparent Attenuation (%) = (OG − FG) / (OG − 1.000) × 100**

Example: OG 1.050, FG 1.010 → attenuation = (0.040 / 0.050) × 100 = **80%**

Typical attenuation ranges:

* Low-attenuation strains: 65–72 %
* Mid-attenuation strains: 73–79 %
* High-attenuation strains: 80–85 %+

Apparent attenuation overstates true (real) attenuation because alcohol is less dense than water, making the final beer appear lighter than it is.

### IBU (International Bitterness Units)

IBU measures the concentration of isomerized alpha acids in finished beer (mg/L or ppm). In practice, perceived bitterness depends on IBU relative to residual sweetness — the **bitterness:gravity ratio** matters as much as raw IBU.

> **BU:GU (Bitterness:Gravity Ratio)** = IBU / Gravity Units
>
> where **Gravity Units (GU) = (OG − 1.000) × 1000**
>
> * Below 0.5: Decidedly malty
> * 0.5–0.8: Balanced
> * Above 1.0: Decisively bitter

Common IBU calculation models:

* **Tinseth** (default in **beerbrew-web**): Accounts for pellet utilization and wort gravity.
* **Rager**: Tends to predict higher utilization at longer boil times.
* **Garetz**: More conservative; accounts for hop storage degradation.

No model is perfectly accurate; treat IBU values as estimates and calibrate against your palate.

### SRM and EBC (Beer Color)

**SRM** (Standard Reference Method) and **EBC** (European Brewery Convention) both quantify beer color.

Conversion: **EBC ≈ SRM × 1.97**

SRM is calculated using the **Morey formula** from Malt Color Units (MCU):

> **SRM = 1.4922 × MCU^0.6859** where MCU = (grain weight in pounds × grain color in °L) / wort volume in gallons

Rough color reference:

| SRM   | Description | Typical Style           |
| ----- | ----------- | ----------------------- |
| 2–4   | Pale straw  | Pilsner, Cream Ale      |
| 5–9   | Gold        | Pale Ale, Kölsch        |
| 10–17 | Amber       | Amber Ale, Vienna Lager |
| 18–26 | Brown       | Brown Ale, Altbier      |
| 27–35 | Dark brown  | Porter                  |
| 35+   | Black       | Stout                   |

***

## Process Control Priorities

Not all brewing variables are equally impactful. Focus here first:

1. **Sanitation**: Any contamination before fermentation can ruin a batch. Clean thoroughly, then sanitize contact surfaces with a no-rinse sanitizer (e.g., Star San, Iodophor).
2. **Temperature control during fermentation**: Off-flavors (excess **esters**, fusel alcohols) are strongly driven by fermentation temperature. Even ±2 °C (4 °F) above the optimal range noticeably affects some strains.
3. **Yeast pitch rate**: Underpitching stresses yeast, producing off-flavors and increasing attenuation variability. Match pitch rate to wort OG, volume, and yeast viability.
4. **Mash temperature and pH**: Determines fermentability (OG→FG ratio) and wort flavor baseline.
5. **Oxygen management**: Critical on the cold side (post-fermentation). Pre-boil oxygenation of wort actually helps yeast; post-fermentation exposure stales beer rapidly.

***

## Common Beginner Mistakes

| Mistake                     | Effect                                          | Fix                                                                             |
| --------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------- |
| Underpitching yeast         | Slow start, off-flavors, incomplete attenuation | Use a pitch rate calculator; make a starter for high-gravity beers              |
| Fermenting too warm         | Excess **esters**, fusel alcohols               | Control temperature; pitch at the low end of the yeast's range                  |
| Skipping mash pH            | Under/over-extraction, harsh or thin wort       | Aim for 5.2–5.6 pH; adjust water chemistry or use acid                          |
| Opening fermenter early     | Oxygen exposure, potential contamination        | Trust gravity readings over visual activity                                     |
| Incorrect equipment profile | All recipe estimates are wrong                  | Set up equipment profile accurately before brewing                              |
| Not cold-crashing           | Hazy beer and more yeast in package             | **Cold crash** 24–48 h before packaging                                         |
| Rushing conditioning        | Incomplete diacetyl cleanup, green flavors      | Allow at least a diacetyl rest for ale strains; lagers need longer conditioning |

***

## Brewer Tip: Calibrate Your Equipment Profile First

> **Setting up your Equipment Profile is the single most important step in beerbrew-web.** Every recipe metric — batch volume, pre-boil volume, OG, and hop utilization — depends on your system's losses and efficiency. Before brewing your first recipe:
>
> 1. Open **⚙️ Equipment** in the sidebar and create a profile for your setup.
> 2. Enter measured values for **Boil Time**, **Evaporation Rate (L/hr)**, **Kettle Deadspace**, **Lauter Deadspace**, **Trub / Chiller Loss**, and **Grain Absorption (L/kg)**.
> 3. Set your **Brewhouse Efficiency (%)** (start around 72–75% if unmeasured and refine after a few brews).
>
> When designing a recipe in **📋 Recipes**, select your preset from the **Equipment Preset** dropdown to auto-populate batch size, boil volume, boil time, and efficiency. After brew day, record your actual OG, FG, and volume in **📓 Brew Logs** to fine-tune future batches.

***

## Sources

* Palmer, John J. *How to Brew*, 4th ed. Brewers Publications, 2017. (Chapters 2–7, enzyme temperatures, attenuation, ABV formula)
* Daniels, Ray. *Designing Great Beers*. Brewers Publications, 1996. (IBU models, color calculations)
* Fix, George. *Principles of Brewing Science*, 2nd ed. Brewers Publications, 1999. (Enzyme kinetics, mash chemistry)
* Tinseth, Glenn. "Glenn's Hop Utilization Numbers." Real Beer Page. (IBU Tinseth model)
* Morey, Daniel. "Approximating SRM Beer Color of Homebrew." (Morey SRM formula)
* Kunze, Wolfgang. *Technology Brewing and Malting*, 5th ed. VLB Berlin, 2014. (Balling formula, lautering)

---

← [Home](Home) | [Overview](Home) | [Ingredients Deep Dive](Ingredients-Deep-Dive) →
