package com.beerbrew.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "carbonation_profiles")
public class CarbonationProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type = "Forced"; // Forced or Priming
    private double targetCo2Volumes = 2.4;
    private double temperatureC = 4.0; // Serving/keg temp for Forced, or bottling temp for Priming
    private String primingAgent = "Corn Sugar (Dextrose)"; // Corn Sugar (Dextrose), Table Sugar (Sucrose), Dry Malt Extract (DME)
    private double primingRateGramsPerLiter = 0.0;
    private double kegPressurePsi = 11.5;
    private double kegPressureBar = 0.79;
    private int conditioningDays = 7;
    private String notes = "";

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public double getTargetCo2Volumes() { return targetCo2Volumes; }
    public void setTargetCo2Volumes(double targetCo2Volumes) { this.targetCo2Volumes = targetCo2Volumes; }
    public double getTemperatureC() { return temperatureC; }
    public void setTemperatureC(double temperatureC) { this.temperatureC = temperatureC; }
    public String getPrimingAgent() { return primingAgent; }
    public void setPrimingAgent(String primingAgent) { this.primingAgent = primingAgent; }
    public double getPrimingRateGramsPerLiter() { return primingRateGramsPerLiter; }
    public void setPrimingRateGramsPerLiter(double primingRateGramsPerLiter) { this.primingRateGramsPerLiter = primingRateGramsPerLiter; }
    public double getKegPressurePsi() { return kegPressurePsi; }
    public void setKegPressurePsi(double kegPressurePsi) { this.kegPressurePsi = kegPressurePsi; }
    public double getKegPressureBar() { return kegPressureBar; }
    public void setKegPressureBar(double kegPressureBar) { this.kegPressureBar = kegPressureBar; }
    public int getConditioningDays() { return conditioningDays; }
    public void setConditioningDays(int conditioningDays) { this.conditioningDays = conditioningDays; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
