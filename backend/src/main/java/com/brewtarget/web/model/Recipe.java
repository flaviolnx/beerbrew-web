package com.brewtarget.web.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String style;
    private double batchSizeLiters = 20.0;
    private double boilTimeMinutes = 60.0;
    private double efficiencyPercent = 75.0;
    private double yeastAttenuationPercent = 75.0;

    // Calculated fields populated by BrewMathService
    private double og;
    private double fg;
    private double abv;
    private double ibu;
    private double srm;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "recipe_id")
    private List<Fermentable> fermentables = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "recipe_id")
    private List<Hop> hops = new ArrayList<>();

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getStyle() { return style; }
    public void setStyle(String style) { this.style = style; }
    public double getBatchSizeLiters() { return batchSizeLiters; }
    public void setBatchSizeLiters(double batchSizeLiters) { this.batchSizeLiters = batchSizeLiters; }
    public double getBoilTimeMinutes() { return boilTimeMinutes; }
    public void setBoilTimeMinutes(double boilTimeMinutes) { this.boilTimeMinutes = boilTimeMinutes; }
    public double getEfficiencyPercent() { return efficiencyPercent; }
    public void setEfficiencyPercent(double efficiencyPercent) { this.efficiencyPercent = efficiencyPercent; }
    public double getYeastAttenuationPercent() { return yeastAttenuationPercent; }
    public void setYeastAttenuationPercent(double yeastAttenuationPercent) { this.yeastAttenuationPercent = yeastAttenuationPercent; }
    public double getOg() { return og; }
    public void setOg(double og) { this.og = og; }
    public double getFg() { return fg; }
    public void setFg(double fg) { this.fg = fg; }
    public double getAbv() { return abv; }
    public void setAbv(double abv) { this.abv = abv; }
    public double getIbu() { return ibu; }
    public void setIbu(double ibu) { this.ibu = ibu; }
    public double getSrm() { return srm; }
    public void setSrm(double srm) { this.srm = srm; }
    public List<Fermentable> getFermentables() { return fermentables; }
    public void setFermentables(List<Fermentable> fermentables) { this.fermentables = fermentables; }
    public List<Hop> getHops() { return hops; }
    public void setHops(List<Hop> hops) { this.hops = hops; }
}