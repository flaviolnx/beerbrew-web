package com.beerbrew.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "hops")
public class Hop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String form = "Pellet";
    private double amountGrams;
    private double alphaAcidPercent;
    private double boilTimeMinutes;
    private String useType = "Boil";
    private double inventoryGrams = 0.0;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getForm() { return form; }
    public void setForm(String form) { this.form = form; }
    public double getAmountGrams() { return amountGrams; }
    public void setAmountGrams(double amountGrams) { this.amountGrams = amountGrams; }
    public double getAlphaAcidPercent() { return alphaAcidPercent; }
    public void setAlphaAcidPercent(double alphaAcidPercent) { this.alphaAcidPercent = alphaAcidPercent; }
    public double getBoilTimeMinutes() { return boilTimeMinutes; }
    public void setBoilTimeMinutes(double boilTimeMinutes) { this.boilTimeMinutes = boilTimeMinutes; }
    public String getUseType() { return useType; }
    public void setUseType(String useType) { this.useType = useType; }
    public double getInventoryGrams() { return inventoryGrams; }
    public void setInventoryGrams(double inventoryGrams) { this.inventoryGrams = inventoryGrams; }
}
