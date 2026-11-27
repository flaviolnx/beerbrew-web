🌐 **Language / Idioma:** [🇺🇸 English](Troubleshooting-Playbooks) | [🇧🇷 Português](Troubleshooting-Playbooks-PT) | [🇪🇸 Español](Troubleshooting-Playbooks-ES)

# Troubleshooting Playbooks

Step-by-step playbooks for the most common brewing problems, with root-cause decision trees, immediate containment actions, and next-batch prevention.

This page provides structured diagnostic playbooks for the most common brewing problems. Each playbook covers: how to confirm the problem, likely root causes in order of probability, immediate containment actions, and changes to make next batch.

For off-flavor diagnosis, also see [**Quality Control & Off-Flavor Diagnostics**](Quality-Control-and-Off-Flavor-Diagnostics).

> **Brewer Tip:** Consistently logging target vs. actual OG, FG, volume, and session notes in **📓 Brew Logs** creates a historical record that makes diagnosing efficiency, attenuation, and flavor issues straightforward.

***

## Playbook 1: Low Mash/Brewhouse Efficiency

### Confirm the Problem

* Measured OG is significantly below target OG (>3–5 points on specific gravity scale, e.g., measured 1.042 vs target 1.050).
* Pre-boil gravity is also below target.

### Decision Tree

```
Is pre-boil volume higher than planned?
  → YES: Volume dilution is the cause. Boil longer to reduce volume and concentrate wort.
  → NO: Continue...

Is the grain crush adequate (husks mostly intact, endosperm well broken up)?
  → NO: Adjust mill gap (often ~0.9–1.1 mm for many two-roller mills; tune to your system).
  → YES: Continue...

Did conversion complete? (Iodine test: no blue/black = conversion complete)
  → Starch present (blue/black): Mash temp too low (<62 °C / 144 °F) or time too short.
  → YES, conversion complete: Continue...

Is mash/sparge pH and sparge temperature controlled?
  → Runoff pH rising toward/above ~6.0 and/or very hot sparge water: higher tannin extraction risk.
  → Mash pH >5.8: beta-amylase activity and fermentability can suffer.
  → Continue...

Is grain bill measured by weight, not volume?
  → Volume measurements of grain are unreliable. Always weigh.
```

### Immediate Actions (Current Batch)

1. If pre-boil volume is high: extend boil time to increase gravity through evaporation.
2. If wort is in fermenter at low OG: add dry malt extract (DME) dissolved in boiling water and chilled; add to fermenter and mix well before pitching. (Calculate: \~0.45 kg / \~1 lb DME per 20 L raises gravity approximately 8–9 points.)
3. Record your actual measured OG in **📓 Brew Logs** so you can track real brewhouse efficiency.

### Next Batch Prevention

* Calibrate and adjust grain mill; test crush visually.
* Verify your **⚙️ Equipment** profile is accurate (kettle/lauter deadspace, trub loss, evaporation rate, and grain absorption) — **beerbrew-web** uses these values to model volumes and efficiency.
* Perform iodine conversion test at 60 minutes.
* Check and correct mash water chemistry (target pH 5.2–5.4).

***

## Playbook 2: Stalled or Stuck Fermentation

### Confirm the Problem

* No visible airlock activity for 48+ hours when fermentation appeared incomplete.
* Gravity reading same as previous reading taken 24–48 h earlier.
* Gravity is significantly above target FG (>5+ points).

> **Important:** Always confirm with a gravity reading. Airlock activity alone is not reliable — airlocks can leak or activity can slow while fermentation continues.

### Decision Tree

```
Is the temperature within the yeast's recommended range?
  → NO (too cold, <15 °C / 59 °F for most ale yeasts): Warm to proper range.
  → YES: Continue...

Was the pitch rate adequate?
  → Under-pitched: Add a fresh, actively fermenting starter or re-pitch with fresh rehydrated dry yeast.
  → YES: Continue...

Was wort properly oxygenated before pitching?
  → NO: You cannot fully undo this now; focus on temperature control, gentle rousing, and (if needed) re-pitching healthy yeast.
  → YES: Continue...

Is the gravity stuck near the target FG?
  → YES (within 2–3 points): Fermentation may be complete; confirm with consistent readings 24 h apart.
  → NO, well above target: Continue...

Is the wort likely low in fermentability (e.g., very high mash temperature, high crystal/dextrin malt load)?
  → YES: You may be near the practical FG for this wort; verify recipe assumptions before aggressive intervention.
  → NO: Consider re-pitching with a healthy, beer-appropriate yeast strain with adequate attenuation for the style.
```

### Immediate Actions (Current Batch)

1. **Warm the fermentation vessel** to the high end of the yeast's recommended temperature range (or a few degrees above).
2. **Gently rouse** the yeast cake by carefully swirling the fermenter — this can re-suspend settled yeast.
3. If stuck after 24–48 h of warming and rousing: re-pitch with fresh, active yeast (starter or properly rehydrated dry yeast) matched to the beer.

### Next Batch Prevention

* Calculate and achieve an adequate pitch rate based on your batch volume and OG (`0.75M cells/mL/°P` for ales, `1.5–2.0M` for lagers).
* Oxygenate wort: \~8–10 ppm DO for ales; \~10–12 ppm for lagers and high-gravity beers.
* Control fermentation temperature during first 48–72 h.

***

## Playbook 3: Haze (Unintended)

### Confirm the Problem

* Beer is cloudy when clarity was intended.
* Haze persists beyond normal cold-crashing time or is not style-appropriate.

### Decision Tree

```
Does haze clear when beer is warmed to room temperature?
  → YES: Chill haze (reversible protein-polyphenol complex). Cosmetic issue only.
  → NO: Continue...

Was beer cold-crashed (0–4 °C / 32–39 °F) for 48–72 h?
  → NO: Cold crash first, then reassess.
  → YES: Continue...

Does the beer taste off (tart, musty, medicinal)?
  → YES: Biological haze (contamination). See Playbook 6 (Contamination).
  → NO: Continue...

Is there visible particulate/floating matter (vs. uniform cloudiness)?
  → YES: Likely yeast in suspension. Increase cold-crash time or use a fining agent.
  → NO: Continue...

Was Irish moss/Whirlfloc added at the end of the boil?
  → NO: Lack of kettle finings allows more protein into fermenter.
  → YES: Continue...

Was a whirlpool performed after boil to separate trub?
  → NO: Large trub carryover contributes to persistent haze.
  → YES: Protein/tannin haze likely; consider fining agents.
```

### Types of Haze Summary

| Haze Type           | Characteristics                      | Solution                                                                    |
| ------------------- | ------------------------------------ | --------------------------------------------------------------------------- |
| **Chill haze**      | Clears when warm, returns when cold  | Gelatin or silica gel fining; extended cold conditioning                    |
| **Yeast haze**      | Uniform cloudiness; yeast-like aroma | Cold crash; gelatin or isinglass fining                                     |
| **Protein haze**    | Persistent; may be fine/silky        | Reduce mash temperature slightly; add Irish moss at boil; cold conditioning |
| **Biological haze** | Off-aroma/flavor present             | Contamination — see sanitation guidance                                     |
| **Starch haze**     | Follows incomplete conversion        | Confirm conversion with iodine test; extend mash time                       |

### Fining Agent Quick Reference

| Fining                 | Use Stage                  | Notes                                                                                                                |
| ---------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Irish moss / Whirlfloc | Last 15 min of boil        | Kettle fining; reduces protein carryover                                                                             |
| Gelatin                | Cold-side (fermenter, keg) | Mix 1 tsp in 100 mL warm water; add to cold-crashed beer; 48–72 h                                                    |
| Isinglass              | Cold-side                  | Attracts yeast cells; effective, fish-derived                                                                        |
| Bentonite              | Fermenter                  | Less common in beer than wine/cider; can strip haze-forming proteins but may also reduce some flavor/aroma intensity |

### Next Batch Prevention

* Add Whirlfloc or Irish Moss at 10–15 min before end of boil.
* Perform a proper whirlpool rest before transferring.
* Cold crash at 0–4 °C for 24–72 h before packaging (include a `Conditioning` step in your **🌡️ Fermentation** profile).

***

## Playbook 4: Over-Carbonation

### Confirm the Problem

* Bottles gushing on opening; foam fills the glass before liquid; high carbonation in packaged product.

> ⚠️ **Safety:** Over-carbonated bottles can explode. If you suspect significant over-carbonation, store bottles in a sealed container (cooler, box) in a cool area. Wear eye protection when opening. Check one bottle: if it gushes, do not serve others until diagnosed.

### Decision Tree

```
Were bottles carbonated with priming sugar?
  → YES: Continue...

Was FG confirmed stable with two readings 24–48 h apart before bottling?
  → NO: Fermentation was incomplete; residual sugars + priming sugar = over-carbonation. Danger zone.
  → YES: Continue...

Was priming sugar calculated correctly for the target carbonation level?
  → NO (too much added): Over-carbonation likely. Refrigerate all bottles immediately — cold slows re-fermentation.
  → YES: Continue...

Was equipment sanitary? Could a wild yeast or bacteria have gotten in?
  → Possible: Biological over-attenuation (wild yeast ferments dextrins). Beer likely tastes off.
  → NO: Continue...

Were bottles conditioned warm (>24 °C / 75 °F)?
  → YES: Warmer storage accelerates carbonation and can amplify over-carbonation risk if FG or priming was misjudged.
```

### Immediate Actions (Current Batch)

1. **Refrigerate all bottles immediately.** Cold significantly reduces further fermentation and CO₂ release.
2. Carefully open one cold bottle as a test. Listen for excessive pressure.
3. If pressure is excessive, carefully vent and re-cap bottles one at a time (with eye/hand protection), then keep cold.

### Next Batch Prevention

* Always confirm FG is stable (two readings 24–48 h apart) before bottling.
* Use **🧮 Tools → 3. Priming Sugar Carbonation** (or a priming **🫧 Carbonation** profile) to calculate the exact priming sugar weight for your batch volume, target CO₂ volumes, and bottling temperature.
* Measure priming sugar by weight, not volume.
* Consider kegging for precise pressure carbonation control.

***

## Playbook 5: Under-Carbonation

### Confirm the Problem

* Beer pours flat or with very little head; low CO₂ evident.

### Decision Tree

```
Was the correct amount of priming sugar added (confirmed by weight)?
  → NO: Too little sugar added. Cannot fully correct in-bottle; see below.
  → YES: Continue...

Was conditioning temperature adequate (18–24 °C / 64–75 °F)?
  → NO (too cold): Move bottles to a warmer location for 1–2 weeks.
  → YES: Continue...

Has sufficient conditioning time elapsed (minimum 2 weeks at 20 °C)?
  → NO: Continue conditioning.
  → YES: Continue...

Is yeast in suspension likely too low? (Very clear beer, highly flocculant strain, long cold storage before bottling)
  → YES: For future batches, add a small dose of fresh yeast at bottling.
  → Continue: Priming sugar may have been under-calculated or unevenly mixed.
```

### Immediate Actions (Current Batch)

* Move bottles to 20–22 °C (68–72 °F) and wait 1–2 more weeks before evaluating.
* If still flat after 4 weeks at proper temperature: consider a controlled re-yeast/re-prime procedure bottle-by-bottle with strict sanitation and measured sugar dosing.

### Next Batch Prevention

* Use **🧮 Tools → 3. Priming Sugar Carbonation** — enter the beer temperature at bottling, batch volume (L), and target CO₂ volumes for your style.
* Ensure at least a small amount of active yeast is present at bottling (do not filter before bottling without adding fresh yeast).

***

## Playbook 6: Oxidation

### Confirm the Problem

* Cardboard, papery, stale, or sherry-like notes developing after packaging or over time.
* Flavors worsen with age (vs. improving or staying stable).

### Decision Tree

```
When did oxidized flavors appear?
  → Immediately after kegging/bottling: O₂ pickup during transfer.
  → Appearing/worsening over weeks: Oxygen ingress via packaging seals or caps.
  → After dry-hopping: Dry-hop addition introduced O₂.
```

### Immediate Actions (Current Batch)

* Oxidation is largely **irreversible** once present.
* Drink the beer young/fresh rather than aging; oxidized beer does not improve.
* Evaluate whether the flavor is severe enough to affect enjoyment.

### Next Batch Prevention

* **Closed transfers:** Use CO₂ pressure to push beer between vessels rather than gravity/siphon-with-air.
* **Purge all vessels** with CO₂ before filling.
* Minimize splashing at any point post-fermentation.
* For dry hopping: minimize O₂ exposure when adding hops — pre-purge the hop vessel; use a CO₂-purged container or hop spider.
* Use oxygen-absorbing bottle caps and properly torque crown caps.

***

## Playbook 7: Hop Harshness / Harsh Bitterness

### Confirm the Problem

* Bitterness is harsh, astringent, lingering, or unpleasant rather than clean and balanced.
* IBU calculation suggests bitterness should be balanced, but taste says otherwise.

### Decision Tree

```
Is there also astringency (dry, puckering, tea-like sensation)?
  → YES: Tannin extraction is contributing — see Playbook 1 (mash/sparge temperature and pH).
  → NO: Continue...

Are hops old or of uncertain freshness?
  → YES: Oxidized alpha acids produce harsher bitterness than fresh iso-alpha acids.
  → Lower the hop's **Alpha (%)** value in your recipe if hops are aged or were stored unsealed.

Did the beer have minimal or no cold-conditioning?
  → YES: Conditioning softens perceived bitterness; lager especially requires weeks of cold conditioning.
  → NO: Continue...

Is the water sulfate level very high (>200 ppm SO₄)?
  → YES: Sulfate accentuates hop dryness and sharpness; reduce for softer bitterness.
  → NO: Continue...

Is the IBU:OG ratio (BU:GU) very high for the style?
  → YES: Recipe is imbalanced for the style; reduce bittering hop additions or increase OG.
  → NO: Consider that perceived bitterness is influenced by residual sweetness (FG), attenuation, and water chemistry.
```

### Immediate Actions (Current Batch)

* Extended cold conditioning (weeks to months at 0–4 °C / 32–39 °F) will soften bitterness.
* If in fermenter: adding a small amount of gelatin fining can reduce some polyphenol-based harshness.

### Next Batch Prevention

* Use fresh hops stored vacuum-sealed in a freezer, and reduce the **Alpha (%)** field in your recipe when using older hop lots.
* Adjust water chemistry: for soft, round bitterness, reduce sulfate (< 100–150 ppm); for dry, crisp bitterness, use 150–250 ppm SO₄.
* Allow adequate cold conditioning time.
* Cohumulone is only one contributor to bitterness quality; prioritize overall hop freshness, recipe balance, and process control over single-metric hop selection.

***

## Playbook 8: Contamination (General)

### Confirm the Problem

* Off-flavors: sour, vinegar, musty, medicinal, rope-like, slimy texture.
* Visible signs: floating pellicle (film on surface), visible mold, unusual turbidity with off-aroma.

### Decision Tree

```
Is there a visible pellicle (ropey, white/tan film on beer surface)?
  → YES: Wild yeast (Brettanomyces) or Lactobacillus/Pediococcus contamination.

Is the flavor sour/acidic?
  → Lactic + vinous: Lactobacillus or Pediococcus.
  → Acetic/vinegar: Acetobacter (requires oxygen; check for O₂ exposure during fermentation).

Is the flavor medicinal/band-aid?
  → Chlorophenols (chlorinated water + phenolics) or wild yeast. Check water treatment.

Is there visible mold (colored growth — green, black, pink)?
  → Mold contamination. Discard the batch. Do not consume.
```

### Immediate Actions (Current Batch)

* **Mold visible:** Discard the batch — molds can produce mycotoxins.
* **Bacterial/wild yeast contamination:** Evaluate flavor. Mild lactic sourness may be palatable; acetic/vinegar usually is not. If flavor is objectionable, discard.
* **Identify and remove contamination vector before next batch.**

### Contamination Sources

* Scratched plastic equipment (replace any scratched fermenters, tubing, or autosiphons)
* Inadequate sanitizer contact time or concentration
* Residual organic matter (incomplete cleaning before sanitizing)
* Airborne contamination (open fermenters near composting material, fruit, etc.)
* Untreated chlorinated/chloraminated water (chlorophenol risk)

### Next Batch Prevention

* See [**Cleaning, Sanitation & Safety**](Cleaning-Sanitation-and-Safety) for the complete sanitation workflow.
* Audit all plastic equipment for scratches; replace suspect items.
* Confirm sanitizer concentration and contact time.
* Treat water with Campden/metabisulfite at an appropriate dose to remove chlorine/chloramine before brewing.

***

## Quick-Reference Diagnostic Cheat Sheet

| Symptom              | Most Likely Cause         | Quick Check                          |
| -------------------- | ------------------------- | ------------------------------------ |
| Low OG               | Efficiency loss           | Check crush, mash conversion, volume |
| Gravity not dropping | Stalled fermentation      | Check temp, rouse yeast              |
| Butter/butterscotch  | Diacetyl                  | Raise temp, diacetyl rest            |
| Green apple          | Acetaldehyde              | More conditioning time               |
| Cooked corn          | DMS                       | Boil uncovered, faster chill         |
| Solventy/hot         | Fusel alcohols            | Lower fermentation temp              |
| Band-aid/medicinal   | Chlorophenol / wild yeast | Treat water; check sanitation        |
| Cardboard/papery     | Oxidation                 | Closed transfers, CO₂ purge          |
| Sour/acidic          | Bacterial contamination   | Audit sanitation and equipment       |
| Gushing bottles      | Over-carbonation          | Check FG stability, priming calc     |
| Flat beer            | Under-carbonation         | Check priming calc, temp, time       |
| Persistent haze      | Protein / yeast           | Cold crash, finings, Irish moss      |
| Harsh bitterness     | Old hops, tannins, water  | Hop freshness, water chemistry       |

***

## Sources

* Palmer, J.J. (2017). *How to Brew: Everything You Need to Know to Brew Great Beer Every Time* (4th ed.). Brewers Publications.
* White, C. & Zainasheff, J. (2010). *Yeast: The Practical Guide to Beer Fermentation*. Brewers Publications.
* Fix, G. (1999). *Principles of Brewing Science* (2nd ed.). Brewers Publications.
* Bamforth, C.W. (2003). *Beer: Tap into the Art and Science of Brewing*. Oxford University Press.
* Briggs, D.E. et al. (2004). *Brewing: Science and Practice*. Woodhead Publishing.
* Daniels, R. (1996). *Designing Great Beers*. Brewers Publications.
* American Homebrewers Association (AHA): troubleshooting and sanitation guidance.
* Brewers Association: *Draught Beer Quality Manual* (packaging, oxidation, and dispense-related quality risks).

---

← [Cleaning, Sanitation & Safety](Cleaning-Sanitation-and-Safety) | [Overview](Home) | [beerbrew-web Workflow Best Practices](beerbrew-web-Workflow-Best-Practices) →
