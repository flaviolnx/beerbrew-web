package com.brewtarget.web.service;

import com.brewtarget.web.model.Fermentable;
import com.brewtarget.web.model.Hop;
import com.brewtarget.web.model.Recipe;
import org.springframework.stereotype.Service;

@Service
public class BrewMathService {

    public void calculateRecipeMetrics(Recipe recipe) {
        double batchLiters = Math.max(recipe.getBatchSizeLiters(), 0.1);
        double batchGallons = batchLiters * 0.264172;
        double efficiency = recipe.getEfficiencyPercent() / 100.0;

        // 1. Original Gravity (OG) & Malt Color Units (MCU)
        double totalGravityPoints = 0.0;
        double totalMcu = 0.0;

        for (Fermentable f : recipe.getFermentables()) {
            // Pure sucrose = ~384 liter-degrees per kg
            double points = f.getAmountKg() * (f.getYieldPercent() / 100.0) * 384.0 * efficiency;
            totalGravityPoints += points;

            double weightLbs = f.getAmountKg() * 2.20462;
            totalMcu += (weightLbs * f.getColorLovibond()) / batchGallons;
        }

        double og = 1.0 + (totalGravityPoints / batchLiters) / 1000.0;
        double fg = 1.0 + ((og - 1.0) * (1.0 - (recipe.getYeastAttenuationPercent() / 100.0)));
        double abv = (og - fg) * 131.25;

        // 2. Color in SRM (Morey equation)
        double srm = totalMcu > 0 ? 1.4922 * Math.pow(totalMcu, 0.6859) : 0.0;

        // 3. Bitterness in IBU (Tinseth formula)
        double totalIbu = 0.0;
        for (Hop h : recipe.getHops()) {
            if (!"Boil".equalsIgnoreCase(h.getUseType())) {
                continue;
            }
            double bignessFactor = 1.65 * Math.pow(0.000125, og - 1.0);
            double boilTimeFactor = (1.0 - Math.exp(-0.04 * h.getBoilTimeMinutes())) / 4.15;
            double utilization = bignessFactor * boilTimeFactor;

            double mgPerLiterAlpha = (h.getAmountGrams() * (h.getAlphaAcidPercent() / 100.0) * 1000.0) / batchLiters;
            totalIbu += mgPerLiterAlpha * utilization;
        }

        recipe.setOg(round(og, 3));
        recipe.setFg(round(fg, 3));
        recipe.setAbv(round(abv, 1));
        recipe.setIbu(round(totalIbu, 1));
        recipe.setSrm(round(srm, 1));
    }

    private double round(double val, int decimals) {
        double factor = Math.pow(10, decimals);
        return Math.round(val * factor) / factor;
    }
}