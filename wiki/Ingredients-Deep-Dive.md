🌐 **Language / Idioma:** [🇺🇸 English](Ingredients-Deep-Dive) | [🇧🇷 Português](Ingredients-Deep-Dive-PT) | [🇪🇸 Español](Ingredients-Deep-Dive-ES)

# Ingredients Deep Dive

Fermentables, hops, yeast, adjuncts — ingredient science, quality, storage, and how to model choices in **beerbrew-web**.

## Fermentables

**Fermentables** are any ingredient that contributes sugars for yeast to ferment, including malted grain, malt extract, adjunct grains, and refined sugars.

### Base Malts

Base malts form the majority of the grist and supply most of the fermentable sugars, enzymes, and body-building dextrins. They are fully modified (enzymatic content intact) and require mashing.

| Malt              | Typical Color        | Key Character                                               |
| ----------------- | -------------------- | ----------------------------------------------------------- |
| Pilsner malt      | 1.5–2 °L / 3–4 EBC   | Lightest; mild, grainy-sweet; use for lagers and pale ales  |
| Pale malt (2-row) | 1.8–2.5 °L / 4–5 EBC | Versatile North American base; neutral, clean               |
| Maris Otter       | 3–4 °L / 6–8 EBC     | Classic English base; biscuit, bread crust notes            |
| Vienna malt       | 3–4 °L / 6–8 EBC     | Light toasty, slightly sweet; used in Vienna lagers, Märzen |
| Munich malt       | 6–9 °L / 12–18 EBC   | Rich malt, bread, honey; can be up to 100% in Bocks         |

Pilsner malt is the lightest and most enzyme-rich. It contains SMM (S-methylmethionine), a DMS precursor — a vigorous, uncovered boil is essential when using significant Pilsner malt ratios.

### Specialty Malts

Specialty malts contribute color, flavor, and body without requiring active enzyme conversion. They are added to the grist but rely on base malt enzymes for any remaining starch conversion.

**Crystal/Caramel Malts** (15–150 °L): Kilned in their wet state, which converts internal starch to sugars and caramelizes them inside the husk. They contain both fermentable sugars and dextrins, adding body and residual sweetness. Use 5–20% of grist weight depending on style; excessive amounts can become cloying.

**Roasted Malts** (200–600+ °L): Roasted at high temperatures to develop color and flavors from light toast through dark chocolate to coffee/bitter char. These malts have no meaningful enzymatic activity and contribute limited fermentable extract compared with base malt.

| Type                 | Approx Color | Character                     |
| -------------------- | ------------ | ----------------------------- |
| Biscuit/Victory malt | 25–30 °L     | Biscuit, toasted bread        |
| Crystal 40           | 40 °L        | Caramel, toffee               |
| Crystal 80           | 80 °L        | Dark caramel, raisin          |
| Chocolate malt       | 350–400 °L   | Dark chocolate, coffee        |
| Roasted Barley       | 500–600 °L   | Dry roast, espresso, char     |
| Black Patent         | 500–600 °L   | Very dark color, harsh at >5% |

**Acidulated Malt**: Contains lactic acid (1–3%); used at 1–5% of the grist to lower mash pH without liquid acids.

**Wheat Malt**: High protein content improves head retention and haze; commonly 40–60% of grist in Hefeweizen; 10–20% in NEIPA for haze and body.

### Malt Extract

**Malt extract** is concentrated wort in syrup (LME) or dry powder (DME) form. It is pre-mashed and provides a convenient way to brew without lautering equipment. Color and fermentability are fixed at production. Dry malt extract has better shelf stability than liquid. Extract can darken with age due to Maillard reactions.

### Adjuncts

**Adjuncts** are non-malt fermentable additions used to lighten body, raise gravity, or add specific flavors:

* **Corn/Maize (flaked or grits)**: Lightens body and color; requires gelatinization or comes pre-gelatinized in flaked form.
* **Rice (flaked)**: Very neutral; lightens body and color.
* **Oats (flaked or malted)**: Adds silky body and increases haze; common in Oatmeal Stout and NEIPA.
* **Table sugar / sucrose**: Fully fermentable; dries out the beer and increases ABV with no body contribution. Useful in Belgian Strong Ales (up to 20% grist) and session IPAs.
* **Honey**: Typically highly fermentable (\~90–95% of sugars ferment), which raises ABV while lightening body. It contributes more aroma when added late (flameout or fermentation); long boiling drives off volatile aromatics.
* **Lactose (milk sugar)**: Non-fermentable disaccharide; adds sweetness and body to Milk Stouts, Pastry Stouts, and some NEIPAs. Typical rate: roughly 100–500 g per 20 L depending on desired sweetness.

### Quality and Storage

* **Malt absorbs moisture**: Store in sealed containers away from humidity. Crushed malt stales within 1–2 weeks.
* **Color and extract values drift with age**: Use malt within its best-by date.
* **Whole vs. pre-crushed**: Whole uncrushed grain stores far better. Crush no more than 1–2 days before brewing.

***

### Brewer Tip: Fermentables & Inventory

> **Keep your fermentable specs and stock levels up to date before designing recipes.** Grain color (°L) and extract yield (%) vary by maltster and lot. In **📦 Inventory**:
>
> * Add your on-hand malts, sugars, and extracts with their exact **°L color** and **Yield (%)** from the maltster's spec sheet.
> * Inside **📋 Recipes**, use **+ Quick Add from Inventory** to insert stocked grains directly into your grain bill with their specs pre-filled.
> * Verify each fermentable's **Type** (`Grain`, `Sugar`, `Extract`, or `Dry Extract`) so **beerbrew-web** applies your brewhouse efficiency accurately to mashed grains while calculating 100% extract efficiency for sugars and malt extracts.

***

## Hops

Hops contribute **bitterness**, **flavor**, and **aroma** depending on when they are added in the process.

### Alpha Acids and Bitterness

Hop **alpha acids** (primarily humulone and cohumulone) are largely insoluble and tasteless in raw hop form. Sustained boiling **isomerizes** them into iso-alpha acids, which are soluble and bitter.

**Utilization** — the percentage of alpha acids that isomerize — depends on:

* **Boil time**: Longer boil = higher utilization; most isomerization occurs in the first 60 minutes, with diminishing returns beyond that.
* **Wort gravity**: Higher-gravity wort reduces utilization (denser wort inhibits isomerization).
* **Hop form**: Pellets achieve \~10% higher utilization than whole cones due to increased surface area.
* **Whirlpool / hop stand additions**: Steeped hot post-boil additions still extract some iso-alpha acids; **beerbrew-web** models `Aroma/Whirlpool` and `First Wort` additions alongside standard boil additions.

**IBU calculation**: **beerbrew-web** uses the **Tinseth** model by default (and lets you toggle to **Rager** in the recipe header), accounting for wort gravity, boil duration, and a pellet utilization adjustment.

### Addition Timing

| Addition Timing       | Primary Purpose          | Notes                                                                                       |
| --------------------- | ------------------------ | ------------------------------------------------------------------------------------------- |
| 60+ min               | Bitterness               | Aroma largely boils off                                                                     |
| 15–20 min             | Flavor + some bitterness | Some aroma retained                                                                         |
| 5–10 min / Flameout   | Aroma, some flavor       | Minimal bitterness                                                                          |
| Whirlpool / Hop stand | Aroma, smooth bitterness | 79–88 °C for 15–30 min                                                                      |
| **Dry Hopping**       | Primarily aroma          | Added post-fermentation; can also add some perceived bitterness via humulinones/polyphenols |

**Dry hopping** is the most effective technique for intense hop aroma in finished beer because volatile aromatic compounds (myrcene, linalool, geraniol, etc.) are not cooked off. Best practice:

* Add dry hops at or near end of primary fermentation (most yeast biotransformation occurs during active fermentation).
* Temperature: 16–21 °C (60–70 °F) is typical; cold-side dry hopping (post-crash) preserves different aromatic compounds.
* Contact time: 2–5 days is generally sufficient; extended contact (>7 days) risks grassy/vegetal notes.

### Alpha Acid and Storage

Hops degrade with age through **oxidation** of alpha and beta acids. The **Hop Storage Index (HSI)** describes this:

* Store hops sealed, vacuum-packed, below −10 °C (14 °F) in the freezer.
* Whole hops degrade faster than pellets.
* After opening, reseal and use within a few days for aroma additions.
* Hop alpha acid percentage printed on packaging assumes proper cold, oxygen-free storage. Lower the **Alpha (%)** field in your recipe when using older hops that have been stored warm or opened.

### Brewer Tip: Hops & IBU Modeling

> **Match your hop form and addition type in the recipe editor for realistic IBU estimates.** In **📋 Recipes**:
>
> * Set **Form** accurately (`Pellet`, `Leaf`, or `Plug`) — pellet hops receive higher extraction utilization than whole cones.
> * Use the **Use** selector (`Boil`, `First Wort`, `Aroma/Whirlpool`, or `Dry Hop`) so bitterness is calculated appropriately for hot-side additions while `Dry Hop` additions contribute 0 IBU.
> * Toggle between **Tinseth** and **Rager** in the recipe header to compare bitterness estimates, and lower the **Alpha (%)** value manually if brewing with aged or previously opened hop packets.

***

## Yeast

**Yeast** drives fermentation and is the primary source of fermentation-derived flavors — **esters**, **phenols**, and fusel alcohols.

### Ale vs. Lager Yeast

| Feature                  | Ale Yeast (*S. cerevisiae*) | Lager Yeast (*S. pastorianus*) |
| ------------------------ | --------------------------- | ------------------------------ |
| Fermentation temperature | 16–24 °C (61–75 °F)         | 7–14 °C (45–57 °F)             |
| Typical attenuation      | 72–82%                      | 75–82%                         |
| Flocculation             | Low–High (strain-dependent) | Medium–High                    |
| Flavor profile           | Esters, sometimes phenols   | Clean, neutral                 |
| Conditioning requirement | Days–weeks                  | Weeks–months                   |

### Pitch Rate

Underpitching is one of the most common causes of off-flavors and fermentation problems. Recommended pitch rates:

| Beer Type         | Cells/mL/°P   |
| ----------------- | ------------- |
| Ale               | 0.75 × 10⁶    |
| Hybrid/Warm Lager | 1.0 × 10⁶     |
| Lager             | 1.5–2.0 × 10⁶ |

Example: A 20 L batch at 1.060 OG (14.7 °P) for an ale requires approximately: 0.75 × 10⁶ × 20,000 mL × 14.7 = **220 billion cells**

Dry yeast packs vary by manufacturer and pack size, but often provide enough cells for a standard-strength 20 L ale batch when fresh and properly handled. A standard liquid yeast vial or smack pack is typically \~100 billion cells at packaging (declining with age). Starters are strongly recommended for high-gravity batches or older liquid yeast.

### Fermentation Temperature and Flavors

Temperature is the primary lever for controlling yeast-derived flavors:

* **Esters** (fruity; e.g., isoamyl acetate = banana, ethyl acetate = solvent) increase with higher fermentation temperatures and underpitching.
* **Fusel alcohols** (harsh, warming) increase at temperatures above a strain's upper range or from underpitching.
* **Diacetyl** (buttery/butterscotch) is a normal fermentation byproduct that yeast will reabsorb given adequate time and temperature. A **diacetyl rest** (raising temperature 2–4 °C in the final days of fermentation) accelerates cleanup. **Attenuation** should be near complete before crashing.

### Flocculation and Clarity

High-**flocculation** yeast strains (for example many English ale strains such as WY1968/WLP002) drop clear naturally; lower-flocculation strains (e.g., Hefeweizen, many Belgian strains) remain hazy longer. **Cold crashing** — rapidly dropping temperature to 0–4 °C (32–39 °F) for 24–48 hours — dramatically accelerates settling in most strains.

### Yeast Health and Viability

* Yeast cell viability decreases with refrigerator storage (a common planning estimate for liquid yeast is roughly 15–25% loss per month, strain- and packaging-dependent).
* Always check the manufacture or packaging date for liquid yeast.
* Healthy yeast produce far fewer off-flavors and complete fermentation more reliably.

### Brewer Tip: Yeast & Fermentation Schedules

> **Pair your yeast selection with a multi-stage Fermentation Profile before brew day.** In **📋 Recipes**:
>
> * Enter your strain's expected **Attenuation (%)** in the **Yeast** section so **beerbrew-web** predicts your **Final Gravity (FG)** and **ABV** accurately.
> * Assign a preset from the **Fermentation Profile** dropdown (or customize steps under the **Fermentation & Carbonation** tab) to schedule primary fermentation holds, a diacetyl rest ramp, dry hop additions, and cold-crash conditioning.

***

## Water

Water is the largest single ingredient by volume. Its mineral composition directly affects mash pH, enzyme activity, hop perception, malt character, and yeast health. Even a brief water chemistry adjustment — primarily targeting mash pH and calcium level — meaningfully improves beer quality.

For a full treatment of water chemistry, see [**Water Chemistry & Adjustments**](Water-Chemistry-and-Adjustments).

**Minimum starting point:**

* Calcium (Ca²⁺) > 50 ppm: Supports enzyme activity, yeast health, and promotes precipitation of proteins and oxalates.
* Mash pH 5.2–5.6: Optimal for amylase enzymes, wort flavor, and yeast.

***

## Adjuncts — Flavor and Process Additions

Beyond fermentable adjuncts, several ingredients serve flavor, process, or stability purposes:

| Ingredient               | Purpose                                            | Typical Usage                                   |
| ------------------------ | -------------------------------------------------- | ----------------------------------------------- |
| Gypsum (CaSO₄)           | Adds Ca²⁺ and SO₄²⁻; enhances hop crispness        | Water chemistry adjustment                      |
| Calcium Chloride (CaCl₂) | Adds Ca²⁺ and Cl⁻; enhances malt roundness         | Water chemistry adjustment                      |
| Irish Moss / Whirlfloc   | Protein flocculant; improves hot break and clarity | 1 tablet or ½ tsp per 20 L, last 15 min of boil |
| Yeast Nutrient           | Provides zinc, nitrogen, vitamins for yeast        | High-gravity or adjunct-heavy beers             |
| Lactic Acid              | pH adjustment                                      | Water and wort pH control                       |
| Coriander Seed           | Flavor spice; citrus, pepper                       | Witbier: 10–30 g per 20 L, last 5 min           |
| Orange Peel              | Flavor; bitter or sweet                            | Witbier, Belgian Saison                         |
| Vanilla Bean             | Sweetness, aromatic complexity                     | Post-fermentation; 1–3 beans per 20 L           |
| Oak (cubes/spirals)      | Tannin, wood character                             | Secondary conditioning; 2–4 weeks               |
| Fruit Additions          | Flavor, color, fermentable sugars                  | Primary or secondary; after peak fermentation   |

Clarity agents like Irish Moss and Whirlfloc are among the most cost-effective improvements a brewer can make — consistent use noticeably reduces chill haze and improves cold crashing results.

### Brewer Tip: Miscellaneous Ingredients & Water Salts

> **Log all water salts, acids, finings, and spices in the Miscs & Water Salts section of your recipe.** Even though they do not contribute fermentable extract, recording gypsum, calcium chloride, Whirlfloc, yeast nutrients, and spices ensures they appear on your **Printable Brew Day Sheet** and are automatically deducted from **📦 Inventory** when you click **🍺 Brew It (Deduct Stock)**.

***

## Sources

* Palmer, John J. *How to Brew*, 4th ed. Brewers Publications, 2017. (Chapters 3–6: malts, hops, yeast, adjuncts)
* White, Chris, and Jamil Zainasheff. *Yeast: The Practical Guide to Beer Fermentation*. Brewers Publications, 2010. (Pitch rate, fermentation temperature, diacetyl)
* Hieronymus, Stan. *For the Love of Hops*. Brewers Publications, 2012. (Alpha acids, dry hopping, utilization)
* Maye, John Paul, Robert Smith, and Jeremy Leker. "Humulinone Formation in Hops and Hop Pellets and Its Implications for Dry Hopped Beers." *MBAA Technical Quarterly* 53.1 (2016). (Dry-hop bitterness contribution from humulinones)
* Briggs, D.E., et al. *Brewing: Science and Practice*. Woodhead Publishing / CRC Press, 2004. (Malt modification, specialty malt chemistry)
* Garetz, Mark. *Using Hops*. HopTech, 1994. (Hop storage degradation model)
* Daniels, Ray. *Designing Great Beers*. Brewers Publications, 1996. (Crystal malt usage, specialty grain guidelines)
* Noonan, Gregory J. *New Brewing Lager Beer*. Brewers Publications, 1996. (Lager yeast pitch rates, conditioning)

---

← [Brewing Fundamentals](Brewing-Fundamentals) | [Overview](Home) | [Water Chemistry & Adjustments](Water-Chemistry-and-Adjustments) →
