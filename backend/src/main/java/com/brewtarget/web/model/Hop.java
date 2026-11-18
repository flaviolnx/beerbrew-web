package com.brewtarget.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "hops")
public class Hop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double amountGrams;
    private double alphaAcidPercent;
    private double boilTimeMinutes;
    private String useType = "Boil"; // Boil, Dry Hop, Whirlpool

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getAmountGrams() { return amountGrams; }
    public void setAmountGrams(double amountGrams) { this.amountGrams = amountGrams; }
    public double getAlphaAcidPercent() { return alphaAcidPercent; }
    public void setAlphaAcidPercent(double alphaAcidPercent) { this.alphaAcidPercent = alphaAcidPercent; }
    public double getBoilTimeMinutes() { return boilTimeMinutes; }
    public void setBoilTimeMinutes(double boilTimeMinutes) { this.boilTimeMinutes = boilTimeMinutes; }
    public String getUseType() { return useType; }
    public void setUseType(String useType) { this.useType = useType; }
}