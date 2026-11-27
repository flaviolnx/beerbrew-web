# Overview

Evidence-based brewing science rooted in established literature — designed specifically for **beerbrew-web** (**Yuki & Bomb's Crew Brew CO.**) users.

This wiki serves as a practical reference guide for homebrewers seeking to grasp the underlying science of great beer and put those principles into practice inside **beerbrew-web**.

## What This Section Covers

| Page                                                                                  | Topics                                                                                           |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Brewing Fundamentals** | Grain-to-glass process, core metrics (OG, FG, ABV, IBU, SRM/EBC, attenuation), beginner pitfalls |
| **Ingredients Deep Dive** | Fermentables, hops, yeast, adjuncts — quality, storage, and recipe modeling in **beerbrew-web** |
| **Water Chemistry & Adjustments** | Ion targets, mash pH, residual alkalinity, sulfate-to-chloride balance, Water Profiles |
| **Mash & Lauter Science** | Enzyme activity windows, step mashing, sparging methods, and brewhouse efficiency |
| **Boil, Hop Utilization & Whirlpool** | Boil objectives, DMS control, alpha-acid isomerization, whirlpool stands, and IBU models |
| **Fermentation & Yeast Management** | Pitch rates, oxygenation, multi-stage temperature schedules, flavor compounds, and cold crashing |
| **Packaging, Carbonation & Oxygen Control** | Bottling vs. kegging, priming sugar vs. forced $\text{CO}_2$, and cold-side oxygen prevention |
| **Quality Control & Off-Flavor Diagnostics** | Structured sensory evaluation, off-flavor thresholds, and root-cause fault matrices |
| **Cleaning, Sanitation & Safety** | Cleaning vs. sanitizing, chemical concentrations, material compatibility, and brewery safety |
| **Troubleshooting Playbooks** | Step-by-step diagnostic playbooks for efficiency, stuck fermentation, haze, carbonation, and oxidation |
| **beerbrew-web Workflow Best Practices** | End-to-end guide to profiles, recipe design, Brew Day Sheets, Brew Logs, and inventory tracking |

Additional subjects — covering mash kinetics, hop extraction, packaging methods, quality assurance, and fault diagnosis — will continue to expand as this reference library evolves.

## Who This Is For

* **Beginning brewers** looking to establish a solid technical grounding before fine-tuning their formulations.
* **Intermediate brewers** wanting to understand the scientific principles behind the brewing choices they already make.
* **Advanced brewers** needing an integrated technical manual that links **beerbrew-web** tools, profiles, and metrics directly to brewing chemistry and microbiology.

Every section is verified against recognized brewing textbooks and research, featuring **Brewer Tip** callouts that map scientific theory directly onto **beerbrew-web** screens, profiles, and calculators.

## How to Use This Library

1. **Begin with Fundamentals** when learning all-grain brewing or building a complete mental picture from grain to glass.
2. **Consult Ingredients Deep Dive** while formulating recipes or evaluating potential ingredient swaps.
3. **Explore Water Chemistry & Adjustments** once you are ready to move past baseline water profiles and actively manage mash pH.
4. **Check the Glossary** whenever you encounter unfamiliar terminology — every core concept referenced across these pages is defined there.

## How This Wiki Connects to beerbrew-web

This reference library links brewing fundamentals directly to the interactive views inside **beerbrew-web**:

* **📋 Recipes:** Build grain bills, hop schedules, yeast selections, miscs, mash steps, fermentation timelines, and carbonation settings with real-time OG, FG, ABV, IBU, SRM, and calorie calculations.
* **🏆 Styles:** Evaluate your recipe metrics against 44 pre-loaded BJCP 2021 style guidelines or create your own custom style targets.
* **📦 Inventory:** Monitor current stock levels for malts, hops, yeasts, and adjuncts, automatically deducting used amounts on brew day.
* **⚙️ Equipment, 💧 Water, 🌡️ Fermentation & 🫧 Carbonation:** Configure reusable system and process profiles that automatically feed into your recipes and printable Brew Day Sheets.
* **📓 Brew Logs & 🧮 Tools:** Log actual brew-day gravities and perform quick strike water, refractometer, priming sugar, and hydrometer temperature calculations.

## Sources

The technical guidance in this wiki is primarily drawn from:

* John J. Palmer, *How to Brew*, 4th ed. (Brewers Publications, 2017)
* Chris White & Jamil Zainasheff, *Yeast: The Practical Guide to Beer Fermentation* (Brewers Publications, 2010)
* Ray Daniels, *Designing Great Beers* (Brewers Publications, 1996)
* George Fix, *Principles of Brewing Science*, 2nd ed. (Brewers Publications, 1999)
* Stan Hieronymus, *For the Love of Hops* (Brewers Publications, 2012)
* Brewers Association, *Brewers Association Beer Style Guidelines*

Complete citations for every topic appear at the conclusion of each individual section.

# Brewing Fundamentals

An end-to-end look at the grain-to-glass workflow, essential brewing calculations, and high-leverage process controls.

## The Grain-to-Glass Process

All-grain brewing progresses through a logical sequence of stages. Knowing what happens at each step allows you to diagnose issues early and make deliberate recipe adjustments.

### 1. Milling

Cracking malted barley — producing what brewers refer to as the **grist** — exposes internal starch granules so enzymes can convert them during the mash. The ideal crush breaks open the starchy endosperm while keeping the outer husks mostly intact to serve as a natural filter bed. A roller gap around 0.9–1.1 mm works well on most two-roller mills, though you may need slight adjustments depending on kernel size and grain moisture.

### 2. Mashing

During the **mash**, crushed grist is steeped in temperature-controlled hot water so naturally occurring amylase enzymes — chiefly alpha-amylase and beta-amylase — cleave complex starches into fermentable sugars and unfermentable dextrins.

**Enzyme activity ranges:**

| Enzyme        | Peak Range            | Effect                                            |
| ------------- | --------------------- | ------------------------------------------------- |
| Beta-amylase  | 60–65 °C (140–149 °F) | Produces fermentable maltose; thinner, drier beer |
| Alpha-amylase | 68–72 °C (154–162 °F) | Produces longer dextrins; fuller body, higher FG  |

Most single-infusion mashes aim for 64–69 °C (147–156 °F) to strike a balance between fermentability and mouthfeel. Beta-amylase deactivates rapidly once temperatures climb into the low 70s °C, whereas alpha-amylase endures slightly higher heat before slowing down near mash-out. Modern, well-modified malts typically finish starch conversion within 45–60 minutes.

**Mash pH** (measured at room temperature) should sit between **5.2 and 5.6** to support enzyme performance, clean wort extraction, and healthy fermentation. See the **Water Chemistry & Adjustments** section below for full details.

### 3. Lautering and Sparging

**Lautering** is the process of draining clear sweet wort away from the spent grain bed. Brewers usually recirculate the initial cloudy runoff (**Vorlauf**) over the top of the grain bed until the liquid runs bright. Once the concentrated first runnings are collected, hot water is used to rinse (**sparge**) the remaining sugars out of the mash.

Common sparging methods:

* **Fly sparge**: Slowly sprinkling hot water across the grain bed at the exact rate wort drains out — delivers maximum extraction efficiency, though it demands closer flow and pH monitoring.
* **Batch sparge**: Draining the mash tun completely, stirring in the full sparge water volume, resting briefly, and draining again — quicker and simpler with only a minor efficiency trade-off.
* **No-sparge**: Mashing with the entire water volume from the start and draining once — eliminates sparging steps entirely at the cost of slightly higher grain usage.

Sparge liquor is normally heated to 75–77 °C (167–170 °F). Controlling both grain-bed temperature and runoff pH during rinsing prevents harsh tannins from leaching out of the grain husks.

### 4. The Boil

Sustaining a **wort boil** (usually for 60–90 minutes) accomplishes five essential tasks:

* **Sanitation**: Sterilizes the wort by destroying wild microbes and bacteria.
* **Hop utilization**: Converts insoluble hop alpha acids into bitter iso-alpha acids (**IBU**) through sustained heat.
* **Protein coagulation**: Clumps haze-forming proteins together during the hot break so they settle out as **trub**.
* **DMS (dimethyl sulfide) evaporation**: Vents off volatile precursors responsible for cooked-corn off-flavors — requiring a vigorous, uncovered boil.
* **Concentration**: Boils off excess water to hit your intended pre-fermentation volume and **OG**.

### 5. Whirlpool and Chilling

Once the boil ends, creating a **whirlpool** spins the wort so trub settles into a tight cone at the center of the kettle. Adding hops at flameout or during a hot-side steep (typically 79–88 °C / 174–190 °F) captures delicate hop aromatics alongside a modest amount of bitterness.

Next, the wort is rapidly cooled down to yeast pitching temperature — generally 18–20 °C (64–68 °F) for ales and 8–12 °C (46–54 °F) for lagers.

### 6. Fermentation

**Pitching** healthy yeast into cooled wort initiates fermentation. As yeast metabolizes fermentable sugars into ethanol and $\text{CO}_2$, it also synthesizes character-defining compounds such as esters, higher alcohols, and organic acids. A dense, foamy cap known as **krausen** rises across the surface during peak fermentation.

**Primary fermentation** spans anywhere from a few days to two weeks based on yeast strain, pitch rate, and temperature. For ales, active fermentation is generally finished once specific gravity holds steady and the **krausen** subsides.

**Conditioning** takes place next: suspended yeast settles out, intermediate byproducts (such as **diacetyl**) are reabsorbed by the yeast, and flavors meld together either in the primary fermenter or a secondary vessel.

### 7. Packaging

Finished beer is packaged into either bottles or kegs. Adding **priming sugar** at bottling triggers **bottle conditioning** for natural carbonation, whereas kegged beer is typically force-carbonated using pressurized $\text{CO}_2$. Minimizing oxygen pickup during packaging is vital, as oxygen rapidly accelerates staling.

***

## Core Brewing Metrics

### Original Gravity (OG) and Final Gravity (FG)

**Gravity** expresses the density of wort or finished beer compared to pure water ($1.000\text{ SG}$). **OG** records wort density prior to yeast pitch, while **FG** measures density once fermentation finishes.

* Most beer styles start with an OG between $1.030$ (session beers) and $1.120$ (barleywines and imperial stouts).
* Typical FG values land between $1.006$ and $1.025$, shaped by mash temperature and yeast attenuation.
* Brewers also express extract density in degrees **Plato** ($^\circ\text{P}$), where $1\,^\circ\text{P} \approx 1.004\text{ SG}$.

### ABV (Alcohol by Volume)

The standard linear approximation used across homebrewing:

> $$\text{ABV} = (\text{OG} - \text{FG}) \times 131.25$$

A higher-precision alternative derived from the Balling equation:

> $$\text{ABV} = \left(\frac{76.08 \times (\text{OG} - \text{FG})}{1.775 - \text{OG}}\right) \times \left(\frac{\text{FG}}{0.794}\right)$$

While the simplified equation stays within $\sim 0.1\text{–}0.2\%$ ABV for average-strength beers, the Balling-derived formula remains reliable even for high-gravity worts.

### Attenuation

**Attenuation** indicates the proportion of wort sugars converted by yeast during fermentation. *Apparent attenuation* — the standard metric reported by hydrometers — is calculated as:

> $$\text{Apparent Attenuation (\%)} = \frac{\text{OG} - \text{FG}}{\text{OG} - 1.000} \times 100$$

For instance, a beer starting at $1.050\text{ OG}$ and finishing at $1.010\text{ FG}$ yields $(0.040 / 0.050) \times 100 = \mathbf{80\%}$ apparent attenuation.

Typical attenuation ranges:

* Low-attenuation strains: $65\text{–}72\%$
* Mid-attenuation strains: $73\text{–}79\%$
* High-attenuation strains: $80\text{–}85\%+$

Because ethanol is lighter than water, apparent attenuation reads higher than true (real) extract attenuation.

### IBU (International Bitterness Units)

IBU quantifies the concentration of isomerized alpha acids in beer ($\text{mg/L}$ or $\text{ppm}$). How bitter a beer actually tastes, however, depends on how those IBUs balance against residual malt sweetness — captured by the **bitterness-to-gravity ratio**.

> $$\text{BU:GU (Bitterness:Gravity Ratio)} = \frac{\text{IBU}}{\text{Gravity Units}}$$
>
> where $\text{Gravity Units (GU)} = (\text{OG} - 1.000) \times 1000$
>
> * Below $0.5$: Decidedly malty
> * $0.5\text{–}0.8$: Balanced
> * Above $1.0$: Decisively bitter

Common IBU calculation models:

* **Tinseth** (default in **beerbrew-web**): Models extraction based on boil duration, wort gravity, and pellet surface area.
* **Rager**: Estimates higher utilization during extended boils.
* **Garetz**: Applies more conservative utilization figures while factoring in hop storage age.

Treat all IBU formulas as practical baselines rather than exact lab measurements, calibrating them against your own taste buds.

### SRM and EBC (Beer Color)

**SRM** (Standard Reference Method) and **EBC** (European Brewery Convention) are the two primary scales used to specify beer color.

Conversion: $$\text{EBC} \approx \text{SRM} \times 1.97$$

SRM is derived from Malt Color Units (MCU) using the **Morey equation**:

> $$\text{SRM} = 1.4922 \times \text{MCU}^{0.6859}$$
>
> where $\text{MCU} = \frac{\text{grain weight (lb)} \times \text{grain color (}^\circ\text{L)}}{\text{wort volume (gal)}}$

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

Every variable matters, but focusing on these five fundamentals yields the greatest improvement in beer quality:

1. **Sanitation**: Microbial contamination prior to fermentation can ruin an entire batch. Always wash equipment thoroughly before applying a no-rinse sanitizer (such as Star San or Iodophor).
2. **Temperature control during fermentation**: Fermentation temperature strongly governs yeast byproduct formation (**esters** and fusel alcohols). Even a $2\,^\circ\text{C}$ ($4\,^\circ\text{F}$) drift above a strain's ideal window can noticeably alter flavor.
3. **Yeast pitch rate**: Pitching too few cells stresses the yeast culture, leading to off-flavors and sluggish or incomplete attenuation. Size your pitch to match wort gravity, batch size, and yeast age.
4. **Mash temperature and pH**: Together, these two parameters dictate wort fermentability (the OG-to-FG drop) and clean malt flavor extraction.
5. **Oxygen management**: Post-fermentation oxygen exposure is the leading cause of stale, cardboard-like flavors. While oxygenating chilled wort before pitching benefits yeast growth, cold-side transfers and packaging must remain as oxygen-free as possible.

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

> **Configuring your Equipment Profile is the most impactful first step in beerbrew-web.** All recipe calculations — batch size, pre-boil volume, OG, and hop bitterness — scale from your system's specific losses and efficiency. Before brewing your first recipe:
>
> 1. Navigate to **⚙️ Equipment** in the sidebar and create a profile tailored to your hardware.
> 2. Input measured numbers for **Boil Time**, **Evaporation Rate (L/hr)**, **Kettle Deadspace**, **Lauter Deadspace**, **Trub / Chiller Loss**, and **Grain Absorption (L/kg)**.
> 3. Enter your **Brewhouse Efficiency (%)** (72–75% is a solid initial baseline until you gather batch data).
>
> While building a recipe in **📋 Recipes**, pick your saved system from the **Equipment Preset** menu to populate batch size, boil volume, boil duration, and efficiency automatically. Once brew day wraps up, log your measured OG, FG, and final volume in **📓 Brew Logs** to dial in future predictions.

***

## Sources

* Palmer, John J. *How to Brew*, 4th ed. Brewers Publications, 2017. (Chapters 2–7, enzyme temperatures, attenuation, ABV formula)
* Daniels, Ray. *Designing Great Beers*. Brewers Publications, 1996. (IBU models, color calculations)
* Fix, George. *Principles of Brewing Science*, 2nd ed. Brewers Publications, 1999. (Enzyme kinetics, mash chemistry)
* Tinseth, Glenn. "Glenn's Hop Utilization Numbers." Real Beer Page. (IBU Tinseth model)
* Morey, Daniel. "Approximating SRM Beer Color of Homebrew." (Morey SRM formula)
* Kunze, Wolfgang. *Technology Brewing and Malting*, 5th ed. VLB Berlin, 2014. (Balling formula, lautering)

# Ingredients Deep Dive

A closer look at fermentables, hops, yeast, and adjuncts — covering raw material quality, storage best practices, and recipe modeling in **beerbrew-web**.

## Fermentables

**Fermentables** encompass every ingredient that supplies sugars for yeast metabolism, ranging from malted barley and liquid or dry malt extracts to unmalted adjunct grains and simple sugars.

### Base Malts

Base malts make up the bulk of a grain bill, providing the primary fermentable sugars, diastatic enzymes, and body-building dextrins. Because they are fully modified during malting, they retain the enzymatic power needed to convert starches during the mash.

| Malt              | Typical Color        | Key Character                                               |
| ----------------- | -------------------- | ----------------------------------------------------------- |
| Pilsner malt      | 1.5–2 °L / 3–4 EBC   | Lightest; mild, grainy-sweet; use for lagers and pale ales  |
| Pale malt (2-row) | 1.8–2.5 °L / 4–5 EBC | Versatile North American base; neutral, clean               |
| Maris Otter       | 3–4 °L / 6–8 EBC     | Classic English base; biscuit, bread crust notes            |
| Vienna malt       | 3–4 °L / 6–8 EBC     | Light toasty, slightly sweet; used in Vienna lagers, Märzen |
| Munich malt       | 6–9 °L / 12–18 EBC   | Rich malt, bread, honey; can be up to 100% in Bocks         |

Pilsner malt offers the palest color and highest enzymatic activity, though it carries higher levels of SMM (S-methylmethionine), a precursor to DMS — making a rolling, uncovered boil mandatory when Pilsner forms a large share of the grist.

### Specialty Malts

Specialty malts add color, complexity, and mouthfeel without bringing active enzymes to the mash. They depend on the diastatic enzymes supplied by base malts to convert any residual starches.

**Crystal/Caramel Malts** (15–150 °L): Stewed while still moist in the kiln so internal starches liquefy into sugars and crystallize inside the intact hull. Because they supply both fermentable sugars and unfermentable dextrins, they lend sweetness and body. Most recipes use 5–20% crystal malt; pushing higher can make the finish overly sweet.

**Roasted Malts** (200–600+ °L): Kilned at intense temperatures to build flavors spanning light toast, dark chocolate, espresso, and dry roast. High heat destroys their enzymes and yields less fermentable extract per kilogram than base malts.

| Type                 | Approx Color | Character                     |
| -------------------- | ------------ | ----------------------------- |
| Biscuit/Victory malt | 25–30 °L     | Biscuit, toasted bread        |
| Crystal 40           | 40 °L        | Caramel, toffee               |
| Crystal 80           | 80 °L        | Dark caramel, raisin          |
| Chocolate malt       | 350–400 °L   | Dark chocolate, coffee        |
| Roasted Barley       | 500–600 °L   | Dry roast, espresso, char     |
| Black Patent         | 500–600 °L   | Very dark color, harsh at >5% |

**Acidulated Malt**: Coated with naturally derived lactic acid (1–3%) and typically dosed at 1–5% of the grain bill to reduce mash pH without liquid acid additions.

**Wheat Malt**: Rich in foam-positive proteins that boost head retention and visual haze; commonly used at 40–60% in Hefeweizens and 10–20% in hazy IPAs.

### Malt Extract

**Malt extract** consists of pre-mashed wort concentrated into either liquid syrup (LME) or spray-dried powder (DME), allowing brewers to bypass mashing and lautering. Color and fermentability are locked in by the manufacturer. Dry extract resists staling far better than liquid syrup, which gradually darkens over time via slow Maillard reactions.

### Adjuncts

**Adjuncts** are non-malt fermentable ingredients used to lighten body, boost gravity, or introduce distinct textures and flavors:

* **Corn/Maize (flaked or grits)**: Thins body and lightens color; flaked corn is pre-gelatinized and ready for direct mashing, whereas raw grits require a cereal mash.
* **Rice (flaked)**: Imparts a crisp, neutral finish while lightening color and body.
* **Oats (flaked or malted)**: Contributes a velvety mouthfeel and stable haze; widely used in Oatmeal Stouts and New England IPAs.
* **Table sugar / sucrose**: Nearly 100% fermentable; boosts alcohol content while drying out the finish without adding body — ideal for Belgian Strong Ales (up to 20% of grist) and crisp session IPAs.
* **Honey**: Roughly 90–95% fermentable, elevating ABV while thinning mouthfeel. Adding honey at flameout or during active fermentation preserves floral aromatics that vigorous boiling would drive off.
* **Lactose (milk sugar)**: An unfermentable milk sugar that adds residual sweetness and fullness to Milk Stouts, Pastry Stouts, and sweet IPAs, typically dosed around 100–500 g per 20 L batch.

### Quality and Storage

* **Malt absorbs moisture**: Keep grains in airtight bins away from dampness. Once milled, crushed malt loses freshness within 1–2 weeks.
* **Color and extract values drift with age**: Brew with malts before their best-by dates for predictable yield and flavor.
* **Whole vs. pre-crushed**: Uncrushed whole kernels retain freshness for months; aim to mill your grain no more than 1–2 days prior to brew day.

***

### Brewer Tip: Fermentables & Inventory

> **Keep your fermentable specifications and stock counts accurate before building recipes.** Extract yield (%) and color ($^\circ\text{L}$) differ across maltsters and harvest lots. Inside **📦 Inventory**:
>
> * Record your available malts, sugars, and extracts along with the exact **°L color** and **Yield (%)** listed on the maltster's lot analysis.
> * When working in **📋 Recipes**, click **+ Quick Add from Inventory** to pull stocked fermentables straight into your grain bill with their specs already populated.
> * Assign each addition the proper **Type** (`Grain`, `Sugar`, `Extract`, or `Dry Extract`) so **beerbrew-web** applies your brewhouse efficiency to mashed grains while crediting 100% extract efficiency to sugars and malt extracts.

***

## Hops

Hops provide **bitterness**, **flavor**, and **aroma** depending on the timing and temperature of each addition.

### Alpha Acids and Bitterness

Raw hop **alpha acids** (chiefly humulone and cohumulone) have little bitterness and poor solubility on their own. Boiling wort **isomerizes** them into soluble, bitter iso-alpha acids.

**Utilization** — the fraction of alpha acids successfully isomerized and retained — is governed by:

* **Boil time**: Extended boiling increases isomerization, though extraction tapers off sharply after 60 minutes.
* **Wort gravity**: Denser, higher-gravity worts impede alpha-acid isomerization, lowering utilization.
* **Hop form**: Hop pellets yield roughly 10% higher utilization than whole leaf cones because milling exposes more lupulin surface area.
* **Whirlpool / hop stand additions**: Hot post-boil steeps still isomerize a smaller fraction of alpha acids; **beerbrew-web** models `Aroma/Whirlpool` and `First Wort` additions alongside conventional boil additions.

**IBU calculation**: **beerbrew-web** defaults to the **Tinseth** equation (and allows switching to **Rager** right in the recipe header), factoring in wort gravity, boil duration, and pellet utilization adjustments.

### Addition Timing

| Addition Timing       | Primary Purpose          | Notes                                                                                       |
| --------------------- | ------------------------ | ------------------------------------------------------------------------------------------- |
| 60+ min               | Bitterness               | Aroma largely boils off                                                                     |
| 15–20 min             | Flavor + some bitterness | Some aroma retained                                                                         |
| 5–10 min / Flameout   | Aroma, some flavor       | Minimal bitterness                                                                          |
| Whirlpool / Hop stand | Aroma, smooth bitterness | 79–88 °C for 15–30 min                                                                      |
| **Dry Hopping**       | Primarily aroma          | Added post-fermentation; can also add some perceived bitterness via humulinones/polyphenols |

**Dry hopping** delivers the brightest hop aroma because delicate essential oils (such as myrcene, linalool, and geraniol) are never boiled away. Best practices include:

* Dosing dry hops toward the tail end of active primary fermentation when yeast biotransformation is still underway.
* Holding temperatures around 16–21 °C (60–70 °F) for warm dry hopping, or dosing cold post-crash to capture different aromatic fractions.
* Limiting contact to 2–5 days, as leaving beer on hops longer than a week can extract grassy or vegetal notes.

### Alpha Acid and Storage

Over time, **oxidation** degrades both alpha and beta acids at a rate tracked by the **Hop Storage Index (HSI)**:

* Keep hops vacuum-sealed or flushed in oxygen-barrier pouches stored below $-10\,^\circ\text{C}$ ($14\,^\circ\text{F}$) in a freezer.
* Whole leaf hops oxidize faster than compressed pellets.
* Reseal opened packages tightly and use remaining aroma hops within a few days.
* Label alpha-acid percentages reflect fresh, cold-stored hops. Reduce the **Alpha (%)** figure in your recipe if your hops are older or were stored warm.

### Brewer Tip: Hops & IBU Modeling

> **Select the exact hop form and addition timing in the recipe editor for dependable IBU estimates.** Inside **📋 Recipes**:
>
> * Choose the matching **Form** (`Pellet`, `Leaf`, or `Plug`) so pellet additions receive their appropriate utilization boost over whole cones.
> * Pick the exact **Use** stage (`Boil`, `First Wort`, `Aroma/Whirlpool`, or `Dry Hop`) so hot-side additions calculate bitterness accurately while `Dry Hop` entries contribute $0\text{ IBU}$.
> * Switch between **Tinseth** and **Rager** in the recipe header to compare bitterness predictions, and dial down **Alpha (%)** manually when brewing with aged or previously opened hop bags.

***

## Yeast

**Yeast** carries out fermentation and creates the signature fermentation-derived aromatics — **esters**, **phenols**, and higher alcohols — that define many beer styles.

### Ale vs. Lager Yeast

| Feature                  | Ale Yeast (*S. cerevisiae*) | Lager Yeast (*S. pastorianus*) |
| ------------------------ | --------------------------- | ------------------------------ |
| Fermentation temperature | 16–24 °C (61–75 °F)         | 7–14 °C (45–57 °F)             |
| Typical attenuation      | 72–82%                      | 75–82%                         |
| Flocculation             | Low–High (strain-dependent) | Medium–High                    |
| Flavor profile           | Esters, sometimes phenols   | Clean, neutral                 |
| Conditioning requirement | Days–weeks                  | Weeks–months                   |

### Pitch Rate

Pitching too little yeast is a primary driver of off-flavors and incomplete fermentations. Standard pitching guidelines:

| Beer Type         | Cells/mL/°P   |
| ----------------- | ------------- |
| Ale               | 0.75 × 10⁶    |
| Hybrid/Warm Lager | 1.0 × 10⁶     |
| Lager             | 1.5–2.0 × 10⁶ |

Example: Fermenting 20 L of ale wort at $1.060\text{ OG}$ ($14.7\,^\circ\text{P}$) at a rate of $0.75 \times 10^6\text{ cells/mL/}^\circ\text{P}$ calls for roughly $0.75 \times 10^6 \times 20{,}000\text{ mL} \times 14.7 = \mathbf{220\text{ billion cells}}$.

Fresh dry yeast sachets generally supply enough viable cells for a standard-gravity 20 L ale batch when properly handled. Liquid yeast packs start around $\sim 100\text{ billion cells}$ at packaging and lose viability over time, making a yeast starter essential for older packs, lagers, or high-gravity worts.

### Fermentation Temperature and Flavors

Fermentation temperature acts as your primary control knob for yeast-driven flavor compounds:

* **Esters** (fruity notes like isoamyl acetate for banana or ethyl acetate for solvent) climb when temperatures run warm or when yeast is underpitched.
* **Fusel alcohols** (harsh, solventy, warming alcohol notes) appear when fermentation temperatures exceed the strain's comfort zone or when cell counts are too low.
* **Diacetyl** (buttery or butterscotch notes) forms naturally early in fermentation and is later cleaned up by active yeast. A **diacetyl rest** — warming the beer by 2–4 °C near the end of primary fermentation — speeds up this cleanup before chilling.

### Flocculation and Clarity

Strongly **flocculent** yeasts (such as classic English ale strains like WY1968/WLP002) clump together and drop bright quickly, whereas low-flocculation strains (such as Hefeweizen and many Belgian yeasts) stay suspended much longer. **Cold crashing** — chilling the beer to 0–4 °C (32–39 °F) for 24–48 hours — encourages yeast and haze particles to settle out rapidly.

### Yeast Health and Viability

* Liquid yeast loses viability steadily during cold storage (commonly estimated around 15–25% per month depending on strain and packaging).
* Always verify the packaging or manufacture date before pitching liquid cultures.
* Pitching vigorous, healthy cells results in cleaner flavor profiles and predictable terminal gravity.

### Brewer Tip: Yeast & Fermentation Schedules

> **Combine your yeast selection with a multi-stage Fermentation Profile ahead of brew day.** Inside **📋 Recipes**:
>
> * Input your yeast strain's expected **Attenuation (%)** in the **Yeast** table so **beerbrew-web** estimates **Final Gravity (FG)** and **ABV** accurately.
> * Pick a preset from the **Fermentation Profile** menu (or customize individual stages under the **Fermentation & Carbonation** tab) to plan primary temperature holds, diacetyl rest ramps, dry-hop timing, and cold-crash conditioning.

***

## Water

Water makes up more than 90% of finished beer by weight, and its dissolved minerals directly shape mash pH, enzyme activity, hop crispness, malt fullness, and yeast metabolism. Even simple mineral adjustments — focusing first on calcium and mash pH — produce noticeable gains in beer quality.

See the **Water Chemistry & Adjustments** section for complete ion guidelines.

**Minimum starting point:**

* Calcium ($\text{Ca}^{2+}$) $> 50\text{ ppm}$: Aids starch-converting enzymes, supports yeast flocculation, and precipitates proteins and oxalates.
* Mash pH $5.2\text{–}5.6$: Ideal window for amylase activity, clean wort runoff, and yeast health.

***

## Adjuncts — Flavor and Process Additions

In addition to fermentable sugars and grains, brewers rely on specialized non-fermentable additions for water tuning, clarity, yeast health, and flavor:

| Ingredient               | Purpose                                            | Typical Usage                                   |
| ------------------------ | -------------------------------------------------- | ----------------------------------------------- |
| Gypsum ($\text{CaSO}_4$)           | Adds $\text{Ca}^{2+}$ and $\text{SO}_4^{2-}$; enhances hop crispness        | Water chemistry adjustment                      |
| Calcium Chloride ($\text{CaCl}_2$) | Adds $\text{Ca}^{2+}$ and $\text{Cl}^-$; enhances malt roundness         | Water chemistry adjustment                      |
| Irish Moss / Whirlfloc   | Protein flocculant; improves hot break and clarity | 1 tablet or ½ tsp per 20 L, last 15 min of boil |
| Yeast Nutrient           | Provides zinc, nitrogen, vitamins for yeast        | High-gravity or adjunct-heavy beers             |
| Lactic Acid              | pH adjustment                                      | Water and wort pH control                       |
| Coriander Seed           | Flavor spice; citrus, pepper                       | Witbier: 10–30 g per 20 L, last 5 min           |
| Orange Peel              | Flavor; bitter or sweet                            | Witbier, Belgian Saison                         |
| Vanilla Bean             | Sweetness, aromatic complexity                     | Post-fermentation; 1–3 beans per 20 L           |
| Oak (cubes/spirals)      | Tannin, wood character                             | Secondary conditioning; 2–4 weeks               |
| Fruit Additions          | Flavor, color, fermentable sugars                  | Primary or secondary; after peak fermentation   |

Kettle finings like Irish Moss and Whirlfloc offer one of the easiest quality upgrades in homebrewing, binding haze-forming proteins during the boil for clearer finished beer.

### Brewer Tip: Miscellaneous Ingredients & Water Salts

> **Include all brewing salts, acids, kettle finings, and spices in your recipe's Miscs & Water Salts table.** Logging gypsum, calcium chloride, Whirlfloc, yeast nutrients, and flavorings ensures every addition prints clearly on your **Printable Brew Day Sheet** and deducts automatically from **📦 Inventory** when you click **🍺 Brew It (Deduct Stock)**.

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

# Water Chemistry & Adjustments

Mineral ions, alkalinity, mash pH, sulfate-to-chloride ratios, and how to configure Water Profiles in **beerbrew-web** for repeatable brewing results.

Often described as beer's "silent ingredient," brewing water influences every stage of production — from mash enzyme efficiency to perceived bitterness and malt fullness in the finished pint. This section outlines water chemistry fundamentals, practical mineral targets, and how to organize profiles in **beerbrew-web**.

## Why Water Chemistry Matters

Your water's mineral profile directly shapes:

* **Mash pH**: Starch-converting enzymes perform best within pH $5.2\text{–}5.6$. Straying outside this range lowers extract efficiency and risks harsh flavors.
* **Flavor balance**: Sulfate sharpens hop bitterness and dryness, whereas chloride rounds out malt sweetness and body.
* **Yeast health**: Calcium serves as a vital cofactor for yeast enzyme activity and healthy flocculation.
* **Clarity and stability**: Sufficient calcium precipitates excess proteins and oxalates, reducing chill haze and beerstone.
* **Overall flavor quality**: Moderate sodium adds palate fullness, excessive magnesium tastes harsh, and high alkalinity paired with pale malts produces astringency.

***

## Key Ions and Their Effects

### Calcium ($\text{Ca}^{2+}$)

Calcium is the cornerstone ion in brewing water. It:

* Reduces mash pH by reacting with malt phosphates to release hydrogen ions ($\text{H}^+$).
* Supports alpha-amylase stability and healthy yeast metabolism.
* Encourages protein coagulation and calcium oxalate precipitation, improving beer clarity.
* Enhances crisp hop bitterness perception.

**Target range**: $50\text{–}150\text{ ppm}$. Aim for at least $50\text{ ppm}$ in all batches, with $100\text{–}150\text{ ppm}$ common across most styles. Concentrations above $200\text{ ppm}$ can lend a chalky mineral note.

**Sources**: Gypsum ($\text{CaSO}_4$) supplies $\text{Ca}^{2+}$ and $\text{SO}_4^{2-}$; Calcium Chloride ($\text{CaCl}_2$) supplies $\text{Ca}^{2+}$ and $\text{Cl}^-$.

### Magnesium ($\text{Mg}^{2+}$)

Magnesium acts as a trace yeast nutrient, though malted barley already supplies plenty for normal fermentation. Above $30\text{ ppm}$, magnesium imparts a harsh, bitter, or metallic taste and can have a laxative effect.

**Target range**: $0\text{–}30\text{ ppm}$, with most brewers keeping levels around $10\text{–}20\text{ ppm}$. Deliberate magnesium additions are rarely needed unless brewing with pure RO/distilled water.

**Sources**: Epsom salt ($\text{MgSO}_4$) provides $\text{Mg}^{2+}$ and $\text{SO}_4^{2-}$.

### Sodium ($\text{Na}^{+}$)

At modest levels ($50\text{–}100\text{ ppm}$), sodium accentuates malt sweetness and adds roundness to full-bodied beers. Exceeding $\sim 150\text{ ppm}$ creates an unpleasant salty edge. Sodium works alongside chloride to reinforce malt richness.

**Target range**: $0\text{–}100\text{ ppm}$ for general styles, and up to $150\text{ ppm}$ in rich stouts or malt-driven ales.

**Sources**: Baking Soda ($\text{NaHCO}_3$) adds $\text{Na}^+$ while increasing alkalinity/pH; Table Salt ($\text{NaCl}$) adds $\text{Na}^+$ and $\text{Cl}^-$ without shifting mash pH.

### Chloride ($\text{Cl}^{-}$)

Chloride promotes fullness, palate roundness, and perceived malt sweetness, working hand in hand with sodium. Very high concentrations ($> 300\text{ ppm}$) can taste overly mineralic or impair yeast performance.

**Target range**: $50\text{–}200\text{ ppm}$. Use higher levels ($150\text{–}200+\text{ ppm}$) for malty beers and hazy IPAs, and lower levels ($50\text{–}75\text{ ppm}$) for crisp, hop-forward styles.

**Sources**: Calcium Chloride ($\text{CaCl}_2$) and Table Salt ($\text{NaCl}$).

### Sulfate ($\text{SO}_4^{2-}$)

Sulfate accentuates hop bitterness, dryness, and a crisp finish, making it the primary mineral lever for hop-centric beers. Excessive levels ($> 400\text{ ppm}$) can create a dry, minerally, or astringent bite.

**Target range**: $50\text{–}350\text{ ppm}$. Keep sulfate low ($25\text{–}75\text{ ppm}$) for delicate lagers and malt-forward beers, and raise it to $200\text{–}350\text{ ppm}$ for West Coast IPAs. (Traditional Burton-on-Trent water exceeded $700\text{ ppm}$, though modern brewers rarely push that high.)

**Sources**: Gypsum ($\text{CaSO}_4$) and Epsom Salt ($\text{MgSO}_4$).

### Bicarbonate / Alkalinity ($\text{HCO}_3^{-}$)

Alkalinity — driven chiefly by bicarbonate ions — buffers against pH drops in the mash. Dark roasted and crystal malts are acidic and benefit from moderate alkalinity to keep mash pH from dropping too low. Pale base malts, by contrast, naturally lower mash pH through calcium-phosphate reactions and require little to no alkalinity.

When pale mashes are brewed with high-alkalinity water, mash pH climbs too high, leading to sluggish conversion and harsh, astringent polyphenol extraction.

**Target range by wort color**:

| Wort Color          | Alkalinity (as $\text{CaCO}_3$) | Bicarbonate ($\text{HCO}_3^{-}$) |
| ------------------- | --------------------- | ------------------- |
| Very pale (Pilsner) | 0–25 ppm              | 0–30 ppm            |
| Pale (Pale Ale)     | 0–50 ppm              | 0–60 ppm            |
| Amber               | 25–100 ppm            | 30–120 ppm          |
| Dark (Porter/Stout) | 100–250 ppm           | 122–305 ppm         |

**Sources**: Baking Soda ($\text{NaHCO}_3$) increases alkalinity, while food-grade acids (lactic or phosphoric) neutralize it. Diluting hard tap water with Reverse Osmosis (RO) or distilled water is another straightforward way to lower alkalinity.

***

## Residual Alkalinity (RA)

**Residual Alkalinity** measures the net push your water exerts on mash pH once calcium and magnesium have reacted with malt phosphates. The remaining unneutralized alkalinity is defined by Kolbach's equation:

> $$\text{RA (as CaCO}_3\text{, ppm)} = \text{Total Alkalinity} - \frac{\text{Ca (ppm)}}{3.5} - \frac{\text{Mg (ppm)}}{7}$$

*Source: Kolbach, 1953*

A **positive RA** pushes mash pH upward, helping balance acidic dark malts. A **negative RA** (where hardness outweighs alkalinity) pulls mash pH downward, ideal for pale grain bills.

**RA Targets**:

| Beer Color                       | RA Target (ppm $\text{CaCO}_3$) |
| -------------------------------- | --------------------- |
| Very pale (Pilsner, light lager) | −50 to 0              |
| Pale ale, Wheat beer             | −25 to +50            |
| Amber/Vienna                     | +50 to +100           |
| Brown Ale, Altbier               | +75 to +150           |
| Porter, Stout                    | +100 to +200          |

While RA serves as a useful planning benchmark, always verify your actual room-temperature mash pH directly with a calibrated meter.

***

## Mash pH

**Target: 5.2–5.6 (measured at room temperature, $\sim 20\,^\circ\text{C}$)**

Maintaining mash pH inside this window is the single highest-impact water adjustment you can make:

* Both alpha- and beta-amylase operate near peak efficiency.
* Runoff is brighter with less tannin and unconverted starch carryover.
* Perceived hop bitterness is cleaner and less harsh.
* Yeast fermentation proceeds more reliably.
* Finished beer shows improved clarity and shelf stability.

Allowing mash pH to climb above $5.6$ invites astringency and poor conversion, while dropping well below $5.2$ can yield a thin, overly sharp beer.

**Important**: Reference pH targets ($5.2\text{–}5.6$) apply to samples cooled to room temperature ($20\,^\circ\text{C}$). Measuring hot wort directly in the mash tun ($60\text{–}70\,^\circ\text{C}$) reads roughly $0.2\text{–}0.35\text{ pH}$ units lower due to temperature physics — always cool a small sample before testing.

### Factors That Lower Mash pH

* Calcium and magnesium ions reacting with malt phosphates
* Acidulated malt
* Lactic or phosphoric acid additions
* Darker crystal and roasted malts

### Factors That Raise Mash pH

* Source water bicarbonate and alkalinity
* Chalk ($\text{CaCO}_3$) — dissolves poorly in mash water without pressurized $\text{CO}_2$; favor baking soda or slaked lime when raising pH
* Baking Soda ($\text{NaHCO}_3$)
* Slaked Lime ($\text{Ca(OH)}_2$)

***

## Chloride:Sulfate Balance

Adjusting the ratio of sulfate to chloride ($\text{SO}_4:\text{Cl}$) steers overall flavor balance between crisp hop bitterness and rounded malt fullness:

| $\text{SO}_4:\text{Cl}$ Ratio | Beer Character            |
| ------------ | ------------------------- |
| < 0.5        | Very malty, round, sweet  |
| 0.5–1.0      | Malt-leaning, balanced    |
| 1.0–2.0      | Balanced                  |
| 2.0–4.0      | Hop-forward, dry, crisp   |
| > 4.0        | Very hoppy, dry (extreme) |

**Style examples:**

| Style               | $\text{SO}_4$ (ppm) | $\text{Cl}$ (ppm) | Approx. Ratio        |
| ------------------- | --------- | -------- | -------------------- |
| NEIPA / Hazy IPA    | 50–100    | 100–200  | \~1:2 ($\text{Cl} > \text{SO}_4$)     |
| West Coast IPA      | 150–300   | 50–100   | \~3:1                |
| English Bitter      | 200–400   | 50–100   | \~3:1 to 4:1         |
| Pale Ale (balanced) | 100–150   | 75–125   | \~1.5:1              |
| Pilsner             | 10–30     | 5–25     | \~1:1 or low overall |
| Stout / Porter      | 50–100    | 75–150   | \~1:1 to 1:2         |

Keep total mineral concentration in mind alongside the ratio: water with $10\text{ ppm }\text{SO}_4$ and $5\text{ ppm }\text{Cl}$ shares the same $2:1$ ratio as $400\text{ ppm}$ and $200\text{ ppm}$, yet delivers a dramatically softer mineral impression.

***

## Classic Water Profiles Reference

Historic brewing cities developed distinct beer styles shaped by their local groundwater chemistry. Treat these benchmarks as inspiration rather than rigid targets:

| Profile         | Ca  | Mg | Na | Cl | $\text{SO}_4$ | $\text{HCO}_3$ | Known For                 |
| --------------- | --- | -- | -- | -- | --- | ---- | ------------------------- |
| Pilsen          | 7   | 2  | 2  | 5  | 6   | 16   | Czech Pilsner; ultra-soft |
| Dublin          | 115 | 4  | 12 | 19 | 53  | 315  | Dry Irish Stout           |
| Burton-on-Trent | 295 | 45 | 55 | 25 | 725 | 320  | English Bitter, IPA       |
| Munich          | 75  | 18 | 2  | 2  | 10  | 152  | Bavarian lager            |
| London          | 70  | 6  | 15 | 38 | 40  | 166  | English Porter, Mild      |

All values in ppm ($\text{mg/L}$).

Rather than replicating historic city water verbatim — which often contained excessive hardness or alkalinity — modern brewers tailor ion levels directly to the target style.

***

## Practical Water Adjustment Decision Framework

### Step 1: Know Your Source

Request a municipal water report or send a sample to a brewing water lab, then enter your baseline mineral numbers under **💧 Water** in **beerbrew-web**. If your local tap water fluctuates or has high alkalinity, starting with **Reverse Osmosis (RO) / Distilled Base** water (all zeros) gives you a clean slate.

### Step 2: Target Calcium First

Bring mash calcium to at least $50\text{ ppm}$ using Gypsum (to boost sulfate) and/or Calcium Chloride (to boost chloride).

### Step 3: Set the $\text{SO}_4:\text{Cl}$ Ratio for the Style

Balance your Gypsum and Calcium Chloride doses to achieve a sulfate-to-chloride ratio suited to either hop crispness or malt fullness.

### Step 4: Manage Alkalinity for the Grain Bill

* **Pale grain bill**: Keep RA near zero or slightly negative by diluting alkaline tap water with RO water or acidifying the mash and sparge liquor.
* **Dark grain bill**: Retain moderate source alkalinity or dose small amounts of Baking Soda if dark roasted malts pull mash pH below $5.2$.

### Step 5: Verify Mash pH

Check mash pH 10–15 minutes after dough-in using a calibrated pH meter on a cooled wort sample, adjusting lactic or phosphoric acid doses on future brews if needed.

### Step 6: Treat Sparge Water

Keep sparge water pH between $5.5$ and $6.0$. Alkaline sparge water can raise grain-bed pH late in lautering and extract astringent husk tannins; a small dose of lactic or phosphoric acid prevents this.

***

## Brewer Tip: Managing Water Profiles in beerbrew-web

> **Save both your source water report and target style ion profiles under 💧 Water so every recipe stays anchored to clear mineral goals.** Follow this simple workflow:
>
> 1. Go to **💧 Water** in the sidebar and record your tap water ions (or rely on the built-in **RO / Distilled Base**, **Hoppy West Coast IPA**, **Balanced Amber / Pale Ale**, and **Malty** presets).
> 2. Review the live **$\text{SO}_4:\text{Cl}$ ratio** and flavor balance badge (`Hoppy / Crisp`, `Malty / Full`, `Balanced`, or `Neutral`) generated automatically by **beerbrew-web**.
> 3. Open **📋 Recipes → Mash Schedule & Water Chemistry** and pick your **Target Water Profile** from the dropdown menu.
> 4. Add your exact gram or milliliter weights of Gypsum ($\text{CaSO}_4$), Calcium Chloride ($\text{CaCl}_2$), Epsom Salt ($\text{MgSO}_4$), Baking Soda, or Lactic Acid under **Miscs & Water Salts** so they appear on your **Brew Day Sheet**.

***

## Acid Additions: Lactic vs. Phosphoric

Food-grade lactic and phosphoric acids are both effective, no-rinse options for lowering mash and sparge water pH.

| Acid                     | Concentration Available       | Notes                                                                                      |
| ------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------ |
| Lactic acid (88%)        | 80–88% typical homebrew grade | Adds a mild lactic note at very high doses ($>0.5\text{ mL/L}$); barely perceptible at normal rates |
| Phosphoric acid (75–85%) | Various concentrations        | Flavor-neutral; no off-flavor risk; more concentrated                                      |
| Phosphoric acid (10%)    | Diluted solution              | Safer to handle; larger volumes needed                                                     |

Both acids work well in homebrewing. Phosphoric acid is completely flavor-neutral when large reductions are required, while 88% lactic acid is widely stocked and imperceptible at standard doses ($1\text{–}5\text{ mL}$ per $20\text{ L}$ batch).

Always double-check the concentration percentage printed on your acid bottle before measuring out a dose.

***

## Troubleshooting Common Water Issues

| Symptom                                           | Likely Cause                          | Action                                                                 |
| ------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| Harsh, astringent mash or beer                    | High alkalinity/pH in pale mash       | Reduce alkalinity (dilute with RO or acidify); verify mash pH          |
| Thin, sour wort from dark malt                    | pH too low from highly roasted grains | Increase alkalinity; consider steeping dark malts separately post-mash |
| Beer tastes salty or harsh                        | Na or Cl too high                     | Reduce salt additions; dilute with RO water                            |
| Beer feels flat and thin despite good attenuation | Low chloride                          | Increase $\text{CaCl}_2$ addition                                                |
| Hop bitterness feels harsh/sharp                  | Very high sulfate ($>400\text{ ppm}$)          | Reduce Gypsum; recalculate $\text{SO}_4:\text{Cl}$ ratio                                |
| Cloudy beer, poor clarity                         | Low calcium                           | Ensure $\text{Ca}^{2+} \ge 50\text{–}75\text{ ppm}$                                                |

***

## Sources

* Palmer, John J. *How to Brew*, 4th ed. Brewers Publications, 2017. (Chapter 15: Water Chemistry; Chapter 16: Adjusting Water)
* Palmer, John J., and Colin Kaminski. *Water: A Comprehensive Guide for Brewers*. Brewers Publications, 2013. (Comprehensive water chemistry reference; RA, ion targets, mash pH)
* Kolbach, P. "Berechnung der Restalkalität von Brauwasser." *Monatsschrift für Brauwissenschaft* 6.6 (1953): 98–99. (Residual Alkalinity formula)
* Delange, A.J. "A Brewing Water Chemistry Primer." HomeBrewTalk.com, 2009. (Practical ion guidance, chalk solubility notes)
* ASBC Methods of Analysis. "Water and Wort" sections. (Analytical references for alkalinity, hardness, and ion measurement)
* Fix, George. *Principles of Brewing Science*, 2nd ed. Brewers Publications, 1999. (pH and enzyme activity)
* Briggs, D.E., et al. *Brewing: Science and Practice*. Woodhead / CRC Press, 2004. (Alkalinity, sparge water pH, tannin extraction)

# Mash & Lauter Science

Understanding starch-converting enzymes, mash temperature control, lautering techniques, and brewhouse efficiency in all-grain brewing.

The **mash** forms the core of all-grain brewing. Combining milled grain with hot water activates native enzymes that convert starches into fermentable sugars, creating sweet **wort** for fermentation. Subsequent **lautering** separates that liquid wort from the spent grain husks. Mastering both stages helps you hit target gravities, control body and dryness, and achieve repeatable brewhouse efficiency.

***

## Enzyme Activity & the Saccharification Window

While barley malt holds dozens of enzymes, two amylase enzymes govern sugar production during the saccharification rest:

### Beta-Amylase

Beta-amylase snips maltose units (two-glucose chains) from the ends of starch molecules, generating highly fermentable wort.

| Parameter           | Range                        |
| ------------------- | ---------------------------- |
| Optimal temperature | 60–65 °C (140–149 °F)        |
| Active range        | 55–70 °C (131–158 °F)        |
| Denaturation        | Rapidly above 70 °C (158 °F) |
| Optimal pH          | 5.0–5.3                      |

Mashing toward the lower end of the saccharification range promotes beta-amylase activity, resulting in higher fermentability, greater attenuation, and a crisper, drier finish.

### Alpha-Amylase

Alpha-amylase cleaves starch chains internally at random points, creating unfermentable dextrins and complex oligosaccharides that lend body and residual sweetness.

| Parameter           | Range                 |
| ------------------- | --------------------- |
| Optimal temperature | 67–72 °C (153–162 °F) |
| Active range        | 60–76 °C (140–169 °F) |
| Denaturation        | Above 76 °C (169 °F)  |
| Optimal pH          | 5.3–5.7               |

Mashing toward the upper end of the saccharification range favors alpha-amylase, yielding fuller body and a higher final gravity.

### Practical Single-Infusion Targets

| Goal                             | Temperature           |
| -------------------------------- | --------------------- |
| Dry, highly attenuated beer      | 63–65 °C (145–149 °F) |
| Balanced body and fermentability | 66–68 °C (151–154 °F) |
| Full-bodied, lower attenuation   | 69–72 °C (156–162 °F) |

Holding a single-infusion rest for **60–90 minutes** reliably converts well-modified modern malts across this temperature spectrum. You can verify complete starch conversion with a quick iodine tincture test: a drop of wort that stays golden-amber (rather than turning blue-black) confirms zero unconverted starch remains.

> **Rule of thumb:** Well-modified modern base malts typically convert almost completely within 30–45 minutes at $67\,^\circ\text{C}$ ($153\,^\circ\text{F}$); holding for a full 60 minutes provides a dependable safety margin.

***

## Mash pH

Mash pH governs enzyme efficiency, wort clarity, and clean flavor extraction. Aim for **pH 5.2–5.6 measured at room temperature ($20\,^\circ\text{C}$ / $68\,^\circ\text{F}$)**, which corresponds to roughly **5.1–5.4 at mash temperature**.

* Below $\sim 5.2$ (room-temp reading): Enzyme speed and fermentability begin to decline.
* $\sim 5.2\text{–}5.6$ (room-temp reading): Optimal starch conversion and clean wort flavor.
* Above $\sim 5.8$ (room-temp reading): Higher likelihood of extracting astringent husk tannins during lautering and sparging.

Always cool your wort sample to room temperature before taking a pH reading — Automatic Temperature Compensation (ATC) adjusts for electrode temperature response, not the chemical pH shift of hot wort itself.

Your source water alkalinity, calcium level, and grain color interact to determine mash pH. Select a **Target Water Profile** and log your mineral/acid additions in your recipe ahead of brew day.

> **Brewer Tip 💧** Choose a **Target Water Profile** inside **📋 Recipes → Mash Schedule & Water Chemistry**, and record your gypsum, calcium chloride, and acid additions under **Miscs & Water Salts** so all mineral targets and salt weights remain saved with your recipe.

***

## Step Mashing

Step mashing — resting the mash at two or more ascending temperatures — is helpful when working with undermodified malts, large adjunct additions, or specific foam and body goals.

### Common Rest Steps

| Rest                  | Temperature           | Purpose                                                                    |
| --------------------- | --------------------- | -------------------------------------------------------------------------- |
| Acid rest             | 35–45 °C (95–113 °F)  | Phytase activation; lowers mash pH (less relevant with well-modified malt) |
| Protein rest          | 45–55 °C (113–131 °F) | Protease breaks down large proteins; improves head retention, reduces haze |
| Beta-glucan rest      | 35–45 °C (95–113 °F)  | Breaks down beta-glucans in oats, wheat, rye; improves lauterability       |
| Saccharification rest | 63–72 °C (145–162 °F) | Starch conversion (see above)                                              |
| Mash-out              | 76–78 °C (169–172 °F) | Denatures enzymes; fixes fermentability; thins wort for easier lautering   |

> **Note:** Because modern malts are thoroughly modified during malting, a protein rest is rarely needed for all-malt recipes and can actually thin out body and foam stability. Reserve protein or beta-glucan rests for grists heavy in unmalted wheat, oats, or rye.

> **Brewer Tip 🔧** Configure single-infusion or multi-rest mash schedules under **📋 Recipes → Mash Schedule & Water Chemistry**. Add steps for beta-glucan/protein rests, saccharification rests, and mash-out (`Infusion`, `Temperature`, or `Decoction`) specifying water volume, target temperature ($^\circ\text{C}$), and rest duration — **beerbrew-web** renders the entire schedule on your **Printable Brew Day Sheet**, and **🧮 Tools → 1. Mash Strike Water Temperature** calculates your exact dough-in strike temp.

***

## Lautering: Converting the Mash into Wort

**Lautering** (from the German *läutern*, meaning to clarify) separates sweet wort from the spent grain bed in three distinct steps:

1. **Vorlauf (recirculation):** Slowly return the first cloudy runnings over the top of the grain bed until the wort runs clear, establishing the husks as a natural filter bed (usually 1–4 L).
2. **First runnings:** Drain the concentrated initial wort into the boil kettle.
3. **Sparge:** Rinse the grain bed with hot water to extract remaining dissolved sugars.

### Sparge Methods

| Method           | Description                                                                     | Pros                                          | Cons                                                         |
| ---------------- | ------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| **Fly sparge**   | Continuously spray hot water over the grain bed while draining at the same rate | Highest extract efficiency (typically 80–85%) | Requires equipment; longer process; tannin risk if pH rises  |
| **Batch sparge** | Drain fully, add calculated sparge water, stir, wait 10–15 min, drain again     | Simple; no special equipment                  | Slightly lower efficiency than fly sparge (typically 70–78%) |
| **No-sparge**    | Mash with the full volume; drain once                                           | Fastest; minimal risk of tannin extraction    | Lowest efficiency; requires larger grain bill                |

### Tannin Extraction Risks

Harsh polyphenols (tannins) leach out of grain husks primarily when **elevated pH and high temperature occur together**:

1. **Control sparge temperature:** Keep sparge water around **76–78 °C (168–172 °F)**.
2. **Watch runoff gravity and pH:** As wort sugars wash out, runoff pH climbs. Stop sparging once runoff gravity drops to **1.008–1.010 SG** or room-temperature pH approaches **5.8–6.0**.

Either factor on its own is usually benign, but exceeding both simultaneously late in the sparge produces noticeable astringency.

***

## Mash Efficiency

**Mash efficiency** reflects the fraction of potential grain sugars extracted into the kettle prior to boiling, whereas **brewhouse efficiency** accounts for all downstream kettle, trub, and transfer losses into the fermenter.

Typical homebrewing ranges:

* **Mash efficiency:** $\sim 70\text{–}85\%$
* **Brewhouse efficiency:** $\sim 60\text{–}80\%$

Key efficiency drivers:

| Factor               | Improvement                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| Crush quality        | Ensure grain is well-crushed (husk intact, endosperm exposed); measure gap (typically 0.8–1.0 mm) |
| Mash pH              | Stay around 5.2–5.6 (room-temp reading)                                                           |
| Water-to-grain ratio | 2.5–4.0 L/kg (1.2–2.0 qt/lb); thinner mashes improve enzyme mobility                              |
| Mash time            | 60–90 min at temperature                                                                          |
| Sparge thoroughness  | More sparge water rinses more sugar                                                               |
| Grain bed depth      | 20–40 cm (8–16 in) typical for good filtration                                                    |

> **Brewer Tip 📊** Configure your **Brewhouse Efficiency (%)** inside **⚙️ Equipment**. **beerbrew-web** uses that percentage to predict your **Original Gravity (OG)** from the grain bill. After brewing, compare your actual OG in **📓 Brew Logs** against the predicted figure and fine-tune your Equipment Profile efficiency for future sessions.

***

## Mash-Out

Heating the mash to **76–78 °C (169–172 °F)** for 10 minutes prior to lautering:

* **Halts further enzyme conversion**, preserving the exact sugar-to-dextrin ratio you targeted.
* **Reduces wort viscosity**, helping runoff flow smoothly through the grain bed.
* **Is optional** for batch-sparge and no-sparge setups, where lautering happens quickly enough that enzymatic shifts are minimal.

> **Brewer Tip 🛠️** Include a **Mash-Out** step (`Temperature` mode, $76\,^\circ\text{C}$ for $10\text{ min}$) at the end of your **Mash Steps** table so it prints on your **Brew Day Sheet** right before lautering.

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

# Boil, Hop Utilization & Whirlpool

Understanding boil objectives, DMS prevention, hop utilization mechanics, whirlpool steeps, and IBU calculation models.

Boiling converts sweet mash runoff into sterile, hop-seasoned wort ready for fermentation, locking in bitterness, flavor, and clarity. Knowing how boil vigor and temperature affect hop chemistry helps you structure hop schedules and interpret **beerbrew-web**'s IBU numbers accurately.

***

## The Objectives of the Boil

A vigorous **60–90 minute** boil accomplishes seven key transformations at once:

| Objective                           | Mechanism                                                   | Notes                                                                     |
| ----------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Wort sanitation**                 | Heat denatures most microorganisms                          | Rapidly achieved in an active boil and maintained through the boil period |
| **Isomerization of alpha acids**    | Heat converts alpha acids into iso-alpha acids (bitterness) | Requires sustained boiling; see Hop Utilization below                     |
| **Hot break (protein coagulation)** | Proteins and polyphenols form trub                          | Essential for wort clarity and beer stability                             |
| **DMS volatilization**              | Boiling drives off dimethyl sulfide (DMS)                   | Requires a vigorous, uncovered boil; see DMS section below                |
| **Wort concentration**              | Water evaporates, increasing gravity                        | Target 8–12% evaporation per hour for most systems                        |
| **Enzymatic activity arrest**       | Remaining amylase is denatured                              | Locks in the fermentability profile established during mash               |
| **Color development**               | Maillard reactions and caramelization                       | Increases SRM/EBC color slightly with longer boils                        |

***

## DMS Management

**Dimethyl sulfide (DMS)** is a volatile sulfur compound responsible for cooked-corn or vegetal off-aromas. It arises from **S-methylmethionine (SMM)**, a heat-labile precursor abundant in lightly kilned malts like Pilsner malt, which breaks down into DMS whenever wort is hot.

### Key rules for DMS control:

1. **Boil vigorously and uncovered.** An open rolling boil lets DMS escape with the steam; putting a lid on the kettle condenses DMS-laden vapors right back into the wort.
2. **Boil for at least 60 minutes.** Standard 60-minute boils suffice for most ales, while recipes containing heavy percentages of Pilsner malt benefit from a 90-minute boil.
3. **Chill wort quickly.** SMM continues converting into DMS while wort sits hot after flameout, but evaporation stops once boiling ends. Rapidly chilling wort below **$60\,^\circ\text{C}$ ($140\,^\circ\text{F}$)** within 20–30 minutes halts DMS buildup.
4. **Don't cover the kettle during cooling.** Leave the kettle open so vapors continue venting until the wort cools below $\sim 60\,^\circ\text{C}$.

> **Note:** Darker kilned malts (such as Munich, Crystal, and Chocolate malts) pose virtually no DMS risk because kiln heat drives off SMM during malting.

***

## Hop Chemistry & Utilization

### Alpha Acids and Isomerization

**Alpha acids** (humulone, cohumulone, and adhumulone) provide the bittering potential in hops. Almost insoluble in cold liquid, they require sustained heat during the boil to **isomerize** into soluble, bitter **iso-alpha acids**.

Key factors affecting alpha acid utilization:

| Factor            | Effect                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| **Boil time**     | Longer boil increases utilization, but with diminishing returns after \~60 minutes                        |
| **Wort gravity**  | Higher gravity = lower utilization (denser wort reduces iso-alpha acid solubility)                        |
| **Hop form**      | Pellets typically have \~10–15% higher utilization vs. whole cones due to greater surface area            |
| **Hop age (HSI)** | Aged or poorly stored hops lose alpha acid potency; lower the Alpha (%) input for older hops |
| **Boil volume**   | Trub absorption post-boil removes some iso-alpha acids; pellet hops leave more trub                       |

Standard 60-minute boil utilization generally falls around **$\sim 20\text{–}35\%$**, varying with wort density, hop format, and the chosen IBU formula.

### Hop Addition Timing

| Addition Type             | Timing                           | Primary Contribution                                                               |
| ------------------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| **Bittering**             | 60–90 min                        | IBUs (bitterness); aroma oils fully volatilize                                     |
| **Flavor**                | 10–20 min                        | Bitterness + residual hop flavor oils                                              |
| **Aroma (late kettle)**   | 0–10 min                         | Flavor + aroma oils; low IBU contribution                                          |
| **Whirlpool / hop stand** | After flameout, ≥ 70 °C (158 °F) | Significant flavor/aroma; some IBU contribution                                    |
| **Dry hop**               | Fermentation or conditioning     | Primarily aroma; can add some bitterness from oxidized hop compounds (humulinones) |

> **Note:** Delicate hop essential oils (myrcene, linalool, geraniol) evaporate within minutes of boiling. Adding hops late in the boil, during a whirlpool stand, or as a dry hop preserves these aromatic compounds for hop-forward styles like IPAs and Saisons.

***

## Whirlpool and Hop Stand

Creating a **whirlpool** after flameout spins the wort into a vortex that gathers **trub** and hop debris into a compact center cone while doubling as a **hop stand** steep.

During a **hop stand**, hops are added at flameout or after cooling the wort slightly and allowed to steep for 15–30 minutes before chilling begins.

### Temperature and IBU Impact

How much alpha-acid isomerization occurs during a hop stand depends heavily on wort temperature:

| Wort Temperature          | Effect                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------- |
| **> 85 °C (185 °F)**      | Active isomerization; noticeable IBU contribution depending on stand time and hop load |
| **70–85 °C (158–185 °F)** | Reduced isomerization; emphasis shifts to aroma oil extraction                         |
| **< 70 °C (158 °F)**      | Minimal isomerization; primarily aroma extraction                                      |

When brewing juicy, aroma-driven styles like NEIPAs, cooling the wort to **$70\text{–}80\,^\circ\text{C}$ ($158\text{–}176\,^\circ\text{F}$)** prior to the hop stand captures vibrant hop oils while keeping bitterness soft.

> **Brewer Tip 🌿** Inside **📋 Recipes**, model post-boil hop steeps by choosing **Aroma/Whirlpool** in the hop **Use** column and entering your steep duration under **Time (min)**. **beerbrew-web** applies a reduced isomerization utilization factor for whirlpool additions and prints them in the **Hop & Boil Additions** section of your **Brew Day Sheet**.

***

## Dry Hopping

**Dry hopping** introduces hops during or after fermentation to maximize fresh hop aroma. Without heat, traditional alpha-acid isomerization does not occur, though dry hops can still contribute perceived bitterness via oxidized humulinones and hop polyphenols.

### Practical Guidance

| Parameter        | Typical Range                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------- |
| **Timing**       | After vigorous fermentation subsides (day 3–5 for ales), or in conditioning                  |
| **Temperature**  | 18–22 °C (64–72 °F) for ales during fermentation; 0–4 °C (32–39 °F) during cold conditioning |
| **Contact time** | 2–5 days warm; often 3–7 days cold (longer contact can add grassy/polyphenolic notes)        |
| **Rate**         | 5–15 g/L (0.7–2.0 oz/gal) for hazy/NEIPA styles; 1–5 g/L for traditional styles              |

* **Biotransformation:** Adding dry hops while yeast is still actively fermenting can transform certain hop terpenes into new fruity aroma compounds, though outcomes depend heavily on yeast strain and hop variety.
* **Oxygen control:** Opening a fermenter to drop in hops risks oxygen ingress. Purge the headspace or use a closed, $\text{CO}_2$-flushed hop dropper whenever possible.

> **Brewer Tip 📋** List dry hops in both the **Hops** table (with **Use** set to `Dry Hop` so stock deducts on brew day) and inside your **Fermentation Schedule** steps (**Dry Hop Addition** column) so the exact dosing day and fermentation temperature appear on your **Brew Day Sheet**.

***

## IBU Calculation Models

**IBU (International Bitterness Units)** estimate the parts-per-million concentration of iso-alpha acids in finished beer based on hop weight, alpha-acid percentage, boil duration, wort gravity, and batch volume.

### Models in Common Use

| Model                               | Notes                                                                                                                                 |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Tinseth** (default in **beerbrew-web**) | Widely used; empirically derived; generally considered accurate for standard additions; estimates lower IBU for late/whirlpool additions |
| **Rager**                           | Tends to predict higher IBUs, especially for shorter boil times; used as an alternative check                                         |
| **Daniels**                         | Less commonly used; intermediate behavior                                                                                             |

### Important Caveats

* **IBU $\neq$ perceived bitterness.** Residual malt sweetness, beer pH, carbonation, yeast character, and hop oil composition all shape how bitter a beer tastes on the palate.
* **Late and whirlpool additions:** Tinseth's equations were originally calibrated for full-boil additions, so post-boil whirlpool IBU numbers should be treated as helpful approximations.
* **Pellet vs. whole hop:** **beerbrew-web** credits pellet hops with higher extraction efficiency than whole leaf cones.
* **Alpha acid decay (HSI):** Warm or unsealed storage steadily degrades alpha acids. Lower the **Alpha (%)** input in your recipe when using older hop lots.

> **Brewer Tip ⚙️** **beerbrew-web** defaults to the **Tinseth** equation and lets you toggle to **Rager** right from the **📋 Recipes** header. Compare both formulas when designing hop-saturated recipes, and fine-tune your hop quantities based on sensory notes from past batches.

***

## Boil Length and Special Cases

| Scenario                               | Recommended Boil Time | Reason                                                                   |
| -------------------------------------- | --------------------- | ------------------------------------------------------------------------ |
| Standard ale/lager with pale malt      | 60 minutes            | Typically sufficient for wort sanitation, hot break, and hop utilization |
| High-SMM Pilsner malt (> 50% of grist) | 90 minutes            | Reduces DMS risk                                                         |
| Parti-gyle / high-gravity recipes      | 90–120 minutes        | Extra concentration time                                                 |
| Extract brewing (full-wort boil)       | 30–60 minutes         | Sterilization achieved quickly; malt extract is pre-boiled               |
| No-chill brewing                       | 90+ minutes           | Extended DMS removal before packaging into cube/vessel                   |

***

## Troubleshooting Common Boil and Hopping Problems

| Symptom                           | Likely Cause                                       | Fix                                                                             |
| --------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------- |
| Cooked corn / vegetal aroma (DMS) | Inadequate boil vigor; slow chill; covered kettle  | Boil uncovered; chill rapidly; extend boil time for high-SMM malts              |
| Poor head retention / clarity     | Insufficient hot break protein removal             | Ensure vigorous boil; use Irish moss or Whirlfloc at 15 min; chill rapidly      |
| Harsh/rough bitterness            | Over-isomerization; oxidation; high pH             | Reduce high-alpha bittering hops; check water chemistry; limit oxygen post-boil |
| Low IBUs (beer tastes flat/sweet) | Old hops; low utilization; missed addition         | Check hop HSI; verify addition weights; recalibrate IBU factor                  |
| Hop aroma fades quickly           | Volatile oils lost post-packaging                  | Minimize oxygen at packaging; consider dry hopping closer to packaging date     |
| Boilover                          | Rapid heat-up without degassing; protein-rich wort | Watch first 10 min of boil; stir to degas; use kettle anti-foam drops           |

***

## Sources

* Palmer, J. (2017). *How to Brew* (4th ed.). Brewers Publications. Chapters 6–9.
* Briggs, D.E., Boulton, C.A., Brookes, P.A., & Stevens, R. (2004). *Brewing: Science and Practice*. Woodhead Publishing.
* Kunze, W. (2010). *Technology Brewing and Malting* (4th International ed.). VLB Berlin.
* Tinseth, G. (1995). "Glenn's Hop Utilization Numbers." *Hop Page, realbeer.com.* <http://realbeer.com/hops/research.html>
* Malowicki, M.G. (2005). *Hop Bitter Acid Isomerization and Degradation Kinetics in a Model Wort-Boiling System* (M.S. thesis). Oregon State University.
* Algazzali, V., et al. (2016). "Bitterness Intensity of Oxidized Hop Acids: Humulinones and Hulupones." *Journal of the American Society of Brewing Chemists*.
* Alchemyoverlord. "A Modified IBU Calculation (Especially for Late Hopping and Whirlpool Hops)." <https://alchemyoverlord.wordpress.com/2015/05/12/a-modified-ibu-measurement-especially-for-late-hopping/>
* American Homebrewers Association. "The Effect of Post-Boil/Whirlpool Hop Additions on Bitterness in Beer." <https://homebrewersassociation.org/how-to-brew/effect-post-boilwhirlpool-hop-additions-bitterness-beer/>

# Fermentation & Yeast Management

A practical guide to fermentation kinetics and yeast care for homebrewers using **beerbrew-web**.

Fermentation is where wort truly becomes beer. During this stage, **yeast** metabolizes fermentable sugars into alcohol and $\text{CO}_2$ while producing the esters, phenols, and organic acids that shape a beer's sensory identity. Managing yeast health and fermentation temperature is what separates average homebrew from standout beer.

***

## Fermentation Stages

### Primary Fermentation

**Primary Fermentation** is the active, vigorous stage where yeast consumes the vast majority of fermentable sugars. Activity usually kicks off within 12–24 hours of **pitching** and runs for 3–10 days depending on yeast strain, wort gravity, and temperature.

Visible indicators include:

* A thick, billowing **krausen** foam cap across the wort surface
* Steady $\text{CO}_2$ release through the airlock or blow-off tube
* A steep decline in specific **gravity**

Gravity drops most rapidly over the first 48–72 hours before tapering off as simple sugars are exhausted.

### Secondary Fermentation (Conditioning)

**Secondary Fermentation** (more accurately called **conditioning**) is a post-primary maturation period. Beer may remain in the primary fermenter or be transferred when aging for extended periods or onto fruit or oak. Conditioning accomplishes:

* Clarification as yeast cells and proteins clump together (**flocculation**) and settle
* Enzymatic cleanup of intermediate byproducts like diacetyl and acetaldehyde
* Smoothing of harsh alcohol or roast edges so flavors harmonize

Conditioning may take just a few days for fresh, hop-forward ales or several weeks to months for lagers, Belgian strong ales, and barleywines.

> **Note:** Transferring to a secondary vessel is rarely necessary for standard beers; keeping beer in the primary fermenter minimizes oxygen pickup and contamination risk.

***

## Pitch Rate

**Pitching** an appropriate cell count sets the stage for clean, complete fermentation. Underpitching stresses yeast, triggering excess esters, harsh fusel alcohols, laggy starts, and incomplete **attenuation**. Severe overpitching, on the other hand, can mute desirable yeast esters and increase autolysis risk during prolonged storage.

### Standard pitch rate guidelines (White & Zainasheff, *Yeast*, 2010)

| Beer Type                         | Pitch Rate                      |
| --------------------------------- | ------------------------------- |
| Ales (most styles)                | 0.75 million cells/mL/°Plato    |
| Ales (high-gravity, >1.075 OG)    | 1.0 million cells/mL/°Plato     |
| Lagers                            | 1.5–2.0 million cells/mL/°Plato |
| Weizen / low-gravity British ales | 0.5 million cells/mL/°Plato     |

**Practical example:** Pitching a 20 L (5.3 gal) ale batch at $1.050\text{ OG}$ ($\sim 12.4\,^\circ\text{P}$) at $0.75\text{ M cells/mL/}^\circ\text{P}$ calls for roughly **186 billion cells** — equivalent to one fresh liquid yeast pack ($\sim 100\text{ B}$ cells) grown up in a starter, or two packets of dry yeast.

> **Brewer Tip 🍺:** Review your recipe's predicted **OG** and **Batch Size (L)** in **📋 Recipes** ahead of brew day to determine your target pitch count ($0.75\text{M cells/mL/}^\circ\text{P}$ for ales, $1.5\text{–}2.0\text{M}$ for lagers). For high-gravity beers ($>1.065\text{ OG}$) or cold lager fermentations, pitch multiple fresh packs or prepare a yeast starter.

***

## Oxygenation

Before anaerobic fermentation begins, yeast cells need dissolved oxygen (DO) to synthesize sterols and unsaturated fatty acids — lipids required to build strong, permeable cell membranes for healthy reproduction.

### Target oxygen levels at pitching

| Method                                    | Dissolved O₂ Achieved                 |
| ----------------------------------------- | ------------------------------------- |
| Vigorous wort shaking/splashing           | \~2–6 ppm (process-dependent)         |
| Aquarium pump with stone (air)            | \~6–8 ppm (near air-saturation limit) |
| Pure O₂ with diffusion stone (short dose) | \~8–14 ppm (equipment/flow dependent) |

Aim for **$\sim 8\text{–}10\text{ ppm}$** dissolved oxygen for average-gravity ales, and **$\sim 10\text{–}14\text{ ppm}$** for high-gravity ales and lagers (typically achieved with pure $\text{O}_2$ and a sintered stone). Insufficient oxygen leads to sluggish fermentations and elevated fusel alcohols.

> **Important:** Never introduce oxygen once active fermentation has begun, as post-pitch oxygen rapidly stales the beer.

***

## Temperature Control

Controlling fermentation temperature is one of the most decisive ways to shape beer flavor, directly governing:

* **Ester** synthesis (fruity aromatics)
* Fusel alcohol production (hot, solventy notes when excessive)
* **Diacetyl** formation and subsequent reabsorption
* Fermentation kinetics and terminal **attenuation**

### Typical temperature ranges by style

| Style / Yeast Type          | Primary Fermentation Range                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| American ales (clean)       | 18–20 °C (64–68 °F)                                                                                         |
| British ales                | 18–22 °C (64–72 °F)                                                                                         |
| Belgian ales (ester-driven) | 20–28 °C (68–82 °F), ramped upward                                                                          |
| Hefeweizen                  | 17–22 °C (63–72 °F) — many strains show cooler fermentation = more clove/phenol, warmer = more banana/ester |
| Standard lagers             | 8–12 °C (46–54 °F)                                                                                          |
| Kveik strains               | 25–40 °C (77–104 °F)                                                                                        |

**Best practice for ales:** Pitch at the cooler end of the strain's recommended range to keep early ester and fusel production clean, then allow temperature to rise by $2\text{–}3\,^\circ\text{C}$ once fermentation passes $\sim 50\%$ attenuation to encourage full attenuation and diacetyl cleanup.

**Best practice for lagers:** Ferment cool at $9\text{–}12\,^\circ\text{C}$, then execute a **diacetyl rest** by warming to $16\text{–}18\,^\circ\text{C}$ ($60\text{–}65\,^\circ\text{F}$) for 2–3 days as fermentation nears terminal gravity before cold-lagering at $0\text{–}4\,^\circ\text{C}$ for several weeks.

> **Brewer Tip 🍺:** Use **🌡️ Fermentation** in the sidebar to create multi-step **Fermentation Profiles** combining `Hold`, `Ramp`, and `Conditioning` stages — complete with day durations, start/end temperatures ($^\circ\text{C}$), and dry-hop additions. Assign your profile from the **Fermentation Profile** menu in **📋 Recipes** so the entire schedule prints on your **Brew Day Sheet**.

***

## Flavor-Active Compounds

### Esters

**Esters** are fruity aroma compounds synthesized when yeast esterifies organic acids with alcohols. Notable examples include:

* *Isoamyl acetate* — banana aroma (signature note in German Hefeweizen)
* *Ethyl acetate* — pear-like at low levels, nail-polish solvent at high concentrations
* *Ethyl hexanoate* — red apple or anise character

Factors that boost ester formation:

* Warmer fermentation temperatures
* Underpitching yeast
* High-gravity worts
* Low dissolved oxygen at pitch

Factors that suppress ester formation:

* Cooler fermentation temperatures
* Healthy, full pitch rates
* Thorough wort oxygenation

### Phenols

Phenols contribute spicy, clove-like, or smoky aromatics. In Belgian ales and German wheat beers, desirable clove-like 4-vinyl guaiacol is produced by brewing strains carrying the active *POF+* gene. In non-phenolic styles, medicinal or band-aid phenols point to wild yeast contamination or chlorophenols formed when chlorinated brewing water reacts with malt phenols.

### Diacetyl

**Diacetyl** is a vicinal diketone (VDK) imparting a rich butter or butterscotch aroma. Yeast excretes its precursor early in fermentation and later reabsorbs and reduces it once simple sugars are depleted.

**Diacetyl problems arise from:**

* Cold-crashing before yeast finishes reabsorbing diacetyl
* Underpitching or nutritionally stressed yeast
* Lactic acid bacteria contamination (*Pediococcus* or *Lactobacillus*)
* Racking beer off the yeast cake prematurely

**Diacetyl rest:** Warming the beer to $16\text{–}18\,^\circ\text{C}$ ($60\text{–}65\,^\circ\text{F}$) for 2–3 days near the end of fermentation speeds up diacetyl reduction. It is mandatory for lagers and good insurance for English and Belgian ales.

**Diacetyl threshold:** Typically perceptible around **$0.05\text{–}0.15\text{ mg/L}$**, depending on beer style and individual sensitivity.

### Fusel Alcohols

Higher alcohols (fusels) such as propanol, isobutanol, and isoamyl alcohol arise when yeast experiences metabolic stress from:

* Excessively warm temperatures during the first 48–72 hours
* Severe underpitching
* Poor wort oxygenation
* Very high-gravity worts

While trace amounts add warming complexity to strong ales, elevated fusels taste harsh and solventy. Pitching enough healthy yeast and controlling early fermentation temperature keeps fusels in check.

***

## Attenuation

**Attenuation** measures the share of wort extract fermented by yeast between original gravity (OG) and final gravity (FG).

$$\text{Apparent Attenuation (AA\%)} = \frac{\text{OG} - \text{FG}}{\text{OG} - 1.000} \times 100$$

Typical apparent attenuation ranges:

* British ales: $65\text{–}75\%$
* American ales: $72\text{–}80\%$
* Belgian ales / saisons: $80\text{–}95\%$
* Lagers: $75\text{–}85\%$

Hitting a stable terminal gravity confirms that fermentation has finished. Never bottle or keg beer that has not stabilized at its expected FG — ongoing fermentation inside sealed containers causes severe overcarbonation and dangerous bottle bombs.

> **Brewer Tip 🍺:** **beerbrew-web** estimates your expected **Final Gravity (FG)** directly from your fermentables and yeast attenuation figure. If you track fermentation progress with a refractometer, convert your Brix readings into accurate specific gravity using **🧮 Tools → 2. Refractometer Alcohol Correction** (Sean Terrill cubic formula).

***

## Pressure Fermentation

Fermenting under moderate pressure (usually **$\sim 5\text{–}15\text{ PSI}$ / $0.3\text{–}1.0\text{ bar}$** in stainless conicals or corny kegs) provides several benefits:

* **Suppressed ester and fusel formation** — enabling cleaner fermentations at warmer ambient temperatures
* **Passive carbonation** — trapping fermentation $\text{CO}_2$ so beer finishes partially carbonated
* **Reduced oxygen exposure** — maintaining positive internal pressure throughout fermentation and transfers

Excessive pressure above $\sim 15\text{ PSI}$ can inhibit yeast growth, so always ferment in pressure-rated vessels equipped with a calibrated spunding valve or pressure-relief valve (PRV).

***

## Fermentation Monitoring & Troubleshooting

### Common signs and causes

| Observation                     | Possible Cause                                                          | Action                                                                               |
| ------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| No activity within 24 hours     | Low temperature, dead/old yeast, insufficient pitch                     | Verify fermenter temp is in yeast range; oxygenate/re-pitch if needed                |
| Gravity stuck above expected FG | Underattenuating yeast, poor oxygenation, excess unconvertible dextrins | Rouse yeast, warm temperature, pitch active yeast                                    |
| Buttery/butterscotch aroma      | High diacetyl                                                           | Diacetyl rest at 18 °C for 48–72 h                                                   |
| Rotten egg / sulfur smell       | Hydrogen sulfide ($\text{H}_2\text{S}$), common in lagers and some ales                  | Usually dissipates; purge $\text{CO}_2$ gently; ensure adequate nutrition (DAP/yeast nutrient) |
| Excessive fruity esters         | High fermentation temp, under-pitch                                     | Prevention in future; reduce temp early                                              |
| Turbid, persistent haze         | Yeast still in suspension                                               | Cold crash 0–4 °C; allow more conditioning time                                      |

> **Brewer Tip 🍺:** Document fermentation milestones, actual OG/FG numbers, and sensory observations inside **Brewer's Notes** and **📓 Brew Logs**. Comparing real terminal gravities against predictions helps calibrate yeast attenuation figures across batches.

***

## Cold Crash

**Cold crashing** — chilling fermented beer down to $0\text{–}4\,^\circ\text{C}$ ($32\text{–}39\,^\circ\text{F}$) for 24–72 hours — accelerates **flocculation**, dropping suspended yeast and proteins to the bottom of the fermenter. It also:

* Minimizes chill haze before packaging
* Yields brighter beer with less sediment in bottles or kegs
* Helps preserve dissolved $\text{CO}_2$ in sealed, pressure-capable fermenters

Verify that fermentation is completely finished (stable FG) before dropping temperatures.

> **Brewer Tip 🍺:** Include a closing `Conditioning` stage at $0\text{–}2\,^\circ\text{C}$ for 2–3 days inside your **🌡️ Fermentation** profile so your cold crash is scheduled right alongside your primary fermentation steps on the **Brew Day Sheet**.

***

## Sources

* White, C. & Zainasheff, J. (2010). *Yeast: The Practical Guide to Beer Fermentation*. Brewers Publications.
* Palmer, J. (2017). *How to Brew* (4th ed.). Brewers Publications.
* Kunze, W. (2014). *Technology Brewing and Malting* (5th ed.). VLB Berlin.
* American Homebrewers Association — [Determining Proper Yeast Pitch Rates](https://homebrewersassociation.org/how-to-brew/determining-proper-yeast-pitch-rates/)
* Wyeast Laboratories — [Oxygenation & Aeration](https://wyeastlab.com/resource/professional-oxygenation-aeration/)
* Escarpment Laboratories — [Pressure Fermentation and Its Impacts On Yeast](https://knowledge.escarpmentlabs.com/article/307-fermenting-under-presssure)
* Escarpment Laboratories — [Best Practices: Lager Fermentation](https://knowledge.escarpmentlabs.com/article/85-lager-advice)
* Fix, G. & Fix, L. (1997). *An Analysis of Brewing Techniques*. Brewers Publications.

# Packaging, Carbonation & Oxygen Control

A practical handbook on bottling, kegging, carbonation math, and cold-side oxygen control for homebrewers using **beerbrew-web**.

Packaging is the final — and most vulnerable — phase of brewing. Careful execution locks in fresh hop aromatics, clean flavor, and lively carbonation, whereas sloppy handling introduces dissolved oxygen, uneven carbonation, or microbial spoilage that can undo weeks of work.

This section explores bottling, kegging, priming calculations, style carbonation targets, dissolved oxygen (DO) limits, and setting up Carbonation Profiles in **beerbrew-web**.

***

## Before You Package

Never package beer until fermentation has completely finished. Bottling while fermentable sugars remain leads to gushing bottles and potential glass breakage.

**Checklist before packaging:**

* [ ] Gravity is stable at or near predicted FG (two readings 24–48 h apart with no change)
* [ ] Diacetyl rest completed (if required)
* [ ] **Cold crash** completed (optional but recommended for clarity)
* [ ] All equipment cleaned and sanitized
* [ ] Oxygen exposure minimized throughout transfer

> **Brewer Tip 🍺:** Check your final hydrometer measurement (adjusted via **🧮 Tools → 4. Hydrometer Temperature Correction**) against your recipe's expected **FG** prior to packaging, ensuring two identical readings 24–48 hours apart.

***

## Bottling vs Kegging

### Bottling

**Bottling** relies on a controlled secondary fermentation inside each sealed bottle using **priming sugar** to generate natural $\text{CO}_2$ carbonation.

**Advantages:**

* Minimal upfront equipment investment
* Easy to transport, store, and share with friends
* Accessible workflow for new brewers

**Disadvantages:**

* Time-consuming cleaning, filling, and capping per bottle
* Greater exposure to oxygen during racking and bottle filling
* Requires 1–3 weeks of warm conditioning before drinking
* Risk of uneven carbonation if priming syrup is poorly mixed

**Common bottle types:**

* 330 mL / 12 oz — standard single-serve bottle
* 500 mL — traditional European bottle size
* 750 mL / 22 oz — bombers, sour ales, and sharing bottles
* Swing-top / Grolsch bottles — convenient reusable closures (check rubber washers before each fill)

### Kegging

**Kegging** offers unmatched speed, carbonation precision, and oxygen exclusion by transferring finished beer into a $\text{CO}_2$-purged Cornelius (Corny) keg.

**Advantages:**

* Superior oxygen protection when vessels and lines are purged with $\text{CO}_2$
* Ready to drink within hours (burst carbonation) or a week (set-and-forget)
* Instant draft pours with zero bottle conditioning delay
* Clear, sediment-free pours once the first pint clears the dip tube
* Simple pressure adjustments to dial carbonation up or down

**Disadvantages:**

* Higher initial cost for kegs, regulator, $\text{CO}_2$ cylinder, and draft hardware
* Less portable without counter-pressure fillers or growlers
* Requires dedicated kegerator or keezer refrigeration

***

## Carbonation Targets

Carbonation is quantified in **volumes of $\text{CO}_2$** — the ratio of dissolved gas volume (at $0\,^\circ\text{C}$ and $1\text{ atm}$) to beer volume. For example, $2.5\text{ volumes}$ means $2.5\text{ L}$ of $\text{CO}_2$ gas dissolved per $1\text{ L}$ of beer.

### Style carbonation ranges

| Style                                                 | Volumes $\text{CO}_2$              |
| ----------------------------------------------------- | ------------------------ |
| Cask ales / Real ales                                 | 0.8–1.5                  |
| American stout, porter                                | 1.7–2.3                  |
| American amber, pale ale                              | 2.2–2.7                  |
| American IPA, DIPA                                    | 2.2–2.6                  |
| Hefeweizen                                            | 3.0–4.5                  |
| Pilsner, lager                                        | 2.4–2.7                  |
| Belgian witbier                                       | 2.7–3.3                  |
| Saison                                                | 2.8–3.5                  |
| Lambic / Gueuze                                       | 2.5–4.0                  |
| Specialty bière de champagne / highly sparkling beers | 4.0+ (specialty process) |

*Source: Adapted from BJCP Style Guidelines (2021) and Noonan (1996).*

Most standard ales fall comfortably around **2.3–2.5 volumes**; when designing a specific style, aim near the middle of its guideline range.

> **Safety note:** Standard glass beer bottles are rated for roughly $2.2\text{–}3.0\text{ volumes}$ of $\text{CO}_2$. Higher carbonation levels demand thick-walled Belgian or champagne bottles with cork-and-cage or heavy crown closures.

***

## Bottle Conditioning (Priming Sugar)

### How it works

Mixing a measured dose of **priming sugar** into flat fermented beer just before capping lets remaining suspended yeast ferment that sugar inside the sealed bottle, trapping the resulting $\text{CO}_2$ in solution.

### Residual $\text{CO}_2$

Fermented beer already holds some dissolved $\text{CO}_2$, determined by the **peak temperature the beer reached during or after fermentation** (not necessarily its temperature on bottling day). Accurate priming formulas subtract this residual $\text{CO}_2$ so you do not overprime.

### Priming sugar calculation (simplified)

The core relationship:

```
Sugar needed = (Target CO₂ − Residual CO₂) × Batch volume × Sugar factor
```

Common priming sugars vary in fermentability and moisture content:

| Priming Sugar                       | Approximate equivalent to 1 g Sucrose        |
| ----------------------------------- | -------------------------------------------- |
| Sucrose (table sugar)               | 1.0 g                                        |
| Dextrose / corn sugar (monohydrate) | 1.09 g                                       |
| Dry Malt Extract (DME)              | \~1.47 g                                     |
| Honey                               | \~1.25 g (variable — depends on composition) |

> **Brewer Tip 🍺:** Navigate to **🫧 Carbonation** (or open the **Fermentation & Carbonation** tab in **📋 Recipes**) and select **Priming Sugar (Bottle / Keg)**. Input your **Target CO₂ (Vol)**, **Temp (°C)**, and **Priming Agent** (`Dextrose`, `Sucrose`, or `DME`) — **beerbrew-web** automatically computes both `g/L` and total grams for your batch while accounting for residual $\text{CO}_2$. You can also run standalone priming math in **🧮 Tools → 3. Priming Sugar Carbonation**.

### Priming best practices

1. **Dissolve priming sugar** in $\sim 250\text{ mL}$ of boiling water for 5 minutes, cool slightly, and pour into the bottling bucket *before* racking beer onto it so the swirling flow mixes the syrup evenly.
2. **Condition at room temperature** — $18\text{–}22\,^\circ\text{C}$ ($64\text{–}72\,^\circ\text{F}$) — for 2–3 weeks until full carbonation develops.
3. **Test a bottle** after 1 and 2 weeks by chilling a single bottle thoroughly before opening to evaluate carbonation.
4. **Chill before opening** — cold beer holds $\text{CO}_2$ in solution far better than warm beer, preventing gushing foam.

***

## Force Carbonation (Kegging)

Force carbonation dissolves pressurized $\text{CO}_2$ directly into cold kegged beer using one of two methods:

### 1. Set-and-forget

Set your $\text{CO}_2$ regulator to the exact serving pressure matching your fridge temperature and target $\text{CO}_2$ volumes, then leave the keg connected for **$\sim 7\text{–}14\text{ days}$**. Gas absorbs gradually without any risk of overcarbonating.

### 2. Fast carbonation (burst carbonation)

Boost regulator pressure to **$\sim 20\text{–}30\text{ PSI}$ for 12–36 hours**, then bleed off excess headspace pressure and reset the regulator to normal serving pressure. While fast, burst carbonation can easily overshoot your target if left too long.

> **Caution:** Monitor burst-carbonated kegs closely — venting an overcarbonated keg takes several days of repeated pressure relief.

### $\text{CO}_2$ pressure / temperature chart

Equilibrium carbonation pressure increases with beer temperature according to Henry's Law:

| Serving Temp  | \~2.3 vol $\text{CO}_2$ | \~2.5 vol $\text{CO}_2$ | \~3.0 vol $\text{CO}_2$ |
| ------------- | ------------- | ------------- | ------------- |
| 1 °C (34 °F)  | \~7 PSI       | \~9 PSI       | \~14 PSI      |
| 4 °C (39 °F)  | \~10 PSI      | \~12 PSI      | \~17 PSI      |
| 7 °C (45 °F)  | \~13 PSI      | \~15 PSI      | \~21 PSI      |
| 10 °C (50 °F) | \~15 PSI      | \~18 PSI      | \~24 PSI      |

*Values are approximate. Use a dedicated $\text{CO}_2$ chart or calculator for precision.*

> **Brewer Tip 🍺:** For draft kegging, set up a **Forced Carbonation (Keg / CO₂)** profile in **🫧 Carbonation**. Enter your kegerator temperature ($^\circ\text{C}$) and desired $\text{CO}_2$ volumes, and **beerbrew-web** calculates the exact regulator pressure in both **PSI** and **bar** using the Zahm & Nagel / ASBC equation.

***

## Dissolved Oxygen & Oxidation Control

Once fermentation finishes, oxygen becomes beer's worst enemy. Even trace amounts of dissolved oxygen (DO) picked up during transfers or packaging trigger:

* **Staling** — wet cardboard, papery, or oxidized sherry notes
* Unwanted color darkening
* Rapid loss of vibrant hop aroma (especially devastating in IPAs and NEIPAs)
* Shorter shelf stability

### DO thresholds

| DO Level            | Impact                                         |
| ------------------- | ---------------------------------------------- |
| < 50 ppb (0.05 ppm) | Excellent (common commercial target zone)      |
| 50–100 ppb          | Good, but hop-forward beers can fade faster    |
| 100–250 ppb         | Elevated risk of detectable staling over weeks |
| > 250 ppb           | High risk of rapid staling                     |

Because homebrewers rarely own dissolved-oxygen meters, disciplined oxygen-exclusion habits are your best defense.

### Oxygen control best practices

**Transfers:**

* Flush receiving vessels with $\text{CO}_2$ prior to transferring beer
* Fill from the bottom up — keep tubing submerged below the liquid surface to prevent splashing
* Purge transfer lines with $\text{CO}_2$ or Star San before starting flow

**Kegging:**

* Purge empty kegs with $\text{CO}_2$ (pressurize and vent 3–4 cycles) before filling
* Transfer beer into the keg through the liquid-out dip tube rather than splashing through the open lid
* Purge the keg headspace several times with $\text{CO}_2$ immediately after sealing

**Bottling:**

* Fill bottles from the bottom upward using a spring-loaded bottling wand
* Fill right to the rim so removing the wand leaves an ideal headspace volume
* Cap each bottle immediately after filling
* Avoid splashing or pouring between intermediate vessels

**Dry hopping:**

* Opening a fermenter post-fermentation lets air enter the headspace
* Flush dry hops with $\text{CO}_2$ before adding whenever possible
* Use $\text{CO}_2$-purged hop droppers or closed-transfer setups for oxygen-sensitive styles

> **Brewer Tip 🍺:** Note your packaging date, $\text{CO}_2$ purging steps, and transfer method inside **📓 Brew Logs** or **Brewer's Notes** so you can connect cold-side practices with freshness weeks later.

***

## Spunding (Natural Carbonation in Kegs)

**Spunding** involves fitting a pressure-regulating spunding valve onto a pressure-rated fermenter or keg near the end of fermentation so naturally generated $\text{CO}_2$ carbonates the beer in place. Benefits include:

* No priming sugar required
* Dense, fine-bubbled natural carbonation
* Near-zero oxygen exposure since the vessel stays sealed under positive pressure

**How to spund:**

1. Track gravity closely as fermentation nears completion.
2. With roughly $3\text{–}5\text{ gravity points}$ left above expected FG, attach a spunding valve dialed to your target carbonation pressure.
3. Let yeast finish attenuating under pressure.

Use the same temperature-to-pressure relationship as force carbonation when setting your spunding valve at fermentation temperature.

***

## Common Packaging Problems

| Problem                 | Likely Cause                                                        | Solution                                                       |
| ----------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------- |
| Flat beer (bottles)     | Too little priming sugar; yeast not viable; bottled at too low temp | Re-prime with dissolved sugar; store warmer                    |
| Overcarbonated bottles  | Too much priming sugar; bottled before FG reached                   | Open carefully; refrigerate; consider re-sealing after venting |
| Gushing bottles         | Wild yeast or bacterial contamination                               | Sanitation review; discard batch if severe                     |
| Oxidized/stale flavor   | Oxygen introduction during transfer or packaging                    | Review cold-side oxygen practices; purge vessels with $\text{CO}_2$      |
| Foam in keg (excessive) | Over-carbonated; serving lines too short/warm; dirty lines          | Reduce pressure; use longer serving lines; clean keg lines     |
| Sediment in bottles     | Bottle conditioning yeast — normal                                  | Chill and pour carefully; leave last few mL in bottle          |

***

## Packaging Checklist

Run through this checklist on every packaging day:

* [ ] Gravity confirmed stable at target FG
* [ ] Beer has completed diacetyl rest if needed
* [ ] All equipment cleaned and sanitized (bottles, caps, keg, lines, filler)
* [ ] $\text{CO}_2$ tank has sufficient pressure
* [ ] Receiving vessel purged with $\text{CO}_2$
* [ ] Priming sugar calculated and prepared (bottling) or regulator set (kegging)
* [ ] Transfer hoses flushed / purged
* [ ] Final gravity, volume, and packaging notes logged in **📓 Brew Logs**

> **Brewer Tip 🍺:** Linking a **Carbonation Profile** to your recipe fills out **Section 5: Carbonation & Packaging** on your **Printable Brew Day Sheet** automatically, listing either your target keg pressure (PSI/bar) or the exact priming sugar weight needed for your batch.

***

## Sources

* Palmer, J. (2017). *How to Brew* (4th ed.). Brewers Publications.
* Noonan, G. (1996). *New Brewing Lager Beer*. Brewers Publications.
* Kunze, W. (2014). *Technology Brewing and Malting* (5th ed.). VLB Berlin.
* BJCP Style Guidelines (2021). [BJCP Style Guidelines](https://www.bjcp.org/bjcp-style-guidelines/)
* American Homebrewers Association — [A Balancing Act: How to Balance Your Home Draft System](https://homebrewersassociation.org/how-to-brew/a-balancing-act-how-to-balance-your-home-draft-system/)
* Brewers Association — [Draught Beer Carbonation](https://cdn.brewersassociation.org/wp-content/uploads/2021/07/22093927/Facts_About_Draught_Beer_Carbonation.pdf)
* Fix, G. (1999). *Principles of Brewing Science* (2nd ed.). Brewers Publications.
* Huige, N. & Henke, J. (1994). "Dissolved oxygen and beer quality." *MBAA Technical Quarterly*, 31(1).

# Quality Control & Off-Flavor Diagnostics

Structured sensory evaluation, common off-flavor descriptors and thresholds, root-cause tables, and using **beerbrew-web** logs to pinpoint brewing faults.

Brewing consistently great beer requires a systematic way to taste your results and trace any sensory flaws back to their process origin. This section walks through a repeatable tasting routine, catalogs major brewing off-flavors and their sensory thresholds, and maps defects directly to process stages.

***

## Sensory Evaluation: A Structured Approach

Following a consistent evaluation routine removes guesswork when assessing your beer.

### 1. Environment

* Evaluate beer in a bright, odor-free room away from kitchen aromas, smoke, or fragrances.
* Pour into clean, room-temperature glassware free of soap film or rinse residue.
* Avoid eating or drinking strongly flavored foods for at least 30 minutes prior to tasting.

### 2. Appearance

* Inspect clarity (brilliant, hazy, or turbid), color (against your recipe's target SRM/EBC), and foam density and retention.
* Cloudiness may indicate reversible chill haze, protein haze, suspended yeast, or microbial spoilage.

### 3. Aroma

* Gently swirl the glass and take a short sniff right after pouring to catch volatile malt, hop, ester, sulfur, or fault aromas.
* Because human olfactory receptors fatigue rapidly, pay close attention to your very first impression.

### 4. Taste

* Take a moderate sip and let it coat your entire tongue, noting sweetness, bitterness, acidity, saltiness, and any unexpected flavors.
* Judge overall balance between malt richness and hop bitterness relative to your target BU:GU ratio.

### 5. Mouthfeel & Finish

* Assess body (light, medium, or full), carbonation bite, alcohol warmth, astringency, and how cleanly the finish lingers.

### 6. Document Everything

* Record your sensory impressions right away while aromas and flavors are fresh in memory.

> **Brewer Tip:** Log structured tasting observations inside **📓 Brew Logs** once a batch finishes conditioning. Reviewing notes across multiple sessions reveals recurring trends — for instance, noticing buttery diacetyl in cool-fermented batches signals the need for a warmer diacetyl rest step in your **Fermentation Profile**.

***

## Common Off-Flavors: Descriptors, Thresholds & Root Causes

### Diacetyl

| Attribute       | Detail                                                                                                                                                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descriptor**  | Butter, butterscotch, toffee                                                                                                                                                      |
| **Threshold**   | Often cited around \~0.05–0.15 mg/L (varies by beer matrix and taster sensitivity)                                                                                                |
| **Root causes** | Insufficient diacetyl rest; premature cold crash; severe under-pitching; high fermentation temperature followed by rapid chilling; *Pediococcus* or *Lactobacillus* contamination |
| **Fix**         | Raise temperature to 18–20 °C (64–68 °F) for 48–72 h before crashing; ensure adequate pitch rate; verify sanitation                                                               |

Yeast naturally forms diacetyl precursors early in fermentation and reabsorbs them during late conditioning; chilling the beer before cleanup finishes is the primary culprit in homebrew.

***

### Acetaldehyde

| Attribute       | Detail                                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Descriptor**  | Green apple, fresh-cut pumpkin, cidery                                                                                                           |
| **Threshold**   | \~10–25 mg/L                                                                                                                                     |
| **Root causes** | Incomplete fermentation; beer removed from yeast too soon; insufficient conditioning time; yeast stress                                          |
| **Fix**         | Allow more conditioning time in contact with yeast; slightly raise temperature (diacetyl rest helps here too); do not rack off yeast prematurely |

Acetaldehyde is a normal metabolic intermediate on the pathway to ethanol; giving healthy yeast adequate warm conditioning time resolves most occurrences.

***

### DMS (Dimethyl Sulfide)

| Attribute       | Detail                                                                                                                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descriptor**  | Cooked corn, creamed corn, cooked vegetables                                                                                                                                                                    |
| **Threshold**   | \~30–50 µg/L (style-dependent; lagers are more sensitive)                                                                                                                                                       |
| **Root causes** | Covered kettle during boil (prevents evaporation of DMS precursor, S-methylmethionine); insufficient boil vigor; slow chilling after knockout; use of high-SMM malt (pale lager malt) without adequate boil-off |
| **Fix**         | Boil uncovered with vigorous rolling boil; target 10–12% evaporation per hour; chill wort rapidly; avoid covering kettle during whirlpool stand                                                                 |

***

### Hydrogen Sulfide ($\text{H}_2\text{S}$)

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

> **Note:** Spicy, clove-like phenols are authentic and desirable in German Hefeweizens and Belgian ales fermented with *POF+* yeast strains.

***

### Oxidation

| Attribute       | Detail                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descriptor**  | Cardboard, papery, stale, sherry-like (trans-2-nonenal), honey-like                                                                                           |
| **Root causes** | Oxygen pickup post-fermentation: splashing during transfer, headspace in packaging, improper purging of kegs/bottles, repeated dry-hopping with $\text{O}_2$ exposure   |
| **Fix**         | Minimize splashing at all cold-side transfers; purge vessels with $\text{CO}_2$; minimize headspace; use closed transfers; consider oxygen-scavenging caps for bottling |

Because oxidative staling cannot be reversed once formed, strict oxygen exclusion is essential.

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
| **Root causes** | *Lactobacillus* or *Pediococcus* contamination $\rightarrow$ lactic acid; *Acetobacter* contamination + oxygen $\rightarrow$ acetic acid (vinegar); wild yeast (*Brettanomyces*) producing acetic and other acids                                                                            |
| **Fix**         | Rigorous sanitation (see **Cleaning, Sanitation & Safety**); identify and replace contaminated equipment (plastic scratches harbor bacteria); prevent oxygen exposure during fermentation |

> **Note:** Controlled souring methods (such as kettle souring or mixed-culture aging) differ from accidental microbial spoilage.

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
| **Packaging**            | Oxidation, flat beer, over-carbonation   | $\text{O}_2$ exposure; priming sugar calc; FG confirmed stable                                        |
| **Storage/serving**      | Lightstruck, oxidation, staling          | Light exposure; storage temperature; $\text{O}_2$ ingress                                             |
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

Individual sensitivity, sensory training, and beer matrix interactions can shift detection thresholds significantly, so view these numbers as practical benchmarks rather than strict limits. Practicing with standardized flavor-spiking kits (such as Siebel, FlavorActiV, or Aroxa) is one of the fastest ways to sharpen your palate.

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

# Cleaning, Sanitation & Safety

Distinguishing cleaning from sanitizing, proper chemical dilution and contact times, material compatibility, hygiene checkpoints, and brew-day safety.

Maintaining spotless, sanitary gear is the single most reliable quality control practice in brewing. Grasping the distinction between cleaning and sanitizing — and executing both in order — prevents the vast majority of microbial spoilage and ruined batches.

***

## Cleaning vs. Sanitizing: A Critical Distinction

Cleaning and sanitizing are two distinct steps performed sequentially: no sanitizer can penetrate physical soil to kill microbes underneath.

| Step           | Purpose                                                            | Agents                                                         |
| -------------- | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| **Cleaning**   | Remove organic soil: wort, yeast, trub, hop debris, proteins, fats | PBW, OxiClean Free, caustic soda, hot water                    |
| **Sanitizing** | Reduce microbial load to a safe level on a clean surface           | Star San, Iodophor, bleach (when correctly diluted and rinsed) |

> Sanitizer applied to a dirty surface cannot work properly because organic films shield bacteria and wild yeast while deactivating chemical sanitizers.

***

## Common Cleaning Agents

### PBW (Powdered Brewery Wash)

* **Type:** Alkaline, oxidizing cleaner (sodium percarbonate + sodium metasilicate blend)
* **Concentration:** $\sim 14\text{–}28\text{ g}$ per $4\text{ L}$ ($1\text{–}2\text{ oz}$ per US gallon) for standard soiling; up to $42\text{ g/4 L}$ for baked-on deposits
* **Temperature:** More effective warm; $40\text{–}60\,^\circ\text{C}$ ($100\text{–}140\,^\circ\text{F}$) speeds action significantly. Works at room temperature with longer soak.
* **Contact time:** 20–30 min soak for light soiling; overnight for heavy deposits
* **Rinse:** Rinse thoroughly with clean water before sanitizing
* **Compatibility:** Safe for stainless steel, glass, plastic, rubber. Do not use on soft metals (aluminium, copper — will cause pitting).
* **Notes:** Biodegradable; wear eye protection and gloves when handling concentrates or prolonged soaks

### OxiClean Free

* **Type:** Sodium percarbonate-based cleaner (fragrance/surfactant-free variant only)
* **Concentration:** $\sim 14\text{ g}$ per $4\text{ L}$ ($1\text{ oz/US gal}$)
* **Notes:** Economical substitute for PBW; effective for basic cleaning but lacks the silicate package optimizing it for stainless. Do not use scented or standard OxiClean (surfactant residue).

### Caustic Soda ($\text{NaOH}$ / Lye)

* **Type:** Strong alkaline cleaner
* **Use case:** Industrial CIP (Clean-in-Place) in larger-scale breweries; not typically used in homebrewing
* **Safety:** Extremely corrosive. Causes severe chemical burns on skin and eyes. Requires full PPE (gloves, goggles, face shield, chemical-resistant apron).

### Hot Water

* Helpful for pre-rinsing and loosening soils, but ineffective on its own as a sanitizer unless held above $77\,^\circ\text{C}$ ($170\,^\circ\text{F}$) for extended durations.

***

## Common Sanitizers

### Star San (No-Rinse Phosphoric Acid Blend)

* **Type:** Acid-based no-rinse sanitizer (phosphoric acid + dodecylbenzene sulfonic acid)
* **Concentration:** $1\text{ mL}$ per $1\text{ L}$ of water (approximately $1\text{ oz}$ per $5\text{ US gallons}$)
* **Contact time:** 1–2 minutes of full surface contact
* **Rinse:** **No rinse required.** Residual sanitizer at use concentration is harmless and flavorless at these levels.
* **Foam:** Foam is normal and harmless — the common phrase among homebrewers is *"don't fear the foam."* The active compound is in the liquid, not destroyed by foam.
* **pH:** Use concentration should be below pH $3.0$ for efficacy; hard water raises pH and reduces effectiveness. Mix with distilled or RO water if local water is very hard.
* **Shelf life (diluted):** Follow manufacturer guidance. In practice, many brewers either mix fresh each session or verify reuse by checking both clarity and pH ($<3.0$)
* **Compatibility:** Safe for stainless steel, glass, plastic (all types), rubber. Do not use on soft metals.

### Iodophor

* **Type:** Iodine-based sanitizer (iodophor = iodine + carrier)
* **Concentration:** Typically $\sim 12.5\text{ ppm}$ available iodine (often around $0.5\text{ oz}$ per $5\text{ US gal}$, depending on product strength). Always follow the product label
* **Contact time:** 2 minutes minimum
* **Rinse:** At correct concentration, no rinse required. Higher concentrations require rinsing and will stain.
* **Notes:** Can stain plastic permanently with repeated use. Beer-brown coloration of solution indicates active; colorless solution is exhausted.

### Potassium Metabisulfite (K-Meta)

* **Type:** Sulfite compound mainly used for water treatment (chlorine/chloramine removal) and in wine/cider workflows
* **Brewery note:** Not typically relied on as a primary no-rinse sanitizer for beer cold-side equipment
* **Water treatment rule of thumb:** $\sim 1$ Campden tablet per $\sim 75\text{ L}$ ($20\text{ US gal}$) of brewing water for typical municipal chloramine/chlorine levels; adjust based on water report and product label

### Bleach (Sodium Hypochlorite)

* **Type:** Oxidizing sanitizer
* **Concentration:** Target $50\text{–}100\text{ ppm}$ available chlorine (for $5\text{–}6\%$ unscented household bleach, roughly $4\text{–}8\text{ mL}$ per $4\text{ L}$ water; exact dose depends on bleach strength)
* **Contact time:** 10–20 minutes
* **Rinse:** **Must rinse thoroughly** with clean water. Chlorine residue can create chlorophenols (medicinal off-flavor) on contact with wort phenolics.
* **Notes:** Loses potency rapidly in hot water or organic-contaminated solution; store bleach solutions away from light. Do not mix with acid sanitizers (produces chlorine gas).

***

## Process Hygiene Checkpoints

Use these hygiene checkpoints throughout every brew session:

### Pre-Brew

* [ ] All equipment cleaned and visually free of organic residue from previous use
* [ ] Fermenter inspected for scratches, cracks, and persistent odors (replace damaged plastic)
* [ ] Water treated for chloramine if required (Campden tablet)
* [ ] All rubber gaskets/O-rings cleaned and sanitized

### Post-Boil & Transfer

* [ ] All cold-side equipment (fermenter, auto-siphon, tubing, airlock) sanitized immediately before use
* [ ] Minimize splashing during transfer (oxidation risk + contamination risk)
* [ ] Yeast pitched hygienically from sanitized vessel

### Fermentation

* [ ] Airlock filled with sanitizer solution (Star San) rather than water (prevents blow-back contamination)
* [ ] Any sampling equipment (thief, wine thief, hydrometer) sanitized before each use
* [ ] Temperature probe (if used) sanitized before insertion (follow probe manufacturer guidance for compatible sanitizers)

### Post-Fermentation / Packaging

* [ ] All packaging equipment (keg, bottles, caps, bottling wand) cleaned then sanitized
* [ ] Keg purged with $\text{CO}_2$ before filling
* [ ] Bottles visually inspected before use; discard any with chips, cracks, or permanent odors

***

## Material Compatibility Summary

| Material                            | Alkaline Cleaners (PBW) | Acid Sanitizers (Star San) | Bleach            | Notes                                                           |
| ----------------------------------- | ----------------------- | -------------------------- | ----------------- | --------------------------------------------------------------- |
| Stainless steel                     | ✅                       | ✅                          | ✅ (short contact) | Avoid chloride-heavy cleaners long-term (pitting risk)          |
| Glass                               | ✅                       | ✅                          | ✅                 | No concerns                                                     |
| Food-grade plastic (HDPE, LDPE, PP) | ✅                       | ✅                          | ✅                 | Replace when scratched                                          |
| Silicone                            | ✅                       | ✅                          | ✅                 | Highly resistant                                                |
| Rubber (gaskets, O-rings)           | ✅                       | ✅                          | ⚠️                | Bleach can degrade rubber over time                             |
| Aluminium                           | ❌                       | ⚠️                         | ⚠️                | Alkaline cleaners cause pitting; avoid                          |
| Copper                              | ❌                       | ⚠️                         | ⚠️                | Alkaline cleaners cause pitting; use specialized copper cleaner |

***

## Brewery Safety Guidance

### Chemical Handling

* Read and follow the manufacturer's Safety Data Sheet (SDS) for every cleaner and sanitizer on hand.
* **Always add concentrated chemicals to water — never water to chemical** — to prevent hazardous heat splashes.
* Keep all brewery chemicals stored away from food items, children, and pets.
* Never combine chlorine bleach with acid sanitizers or cleaners, as the reaction releases toxic chlorine gas.
* Store propane tanks and pressurized $\text{CO}_2$ cylinders upright in cool, well-ventilated spaces away from heat or sparks.

### Personal Protective Equipment (PPE)

* **Minimum recommended:** Protective glasses or splash goggles whenever mixing or pouring chemical solutions, paired with chemical-resistant nitrile gloves.
* **Strongly recommended for caustic/strong acid:** Full face shield, heavy chemical gloves, and a protective apron.

### Hot Liquids

* Scalds from hot wort and boiling water represent the most common brew-day injury; wear insulated, liquid-proof gloves when handling hot vessels or hoses.
* Keep brewery floors dry and unobstructed to prevent slips around hot kettles.
* Stay attentive during the boil, especially during the initial hot break when boilovers happen fastest.
* Cool large batches in place with a wort chiller rather than lifting heavy pots of boiling liquid into an ice bath.

### Ergonomics

* Because $20\text{ L}$ ($5\text{ gal}$) of hot wort weighs roughly $20\text{ kg}$ ($44\text{ lb}$), rely on pumps, valves, or gravity siphons instead of manual lifting.
* Lift heavy grain sacks and filled fermenters with your legs while keeping your back straight.

### Electrical Safety

* Always plug electric brewing elements and pumps into outlets protected by a tested RCD/GFCI (Ground Fault Circuit Interrupter).
* Keep plugs, controllers, and power cords elevated and dry.
* Never power on an electric heating element unless it is completely submerged in liquid.

### Gas & Ventilation

* Because $\text{CO}_2$ is invisible, odorless, and heavier than air, active fermentations and keg-purging operations must always take place in well-ventilated spaces.
* Never operate propane burners indoors or inside enclosed garages; use them strictly outdoors with ample airflow.

***

## Cleaning & Sanitation Schedule

| Frequency       | Task                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| After every use | Rinse equipment immediately with cold water (prevents protein baking on). Clean with PBW within 24 hours. |
| Before each use | Sanitize all cold-side equipment immediately before contact with wort or beer.                            |
| Monthly         | Deep-clean tap lines, connections, and draft equipment. Inspect gaskets for wear.                         |
| Annually        | Inspect and replace aged plastic tubing, rubber gaskets, and any cracked plastic vessels.                 |

***

> **Brewer Tip:** Keep track of your cleaners and sanitizers (like PBW and Star San) in **📦 Inventory** under the `Misc` category and include them in your recipe's **Miscs & Water Salts** list so they appear on your **Printable Brew Day Sheet** and deduct automatically when you click **🍺 Brew It (Deduct Stock)**.

***

## Sources

* Palmer, J.J. (2017). *How to Brew: Everything You Need to Know to Brew Great Beer Every Time* (4th ed.). Brewers Publications.
* Briggs, D.E., Boulton, C.A., Brookes, P.A., & Stevens, R. (2004). *Brewing: Science and Practice*. Woodhead Publishing.
* Bamforth, C.W. (2006). *Scientific Principles of Malting and Brewing*. American Society of Brewing Chemists.
* White Labs Technical Bulletin: Brewery Sanitation Best Practices.
* Five Star Chemicals: Star San product page, technical sheet, and SDS.
* U.S. EPA registered label resources for BTF Iodophor Sanitizer (product label directions/concentrations).
* U.S. FDA Food Code (chemical sanitizer concentration guidance for food-contact surfaces).
* OSHA General Industry Standards (29 CFR 1910): Hazard Communication and PPE requirements.
* National Fire Protection Association (NFPA) 58: Liquefied Petroleum Gas Code (propane storage/use).

# Troubleshooting Playbooks

Step-by-step diagnostic playbooks for common brewing issues, featuring root-cause decision trees, immediate fixes, and long-term prevention.

Each playbook below outlines how to verify a brewing problem, isolate its most likely cause in order of probability, stabilize the current batch, and prevent a repeat on your next brew day.

For sensory defect analysis, refer to **Quality Control & Off-Flavor Diagnostics**.

> **Brewer Tip:** Recording target versus actual OG, FG, batch volume, and brew-day observations in **📓 Brew Logs** builds a reliable history that makes tracing efficiency, attenuation, and flavor issues much easier.

***

## Playbook 1: Low Mash/Brewhouse Efficiency

### Confirm the Problem

* Actual OG falls more than $3\text{–}5\text{ gravity points}$ short of target OG (for example, $1.042$ instead of $1.050$).
* Pre-boil wort gravity is similarly below target.

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

1. If pre-boil volume ran high, extend the boil to evaporate excess water and concentrate gravity.
2. If chilled wort is already in the fermenter below target OG, stir in boiled, cooled dry malt extract (DME) prior to pitching (roughly $0.45\text{ kg}$ / $1\text{ lb}$ DME in $20\text{ L}$ boosts gravity by $8\text{–}9\text{ points}$).
3. Log your actual measured OG in **📓 Brew Logs** so your yeast pitch sizing and efficiency records stay accurate.

### Next Batch Prevention

* Check and tighten your mill gap so kernels crush cleanly without shredding husks.
* Confirm your **⚙️ Equipment** profile losses (kettle/lauter deadspace, trub loss, boil-off rate, and grain absorption) match your real hardware.
* Verify starch conversion at 60 minutes with an iodine test.
* Adjust mash water chemistry to maintain a room-temperature mash pH of $5.2\text{–}5.4$.

***

## Playbook 2: Stalled or Stuck Fermentation

### Confirm the Problem

* Airlock bubbling ceases completely for 48+ hours while gravity remains far above expected FG.
* Two gravity measurements taken 24–48 hours apart show zero movement.
* Specific gravity sits more than 5 points above predicted terminal gravity.

> **Important:** Rely on hydrometer or corrected refractometer readings rather than airlock activity, as leaky fermenter lids often mask active fermentation.

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

1. **Move the fermenter to a warmer spot** near the upper end of the yeast strain's temperature window.
2. **Gently swirl the fermenter** without splashing to rouse settled yeast back into suspension.
3. If gravity still refuses to drop after 24–48 hours, pitch an actively fermenting yeast starter or properly rehydrated dry yeast suited to high-alcohol environments.

### Next Batch Prevention

* Pitch an adequate cell count tailored to your batch size and OG ($0.75\text{M cells/mL/}^\circ\text{P}$ for ales, $1.5\text{–}2.0\text{M}$ for lagers).
* Oxygenate chilled wort thoroughly ($\sim 8\text{–}10\text{ ppm}$ DO for ales; $\sim 10\text{–}12\text{ ppm}$ for lagers and strong ales).
* Keep fermentation temperatures steady during the critical first 48–72 hours.

***

## Playbook 3: Haze (Unintended)

### Confirm the Problem

* Finished beer appears cloudy or murky in a style meant to pour clear.
* Cloudiness remains even after extended cold storage.

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

* Dose Whirlfloc or Irish Moss during the last 10–15 minutes of the boil.
* Whirlpool after flameout and leave trub behind when transferring to the fermenter.
* Cold crash at $0\text{–}4\,^\circ\text{C}$ for 24–72 hours prior to packaging by including a `Conditioning` stage in your **🌡️ Fermentation** profile.

***

## Playbook 4: Over-Carbonation

### Confirm the Problem

* Bottles gush foam immediately upon uncapping, or keg pours produce excessive foam.

> ⚠️ **Safety:** Severely overcarbonated glass bottles pose a bursting hazard. Move suspect bottles into a covered plastic tote or cooler in a cold space, wear eye protection and gloves when handling, and chill a single test bottle thoroughly before opening.

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

1. **Chill all bottles in a refrigerator immediately** to halt yeast activity and keep $\text{CO}_2$ dissolved.
2. Open one chilled test bottle carefully to gauge internal pressure.
3. If pressure is dangerously high, wear protective eyewear and gloves, gently lift each crown cap just enough to vent excess gas, re-crimp, and keep the batch refrigerated.

### Next Batch Prevention

* Confirm terminal gravity with two identical readings 24–48 hours apart before bottling.
* Calculate exact priming sugar additions using **🧮 Tools → 3. Priming Sugar Carbonation** or a priming **🫧 Carbonation** profile.
* Weigh priming sugar on a digital gram scale rather than measuring by volume.
* Consider kegging for direct regulator pressure control.

***

## Playbook 5: Under-Carbonation

### Confirm the Problem

* Beer pours flat with weak foam and minimal effervescence.

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

* Relocate bottles to a warm spot at $20\text{–}22\,^\circ\text{C}$ ($68\text{–}72\,^\circ\text{F}$) and give them another 1–2 weeks to carbonate.
* If bottles remain completely flat after 4 weeks at room temperature, uncap, add a measured priming dose (and a tiny pinch of rehydrated bottling yeast if needed) using strict sanitation, and recap.

### Next Batch Prevention

* Calculate priming weights with **🧮 Tools → 3. Priming Sugar Carbonation**, inputting your actual beer temperature, batch volume (L), and target $\text{CO}_2$ volumes.
* Ensure viable yeast remains in suspension at bottling (re-yeast with a bottling strain if aging cold for months).

***

## Playbook 6: Oxidation

### Confirm the Problem

* Stale wet-cardboard, papery, or sweet sherry aromas develop after packaging and intensify during storage.

### Decision Tree

```
When did oxidized flavors appear?
  → Immediately after kegging/bottling: O₂ pickup during transfer.
  → Appearing/worsening over weeks: Oxygen ingress via packaging seals or caps.
  → After dry-hopping: Dry-hop addition introduced O₂.
```

### Immediate Actions (Current Batch)

* Because oxidation cannot be reversed, store the batch cold and enjoy it fresh before staling progresses further.

### Next Batch Prevention

* **Closed transfers:** Push beer from fermenter to purged kegs using low $\text{CO}_2$ pressure instead of open-air siphoning.
* **Purge all vessels** and transfer tubing with $\text{CO}_2$ before filling.
* Keep transfer hoses submerged below the beer surface to prevent splashing.
* Purge dry-hop additions with $\text{CO}_2$ and minimize headspace exposure during dosing.
* Use oxygen-absorbing crown caps and verify tight cap crimps when bottling.

***

## Playbook 7: Hop Harshness / Harsh Bitterness

### Confirm the Problem

* Bitterness comes across sharp, scraping, or overly lingering despite normal calculated IBU numbers.

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

* Give the beer additional cold conditioning at $0\text{–}4\,^\circ\text{C}$ ($32\text{–}39\,^\circ\text{F}$) so harsh polyphenols and hop particulate settle out.
* Fining with gelatin in a cold keg or fermenter can also strip astringent hop polyphenols.

### Next Batch Prevention

* Store hops sealed in the freezer and reduce **Alpha (%)** in your recipe when brewing with aged hops.
* Keep sulfate moderate ($<100\text{–}150\text{ ppm }\text{SO}_4$) for smoother bitterness, reserving $150\text{–}250\text{ ppm}$ for crisp, assertive hop styles.
* Allow adequate cold-conditioning time before serving.
* Focus on hop freshness, overall BU:GU balance, and clean fermentation rather than judging bitterness solely by cohumulone percentage.

***

## Playbook 8: Contamination (General)

### Confirm the Problem

* Unexpected sour, vinegary, medicinal, musty, or slimy/ropy defects appear.
* Visual inspection reveals a surface film (pellicle), mold colonies, or persistent cloudiness paired with off-aromas.

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

* **Mold visible:** Pour the batch out immediately — mold toxins are unsafe to consume.
* **Bacterial/wild yeast contamination:** Sample cautiously; if mild lactic tartness is pleasant, drink the beer cold and fresh, but discard any batch turning vinegary or unpleasant.
* **Trace and sanitize or replace the contaminated hardware before brewing again.**

### Contamination Sources

* Scratched plastic buckets, carboys, siphon canes, or vinyl hoses that harbor bacteria
* Insufficient sanitizer contact time or improper dilution
* Sanitizing equipment that still has dried wort or krausen residue
* Airborne dust or fruit flies near open wort or fermenters
* Chlorinated tap water left untreated before mashing

### Next Batch Prevention

* Follow the full protocol in **Cleaning, Sanitation & Safety**.
* Replace any scratched plastic fermenters, tubing, or bottling wands.
* Verify sanitizer concentration and full 1–2 minute contact time.
* Dechlorinate municipal water with Campden tablets (potassium metabisulfite) prior to brew day.

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
| Cardboard/papery     | Oxidation                 | Closed transfers, $\text{CO}_2$ purge          |
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

# beerbrew-web Workflow Best Practices

A complete workflow guide for getting consistent, repeatable results with **beerbrew-web**.

This walkthrough covers every stage of using **beerbrew-web** — from initial profile setup and recipe formulation to brew-day execution and post-batch review. Rather than listing every button, it focuses on integrating **beerbrew-web** into your brewing habit so each batch sharpens your system accuracy and beer quality.

***

## 1. Foundation: Set Up Profiles Before You Brew

Repeatable brewing begins with accurate system profiles. Take a few minutes to configure your core presets before designing your first batch.

### Equipment Profile

Your equipment profile is the single most influential configuration in **beerbrew-web**, directly governing batch volume, boil-off, gravity predictions, and hop utilization.

**Key fields to calibrate:**

| Field              | How to determine it                                         |
| ------------------ | ----------------------------------------------------------- |
| Batch size         | Measure your post-fermentation volume into packaging vessel |
| Boil-off rate      | Time a plain water boil for 60 min and measure loss         |
| Mash tun deadspace | Volume remaining in tun after draining                      |
| Trub/chiller loss  | Volume left in kettle after chilling                        |
| Fermenter loss     | Volume lost to yeast cake and trub at bottom of fermenter   |

> **Brewer Tip:** Compare your actual brew-day volumes and OG in **📓 Brew Logs** against recipe predictions after every session, updating your **⚙️ Equipment** profile as you gather real system numbers.

### Mash Profile

Configure a mash schedule tailored to your brewing method (single infusion, BIAB, or multi-step mash) inside **📋 Recipes → Mash Schedule & Water Chemistry**. A single-infusion rest between $65\text{ and }68\,^\circ\text{C}$ ($149\text{–}154\,^\circ\text{F}$) works great for most ales.

Use multi-step mash schedules when brewing traditional lagers, wheat beers, or adjunct-heavy recipes — see **Mash & Lauter Science** for target rest temperatures.

### Water Profile

Balanced mineral levels elevate hop clarity and malt richness. Set up source and target style profiles under **💧 Water** so you always have clear ion targets ready.

> **Brewer Tip:** Enter your source water and style targets in **💧 Water** (reviewing the automatic $\text{SO}_4:\text{Cl}$ ratio and flavor balance badge), then link your **Target Water Profile** inside each recipe.

### Fermentation Profile

Create reusable fermentation schedules tailored to your favorite yeast strains:

* Ale primary: $18\text{–}22\,^\circ\text{C}$ ($65\text{–}72\,^\circ\text{F}$) for 5–7 days
* Lager primary: $8\text{–}12\,^\circ\text{C}$ ($46\text{–}54\,^\circ\text{F}$) for 10–14 days, followed by an $18\,^\circ\text{C}$ ($65\,^\circ\text{F}$) diacetyl rest prior to cold crashing

Selecting a **Fermentation Profile** in **📋 Recipes** prints every temperature hold, ramp, dry-hop addition, and cold crash straight onto your **Printable Brew Day Sheet**.

***

## 2. Recipe Design

### Build from Known Baselines

Begin with a proven recipe or import an existing **BeerXML 1.0** file using **Import XML** in **📋 Recipes**, changing only one or two variables per iteration so you can clearly taste the impact of each adjustment.

**Versioning discipline:** Save a **BeerXML** backup or create a numbered recipe copy (such as `West Coast IPA v2`) before making major tweaks, noting what changed in **Brewer's Notes**.

### Targets to Hit First

| Metric                    | Why it matters                                    | beerbrew-web location              |
| ------------------------- | ------------------------------------------------- | ---------------------------------- |
| **OG** (original gravity) | Drives ABV and fermentability                     | **📋 Recipes** vital stats bar     |
| **IBU**                   | Perceived bitterness; balance with malt sweetness | **📋 Recipes** vital stats bar     |
| **SRM**                   | Color: visual match to style                      | **📋 Recipes** live color swatch   |
| **Water Ions & $\text{SO}_4:\text{Cl}$**   | Mash pH stability and hop/malt balance            | **💧 Water** & Mash/Water tab      |
| **Attenuation / FG**      | Predicted FG and sweetness vs. dryness            | **📋 Recipes** Yeast & vitals bar  |

### Hop Scheduling

Switch seamlessly between **Tinseth** and **Rager** IBU models in the **📋 Recipes** header. Keep in mind that calculated IBUs are estimates shaped by boil vigor, wort gravity, and hop freshness.

> **Brewer Tip:** Check the **Alpha (%)** printed on your hop packet before brewing, adjusting the recipe value downward if hops have been stored opened or warm.

***

## 3. Brew Day Execution

### Plan the Batch First

Before heating strike water, open the **Printable Brew Day Sheet** tab in **📋 Recipes** and click **🖨️ Print / Save PDF** to produce a clean checklist of your grain bill, mash steps, hop schedule, fermentation timeline, carbonation specs, and notes.

Confirm these key numbers ahead of dough-in:

* Scaled grain bill and mash/sparge water volumes
* Strike water temperature (calculated via **🧮 Tools → 1. Mash Strike Water Temperature**)
* Hop addition timings and weights
* Yeast cell count target ($0.75\text{M cells/mL/}^\circ\text{P}$ for ales, $1.5\text{–}2.0\text{M}$ for lagers)

> **Brewer Tip:** Keep your **Brew Day Sheet** handy on paper or a tablet throughout brew day so every mash rest, hop addition, and water salt dose happens right on schedule.

### Record as You Go

Jot down real measurements alongside your planned targets as brew day unfolds:

| Stage        | What to record                                         |
| ------------ | ------------------------------------------------------ |
| Mash         | Strike temp achieved, actual mash temp, pH if measured |
| Pre-boil     | Volume, gravity (use refractometer or hydrometer)      |
| Post-boil    | Volume, gravity                                        |
| Pitch        | Yeast type/lot, pitch temp, starter size if used       |
| Fermentation | Gravity readings, temperature, any off-aromas          |

Write detailed observations in **Brewer's Notes** — simple notes like "slow lautering" or "18-hour lag before krausen" prove invaluable when troubleshooting later.

### Gravity Readings and Efficiency

Once brew day wraps up, click **🍺 Brew It (Deduct Stock)** to record the session in **📓 Brew Logs** and subtract your recipe's ingredients from **📦 Inventory**. If measured OG comes in low:

* Evaluate grain crush quality and sparge completeness
* Double-check deadspace, trub loss, and boil-off rates in your **⚙️ Equipment** profile
* Confirm mash temperature and conversion duration

If efficiency is consistently off across several batches, verify hydrometer/refractometer calibration and adjust your Equipment Profile losses before modifying recipes.

***

## 4. Fermentation Tracking

### Gravity Measurements

Track fermentation progress using a hydrometer or refractometer. Whenever taking refractometer readings after alcohol is present, convert Brix values to true specific gravity with **🧮 Tools → 2. Refractometer Alcohol Correction**.

### Gravity Milestones

* **24–48 h post-pitch:** Active krausen formation and initial gravity drop
* **Day 3–5 (ale) / Day 7–10 (lager):** Fermentation slowing as gravity nears final target
* **Stable gravity for 48 h:** Terminal gravity reached; safe to cold crash or package

> **Brewer Tip:** Always verify fermentation completion with two stable gravity readings 24–48 hours apart rather than relying solely on airlock bubbling.

### Diacetyl Rest

For lagers and cool-fermented ales, program a 2–3 day **diacetyl rest** ramp to $16\text{–}18\,^\circ\text{C}$ ($60\text{–}65\,^\circ\text{F}$) inside your **🌡️ Fermentation** profile prior to cold crashing.

### Cold Crash and Fining

Chill finished beer to $0\text{–}2\,^\circ\text{C}$ ($32\text{–}36\,^\circ\text{F}$) for 24–72 hours to settle yeast and haze proteins, adding cold-side finings like gelatin at the start of the crash if desired.

***

## 5. Packaging

### Carbonation

Configure your packaging carbonation in **🫧 Carbonation** (or run a quick check in **🧮 Tools → 3. Priming Sugar Carbonation**) using your beer temperature and style $\text{CO}_2$ volume target.

| Beer style         | Typical carbonation target |
| ------------------ | -------------------------- |
| British ale        | 1.5–2.2 vol $\text{CO}_2$            |
| American ale/lager | 2.2–2.7 vol $\text{CO}_2$            |
| Belgian/wheat      | 2.8–3.5 vol $\text{CO}_2$            |
| Stout/porter       | 1.8–2.2 vol $\text{CO}_2$            |

> **Brewer Tip:** When force-carbonating a keg, input the **cold serving temperature inside the kegerator**. When bottle conditioning with priming sugar, input the **peak temperature the beer reached during or after fermentation** so residual $\text{CO}_2$ is calculated accurately.

### Log Your Final Metrics

Record your actual OG, FG, packaged volume, carbonation approach, and tasting feedback inside **📓 Brew Logs** to preserve a complete history for every brew.

***

## 6. Post-Batch Review and Iteration

Reviewing finished batches in **📓 Brew Logs** turns every brew day into a feedback loop for improvement.

### Review Your Batch History

Once bottles or kegs have conditioned (typically 2–4 weeks after packaging), add structured sensory notes to your brew log:

* Aroma, flavor, mouthfeel, and carbonation impressions
* Overall balance and drinkability
* Specific adjustments for the next iteration

Note clear observations ("slight diacetyl — extend rest", "carbonation spot-on", "crisp hop finish").

### Compare Actual vs. Planned

Review **Target / Actual OG** and **Target / Actual FG** in **📓 Brew Logs** to spot trends:

* Actual OG vs. target OG $\rightarrow$ refine brewhouse efficiency in **⚙️ Equipment**
* Actual FG vs. predicted FG $\rightarrow$ verify yeast health and mash temperature accuracy
* Final volume vs. batch size $\rightarrow$ dial in kettle and fermenter loss settings

### Update Your Profiles

Whenever you refine a mash step, boil-off rate, or fermentation ramp based on real results, save those improvements back into your reusable profiles so every future recipe benefits.

***

## 7. Repeatability: The Discipline of Logging

Consistent record-keeping is the fastest path to predictable brewing results, and **beerbrew-web** gives you the framework to capture every detail effortlessly.

### Minimum Logging Checklist (Every Batch)

* [ ] Recipe version saved and documented
* [ ] Equipment profile verified for current setup
* [ ] Strike water temperature and volume confirmed
* [ ] Pre-boil volume and gravity measured
* [ ] Actual OG measured and recorded at pitch
* [ ] Yeast strain, age, and pitch rate noted
* [ ] At least two gravity checks logged during fermentation
* [ ] Stable FG verified across 48 hours
* [ ] Carbonation method, sugar/PSI target, and packaging date recorded
* [ ] Sensory tasting notes added post-conditioning

### Recipe Versioning Strategy

| Scenario              | Action                                        |
| --------------------- | --------------------------------------------- |
| Tweaking a recipe     | Create new version; note what changed         |
| Rebrewing identically | Use same version; log as new batch            |
| Major style change    | Clone recipe to a new recipe                  |
| Equipment change      | Update equipment profile; note effective date |

### Using Batch Data Across Brews

Comparing multiple sessions of the same recipe in **📓 Brew Logs** reveals clear cause-and-effect patterns over time:

* Which fermentation temperature yields your preferred ester and attenuation profile
* How mash temperature shifts affect body and terminal gravity
* How brewhouse efficiency behaves across light versus high-gravity grain bills

***

## 8. Advanced Workflow Tips

### Multi-Batch Planning

Before brew day, check **📦 Inventory** to ensure you have enough grain, hops, yeast, and salts on hand. Clicking **🍺 Brew It (Deduct Stock)** inside **📋 Recipes** automatically deducts used quantities from your inventory.

### Recipe Sharing and Importing

Exchange recipes effortlessly using **BeerXML 1.0** (**Import XML** and **Export BeerXML** in **📋 Recipes**). After importing someone else's recipe, select your own **Equipment Preset** so volumes and efficiency adjust to your system.

### Styles Reference

Browse 44 pre-loaded **BJCP 2021** styles (or add custom styles) in **🏆 Styles** and click **Use** to apply a style to your active recipe. Live green and red vital indicators immediately show whether your OG, FG, ABV, IBU, and SRM fall within style targets.

## Summary

| Phase        | Key beerbrew-web Action                                             | Outcome                                |
| ------------ | ------------------------------------------------------------------- | -------------------------------------- |
| Setup        | Configure **⚙️ Equipment**, **💧 Water**, **🌡️ Fermentation**, **🫧 Carbonation** | Accurate predictions & presets         |
| Recipe       | Formulate in **📋 Recipes**, check **🏆 Styles** vitals & **📦 Inventory** | Balanced, style-accurate recipe        |
| Brew day     | Print **Brew Day Sheet**, run **🧮 Tools**, click **🍺 Brew It**     | Smooth brew day & auto stock deduction |
| Fermentation | Follow multi-stage holds/ramps & dry hop schedule                   | Clean attenuation & aroma expression   |
| Packaging    | Apply **🫧 Carbonation** PSI/bar or priming sugar calculation        | Consistent carbonation & low DO        |
| Review       | Record actual OG/FG & tasting notes in **📓 Brew Logs**             | Iterative efficiency & recipe tuning   |

When used as an ongoing brewing journal rather than just a one-off calculator, **beerbrew-web** makes every batch more consistent and rewarding than the last.

***

# Glossary

Definitions of core brewing terminology and **beerbrew-web** workspace features.

## Brewing Terms

| Term                       | Definition                                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| **ABV**                    | Alcohol by volume; percentage of alcohol in finished beer.                                     |
| **Adjunct**                | A non-malt fermentable ingredient, such as sugar, corn, rice, or honey.                        |
| **Ale**                    | Beer typically fermented at warmer temperatures with ale yeast.                                |
| **Alpha Acid**             | Hop compounds that isomerize during the boil and contribute bitterness.                        |
| **Attenuation**            | Percentage of fermentable sugars consumed by yeast during fermentation.                        |
| **Bottle Conditioning**    | Natural carbonation in the package by fermenting priming sugar after bottling.                 |
| **Cold Crash**             | Rapidly cooling beer near the end of fermentation to help yeast and solids settle.             |
| **Conditioning**           | Maturation stage after primary fermentation where beer stabilizes and clears.                  |
| **Diacetyl**               | Buttery or butterscotch flavor compound that can remain if fermentation cleanup is incomplete. |
| **Dry Hopping**            | Adding hops during or after fermentation to boost aroma with minimal added bitterness.         |
| **EBC**                    | European Brewery Convention color scale used to describe beer color (mainly in Europe).        |
| **Esters**                 | Fruity aroma and flavor compounds naturally produced by yeast during fermentation.             |
| **Fermentable**            | Any ingredient that contributes sugars for yeast to ferment.                                   |
| **Fermentation**           | Process where yeast converts sugars into alcohol and $\text{CO}_2$.                                      |
| **FG**                     | Final Gravity; density of beer after fermentation is complete.                                 |
| **Flocculation**           | Tendency of yeast to clump together and settle out of suspension.                              |
| **Gravity**                | Measure of wort or beer density relative to water.                                             |
| **Grist**                  | Full mix of crushed malt and grains prepared for mashing.                                      |
| **Head Retention**         | How well foam persists on a poured beer over time.                                             |
| **Hops**                   | Flower cones used to add bitterness, aroma, and flavor to beer.                                |
| **IBU**                    | International Bitterness Units; measurement of estimated bitterness from hop compounds.        |
| **Krausen**                | Foamy head formed on fermenting wort during peak fermentation activity.                        |
| **Lager**                  | Beer typically fermented at cooler temperatures with lager yeast.                              |
| **Lauter Tun**             | Vessel used to separate wort from spent grain during lautering.                                |
| **Lautering**              | Separating sweet wort from the grain bed after mashing.                                        |
| **Malt Extract**           | Concentrated malt sugars sold as liquid syrup or dry powder.                                   |
| **Mash**                   | Mixing crushed grain with hot water so enzymes convert starches into fermentable sugars.       |
| **Mash Tun**               | Vessel used for mashing grain with hot water.                                                  |
| **Mash-in**                | Step where crushed grain is first combined with brewing water to start the mash.               |
| **OG**                     | Original Gravity; density of wort before fermentation starts.                                  |
| **Oxidation**              | Staling caused by oxygen exposure, often producing dull, papery, or cardboard-like flavors.    |
| **pH**                     | Measure of acidity or alkalinity that affects mash performance, flavor, and stability.         |
| **Pitching**               | Adding yeast to cooled wort to start fermentation.                                             |
| **Plato**                  | Scale (°P) that expresses dissolved extract concentration in wort or beer.                     |
| **Primary Fermentation**   | Main active fermentation phase where most sugar conversion and alcohol production happens.     |
| **Priming Sugar**          | Sugar added before packaging to create natural carbonation.                                    |
| **Secondary Fermentation** | Later-stage maturation phase; often referred to as conditioning in modern workflows.           |
| **Session Beer**           | Lower-ABV beer intended to remain flavorful and drinkable over longer sessions.                |
| **SG**                     | Specific Gravity; base density measurement behind OG, FG, and attenuation.                     |
| **Sparge**                 | Rinsing grains after mashing to extract residual sugars.                                       |
| **Sparging**               | Rinsing the grain bed with hot water to recover remaining sugars after first runnings.         |
| **SRM**                    | Standard Reference Method color scale used to describe beer color.                             |
| **Trub**                   | Sediment of proteins, hop matter, and solids left after boiling and cooling wort.              |
| **Vorlauf**                | Recirculating early runnings until wort clears before collecting full runoff.                  |
| **Whirlpool**              | Post-boil circular flow used to collect solids in the center and support hop utilization.      |
| **Wort**                   | Unfermented sweet liquid extracted from mash before fermentation.                              |
| **Wort Boil**              | Boiling wort to sanitize it, drive off volatiles, and extract bitterness from hops.            |
| **Yeast**                  | Microorganism that converts sugars into alcohol, $\text{CO}_2$, and fermentation flavors.                |

## beerbrew-web Application Terms

| Term                     | Definition                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **BeerXML 1.0**          | Standard XML interchange format supported by **beerbrew-web** for importing and exporting recipes.           |
| **Brew Day Sheet**       | Printable summary view in **📋 Recipes** detailing grains, mash steps, hop additions, fermentation, and packaging. |
| **Brew It**              | Action button in **📋 Recipes** that records a session in **📓 Brew Logs** and deducts used stock from **📦 Inventory**. |
| **Brew Logs**            | Historical session log tracking brew dates, target vs. actual OG/FG, batch volume, and brewer notes.         |
| **Carbonation Profile**  | Reusable forced-$\text{CO}_2$ (PSI/bar) or priming sugar (g/L) configuration in **🫧 Carbonation**.                    |
| **Equipment Profile**    | Reusable setup in **⚙️ Equipment** defining batch size, boil-off, deadspace, losses, and efficiency.       |
| **Fermentation Profile** | Reusable multi-stage schedule in **🌡️ Fermentation** defining holds, ramps, conditioning, and dry hops.     |
| **Inventory**            | On-hand stock tracker in **📦 Inventory** for fermentables, hops, yeasts, and miscs with Quick Add support.  |
| **Recipe**               | Core formulation in **📋 Recipes** containing ingredients, mash steps, profiles, and live brewing metrics.   |
| **Styles**               | Library in **🏆 Styles** containing 44 pre-seeded BJCP 2021 guidelines plus custom user-defined beer styles. |
| **Tools**                | Built-in calculators in **🧮 Tools** for strike water temp, refractometer correction, priming, and hydrometer correction. |
| **Water Profile**        | Reusable mineral ion profile ($\text{Ca}^{2+}$, $\text{Mg}^{2+}$, $\text{Na}^{+}$, $\text{Cl}^{-}$, $\text{SO}_4^{2-}$, $\text{HCO}_3^{-}$, $\text{pH}$) in **💧 Water**.          |

# References & Further Reading

Published brewing textbooks, peer-reviewed studies, and technical standards cited throughout the **beerbrew-web** Brewing Wiki.

This bibliography brings together all reference materials cited across the **beerbrew-web** Brewing Wiki, organized by subject area for further study.

The sources span four complementary categories:

* **Foundational brewing textbooks**
* **Peer-reviewed papers and technical journals**
* **Industry organization standards/guidance**
* **Practical manufacturer documentation** (clearly identified)

***

## Core Brewing Texts

### Palmer, J. J. (2017). *How to Brew: Everything You Need to Know to Brew Great Beer Every Time* (4th ed.). Brewers Publications.

Comprehensive homebrewing reference covering recipe formulation, water adjustment, fermentation science, packaging, and defect troubleshooting.

> Earlier online edition: [howtobrew.com](https://www.howtobrew.com/)

### White, C., & Zainasheff, J. (2010). *Yeast: The Practical Guide to Beer Fermentation*. Brewers Publications.

Essential text on yeast metabolism, pitch rate calculations, starter propagation, and fermentation temperature management.

### Briggs, D. E., Boulton, C. A., Brookes, P. A., & Stevens, R. (2004). *Brewing: Science and Practice*. Woodhead Publishing.

In-depth brewing science textbook detailing malting biochemistry, wort production, and fermentation kinetics.

### Bamforth, C. W. (2006). *Scientific Principles of Malting and Brewing*. American Society of Brewing Chemists.

Focused scientific overview of enzymatic starch conversion, mash chemistry, and yeast fermentation biochemistry.

### Noonan, G. J. (1996). *New Brewing Lager Beer*. Brewers Publications.

Authoritative manual on lager brewing, step-mashing schedules, decoction, and cold fermentation conditioning.

### Kunze, W. (2014). *Technology Brewing and Malting* (5th English ed.). VLB Berlin.

Detailed commercial brewing reference covering brewhouse engineering, lautering, fermentation, and packaging operations.

***

## Water Chemistry

### Troester, K. *Water Knowledge* (Braukaiser Wiki).

Applied mash and water chemistry guide tailored for all-grain homebrewers.

* <http://braukaiser.com/wiki/index.php/Water_Knowledge>

### Ward Laboratories, Inc. *Brewing Water Analysis*.

Standard analytical reference for interpreting municipal and well water mineral reports.

* <https://www.wardlab.com>

***

## Hops and Bitterness

### Tinseth, G. (1990s). *Glenn's Hop Utilization Numbers*.

Empirical research behind the Tinseth IBU utilization model widely used in recipe software.

* <https://www.realbeer.com/hops/research.html>

### Rager, J. (1990). "Calculating Hop Bitterness in Beer." *Zymurgy* (Special Issue, archival reference).

Classic homebrewing bitterness estimation model (Rager).

### American Society of Brewing Chemists (ASBC). *Methods of Analysis* (Hops methods, current edition).

Standardized laboratory methods for measuring hop alpha acids and Hop Storage Index (HSI).

* <https://www.asbcnet.org>

### BarthHaas. *Hop Storage Index* technical articles.

Practical industry guidance on hop oxidation, cold storage, and HSI interpretation.

* <https://www.barthhaas.com/ressources/blog/blog-article/from-hop-harvest-to-the-brewery>

***

## Fermentation Science and Sensory

### Vanderhaegen, B., Neven, H., Coghe, S., Verstrepen, K. J., Derdelinckx, G., & Verachtert, H. (2003). "Bioflavoring and Beer Refermentation." *Applied Microbiology and Biotechnology*, 62(2–3), 140–150.

Peer-reviewed study examining yeast bioflavoring pathways and bottle-conditioning refermentation.

* DOI: [10.1007/s00253-003-1340-5](https://doi.org/10.1007/s00253-003-1340-5)
* PubMed: <https://pubmed.ncbi.nlm.nih.gov/12759790/>

### Meilgaard, M. C., Civille, G. V., & Carr, B. T. (2015). *Sensory Evaluation Techniques* (5th ed.). CRC Press.

Standard sensory evaluation reference underpinning structured beer tasting and off-flavor identification.

***

## Packaging and Carbonation

### Speers, R. A., & MacIntosh, A. J. (2013). "Carbon Dioxide Solubility in Beer." *Journal of the American Society of Brewing Chemists*, 71(4), 242–247.

Peer-reviewed modeling of $\text{CO}_2$ solubility across temperature and pressure regimes.

* DOI: [10.1094/ASBCJ-2013-1008-01](https://doi.org/10.1094/ASBCJ-2013-1008-01)

### Papazian, C. (2014). *The Complete Joy of Homebrewing* (4th ed.). William Morrow.

Foundational homebrewing guide covering bottle priming, sanitation, and fermentation basics.

### Brewers Association Technical Committee. *Draught Beer Quality Manual* (current edition).

Comprehensive best-practice guide for draft line balancing, $\text{CO}_2$ pressure management, and tap system sanitation.

* <https://www.brewersassociation.org/educational-publications/draught-beer-quality-manual/>

***

## Cleaning and Sanitation

### Five Star Chemicals. *Technical Data Sheets* (Star San, PBW, One Step).

Product technical sheets outlining dilution ratios, contact times, pH thresholds, and metal compatibility.

* <https://fivestarchemicals.com>

### Brewers Association Technical Committee. *Draught Beer Quality Manual* (sanitation and cleaning sections).

Industry best-practice procedures for brewery cleaning and chemical sanitation.

* <https://www.brewersassociation.org/educational-publications/draught-beer-quality-manual/>

***

## Style Guidelines

### Beer Judge Certification Program (BJCP). *BJCP Style Guidelines* (2021 edition).

Benchmark style reference defining OG, FG, IBU, SRM, ABV, and sensory expectations for homebrew styles.

* <https://www.bjcp.org/bjcp-style-guidelines/>

### Brewers Association (BA). *Beer Style Guidelines* (current edition).

Annual style classification guide used in commercial brewing and competitions.

* <https://www.brewersassociation.org/edu/brewers-association-beer-style-guidelines/>

***

## Online Resources

| Resource                                    | Purpose                                           | URL                                                                  |
| ------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------- |
| beerbrew-web Repository                     | Source code, container deployment, and wiki docs  | [github.com/flaviolnx/beerbrew-web](https://github.com/flaviolnx/beerbrew-web) |
| American Homebrewers Association (AHA)      | Educational brewing articles and member resources | [homebrewersassociation.org](https://www.homebrewersassociation.org) |
| American Society of Brewing Chemists (ASBC) | Methods and technical journal resources           | [asbcnet.org](https://www.asbcnet.org)                               |
| Master Brewers Association (MBAA)           | Professional technical resources                  | [mbaa.com](https://www.mbaa.com)                                     |
| Braukaiser Wiki                             | Homebrew-oriented mash/water technical notes      | [braukaiser.com](http://www.braukaiser.com)                          |

***

## A Note on Source Strength

Wherever feasible, numerical targets and chemical guidelines across this wiki are cross-verified across textbooks, peer-reviewed papers, and brewing standards bodies.

Practical operational guidance — such as chemical sanitizer dilution rates or specific **beerbrew-web** UI workflows — is drawn directly from manufacturer technical sheets and application documentation and labeled accordingly.

If you spot an error or want to contribute improvements to this wiki, please open an issue or pull request in the [beerbrew-web GitHub repository](https://github.com/flaviolnx/beerbrew-web).