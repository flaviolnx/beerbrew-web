🌐 **Language / Idioma:** [🇺🇸 English](Mash-and-Lauter-Science) | [🇧🇷 Português](Mash-and-Lauter-Science-PT) | [🇪🇸 Español](Mash-and-Lauter-Science-ES)

# Mash & Lauter Science

Enzyme activity, mash temperature science, sparging strategies, and efficiency drivers for all-grain brewing.

The **mash** is the heart of all-grain brewing. Hot water activates naturally occurring grain enzymes that break down starch into fermentable sugars, producing the **wort** that yeast will later ferment. The **lautering** step separates that wort from the spent grain. Understanding both processes lets you hit your target gravity, adjust fermentability, and maximize efficiency—brew after brew.

***

## Enzyme Activity & the Saccharification Window

Malt contains dozens of enzymes, but two dominate wort composition during the saccharification rest:

### Beta-Amylase

Beta-amylase cleaves maltose (a two-glucose sugar) from the non-reducing end of starch chains, producing highly fermentable wort.

| Parameter           | Range                        |
| ------------------- | ---------------------------- |
| Optimal temperature | 60–65 °C (140–149 °F)        |
| Active range        | 55–70 °C (131–158 °F)        |
| Denaturation        | Rapidly above 70 °C (158 °F) |
| Optimal pH          | 5.0–5.3                      |

A mash held in the lower saccharification range favors beta-amylase, yielding more maltose, higher attenuation, and a drier, lighter-bodied beer.

### Alpha-Amylase

Alpha-amylase cuts starch chains randomly, producing dextrins and longer-chain sugars (largely unfermentable by brewer's yeast) that add body and mouthfeel.

| Parameter           | Range                 |
| ------------------- | --------------------- |
| Optimal temperature | 67–72 °C (153–162 °F) |
| Active range        | 60–76 °C (140–169 °F) |
| Denaturation        | Above 76 °C (169 °F)  |
| Optimal pH          | 5.3–5.7               |

A mash in the upper saccharification range favors alpha-amylase, producing fuller-bodied beer with lower apparent attenuation.

### Practical Single-Infusion Targets

| Goal                             | Temperature           |
| -------------------------------- | --------------------- |
| Dry, highly attenuated beer      | 63–65 °C (145–149 °F) |
| Balanced body and fermentability | 66–68 °C (151–154 °F) |
| Full-bodied, lower attenuation   | 69–72 °C (156–162 °F) |

A single-infusion saccharification rest of **60–90 minutes** is sufficient for well-modified modern malts at any temperature in this range. Test for complete conversion with an iodine test: wort that stays golden-amber (no blue-black color change) indicates complete starch conversion.

> **Rule of thumb:** For most modern base malts, conversion is essentially complete within 30–45 minutes at 67 °C (153 °F). Extending to 60 minutes provides a comfortable margin.

***

## Mash pH

Mash pH strongly affects enzyme activity, wort flavor, and clarification. For practical homebrewing, target about **pH 5.2–5.6 at room temperature (20 °C / 68 °F)**, which is often about **5.1–5.4 at mash temperature**.

* Below \~5.2 (room-temp reading): Enzyme activity and fermentability can drop.
* \~5.2–5.6 (room-temp reading): Strong overall conversion and balanced wort quality.
* Above \~5.8 (room-temp reading): Increased risk of tannin/astringency pickup during lautering and sparging.

Measure mash pH on a cooled sample for consistency and meter longevity. Automatic temperature compensation (ATC) corrects electrode response, not the mash chemistry itself.

Water chemistry (alkalinity, calcium content) and grain bill (darker, more acidic malts vs. pale base malts) interact to set mash pH. Select a **Target Water Profile** and record your salt/acid additions in your recipe before brew day.

> **Brewer Tip 💧** Assign a **Target Water Profile** under **📋 Recipes → Mash Schedule & Water Chemistry**, and log your gypsum, calcium chloride, and acid additions under **Miscs & Water Salts**. Your target ion levels (Ca²⁺, Mg²⁺, Na⁺, Cl⁻, SO₄²⁻, HCO₃⁻) and salt additions will stay saved with the recipe.

***

## Step Mashing

Step mashing—holding the mash at two or more progressively higher temperatures—is used for undermodified malts, high-adjunct recipes, or specific flavor goals.

### Common Rest Steps

| Rest                  | Temperature           | Purpose                                                                    |
| --------------------- | --------------------- | -------------------------------------------------------------------------- |
| Acid rest             | 35–45 °C (95–113 °F)  | Phytase activation; lowers mash pH (less relevant with well-modified malt) |
| Protein rest          | 45–55 °C (113–131 °F) | Protease breaks down large proteins; improves head retention, reduces haze |
| Beta-glucan rest      | 35–45 °C (95–113 °F)  | Breaks down beta-glucans in oats, wheat, rye; improves lauterability       |
| Saccharification rest | 63–72 °C (145–162 °F) | Starch conversion (see above)                                              |
| Mash-out              | 76–78 °C (169–172 °F) | Denatures enzymes; fixes fermentability; thins wort for easier lautering   |

> **Note:** Most modern malts are highly modified. A protein rest is generally unnecessary for all-malt grists and can reduce head-positive proteins excessively. It remains valuable for large proportions of unmalted wheat, rye, oats, or raw grains.

> **Brewer Tip 🔧** Build single-infusion or multi-step mash programs directly in **📋 Recipes → Mash Schedule & Water Chemistry**. Add steps for protein rests, beta/alpha saccharification rests, and mash-out (`Infusion`, `Temperature`, or `Decoction`) with water volume, target temperature (°C), and duration — **beerbrew-web** includes the full sequence on your **Printable Brew Day Sheet**, and you can calculate exact strike water temperatures in **🧮 Tools → 1. Mash Strike Water Temperature**.

***

## Lautering: Converting the Mash into Wort

**Lautering** (German: *läutern*, to clarify) is the separation of sweet wort from the grain bed. It comprises three phases:

1. **Vorlauf (recirculation):** Gently recirculate the first turbid runnings back through the grain bed until the wort runs clear. This sets the grain bed as a natural filter. Typical volume: 1–4 L (1–4 qt).
2. **First runnings:** Drain the primary wort from the mash.
3. **Sparge:** Rinse the grain bed with hot water to recover residual sugars.

### Sparge Methods

| Method           | Description                                                                     | Pros                                          | Cons                                                         |
| ---------------- | ------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| **Fly sparge**   | Continuously spray hot water over the grain bed while draining at the same rate | Highest extract efficiency (typically 80–85%) | Requires equipment; longer process; tannin risk if pH rises  |
| **Batch sparge** | Drain fully, add calculated sparge water, stir, wait 10–15 min, drain again     | Simple; no special equipment                  | Slightly lower efficiency than fly sparge (typically 70–78%) |
| **No-sparge**    | Mash with the full volume; drain once                                           | Fastest; minimal risk of tannin extraction    | Lowest efficiency; requires larger grain bill                |

### Tannin Extraction Risks

Polyphenol (tannin) extraction from grain husks causes astringency. Risk rises most when **high pH and high temperature overlap**:

1. **Control sparge temperature:** Keep sparge liquor around **76–78 °C (168–172 °F)**.
2. **Watch runoff gravity and pH:** As sugars are depleted, runoff pH tends to rise. A common stopping point is around **1.008–1.010 SG runoff gravity** or **\~pH 5.8–6.0 (room-temp reading)**.

Either factor alone is usually manageable; the harshest extraction tends to happen when both drift too high late in runoff.

***

## Mash Efficiency

**Mash efficiency** is the percentage of potential extract recovered into the kettle before the boil. **Brewhouse efficiency** is lower because it also includes kettle, transfer, and packaging losses.

Typical homebrewing ranges:

* **Mash efficiency:** \~70–85%
* **Brewhouse efficiency:** \~60–80%

Key efficiency drivers:

| Factor               | Improvement                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| Crush quality        | Ensure grain is well-crushed (husk intact, endosperm exposed); measure gap (typically 0.8–1.0 mm) |
| Mash pH              | Stay around 5.2–5.6 (room-temp reading)                                                           |
| Water-to-grain ratio | 2.5–4.0 L/kg (1.2–2.0 qt/lb); thinner mashes improve enzyme mobility                              |
| Mash time            | 60–90 min at temperature                                                                          |
| Sparge thoroughness  | More sparge water rinses more sugar                                                               |
| Grain bed depth      | 20–40 cm (8–16 in) typical for good filtration                                                    |

> **Brewer Tip 📊** Set your **Brewhouse Efficiency (%)** in **⚙️ Equipment**. **beerbrew-web** uses this value to calculate your predicted **Original Gravity (OG)** from your grain bill. After each brew, compare your measured OG in **📓 Brew Logs** against the predicted target and adjust your Equipment Profile efficiency so future recipes hit their numbers consistently.

***

## Mash-Out

Raising the mash to **76–78 °C (169–172 °F)** for 10 minutes before lautering:

* **Denatures remaining enzymes**, locking in the fermentability profile you've established.
* **Thins the wort** (lower viscosity), improving flow rate through the grain bed.
* **Not mandatory** for batch sparging or no-sparge brewing, where lautering is fast and enzyme activity has little time to continue.

> **Brewer Tip 🛠️** Add a **Mash-Out** step (`Temperature` mode, 76 °C for 10 min) at the end of your **Mash Steps** list so it appears on your **Printable Brew Day Sheet** as a reminder before lautering.

***

## Troubleshooting Common Mash Problems

| Symptom                          | Likely Cause                                               | Fix                                                                      |
| -------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------ |
| Low pre-boil gravity (missed OG) | Poor crush, low efficiency                                 | Check crush; calibrate efficiency in Equipment Profile                   |
| Stuck runoff / slow lautering    | Fine crush, beta-glucans, collapsed grain bed              | Add rice hulls; recirculate slowly; raise mash temperature               |
| Astringent/harsh flavor          | Tannin extraction (high runoff pH and/or high sparge temp) | Keep sparge at 76–78 °C; stop runoff around pH 5.8–6.0 or SG 1.008–1.010 |
| Cloudy wort / poor clarity       | Insufficient vorlauf; high mash pH                         | Vorlauf 2–4 L; check mash pH; use Irish moss/whirlfloc in boil           |
| Poor fermentability (high FG)    | Mash temp too high or too short                            | Lower mash temp; verify thermometer calibration                          |

***

## Sources

* Palmer, J. (2017). *How to Brew* (4th ed.). Brewers Publications. Chapters 14–16.
* Briggs, D.E., Boulton, C.A., Brookes, P.A., & Stevens, R. (2004). *Brewing: Science and Practice*. Woodhead Publishing.
* Kunze, W. (2010). *Technology Brewing and Malting* (4th International ed.). VLB Berlin.
* Noonan, G.J. (1996). *New Brewing Lager Beer*. Brewers Publications.
* American Homebrewers Association. "Enzymes in Beer: What's Happening in the Mash." <https://homebrewersassociation.org/how-to-brew/enzymes-in-beer-whats-happening-in-the-mash/>
* Lewis, A. (2017). "Setting the Record Straight on Mash pH." *Brew Your Own.* <https://byo.com/mr-wizard/setting-record-straight-mash-ph/>
* Braukaiser.com. "The Theory of Mashing." <https://www.braukaiser.com/wiki/index.php/The_Theory_of_Mashing>

---

← [Water Chemistry & Adjustments](Water-Chemistry-and-Adjustments) | [Overview](Home) | [Boil, Hop Utilization & Whirlpool](Boil-Hop-Utilization-and-Whirlpool) →
