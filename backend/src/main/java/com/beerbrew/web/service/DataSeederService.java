package com.beerbrew.web.service;

import com.beerbrew.web.model.*;
import com.beerbrew.web.repository.*;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DataSeederService {

    private final EquipmentProfileRepository equipmentRepo;
    private final WaterProfileRepository waterRepo;
    private final BjcpStyleRepository styleRepo;
    private final InventoryItemRepository inventoryRepo;
    private final RecipeRepository recipeRepo;
    private final FermentationProfileRepository fermRepo;
    private final CarbonationProfileRepository carbRepo;
    private final BrewMathService mathService;

    public DataSeederService(EquipmentProfileRepository equipmentRepo,
                             WaterProfileRepository waterRepo,
                             BjcpStyleRepository styleRepo,
                             InventoryItemRepository inventoryRepo,
                             RecipeRepository recipeRepo,
                             FermentationProfileRepository fermRepo,
                             CarbonationProfileRepository carbRepo,
                             BrewMathService mathService) {
        this.equipmentRepo = equipmentRepo;
        this.waterRepo = waterRepo;
        this.styleRepo = styleRepo;
        this.inventoryRepo = inventoryRepo;
        this.recipeRepo = recipeRepo;
        this.fermRepo = fermRepo;
        this.carbRepo = carbRepo;
        this.mathService = mathService;
    }

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void seedDefaults() {
        if (equipmentRepo.count() == 0) {
            EquipmentProfile biab = new EquipmentProfile();
            biab.setName("20L Electric BIAB (All-in-One)");
            biab.setBatchSizeLiters(20.0);
            biab.setBoilTimeMinutes(60.0);
            biab.setEvaporationRateLitersPerHour(2.8);
            biab.setKettleDeadspaceLiters(0.5);
            biab.setTrubChillerLossLiters(1.0);
            biab.setEfficiencyPercent(74.0);

            EquipmentProfile cooler = new EquipmentProfile();
            cooler.setName("20L All-Grain Mash Tun + Boil Kettle");
            cooler.setBatchSizeLiters(20.0);
            cooler.setBoilTimeMinutes(60.0);
            cooler.setEvaporationRateLitersPerHour(3.5);
            cooler.setKettleDeadspaceLiters(0.8);
            cooler.setLauterDeadspaceLiters(0.6);
            cooler.setTrubChillerLossLiters(1.2);
            cooler.setEfficiencyPercent(78.0);

            EquipmentProfile nano = new EquipmentProfile();
            nano.setName("50L Nano HERMS System");
            nano.setBatchSizeLiters(50.0);
            nano.setBoilTimeMinutes(60.0);
            nano.setEvaporationRateLitersPerHour(5.5);
            nano.setKettleDeadspaceLiters(1.5);
            nano.setLauterDeadspaceLiters(1.0);
            nano.setTrubChillerLossLiters(2.0);
            nano.setEfficiencyPercent(82.0);

            equipmentRepo.saveAll(List.of(biab, cooler, nano));
        }

        if (waterRepo.count() == 0) {
            waterRepo.saveAll(List.of(
                water("RO / Distilled Base", 0, 0, 0, 0, 0, 0, 7.0),
                water("Balanced Amber / Pale Ale", 75, 40, 100, 75, 10, 5, 7.2),
                water("Hoppy West Coast IPA", 110, 20, 250, 55, 12, 8, 7.3),
                water("Juicy NEIPA (Soft Chloride)", 90, 30, 75, 150, 15, 5, 7.1),
                water("Pilsen Soft Lager", 10, 15, 10, 10, 3, 2, 6.8),
                water("Dublin Dry Stout", 115, 280, 55, 20, 12, 4, 7.8)
            ));
        }

        // Seed full BJCP 2021 style catalog (adds missing styles even if an older DB already exists)
        List<BjcpStyle> catalog = List.of(
            style("01A", "American Light Lager", 1.028, 1.040, 0.998, 1.008, 8, 12, 2, 3, 2.8, 4.2, "Highly carbonated, very light-bodied, nearly flavorless lager designed to be consumed very cold."),
            style("01B", "American Lager", 1.040, 1.050, 1.004, 1.010, 8, 18, 2, 3.5, 4.2, 5.3, "Very pale, clean, crisp, and refreshing adjunct lager."),
            style("01C", "Cream Ale", 1.042, 1.055, 1.006, 1.012, 8, 20, 2, 5, 4.2, 5.6, "Clean, well-attenuated, flavorful American lawnmower beer."),
            style("02A", "International Pale Lager", 1.042, 1.050, 1.008, 1.012, 18, 25, 2, 6, 4.5, 6.0, "Highly-attenuated pale lager without strong flavors, well-balanced and easily drinkable."),
            style("03A", "Czech Pale Lager", 1.028, 1.044, 1.008, 1.014, 20, 35, 3, 6, 3.0, 4.1, "Lighter-bodied, rich, refreshing, hoppy Czech lager."),
            style("03B", "Czech Premium Pale Lager", 1.044, 1.060, 1.013, 1.017, 30, 45, 3.5, 6, 4.2, 5.8, "Rich, characterful, pale Czech lager with bready malt and spicy Saaz hops."),
            style("04A", "Munich Helles", 1.044, 1.048, 1.006, 1.012, 16, 22, 3, 5, 4.7, 5.4, "Clean, malty, gold-colored German lager with a smooth, grainy-sweet pilsner malt flavor."),
            style("04B", "Festbier", 1.054, 1.057, 1.010, 1.012, 18, 25, 4, 6, 5.8, 6.3, "Smooth, clean, pale German lager with moderately strong malty flavor and light hop balance."),
            style("05B", "Kölsch", 1.044, 1.050, 1.007, 1.011, 18, 30, 3.5, 5, 4.4, 5.2, "Subtle, brilliantly clear, pale beer with delicate fruitiness and crisp dry finish."),
            style("05D", "German Pils", 1.044, 1.050, 1.008, 1.013, 22, 40, 2, 4, 4.4, 5.2, "Light-bodied, highly attenuated, gold-colored bottom-fermented bitter German beer."),
            style("06A", "Märzen", 1.054, 1.060, 1.010, 1.014, 18, 24, 8, 17, 5.6, 6.3, "Amber, malty German lager with a clean, rich, toasty, bready malt flavor and restrained bitterness."),
            style("07A", "Vienna Lager", 1.048, 1.055, 1.010, 1.014, 18, 30, 9, 15, 4.7, 5.5, "Moderate-strength amber lager with soft, smooth maltiness and moderate bitterness."),
            style("08A", "Munich Dunkel", 1.048, 1.056, 1.010, 1.016, 18, 28, 17, 28, 4.5, 5.6, "Deep copper to dark brown German lager with rich Munich malt crust and chocolate notes."),
            style("08B", "Schwarzbier", 1.046, 1.052, 1.010, 1.016, 20, 35, 19, 30, 4.4, 5.4, "Dark German lager balancing roasted yet smooth malt flavors with moderate hop bitterness."),
            style("09A", "Doppelbock", 1.072, 1.112, 1.016, 1.024, 16, 26, 6, 25, 7.0, 10.0, "Strong, rich, and very malty German lager with deep melanoidin complexity."),
            style("10A", "Weissbier", 1.044, 1.053, 1.008, 1.014, 8, 15, 2, 6, 4.3, 5.6, "Pale, refreshing German wheat beer with high carbonation, dry finish, and banana-clove yeast character."),
            style("10B", "Dunkles Weissbier", 1.044, 1.057, 1.008, 1.014, 10, 18, 14, 23, 4.3, 5.6, "Moderately dark German wheat beer with distinctive banana-clove yeast and caramel/bread malt."),
            style("11A", "Ordinary Bitter", 1.030, 1.039, 1.007, 1.011, 25, 35, 8, 14, 3.2, 3.8, "Low-gravity, low-alcohol session British ale with malt-hop balance."),
            style("11B", "Best Bitter", 1.040, 1.048, 1.008, 1.012, 25, 40, 8, 16, 3.8, 4.6, "Flavorful, yet refreshing, session British ale with balanced malt and earthy hops."),
            style("11C", "Strong Bitter", 1.048, 1.060, 1.010, 1.016, 30, 50, 8, 18, 4.6, 6.2, "Average-strength to moderately-strong British bitter ale (ESB) with rich malt and hop balance."),
            style("13B", "British Brown Ale", 1.040, 1.052, 1.008, 1.013, 20, 30, 12, 22, 4.2, 5.9, "Malty, brown caramel-centric British ale without roasted astringency."),
            style("13C", "English Porter", 1.040, 1.052, 1.008, 1.014, 18, 35, 20, 30, 4.0, 5.4, "Moderate-strength brown beer with restrained roast, chocolate, and caramel character."),
            style("15A", "Irish Red Ale", 1.036, 1.046, 1.010, 1.014, 18, 28, 9, 14, 3.8, 5.0, "Easy-drinking pint with subtle caramel sweetness, toasty palate, and dry roasted finish."),
            style("15B", "Irish Stout", 1.036, 1.044, 1.007, 1.011, 25, 45, 25, 40, 4.0, 4.5, "Black beer with pronounced roasted flavor, often similar to coffee, and creamy head."),
            style("16A", "Sweet Stout", 1.044, 1.060, 1.012, 1.024, 20, 40, 30, 40, 4.0, 6.0, "Very dark, sweet, full-bodied, slightly roasty ale (Milk Stout)."),
            style("16B", "Oatmeal Stout", 1.045, 1.065, 1.010, 1.018, 25, 40, 22, 40, 4.2, 5.9, "Very dark, full-bodied, roasty, malty ale with complementary oatmeal smoothness."),
            style("18A", "Blonde Ale", 1.038, 1.054, 1.008, 1.013, 15, 28, 3, 6, 3.8, 5.5, "Easy-drinking, approachable, malt-oriented American craft beer."),
            style("18B", "American Pale Ale", 1.045, 1.060, 1.010, 1.015, 30, 50, 5, 10, 4.5, 6.2, "Refreshing, hop-forward pale ale with clean malt support."),
            style("19A", "American Amber Ale", 1.045, 1.060, 1.010, 1.015, 25, 40, 10, 17, 4.5, 6.2, "Amber, hoppy, moderate-strength American craft beer with caramel malty flavor."),
            style("20A", "American Porter", 1.050, 1.070, 1.012, 1.018, 25, 50, 22, 40, 4.8, 6.5, "Substantial, malty dark beer with complex and flavorful dark malt character."),
            style("20B", "American Stout", 1.050, 1.075, 1.010, 1.022, 35, 75, 30, 40, 5.0, 7.0, "Fairly strong, highly roasted, bitter, hoppy dark stout."),
            style("21A", "American IPA", 1.056, 1.070, 1.008, 1.014, 40, 70, 6, 14, 5.5, 7.5, "Decidedly hoppy and bitter, moderately strong American pale ale."),
            style("21B", "Specialty IPA (Black/Red/Rye/White)", 1.056, 1.075, 1.008, 1.018, 40, 70, 5, 35, 5.5, 7.5, "Hop-forward IPA showcasing specialty malts or adjunct grains."),
            style("21C", "Hazy IPA", 1.060, 1.085, 1.010, 1.015, 25, 60, 3, 7, 6.0, 9.0, "Intense fruit-forward hop aroma and flavor with soft, silky mouthfeel."),
            style("22A", "Double IPA", 1.065, 1.085, 1.008, 1.018, 60, 100, 6, 14, 7.5, 10.0, "Intensely hoppy, fairly strong, bitter pale ale with clean dry finish."),
            style("23A", "Berliner Weisse", 1.028, 1.032, 1.003, 1.006, 3, 8, 2, 3, 2.8, 3.8, "Very pale, refreshing, low-alcohol German wheat beer with clean lactic sourness."),
            style("23G", "Gose", 1.036, 1.056, 1.006, 1.010, 5, 12, 3, 4, 4.2, 4.8, "Tart, fruity, refreshing wheat ale with restrained coriander and salt character."),
            style("24A", "Witbier", 1.044, 1.052, 1.008, 1.012, 8, 20, 2, 4, 4.5, 5.5, "Refreshing, elegant, tasty, moderate-strength wheat-based Belgian ale spiced with coriander and orange peel."),
            style("24B", "Belgian Pale Ale", 1.048, 1.054, 1.010, 1.014, 20, 30, 8, 14, 4.8, 5.5, "Moderately malty, somewhat fruity, easy-drinking, copper-colored Belgian ale."),
            style("25B", "Saison", 1.048, 1.065, 1.002, 1.008, 20, 35, 5, 14, 5.0, 7.0, "Pale, refreshing, highly-attenuated, moderately-bitter Belgian farmhouse ale with peppery/fruity yeast."),
            style("26B", "Belgian Dubbel", 1.062, 1.075, 1.008, 1.018, 15, 25, 10, 17, 6.0, 7.6, "Deep reddish-copper, moderately strong, malty, complex Trappist ale with rich dark fruit esters."),
            style("26C", "Belgian Tripel", 1.075, 1.085, 1.008, 1.014, 20, 40, 4.5, 7, 7.5, 9.5, "Pale, somewhat spicy, dry, strong Trappist ale with a pleasant rounded malt flavor and firm bitterness."),
            style("26D", "Belgian Dark Strong Ale", 1.075, 1.110, 1.010, 1.024, 20, 35, 12, 22, 8.0, 12.0, "Dark, complex, very strong Belgian ale with rich malts, dark fruits, and spicy phenols."),
            style("30A", "Spice, Herb, or Vegetable Beer", 1.030, 1.110, 1.006, 1.030, 5, 70, 2, 40, 3.0, 12.0, "Harmonious marriage of spices, herbs, or vegetables with an underlying base beer style.")
        );

        List<BjcpStyle> existing = styleRepo.findAll();
        int addedCount = 0;
        for (BjcpStyle candidate : catalog) {
            boolean exists = existing.stream().anyMatch(e ->
                    e.getName() != null && e.getName().equalsIgnoreCase(candidate.getName()) &&
                    ((e.getCategoryNumber() == null && candidate.getCategoryNumber() == null) ||
                     (e.getCategoryNumber() != null && e.getCategoryNumber().equalsIgnoreCase(candidate.getCategoryNumber()))));
            if (!exists) {
                styleRepo.save(candidate);
                addedCount++;
            }
        }
        styleRepo.flush();
        System.out.println("[DataSeederService] BJCP Styles in SQLite: " + styleRepo.count() + " (newly seeded: " + addedCount + ")");

        if (inventoryRepo.count() == 0) {
            inventoryRepo.saveAll(List.of(
                inv("Fermentable", "Pale Ale Malt (2-Row)", 25.0, "kg", 3.0),
                inv("Fermentable", "Pilsner Malt", 25.0, "kg", 1.8),
                inv("Fermentable", "Munich Malt (10L)", 5.0, "kg", 10.0),
                inv("Fermentable", "Caramel/Crystal 40L", 3.0, "kg", 40.0),
                inv("Fermentable", "Flaked Oats", 3.0, "kg", 1.5),
                inv("Fermentable", "Roasted Barley", 2.0, "kg", 300.0),
                inv("Hop", "Cascade", 250.0, "g", 6.0),
                inv("Hop", "Citra", 300.0, "g", 12.5),
                inv("Hop", "Mosaic", 200.0, "g", 11.8),
                inv("Hop", "Saaz", 200.0, "g", 3.8),
                inv("Hop", "East Kent Goldings", 150.0, "g", 5.0),
                inv("Yeast", "Safale US-05 (Fermentis)", 5.0, "pkg", 78.0),
                inv("Yeast", "Saflager W-34/70 (Fermentis)", 4.0, "pkg", 80.0),
                inv("Yeast", "Safale S-04 (Fermentis)", 3.0, "pkg", 75.0),
                inv("Misc", "Irish Moss / Whirlfloc", 50.0, "g", 15.0),
                inv("Misc", "Gypsum (CaSO4)", 200.0, "g", 0.0),
                inv("Misc", "Calcium Chloride (CaCl2)", 200.0, "g", 0.0)
            ));
        }

        if (fermRepo.count() == 0) {
            FermentationProfile aleStd = new FermentationProfile();
            aleStd.setName("Ale Standard + Dry Hop & Cold Crash");
            aleStd.setDescription("Clean American/British Ale fermentation with dry hop charge and cold crash.");
            aleStd.setSteps(List.of(
                fstep(1, "Primary Fermentation", "Hold", 5, 19.0, 19.0, "", "Pitch healthy yeast at 19°C"),
                fstep(2, "Diacetyl Rest & Dry Hop", "Ramp", 4, 19.0, 21.0, "Dry Hop Charge (Day 5)", "Ramp to 21°C to finish attenuation and extract hop aroma"),
                fstep(3, "Cold Crash", "Ramp", 3, 21.0, 2.0, "", "Drop to 2°C for clarity before packaging")
            ));

            FermentationProfile neipa = new FermentationProfile();
            neipa.setName("Hazy NEIPA Biotransformation Schedule");
            neipa.setDescription("Two-stage dry hop schedule (active fermentation + post-fermentation).");
            neipa.setSteps(List.of(
                fstep(1, "Active Primary + Biotransformation DH", "Hold", 3, 20.0, 20.0, "Dry Hop #1 (Day 2 High Krausen)", "Biotransformation hop addition"),
                fstep(2, "Finish & Second Dry Hop", "Ramp", 4, 20.0, 21.5, "Dry Hop #2 (Day 4)", "Flush headspace with CO2"),
                fstep(3, "Soft Cold Crash", "Ramp", 2, 21.5, 4.0, "", "Drop to 4°C to settle hop matter")
            ));

            FermentationProfile lager = new FermentationProfile();
            lager.setName("Classic German Lager (Fast Ramp)");
            lager.setDescription("Cool lager fermentation with diacetyl rest and cold lagering.");
            lager.setSteps(List.of(
                fstep(1, "Primary Lager Fermentation", "Hold", 7, 10.0, 10.0, "", "Ferment until ~75% attenuation"),
                fstep(2, "Diacetyl Rest Ramp", "Ramp", 3, 10.0, 16.0, "", "Raise temperature to clean up diacetyl"),
                fstep(3, "Cold Lagering", "Ramp", 14, 16.0, 1.0, "", "Condition cold for crisp lager profile")
            ));

            fermRepo.saveAll(List.of(aleStd, neipa, lager));
        }

        if (carbRepo.count() == 0) {
            carbRepo.saveAll(List.of(
                carb("Keg Forced Carbonation — Standard Ale / IPA (2.4 Vol)", "Forced", 2.4, 4.0, "None (CO2 Cylinder)", 0.0, 11.3, 0.78, 5, "Set regulator to ~11.3 PSI at 4°C for 5–7 days."),
                carb("Keg Forced Carbonation — Pilsner / Crisp Lager (2.6 Vol)", "Forced", 2.6, 3.0, "None (CO2 Cylinder)", 0.0, 12.2, 0.84, 7, "Crisp, lively carbonation at 3°C."),
                carb("Keg Forced Carbonation — British Ale / Stout (1.9 Vol)", "Forced", 1.9, 6.0, "None (CO2 Cylinder)", 0.0, 7.6, 0.52, 5, "Lower cask-style carbonation."),
                carb("Bottle Conditioning — Corn Sugar / Dextrose (2.4 Vol)", "Priming", 2.4, 20.0, "Corn Sugar (Dextrose)", 6.2, 0.0, 0.0, 14, "Dissolve dextrose in boiled water, bottle and store at 20°C for 2 weeks."),
                carb("Bottle Conditioning — Table Sugar / Sucrose (2.4 Vol)", "Priming", 2.4, 20.0, "Table Sugar (Sucrose)", 5.9, 0.0, 0.0, 14, "Standard sucrose priming for 2.4 volumes CO2 at 20°C."),
                carb("Bottle Conditioning — Wheat / Belgian High Carb (3.0 Vol)", "Priming", 3.0, 20.0, "Corn Sugar (Dextrose)", 8.6, 0.0, 0.0, 14, "Use heavy-duty bottles rated for higher pressure.")
            ));
        }

        if (recipeRepo.count() == 0) {
            Recipe starter = new Recipe();
            starter.setName("Sierra Nevada Style Pale Ale");
            starter.setBrewer("Y&B Crew Beer C.O.");
            starter.setType("All Grain");
            starter.setStyle("18B - American Pale Ale");
            starter.setBatchSizeLiters(20.0);
            starter.setBoilSizeLiters(24.0);
            starter.setBoilTimeMinutes(60.0);
            starter.setEfficiencyPercent(75.0);
            starter.setNotes("Single infusion mash at 66°C for 60 min. Ferment at 19°C with US-05.");

            Fermentable f1 = new Fermentable();
            f1.setName("Pale Ale Malt (2-Row)");
            f1.setAmountKg(4.5);
            f1.setYieldPercent(80.0);
            f1.setColorLovibond(3.0);

            Fermentable f2 = new Fermentable();
            f2.setName("Caramel/Crystal 40L");
            f2.setAmountKg(0.35);
            f2.setYieldPercent(74.0);
            f2.setColorLovibond(40.0);

            Hop h1 = new Hop();
            h1.setName("Magnum");
            h1.setAmountGrams(15.0);
            h1.setAlphaAcidPercent(12.0);
            h1.setBoilTimeMinutes(60.0);
            h1.setUseType("Boil");

            Hop h2 = new Hop();
            h2.setName("Cascade");
            h2.setAmountGrams(30.0);
            h2.setAlphaAcidPercent(6.0);
            h2.setBoilTimeMinutes(15.0);
            h2.setUseType("Boil");

            Hop h3 = new Hop();
            h3.setName("Cascade");
            h3.setAmountGrams(30.0);
            h3.setAlphaAcidPercent(6.0);
            h3.setBoilTimeMinutes(0.0);
            h3.setUseType("Dry Hop");

            Yeast y1 = new Yeast();
            y1.setName("Safale US-05");
            y1.setLaboratory("Fermentis");
            y1.setProductId("US-05");
            y1.setAttenuationPercent(78.0);

            Misc m1 = new Misc();
            m1.setName("Whirlfloc Tablet");
            m1.setType("Fining");
            m1.setUseType("Boil");
            m1.setAmount(1.0);
            m1.setUnit("item");
            m1.setTimeMinutes(15.0);

            MashStep s1 = new MashStep();
            s1.setStepOrder(1);
            s1.setName("Saccharification Rest");
            s1.setType("Infusion");
            s1.setInfuseAmountLiters(14.5);
            s1.setTargetTempC(66.0);
            s1.setStepTimeMinutes(60.0);

            MashStep s2 = new MashStep();
            s2.setStepOrder(2);
            s2.setName("Mash Out");
            s2.setType("Infusion");
            s2.setInfuseAmountLiters(6.0);
            s2.setTargetTempC(75.6);
            s2.setStepTimeMinutes(10.0);

            starter.setFermentables(List.of(f1, f2));
            starter.setHops(List.of(h1, h2, h3));
            starter.setYeasts(List.of(y1));
            starter.setMiscs(List.of(m1));
            starter.setMashSteps(List.of(s1, s2));

            mathService.calculateRecipeMetrics(starter);
            recipeRepo.save(starter);
        }
    }

    private WaterProfile water(String name, double ca, double hco3, double so4, double cl, double na, double mg, double ph) {
        WaterProfile w = new WaterProfile();
        w.setName(name); w.setCalciumPpm(ca); w.setBicarbonatePpm(hco3);
        w.setSulfatePpm(so4); w.setChloridePpm(cl); w.setSodiumPpm(na);
        w.setMagnesiumPpm(mg); w.setPh(ph);
        return w;
    }

    private BjcpStyle style(String cat, String name, double ogMin, double ogMax, double fgMin, double fgMax,
                            double ibuMin, double ibuMax, double srmMin, double srmMax, double abvMin, double abvMax, String notes) {
        BjcpStyle s = new BjcpStyle();
        s.setCategoryNumber(cat); s.setName(name);
        s.setOgMin(ogMin); s.setOgMax(ogMax); s.setFgMin(fgMin); s.setFgMax(fgMax);
        s.setIbuMin(ibuMin); s.setIbuMax(ibuMax); s.setSrmMin(srmMin); s.setSrmMax(srmMax);
        s.setAbvMin(abvMin); s.setAbvMax(abvMax); s.setNotes(notes);
        return s;
    }

    private InventoryItem inv(String cat, String name, double qty, String unit, double spec) {
        InventoryItem i = new InventoryItem();
        i.setCategory(cat); i.setName(name); i.setQuantity(qty); i.setUnit(unit); i.setAlphaOrColorOrAtten(spec);
        return i;
    }

    private FermentationStep fstep(int order, String name, String type, double days, double startC, double endC, String dryHop, String notes) {
        FermentationStep s = new FermentationStep();
        s.setStepOrder(order); s.setName(name); s.setStepType(type);
        s.setDurationDays(days); s.setStartTempC(startC); s.setEndTempC(endC);
        s.setDryHopAddition(dryHop); s.setNotes(notes);
        return s;
    }

    private CarbonationProfile carb(String name, String type, double co2, double tempC, String agent, double gPerL, double psi, double bar, int days, String notes) {
        CarbonationProfile c = new CarbonationProfile();
        c.setName(name); c.setType(type); c.setTargetCo2Volumes(co2); c.setTemperatureC(tempC);
        c.setPrimingAgent(agent); c.setPrimingRateGramsPerLiter(gPerL);
        c.setKegPressurePsi(psi); c.setKegPressureBar(bar);
        c.setConditioningDays(days); c.setNotes(notes);
        return c;
    }
}
