🌐 **Language / Idioma:** [🇺🇸 English](Water-Chemistry-and-Adjustments) | [🇧🇷 Português](Water-Chemistry-and-Adjustments-PT) | [🇪🇸 Español](Water-Chemistry-and-Adjustments-ES)

# Water Chemistry & Adjustments

Ions, alkalinity, mash pH, sulfate-to-chloride balance, and how to manage Water Profiles in **beerbrew-web** for consistent results.

Water is often called the "silent ingredient" in beer — it affects nearly every quality dimension, from enzyme activity during the mash to hop perception in the glass. This section covers the science behind water adjustment, practical targets, and how to organize profiles in **beerbrew-web**.

## Why Water Chemistry Matters

The mineral content of your water influences:

* **Mash pH**: Enzymes that convert starch to sugar operate optimally at pH 5.2–5.6. Outside this range, conversion efficiency drops, wort quality suffers, and off-flavors increase.
* **Flavor balance**: Sulfate accentuates hop dryness and bitterness; chloride emphasizes malt roundness and fullness.
* **Yeast health**: Calcium is essential for yeast flocculation and enzyme function.
* **Clarity and stability**: Adequate calcium promotes precipitation of proteins and oxalate, reducing haze.
* **Overall flavor quality**: Sodium adds roundness; magnesium can be harsh at high levels; excess alkalinity creates harsh, astringent wort from dark malts.

***

## Key Ions and Their Effects

### Calcium (Ca²⁺)

Calcium is the single most important brewing ion. It:

* Lowers mash pH by precipitating phosphates from malt (releasing H⁺ ions).
* Supports enzyme activity and yeast health (required cofactor for many enzymatic reactions).
* Promotes protein and calcium oxalate precipitation (improves clarity and reduces gushing risk).
* Enhances hop bitterness perception and reduces rounding.

**Target range**: 50–150 ppm. A minimum of 50 ppm is strongly recommended; 100–150 ppm is typical for most styles. Very high levels (>200 ppm) can taste chalky.

**Sources**: Gypsum (CaSO₄) adds Ca²⁺ and SO₄²⁻; Calcium Chloride (CaCl₂) adds Ca²⁺ and Cl⁻.

### Magnesium (Mg²⁺)

Magnesium is a yeast nutrient required in trace amounts. Wort naturally provides adequate magnesium from malt in most cases. At elevated levels (>30 ppm), magnesium tastes harsh, sour, or metallic and acts as a laxative.

**Target range**: 0–30 ppm. Most brewers aim for 10–20 ppm. Avoid deliberately adding magnesium salts unless your source water is very soft and your malt bill is unusual.

**Sources**: Epsom salt (MgSO₄) adds Mg²⁺ and SO₄²⁻.

### Sodium (Na⁺)

Sodium at low concentrations (50–100 ppm) enhances mouthfeel, rounds out flavors, and accentuates sweetness — useful in malt-forward styles. Above \~150 ppm it becomes unpleasantly salty. Sodium interacts synergistically with chloride to enhance malt character.

**Target range**: 0–100 ppm for most styles; up to 150 ppm for malt-forward/stout styles.

**Sources**: Baking Soda (NaHCO₃) adds Na⁺ and raises pH; Table Salt (NaCl) adds Na⁺ and Cl⁻ without significant pH effect.

### Chloride (Cl⁻)

Chloride enhances fullness, body, sweetness, and malt character. It complements Sodium's effect. At very high levels (>300 ppm) it can taste mineralic or harsh, and it can stress some yeast strains.

**Target range**: 50–200 ppm. Higher ranges (150–200+ ppm) suit malt-forward and hazy/New England styles; lower ranges (50–75 ppm) suit dry, hoppy styles.

**Sources**: Calcium Chloride (CaCl₂), Table Salt (NaCl).

### Sulfate (SO₄²⁻)

Sulfate enhances hop bitterness perception, crispness, and dryness. It is the primary tool for pushing a beer toward a drier, more bitter character. At high levels (>400 ppm) it can taste harsh, minerally, or astringent.

**Target range**: 50–350 ppm. Light lagers and malt-forward styles: 25–75 ppm. West Coast IPA: 200–350 ppm. Burton-on-Trent style bitters: up to 700+ ppm (historically notable but extreme by modern standards).

**Sources**: Gypsum (CaSO₄), Epsom Salt (MgSO₄).

### Bicarbonate / Alkalinity (HCO₃⁻)

Alkalinity (primarily from bicarbonate in most water sources) resists pH drops during mashing. Roasted and crystal malts are naturally acidic and need alkalinity to buffer against excessive acidification. Pale mashes acidify naturally during mashing (primarily via phosphate reactions with calcium), which is the desired effect — they do **not** need alkalinity support.

Excess alkalinity in pale wort produces harsh, astringent flavors and impairs enzyme activity. It must be balanced with the grain bill.

**Target range by wort color**:

| Wort Color          | Alkalinity (as CaCO₃) | Bicarbonate (HCO₃⁻) |
| ------------------- | --------------------- | ------------------- |
| Very pale (Pilsner) | 0–25 ppm              | 0–30 ppm            |
| Pale (Pale Ale)     | 0–50 ppm              | 0–60 ppm            |
| Amber               | 25–100 ppm            | 30–120 ppm          |
| Dark (Porter/Stout) | 100–250 ppm           | 122–305 ppm         |

**Sources**: Baking Soda (NaHCO₃) raises alkalinity; acids (lactic, phosphoric) reduce alkalinity. Reverse osmosis or dilution with distilled water reduces alkalinity from high-alkalinity tap water.

***

## Residual Alkalinity (RA)

**Residual Alkalinity** quantifies the net effect of alkalinity and hardness on mash pH. Calcium and magnesium ions precipitate phosphates during mashing, consuming alkalinity. The remaining alkalinity (the "residual" that raises mash pH) is:

> **RA (as CaCO₃, ppm) = Total Alkalinity − (Ca ppm / 3.5) − (Mg ppm / 7)**

*Source: Kolbach, 1953*

A **positive RA** means the water will raise mash pH — appropriate for dark grain bills. A **negative RA** (more calcium/magnesium hardness than alkalinity) means the water will lower mash pH — appropriate for pale grain bills.

**RA Targets**:

| Beer Color                       | RA Target (ppm CaCO₃) |
| -------------------------------- | --------------------- |
| Very pale (Pilsner, light lager) | −50 to 0              |
| Pale ale, Wheat beer             | −25 to +50            |
| Amber/Vienna                     | +50 to +100           |
| Brown Ale, Altbier               | +75 to +150           |
| Porter, Stout                    | +100 to +200          |

In practice, the primary variable to control is mash pH directly (measure it!) with RA as a planning guide.

***

## Mash pH

**Target: 5.2–5.6 (measured at room temperature, \~20 °C)**

This is the single most impactful water chemistry parameter. Within this range:

* Alpha- and beta-amylase are both active.
* Lautering is cleaner (less starch and tannin extraction).
* Hop bitterness is smoother.
* Yeast performs better in fermentation.
* Beer clarity and stability are improved.

pH higher than 5.6 increases risk of harsh, astringent extraction and reduces enzyme performance. pH much lower than 5.2 can reduce fermentability and produce an overly sharp wort profile.

**Important**: Standard mash pH targets (5.2–5.6) are referenced at room temperature (20 °C). When measuring mash pH hot during the mash (60–70 °C), the reading will appear roughly 0.2–0.35 pH units lower due to temperature effects. Always cool a small wort sample to room temperature before measuring.

### Factors That Lower Mash pH

* Calcium ions (phosphate precipitation from malt)
* Acidulated malt
* Lactic or phosphoric acid additions
* Crystal and roasted malts (to a lesser extent)

### Factors That Raise Mash pH

* Bicarbonate/alkalinity in source water
* Chalk (CaCO₃) — dissolves poorly without pressurized CO₂; prefer slaked lime or baking soda when alkalinity is needed
* Baking Soda (NaHCO₃)
* Slaked Lime (Ca(OH)₂)

***

## Chloride:Sulfate Balance

The ratio of sulfate to chloride (SO₄:Cl) is a primary dial for steering the overall flavor perception between hop-forward and malt-forward:

| SO₄:Cl Ratio | Beer Character            |
| ------------ | ------------------------- |
| < 0.5        | Very malty, round, sweet  |
| 0.5–1.0      | Malt-leaning, balanced    |
| 1.0–2.0      | Balanced                  |
| 2.0–4.0      | Hop-forward, dry, crisp   |
| > 4.0        | Very hoppy, dry (extreme) |

**Style examples:**

| Style               | SO₄ (ppm) | Cl (ppm) | Approx. Ratio        |
| ------------------- | --------- | -------- | -------------------- |
| NEIPA / Hazy IPA    | 50–100    | 100–200  | \~1:2 (Cl > SO₄)     |
| West Coast IPA      | 150–300   | 50–100   | \~3:1                |
| English Bitter      | 200–400   | 50–100   | \~3:1 to 4:1         |
| Pale Ale (balanced) | 100–150   | 75–125   | \~1.5:1              |
| Pilsner             | 10–30     | 5–25     | \~1:1 or low overall |
| Stout / Porter      | 50–100    | 75–150   | \~1:1 to 1:2         |

Note that the absolute levels of each ion matter alongside their ratio. A beer with 10 ppm SO₄ and 5 ppm Cl has the same ratio as one with 400 ppm and 200 ppm, but very different mineral intensity.

***

## Classic Water Profiles Reference

Famous brewing water profiles have influenced their associated beer styles. These are useful starting points, not rules:

| Profile         | Ca  | Mg | Na | Cl | SO₄ | HCO₃ | Known For                 |
| --------------- | --- | -- | -- | -- | --- | ---- | ------------------------- |
| Pilsen          | 7   | 2  | 2  | 5  | 6   | 16   | Czech Pilsner; ultra-soft |
| Dublin          | 115 | 4  | 12 | 19 | 53  | 315  | Dry Irish Stout           |
| Burton-on-Trent | 295 | 45 | 55 | 25 | 725 | 320  | English Bitter, IPA       |
| Munich          | 75  | 18 | 2  | 2  | 10  | 152  | Bavarian lager            |
| London          | 70  | 6  | 15 | 38 | 40  | 166  | English Porter, Mild      |

All values in ppm (mg/L).

Modern brewers generally build custom profiles targeting specific ion levels rather than blindly replicating historical water. Historical profiles were the result of local geology, not deliberate optimization.

***

## Practical Water Adjustment Decision Framework

### Step 1: Know Your Source

Obtain a water report from your municipal supplier or test your well water, and save it under **💧 Water** in **beerbrew-web**. If your tap water varies seasonally or you want maximum control, start from **Reverse Osmosis (RO) / Distilled Base** (all zeros) and build up with brewing salts.

### Step 2: Target Calcium First

Ensure Ca²⁺ ≥ 50 ppm in your mash water. Add Gypsum for SO₄ character or Calcium Chloride for Cl character (or both) to reach target.

### Step 3: Set the SO₄:Cl Ratio for the Style

Choose a target ratio based on whether the beer should emphasize hops or malt. Adjust Gypsum vs. Calcium Chloride additions accordingly.

### Step 4: Manage Alkalinity for the Grain Bill

* **Pale grain bill**: Aim for near-zero or slightly negative RA. If source water is high-bicarbonate, dilute with RO or acidify sparge water.
* **Dark grain bill**: Allow moderate alkalinity or add Baking Soda in small amounts.

### Step 5: Verify Mash pH

Verify your mash pH 10–15 minutes after dough-in with a calibrated pH meter on a cooled room-temperature sample, and fine-tune future batches with small lactic or phosphoric acid additions.

### Step 6: Treat Sparge Water

Sparge water should ideally be pH 5.5–6.0. Higher pH during sparging risks extracting tannins from the grain bed as the grain acidification capacity is exhausted. Add a small amount of lactic acid to sparge water if your source alkalinity is high.

***

## Brewer Tip: Managing Water Profiles in beerbrew-web

> **Store your source water and target style ion profiles in 💧 Water so every recipe carries clear mineral targets.** Here is a practical workflow:
>
> 1. Open **💧 Water** in the sidebar and enter your baseline water report (or use the pre-seeded **RO / Distilled Base**, **Hoppy West Coast IPA**, **Balanced Amber / Pale Ale**, or **Malty** profiles).
> 2. Check the automatic **SO₄:Cl ratio** and flavor balance badge (`Hoppy / Crisp`, `Malty / Full`, `Balanced`, or `Neutral`) calculated by **beerbrew-web**.
> 3. Inside **📋 Recipes → Mash Schedule & Water Chemistry**, select your **Target Water Profile** from the dropdown.
> 4. Record the exact gram/milliliter additions of Gypsum (CaSO₄), Calcium Chloride (CaCl₂), Epsom Salt (MgSO₄), Baking Soda, or Lactic Acid in **Miscs & Water Salts** so they print directly on your **Brew Day Sheet**.

***

## Acid Additions: Lactic vs. Phosphoric

Both lactic and phosphoric acid are food-safe, non-rinse-required acids used for mash and sparge pH adjustment.

| Acid                     | Concentration Available       | Notes                                                                                      |
| ------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------ |
| Lactic acid (88%)        | 80–88% typical homebrew grade | Adds a mild lactic note at very high doses (>0.5 mL/L); barely perceptible at normal rates |
| Phosphoric acid (75–85%) | Various concentrations        | Flavor-neutral; no off-flavor risk; more concentrated                                      |
| Phosphoric acid (10%)    | Diluted solution              | Safer to handle; larger volumes needed                                                     |

For most homebrewing applications, either acid is appropriate. Phosphoric acid is preferred when adding larger volumes or if any lactic character would be off-style. Lactic acid is more widely available and very effective in typical doses (1–5 mL per 20 L batch).

Always verify the concentration of your acid bottle (for example, 88% lactic acid vs. 10% or 75% phosphoric acid) before measuring additions.

***

## Troubleshooting Common Water Issues

| Symptom                                           | Likely Cause                          | Action                                                                 |
| ------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| Harsh, astringent mash or beer                    | High alkalinity/pH in pale mash       | Reduce alkalinity (dilute with RO or acidify); verify mash pH          |
| Thin, sour wort from dark malt                    | pH too low from highly roasted grains | Increase alkalinity; consider steeping dark malts separately post-mash |
| Beer tastes salty or harsh                        | Na or Cl too high                     | Reduce salt additions; dilute with RO water                            |
| Beer feels flat and thin despite good attenuation | Low chloride                          | Increase CaCl₂ addition                                                |
| Hop bitterness feels harsh/sharp                  | Very high sulfate (>400 ppm)          | Reduce Gypsum; recalculate SO₄:Cl ratio                                |
| Cloudy beer, poor clarity                         | Low calcium                           | Ensure Ca²⁺ ≥ 50–75 ppm                                                |

***

## Sources

* Palmer, John J. *How to Brew*, 4th ed. Brewers Publications, 2017. (Chapter 15: Water Chemistry; Chapter 16: Adjusting Water)
* Palmer, John J., and Colin Kaminski. *Water: A Comprehensive Guide for Brewers*. Brewers Publications, 2013. (Comprehensive water chemistry reference; RA, ion targets, mash pH)
* Kolbach, P. "Berechnung der Restalkalität von Brauwasser." *Monatsschrift für Brauwissenschaft* 6.6 (1953): 98–99. (Residual Alkalinity formula)
* Delange, A.J. "A Brewing Water Chemistry Primer." HomeBrewTalk.com, 2009. (Practical ion guidance, chalk solubility notes)
* ASBC Methods of Analysis. "Water and Wort" sections. (Analytical references for alkalinity, hardness, and ion measurement)
* Fix, George. *Principles of Brewing Science*, 2nd ed. Brewers Publications, 1999. (pH and enzyme activity)
* Briggs, D.E., et al. *Brewing: Science and Practice*. Woodhead / CRC Press, 2004. (Alkalinity, sparge water pH, tannin extraction)

---

← [Ingredients Deep Dive](Ingredients-Deep-Dive) | [Overview](Home) | [Mash & Lauter Science](Mash-and-Lauter-Science) →
