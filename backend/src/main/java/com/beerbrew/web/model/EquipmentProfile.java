package com.beerbrew.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "equipment_profiles")
public class EquipmentProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double batchSizeLiters = 20.0;
    private double boilTimeMinutes = 60.0;
    private double evaporationRateLitersPerHour = 3.0;
    private double kettleDeadspaceLiters = 0.5;
    private double lauterDeadspaceLiters = 0.5;
    private double trubChillerLossLiters = 1.0;
    private double grainAbsorptionLitersPerKg = 1.08;
    private double efficiencyPercent = 75.0;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getBatchSizeLiters() { return batchSizeLiters; }
    public void setBatchSizeLiters(double batchSizeLiters) { this.batchSizeLiters = batchSizeLiters; }
    public double getBoilTimeMinutes() { return boilTimeMinutes; }
    public void setBoilTimeMinutes(double boilTimeMinutes) { this.boilTimeMinutes = boilTimeMinutes; }
    public double getEvaporationRateLitersPerHour() { return evaporationRateLitersPerHour; }
    public void setEvaporationRateLitersPerHour(double evaporationRateLitersPerHour) { this.evaporationRateLitersPerHour = evaporationRateLitersPerHour; }
    public double getKettleDeadspaceLiters() { return kettleDeadspaceLiters; }
    public void setKettleDeadspaceLiters(double kettleDeadspaceLiters) { this.kettleDeadspaceLiters = kettleDeadspaceLiters; }
    public double getLauterDeadspaceLiters() { return lauterDeadspaceLiters; }
    public void setLauterDeadspaceLiters(double lauterDeadspaceLiters) { this.lauterDeadspaceLiters = lauterDeadspaceLiters; }
    public double getTrubChillerLossLiters() { return trubChillerLossLiters; }
    public void setTrubChillerLossLiters(double trubChillerLossLiters) { this.trubChillerLossLiters = trubChillerLossLiters; }
    public double getGrainAbsorptionLitersPerKg() { return grainAbsorptionLitersPerKg; }
    public void setGrainAbsorptionLitersPerKg(double grainAbsorptionLitersPerKg) { this.grainAbsorptionLitersPerKg = grainAbsorptionLitersPerKg; }
    public double getEfficiencyPercent() { return efficiencyPercent; }
    public void setEfficiencyPercent(double efficiencyPercent) { this.efficiencyPercent = efficiencyPercent; }
}
