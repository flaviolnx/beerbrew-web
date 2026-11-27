🌐 **Language / Idioma:** [🇺🇸 English](beerbrew-web-Workflow-Best-Practices) | [🇧🇷 Português](beerbrew-web-Workflow-Best-Practices-PT) | [🇪🇸 Español](beerbrew-web-Workflow-Best-Practices-ES)

# beerbrew-web Workflow Best Practices

End-to-end guide to using **beerbrew-web** effectively for consistent, repeatable brewing outcomes.

This guide walks through the complete **beerbrew-web** workflow from profile setup and recipe creation to brew day execution and logging. The goal is to show how to integrate **beerbrew-web** into your brewing process so each batch refines your numbers and every brew is more consistent than the last.

***

## 1. Foundation: Set Up Profiles Before You Brew

Consistent results start with accurate profiles. Before creating your first recipe, invest time in getting these right.

### Equipment Profile

Your equipment profile is the single most impactful setting in **beerbrew-web**. An inaccurate profile causes volume, gravity, and efficiency mismatches across every recipe.

**Key fields to calibrate:**

| Field              | How to determine it                                         |
| ------------------ | ----------------------------------------------------------- |
| Batch size         | Measure your post-fermentation volume into packaging vessel |
| Boil-off rate      | Time a plain water boil for 60 min and measure loss         |
| Mash tun deadspace | Volume remaining in tun after draining                      |
| Trub/chiller loss  | Volume left in kettle after chilling                        |
| Fermenter loss     | Volume lost to yeast cake and trub at bottom of fermenter   |

> **Brewer Tip:** After each brew, compare your actual volumes and OG in **📓 Brew Logs** against your recipe estimates, and refine your **⚙️ Equipment** profile values over time.

### Mash Profile

Build a mash schedule appropriate for your setup (single infusion, BIAB, or multi-step mash) inside **📋 Recipes → Mash Schedule & Water Chemistry**. For most ales, a single-infusion rest at 65–68 °C (149–154 °F) is sufficient.

Save custom step-mash programs for styles that benefit from it (highly attenuated lagers, wheat beers). See [**Mash & Lauter Science**](Mash-and-Lauter-Science) for enzyme temperature guidance.

### Water Profile

Water chemistry can make or break a beer's perceived balance. Build or select profiles in **Profiles → Water** that match your source water and your intended style adjustments.

> **Brewer Tip:** Create source and style water profiles in **💧 Water** (checking the automatic `SO₄:Cl` ratio and flavor balance classification), then select your **Target Water Profile** inside each recipe.

### Fermentation Profile

Build fermentation schedules for your most-used yeast strains. A good profile captures:

* Ale primary: 18–22 °C (65–72 °F) for 5–7 days
* Lager primary: 8–12 °C (46–54 °F) for 10–14 days, with a diacetyl rest at 18 °C (65 °F) before crashing

Assigning a **Fermentation Profile** in **📋 Recipes** documents every temperature hold, ramp, dry hop addition, and cold-crash step directly on your **Printable Brew Day Sheet**.

***

## 2. Recipe Design

### Build from Known Baselines

Start from a proven baseline recipe or import a **BeerXML 1.0** recipe via **Import XML** in **📋 Recipes**, then adapt one or two variables per batch to isolate how each change affects flavor.

**Versioning discipline:** Export a **BeerXML** backup or save a copy with a version tag in the recipe name (e.g., `West Coast IPA v2`) and record what changed in **Brewer's Notes**.

### Targets to Hit First

| Metric                    | Why it matters                                    | beerbrew-web location              |
| ------------------------- | ------------------------------------------------- | ---------------------------------- |
| **OG** (original gravity) | Drives ABV and fermentability                     | **📋 Recipes** vital stats bar     |
| **IBU**                   | Perceived bitterness; balance with malt sweetness | **📋 Recipes** vital stats bar     |
| **SRM**                   | Color: visual match to style                      | **📋 Recipes** live color swatch   |
| **Water Ions & SO₄:Cl**   | Mash pH stability and hop/malt balance            | **💧 Water** & Mash/Water tab      |
| **Attenuation / FG**      | Predicted FG and sweetness vs. dryness            | **📋 Recipes** Yeast & vitals bar  |

### Hop Scheduling

**beerbrew-web** supports both **Tinseth** and **Rager** IBU estimation models directly in the **📋 Recipes** header. All IBU models are estimates; real bitterness varies with boil vigor, wort gravity, and hop freshness.

> **Brewer Tip:** Verify the **Alpha (%)** printed on your hop packaging before brew day, and lower the value in your recipe if hops have been stored open or warm for several months.

***

## 3. Brew Day Execution

### Plan the Batch First

When you are ready to brew, open the **Printable Brew Day Sheet** tab inside **📋 Recipes** and click **🖨️ Print / Save PDF** to generate a complete brew-day sheet covering your grain bill, mash schedule, hop/boil additions, fermentation steps, carbonation targets, and notes.

In the **Batch → Planning** view, confirm:

* Scaled grain bill and water volumes
* Strike temperature (use the **Strike Temperature** tool if in doubt)
* Hop additions timeline
* Yeast pitch quantity (`0.75M cells/mL/°P` for ales, `1.5–2.0M` for lagers)

> **Brewer Tip:** Print or keep the **Brew Day Sheet** open on a tablet during the brew so you never miss a mash step, hop addition, or water salt measurement.

### Record as You Go

Log actual values—not just planned values—as the brew progresses:

| Stage        | What to record                                         |
| ------------ | ------------------------------------------------------ |
| Mash         | Strike temp achieved, actual mash temp, pH if measured |
| Pre-boil     | Volume, gravity (use refractometer or hydrometer)      |
| Post-boil    | Volume, gravity                                        |
| Pitch        | Yeast type/lot, pitch temp, starter size if used       |
| Fermentation | Gravity readings, temperature, any off-aromas          |

Use the **Notes** field liberally. Observations like "cloudier than expected pre-boil" or "yeast lag was 24 h" become invaluable diagnostic data in later batches.

### Gravity Readings and Efficiency

When you finish brewing, click **🍺 Brew It (Deduct Stock)** to log the session in **📓 Brew Logs** and automatically deduct the recipe's ingredients from **📦 Inventory**. If your measured efficiency falls short:

* Check sparge completeness and grain crush
* Verify equipment profile deadspace and loss values
* Review mash temperature and time

If efficiency is consistently much higher or lower than expected for your setup, verify hydrometer/refractometer calibration and review your loss settings before changing recipe assumptions.

***

## 4. Fermentation Tracking

### Connect a Device

Monitor fermentation progress with a hydrometer or refractometer. When using a refractometer after fermentation starts, convert your Brix reading to true FG using **🧮 Tools → 2. Refractometer Alcohol Correction**.

### Gravity Milestones

* **24–48 h post-pitch:** Active fermentation (krausen visible/rising); gravity starting to drop
* **Day 3–5 (ale) / Day 7–10 (lager):** Fermentation decelerating; gravity approaching final third
* **Stable gravity for 48 h:** Fermentation likely complete; confirm FG

> **Brewer Tip:** Never rely on airlock bubbling alone to judge fermentation—confirm completion with two stable gravity readings 24–48 hours apart before packaging.

### Diacetyl Rest

For lagers (and clean ales fermented cool), include a 2–3 day **diacetyl rest** ramp to 16–18 °C (60–65 °F) in your **🌡️ Fermentation** profile before cold crashing.

### Cold Crash and Fining

Cold crash to 0–2 °C (32–36 °F) for 24–72 h to precipitate yeast and proteins. If using a fining agent (gelatin, Biofine Clear), add it at crash onset. Log the crash start/end in fermentation notes.

***

## 5. Packaging

### Carbonation

Use **🫧 Carbonation** (or **🧮 Tools → 3. Priming Sugar Carbonation**) to calculate priming sugar weight or keg regulator pressure from your beer temperature and target CO₂ volumes.

| Beer style         | Typical carbonation target |
| ------------------ | -------------------------- |
| British ale        | 1.5–2.2 vol CO₂            |
| American ale/lager | 2.2–2.7 vol CO₂            |
| Belgian/wheat      | 2.8–3.5 vol CO₂            |
| Stout/porter       | 1.8–2.2 vol CO₂            |

> **Brewer Tip:** For forced carbonation in a keg, enter the **cold serving temperature in the keg**. For bottle conditioning with priming sugar, enter the **highest temperature the beer reached during/after fermentation** so residual CO₂ is accounted for accurately.

### Mark the Batch Complete

Record your actual OG, FG, packaged volume, carbonation method, and tasting impressions in **📓 Brew Logs** so you have a permanent historical record for every batch.

***

## 6. Post-Batch Review and Iteration

This step is where most homebrewers leave value on the table. Your **📓 Brew Logs** store every session—review them to refine future batches.

### Review Your Batch History

After tasting the finished beer (typically 2–4 weeks post-packaging), return to the batch and add tasting notes:

* Aroma, flavor, mouthfeel, carbonation observations
* Overall score or rating
* Key areas to improve

Tag issues explicitly ("diacetyl detectable", "undercarbonated", "mash pH too high—astringent finish").

### Compare Actual vs. Planned

**📓 Brew Logs** displays **Target / Actual OG** and **Target / Actual FG** side by side. Review:

* OG actual vs. planned → brewhouse efficiency calibration
* FG actual vs. predicted → yeast health and attenuation behavior
* Volume losses → equipment profile refinement

### Update Your Profiles

If you made changes during the brew (mash temp adjustment, boil extended, extra hops), update your equipment or mash profile to capture the change for next time. **Profiles are living documents**, not a one-time setup.

***

## 7. Repeatability: The Discipline of Logging

The single biggest lever for improving beer quality over time is **disciplined data capture**. **beerbrew-web** provides the tools and logs; the brewer supplies the habit.

### Minimum Logging Checklist (Every Batch)

* [ ] Recipe version recorded and unchanged (or new version created)
* [ ] Equipment profile current and accurate
* [ ] Strike water volumes confirmed pre-brew
* [ ] Pre-boil gravity and volume measured and logged
* [ ] OG measured and logged at pitch
* [ ] Yeast lot/date and pitch rate logged
* [ ] At least two gravity readings during fermentation
* [ ] FG confirmed with stable 48-hour reading
* [ ] Packaging method, carbonation calculation, and date logged
* [ ] Tasting notes added after conditioning

### Recipe Versioning Strategy

| Scenario              | Action                                        |
| --------------------- | --------------------------------------------- |
| Tweaking a recipe     | Create new version; note what changed         |
| Rebrewing identically | Use same version; log as new batch            |
| Major style change    | Clone recipe to a new recipe                  |
| Equipment change      | Update equipment profile; note effective date |

### Using Batch Data Across Brews

Use the **Library** to compare multiple batches of the same recipe. Over time patterns emerge:

* Which yeast temperature achieves your target attenuation?
* What mash temperature correlates with your preferred body?
* How does your actual efficiency compare to plan by grain type?

***

## 8. Advanced Workflow Tips

### Multi-Batch Planning

When planning a brew session, check **📦 Inventory** to verify you have sufficient stock on hand. Clicking **🍺 Brew It (Deduct Stock)** in **📋 Recipes** automatically subtracts your recipe's fermentables, hops, yeasts, and miscs from inventory.

### Recipe Sharing and Importing

**beerbrew-web** supports full **BeerXML 1.0** import and export (**Import XML** / **Export BeerXML** in **📋 Recipes**). When importing a shared recipe, select your own **Equipment Preset** so volumes and efficiency match your system.

### Styles Reference

Open **🏆 Styles** in the sidebar to search 44 pre-seeded **BJCP 2021** style guidelines (or add your own custom styles) and click **Use** to load the style into your recipe. **beerbrew-web** displays live green/red vital range indicators for OG, FG, ABV, IBU, and SRM.

## Summary

| Phase        | Key beerbrew-web Action                                             | Outcome                                |
| ------------ | ------------------------------------------------------------------- | -------------------------------------- |
| Setup        | Configure **⚙️ Equipment**, **💧 Water**, **🌡️ Fermentation**, **🫧 Carbonation** | Accurate predictions & presets         |
| Recipe       | Formulate in **📋 Recipes**, check **🏆 Styles** vitals & **📦 Inventory** | Balanced, style-accurate recipe        |
| Brew day     | Print **Brew Day Sheet**, run **🧮 Tools**, click **🍺 Brew It**     | Smooth brew day & auto stock deduction |
| Fermentation | Follow multi-stage holds/ramps & dry hop schedule                   | Clean attenuation & aroma expression   |
| Packaging    | Apply **🫧 Carbonation** PSI/bar or priming sugar calculation        | Consistent carbonation & low DO        |
| Review       | Record actual OG/FG & tasting notes in **📓 Brew Logs**             | Iterative efficiency & recipe tuning   |

The power of **beerbrew-web** comes from treating it as a complete brewing studio, not just a recipe calculator. Each logged session makes your next brew more predictable.

***

---

← [Troubleshooting Playbooks](Troubleshooting-Playbooks) | [Overview](Home) | [Glossary](Glossary) →
