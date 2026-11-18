package com.beerbrew.web.service;

import com.beerbrew.web.model.Fermentable;
import com.beerbrew.web.model.Hop;
import com.beerbrew.web.model.Recipe;
import com.beerbrew.web.model.Yeast;
import org.springframework.stereotype.Service;

@Service
public class BrewMathService {

    public void calculateRecipeMetrics(Recipe recipe) {
        double batchLiters = Math.max(recipe.getBatchSizeLiters(), 0.1);
        double batchGallons = batchLiters * 0.264172;
        double efficiency = recipe.getEfficiencyPercent() / 100.0;

        double totalGravityPoints = 0.0;
        double totalMcu = 0.0;

        for (Fermentable f : recipe.getFermentables()) {
            double effectiveEff = ("Sugar".equalsIgnoreCase(f.getType()) || "Extract".equalsIgnoreCase(f.getType()) || "Dry Extract".equalsIgnoreCase(f.getType()))
                    ? 1.0 : efficiency;
            double points = f.getAmountKg() * (f.getYieldPercent() / 100.0) * 384.0 * effectiveEff;
            totalGravityPoints += points;

            double weightLbs = f.getAmountKg() * 2.20462;
            totalMcu += (weightLbs * f.getColorLovibond()) / batchGallons;
        }

        double attenuation = recipe.getYeastAttenuationPercent();
        if (recipe.getYeasts() != null && !recipe.getYeasts().isEmpty()) {
            attenuation = recipe.getYeasts().stream()
                    .mapToDouble(Yeast::getAttenuationPercent)
                    .max()
                    .orElse(attenuation);
            recipe.setYeastAttenuationPercent(attenuation);
        }

        double og = 1.0 + (totalGravityPoints / batchLiters) / 1000.0;
        double fg = 1.0 + ((og - 1.0) * (1.0 - (attenuation / 100.0)));
        double abv = (og - fg) * 131.25;
        double srm = totalMcu > 0 ? 1.4922 * Math.pow(totalMcu, 0.6859) : 0.0;

        double totalIbu = 0.0;
        boolean useRager = "Rager".equalsIgnoreCase(recipe.getIbuFormula());
        for (Hop h : recipe.getHops()) {
            double effectiveBoilMin = switch (h.getUseType() == null ? "Boil" : h.getUseType()) {
                case "First Wort" -> recipe.getBoilTimeMinutes() + 5.0;
                case "Boil" -> h.getBoilTimeMinutes();
                case "Aroma/Whirlpool" -> Math.min(h.getBoilTimeMinutes(), 15.0) * 0.5;
                default -> 0.0;
            };
            if (effectiveBoilMin <= 0) continue;

            double formMultiplier = "Pellet".equalsIgnoreCase(h.getForm()) ? 1.10 : 1.0;

            if (useRager) {
                totalIbu += calculateRagerIbu(h.getAmountGrams(), h.getAlphaAcidPercent(), effectiveBoilMin, og, batchLiters) * formMultiplier;
            } else {
                double bignessFactor = 1.65 * Math.pow(0.000125, og - 1.0);
                double boilTimeFactor = (1.0 - Math.exp(-0.04 * effectiveBoilMin)) / 4.15;
                double utilization = bignessFactor * boilTimeFactor * formMultiplier;
                double mgPerLiterAlpha = (h.getAmountGrams() * (h.getAlphaAcidPercent() / 100.0) * 1000.0) / batchLiters;
                totalIbu += mgPerLiterAlpha * utilization;
            }
        }

        recipe.setOg(round(og, 3));
        recipe.setFg(round(fg, 3));
        recipe.setAbv(round(abv, 1));
        recipe.setIbu(round(totalIbu, 1));
        recipe.setSrm(round(srm, 1));
        recipe.setCaloriesPer355ml(round(calculateCaloriesPer355ml(og, fg), 0));
    }

    public double calculateRagerIbu(double grams, double alphaPercent, double boilMinutes, double og, double batchLiters) {
        double utilization = 18.11 + 13.86 * Math.tanh((boilMinutes - 31.32) / 18.27);
        double ga = og > 1.050 ? (og - 1.050) / 0.2 : 0.0;
        return (grams * (utilization / 100.0) * (alphaPercent / 100.0) * 1000.0) / (batchLiters * (1.0 + ga));
    }

    public double calculateStrikeTempC(double targetMashTempC, double grainTempC, double waterToGrainRatioLPerKg) {
        double ratio = Math.max(waterToGrainRatioLPerKg, 0.5);
        return (0.41 / ratio) * (targetMashTempC - grainTempC) + targetMashTempC;
    }

    public double calculateInfusionVolumeLiters(double currentTempC, double targetTempC, double boilingWaterTempC,
                                                double grainWeightKg, double currentWaterVolumeLiters) {
        double denom = Math.max(boilingWaterTempC - targetTempC, 1.0);
        return ((targetTempC - currentTempC) * (0.41 * grainWeightKg + currentWaterVolumeLiters)) / denom;
    }

    public double calculateRefractometerFg(double originalBrix, double currentBrix, double wortCorrectionFactor) {
        double wcf = Math.max(wortCorrectionFactor, 0.5);
        double ob = originalBrix / wcf;
        double cb = currentBrix / wcf;
        return 1.0000 - 0.0044993 * ob + 0.011774 * cb
                + 0.00027581 * Math.pow(ob, 2) - 0.0012717 * Math.pow(cb, 2)
                - 0.0000072800 * Math.pow(ob, 3) + 0.000063293 * Math.pow(cb, 3);
    }

    public double calculatePrimingSugarGrams(double batchLiters, double beerTempC, double targetCo2Volumes) {
        double residualCo2 = 3.0378 - (0.050062 * beerTempC) + (0.00026555 * Math.pow(beerTempC, 2));
        double neededCo2 = Math.max(0.0, targetCo2Volumes - residualCo2);
        return neededCo2 * batchLiters * 4.0;
    }

    public double correctHydrometerReading(double measuredSg, double sampleTempC, double calibrationTempC) {
        double cSample = 1.00130346 - 0.000134722124 * sampleTempC + 0.00000204052596 * Math.pow(sampleTempC, 2) - 2.32820948e-9 * Math.pow(sampleTempC, 3);
        double cCalib = 1.00130346 - 0.000134722124 * calibrationTempC + 0.00000204052596 * Math.pow(calibrationTempC, 2) - 2.32820948e-9 * Math.pow(calibrationTempC, 3);
        return measuredSg * (cSample / cCalib);
    }

    public double calculateCaloriesPer355ml(double og, double fg) {
        if (og <= 1.0 || fg <= 0.99) return 0.0;
        double realExtract = 0.1808 * sgToPlato(og) + 0.8192 * sgToPlato(fg);
        double abw = (sgToPlato(og) - realExtract) / (2.0665 - 0.010665 * sgToPlato(og));
        double caloriesPer100g = (6.9 * abw + 4.0 * (realExtract - 0.1)) * fg;
        return Math.max(0.0, caloriesPer100g * 3.55);
    }

    public double sgToPlato(double sg) {
        return -616.868 + 1111.14 * sg - 630.272 * Math.pow(sg, 2) + 135.997 * Math.pow(sg, 3);
    }

    private double round(double val, int decimals) {
        double factor = Math.pow(10, decimals);
        return Math.round(val * factor) / factor;
    }
}
