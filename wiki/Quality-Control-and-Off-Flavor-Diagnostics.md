🌐 **Language / Idioma:** [🇺🇸 English](Quality-Control-and-Off-Flavor-Diagnostics) | [🇧🇷 Português](Quality-Control-and-Off-Flavor-Diagnostics-PT) | [🇪🇸 Español](Quality-Control-and-Off-Flavor-Diagnostics-ES)

# Quality Control & Off-Flavor Diagnostics

Sensory evaluation, common off-flavor fault signatures, root-cause matrix, and how to use **beerbrew-web** brew logs to accelerate diagnosis.

Consistent, high-quality beer begins with a structured approach to evaluating what you produce and a systematic method for tracing faults back to their origin. This page covers the sensory evaluation process, a catalog of common off-flavors with their perceptual descriptors and root causes, and a process-stage root-cause matrix to guide corrective action.

***

## Sensory Evaluation: A Structured Approach

A repeatable tasting protocol separates objective observation from guesswork.

### 1. Environment

* Taste in a neutral, well-lit space away from cooking smells, perfume, or smoke.
* Use clean, room-temperature, odor-free glassware with no detergent residue.
* Taste without food for at least 30 minutes beforehand.

### 2. Appearance

* Note clarity (clear, hazy, turbid), color (compare to your target SRM/EBC), and head formation and retention.
* Haze can signal chill haze (temporary, clears when warm), protein haze, yeast in suspension, or biological contamination.

### 3. Aroma

* Swirl and sniff immediately after pouring. Note the dominant notes (malt, hops, fruity esters, sulfur, off-notes).
* The olfactory system adapts quickly — make your first impression count.

### 4. Taste

* Take a small sip, let it coat the whole palate. Note sweetness, bitterness, acidity, saltiness, and any off-notes.
* Evaluate balance: malt sweetness vs hop bitterness (related to your IBU:gravity ratio).

### 5. Mouthfeel & Finish

* Note body (thin, medium, full), carbonation level, warmth (alcohol), astringency, and lingering aftertaste.

### 6. Document Everything

* Write tasting notes immediately. Memory degrades within minutes.

> **Brewer Tip:** Record structured tasting notes in **📓 Brew Logs** after conditioning. Comparing sensory observations across batches reveals patterns — for example, recurring diacetyl in cooler fermentations points to adding a warmer diacetyl rest step in your **Fermentation Profile**.

***

## Common Off-Flavors: Descriptors, Thresholds & Root Causes

### Diacetyl

| Attribute       | Detail                                                                                                                                                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descriptor**  | Butter, butterscotch, toffee                                                                                                                                                      |
| **Threshold**   | Often cited around \~0.05–0.15 mg/L (varies by beer matrix and taster sensitivity)                                                                                                |
| **Root causes** | Insufficient diacetyl rest; premature cold crash; severe under-pitching; high fermentation temperature followed by rapid chilling; *Pediococcus* or *Lactobacillus* contamination |
| **Fix**         | Raise temperature to 18–20 °C (64–68 °F) for 48–72 h before crashing; ensure adequate pitch rate; verify sanitation                                                               |

Diacetyl is a normal yeast by-product (from acetolactate) reabsorbed during conditioning. Crashing before reabsorption is complete is the most common cause in homebrewing.

***

### Acetaldehyde

| Attribute       | Detail                                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Descriptor**  | Green apple, fresh-cut pumpkin, cidery                                                                                                           |
| **Threshold**   | \~10–25 mg/L                                                                                                                                     |
| **Root causes** | Incomplete fermentation; beer removed from yeast too soon; insufficient conditioning time; yeast stress                                          |
| **Fix**         | Allow more conditioning time in contact with yeast; slightly raise temperature (diacetyl rest helps here too); do not rack off yeast prematurely |

Acetaldehyde is an intermediate metabolite. Healthy, active yeast will typically reduce it further — patience is the primary remedy.

***

### DMS (Dimethyl Sulfide)

| Attribute       | Detail                                                                                                                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descriptor**  | Cooked corn, creamed corn, cooked vegetables                                                                                                                                                                    |
| **Threshold**   | \~30–50 µg/L (style-dependent; lagers are more sensitive)                                                                                                                                                       |
| **Root causes** | Covered kettle during boil (prevents evaporation of DMS precursor, S-methylmethionine); insufficient boil vigor; slow chilling after knockout; use of high-SMM malt (pale lager malt) without adequate boil-off |
| **Fix**         | Boil uncovered with vigorous rolling boil; target 10–12% evaporation per hour; chill wort rapidly; avoid covering kettle during whirlpool stand                                                                 |

***

### Hydrogen Sulfide (H₂S)

| Attribute       | Detail                                                                                                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descriptor**  | Rotten egg, struck match (at high levels)                                                                                                                                                         |
| **Root causes** | Yeast stress (nutrient deficiency, temperature shock, low FAN); reduced yeast viability; sulfur-producing strains (common in many lager strains)                                                  |
| **Fix**         | Ensure adequate yeast nutrition and healthy pitch rates; avoid temperature shocks; give beer time for natural off-gassing/conditioning; avoid prolonged oxygen exposure while attempting to degas |

***

### Fusel Alcohols

| Attribute       | Detail                                                                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descriptor**  | Solventy, hot, harsh, nail polish remover                                                                                                       |
| **Threshold**   | Variable; n-propanol, isobutanol, isoamyl alcohol each have distinct thresholds                                                                 |
| **Root causes** | High fermentation temperatures (especially during the first 48–72 h); severe under-pitching; insufficient wort oxygenation; nutrient deficiency |
| **Fix**         | Ferment at the low end of the yeast's recommended range for the first 48–72 h; maintain adequate pitch rate; oxygenate wort properly            |

***

### Phenols (Undesirable)

| Attribute       | Detail                                                                                                                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Descriptor**  | Medicinal, plastic, band-aid, TCP                                                                                                                                                                                                    |
| **Root causes** | Chlorophenols: chlorine/chloramine in water reacting with wort phenolics; wild yeast (*Brettanomyces*); POF+ yeast outside intended style; infected equipment                                                                        |
| **Fix**         | Treat brewing water for chlorine/chloramine (common rule of thumb: \~1 Campden tablet per \~75 L / 20 US gal; verify with your water report and product label); verify no wild yeast contamination; thorough cleaning and sanitation |

> **Note:** Clove/spicy phenols are desirable in German Hefeweizen and many Belgian styles when produced by intentionally selected POF+ brewing yeast strains.

***

### Oxidation

| Attribute       | Detail                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descriptor**  | Cardboard, papery, stale, sherry-like (trans-2-nonenal), honey-like                                                                                           |
| **Root causes** | Oxygen pickup post-fermentation: splashing during transfer, headspace in packaging, improper purging of kegs/bottles, repeated dry-hopping with O₂ exposure   |
| **Fix**         | Minimize splashing at all cold-side transfers; purge vessels with CO₂; minimize headspace; use closed transfers; consider oxygen-scavenging caps for bottling |

Oxidation is largely irreversible — prevention is the only effective strategy.

***

### Astringency

| Attribute       | Detail                                                                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descriptor**  | Harsh, puckering, dry, tea-like, grape-skin                                                                                                                                                                               |
| **Root causes** | Tannin/polyphenol over-extraction: aggressive sparging with high runoff pH (typically risk increases as runoff pH rises toward/above \~6.0); very hot sparge water; overly fine crush; high-pH contact with husk material |
| **Fix**         | Limit sparge water to 75–77 °C (167–170 °F); stop sparging when gravity of runnings drops to \~1.008–1.010; check grain crush; check mash/sparge pH                                                                       |

***

### Acidity / Sourness

| Attribute       | Detail                                                                                                                                                                                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descriptor**  | Sharp acidity, vinegar (acetic acid), lactic tartness                                                                                                                                                                                                                |
| **Root causes** | *Lactobacillus* or *Pediococcus* contamination → lactic acid; *Acetobacter* contamination + oxygen → acetic acid (vinegar); wild yeast (*Brettanomyces*) producing acetic and other acids                                                                            |
| **Fix**         | Rigorous sanitation (see [**Cleaning, Sanitation & Safety**](Cleaning-Sanitation-and-Safety)); identify and replace contaminated equipment (plastic scratches harbor bacteria); prevent oxygen exposure during fermentation |

> **Note:** Intentional souring (kettle sours, mixed fermentation) is distinct from accidental contamination and is managed accordingly.

***

### Lightstruck (Skunky)

| Attribute       | Detail                                                                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descriptor**  | Skunk, mercaptan, cat musk                                                                                                                                                                                    |
| **Root causes** | UV and short-wavelength visible light breaks down isomerized alpha acids (iso-alpha acids) in the presence of riboflavin, generating 3-methyl-2-butene-1-thiol (3-MBT) — the same compound produced by skunks |
| **Fix**         | Store and ferment in opaque or amber vessels; avoid clear/green glass bottles; minimize light exposure in the brewery                                                                                         |

***

### Autolysis

| Attribute       | Detail                                                                                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descriptor**  | Meaty, yeasty broth, rubbery, vegemite-like                                                                                                                                                                 |
| **Root causes** | Yeast cell death and rupture releasing intracellular contents; extended storage on yeast cake at elevated temperatures                                                                                      |
| **Fix**         | Avoid prolonged warm storage on a large yeast cake; package or cool beer in a reasonable timeframe. In typical homebrew timescales, autolysis is uncommon if temperature is controlled and yeast is healthy |

***

## Root-Cause Matrix by Process Stage

| Process Stage            | Likely Off-Flavor                        | Key Variables to Check                                                                      |
| ------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Water treatment**      | Chlorophenols (medicinal), sulfur faults | Chloramine/chlorine removal (campden/metabisulfite dose), water report, and dosing accuracy |
| **Mash**                 | Astringency, starchy/grainy              | Sparge temp & pH; crush quality; conversion completeness                                    |
| **Boil**                 | DMS (cooked corn)                        | Boil vigor; evaporation rate; cover off; chill speed                                        |
| **Fermentation — early** | Fusel alcohols                           | Pitch rate; wort oxygenation; fermentation temp (first 48 h)                                |
| **Fermentation — late**  | Diacetyl, acetaldehyde                   | Diacetyl rest; conditioning time; yeast health                                              |
| **Packaging**            | Oxidation, flat beer, over-carbonation   | O₂ exposure; priming sugar calc; FG confirmed stable                                        |
| **Storage/serving**      | Lightstruck, oxidation, staling          | Light exposure; storage temperature; O₂ ingress                                             |
| **Sanitation failure**   | Acidity, lactic, acetic, medicinal, rope | Cleaning efficacy; sanitizer contact time; plastic equipment condition                      |

***

## Sensory Threshold Reference (Selected Compounds)

| Compound               | Off-Flavor Note                                 | Approximate Threshold                                |
| ---------------------- | ----------------------------------------------- | ---------------------------------------------------- |
| Diacetyl               | Butter                                          | \~0.05–0.15 mg/L                                     |
| Acetaldehyde           | Green apple                                     | 10–25 mg/L                                           |
| DMS                    | Cooked corn                                     | 30–50 µg/L                                           |
| Isoamyl acetate (high) | Banana (desirable in Hefeweizen, off in others) | \~1.2 mg/L                                           |
| 3-MBT (lightstruck)    | Skunk                                           | \~4 ng/L                                             |
| Trans-2-nonenal        | Cardboard                                       | \~0.1 µg/L (often cited range around 0.03–0.15 µg/L) |

Thresholds vary by individual, training status, and beer matrix effects (masking/synergy). Treat these values as order-of-magnitude guidance, not hard cutoffs. Training with standardized off-flavor kits (Siebel, FlavorActiV, Aroxa) remains one of the most reliable ways to calibrate sensory detection.

***

## Sources

* Bamforth, C.W. (2003). *Beer: Tap into the Art and Science of Brewing* (2nd ed.). Oxford University Press.
* Briggs, D.E., Boulton, C.A., Brookes, P.A., & Stevens, R. (2004). *Brewing: Science and Practice*. Woodhead Publishing.
* Palmer, J. & Kaminski, C. (2013). *Water: A Comprehensive Guide for Brewers*. Brewers Publications.
* White, C. & Zainasheff, J. (2010). *Yeast: The Practical Guide to Beer Fermentation*. Brewers Publications.
* Meilgaard, M., Civille, G.V., & Carr, B.T. (1999). *Sensory Evaluation Techniques* (3rd ed.). CRC Press.
* ASBC Methods of Analysis (sensory and flavor-related methods).
* Meilgaard, M.C. et al. (1979). Beer Flavor Terminology / Beer Flavor Wheel (ASBC Technical Committee).
* Shellhammer, T. (Ed.) (2009). *Hop Flavor and Aroma*. Master Brewers Association of the Americas.

---

← [Packaging, Carbonation & Oxygen Control](Packaging-Carbonation-and-Oxygen-Control) | [Overview](Home) | [Cleaning, Sanitation & Safety](Cleaning-Sanitation-and-Safety) →
