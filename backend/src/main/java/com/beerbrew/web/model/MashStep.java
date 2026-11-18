package com.beerbrew.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "mash_steps")
public class MashStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int stepOrder;
    private String name;
    private String type = "Infusion";
    private double infuseAmountLiters;
    private double targetTempC;
    private double stepTimeMinutes;
    private double rampTimeMinutes = 2.0;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public int getStepOrder() { return stepOrder; }
    public void setStepOrder(int stepOrder) { this.stepOrder = stepOrder; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public double getInfuseAmountLiters() { return infuseAmountLiters; }
    public void setInfuseAmountLiters(double infuseAmountLiters) { this.infuseAmountLiters = infuseAmountLiters; }
    public double getTargetTempC() { return targetTempC; }
    public void setTargetTempC(double targetTempC) { this.targetTempC = targetTempC; }
    public double getStepTimeMinutes() { return stepTimeMinutes; }
    public void setStepTimeMinutes(double stepTimeMinutes) { this.stepTimeMinutes = stepTimeMinutes; }
    public double getRampTimeMinutes() { return rampTimeMinutes; }
    public void setRampTimeMinutes(double rampTimeMinutes) { this.rampTimeMinutes = rampTimeMinutes; }
}
