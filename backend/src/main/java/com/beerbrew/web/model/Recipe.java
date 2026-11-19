package com.beerbrew.web.model;

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
    private String brewer = "Brewer";
    private String type = "All Grain";
    private String style;
    private String ibuFormula = "Tinseth";
    private double batchSizeLiters = 20.0;
    private double boilSizeLiters = 24.0;
    private double boilTimeMinutes = 60.0;
    private double efficiencyPercent = 75.0;
    private double yeastAttenuationPercent = 77.0;
    private String notes = "";

    private double og;
    private double fg;
    private double abv;
    private double ibu;
    private double srm;
    private double caloriesPer355ml;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "equipment_id")
    private EquipmentProfile equipment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "style_id")
    private BjcpStyle bjcpStyle;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "water_id")
    private WaterProfile waterProfile;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "recipe_id")
    private List<Fermentable> fermentables = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "recipe_id")
    private List<Hop> hops = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "recipe_id")
    private List<Yeast> yeasts = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "recipe_id")
    private List<Misc> miscs = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "recipe_id")
    private List<MashStep> mashSteps = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "recipe_id")
    private List<FermentationStep> fermentationSteps = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "carbonation_id")
    private CarbonationProfile carbonationProfile;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getBrewer() { return brewer; }
    public void setBrewer(String brewer) { this.brewer = brewer; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getStyle() { return style; }
    public void setStyle(String style) { this.style = style; }
    public String getIbuFormula() { return ibuFormula; }
    public void setIbuFormula(String ibuFormula) { this.ibuFormula = ibuFormula; }
    public double getBatchSizeLiters() { return batchSizeLiters; }
    public void setBatchSizeLiters(double batchSizeLiters) { this.batchSizeLiters = batchSizeLiters; }
    public double getBoilSizeLiters() { return boilSizeLiters; }
    public void setBoilSizeLiters(double boilSizeLiters) { this.boilSizeLiters = boilSizeLiters; }
    public double getBoilTimeMinutes() { return boilTimeMinutes; }
    public void setBoilTimeMinutes(double boilTimeMinutes) { this.boilTimeMinutes = boilTimeMinutes; }
    public double getEfficiencyPercent() { return efficiencyPercent; }
    public void setEfficiencyPercent(double efficiencyPercent) { this.efficiencyPercent = efficiencyPercent; }
    public double getYeastAttenuationPercent() { return yeastAttenuationPercent; }
    public void setYeastAttenuationPercent(double yeastAttenuationPercent) { this.yeastAttenuationPercent = yeastAttenuationPercent; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
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
    public double getCaloriesPer355ml() { return caloriesPer355ml; }
    public void setCaloriesPer355ml(double caloriesPer355ml) { this.caloriesPer355ml = caloriesPer355ml; }
    public EquipmentProfile getEquipment() { return equipment; }
    public void setEquipment(EquipmentProfile equipment) { this.equipment = equipment; }
    public BjcpStyle getBjcpStyle() { return bjcpStyle; }
    public void setBjcpStyle(BjcpStyle bjcpStyle) { this.bjcpStyle = bjcpStyle; }
    public WaterProfile getWaterProfile() { return waterProfile; }
    public void setWaterProfile(WaterProfile waterProfile) { this.waterProfile = waterProfile; }
    public List<Fermentable> getFermentables() { return fermentables; }
    public void setFermentables(List<Fermentable> fermentables) { this.fermentables = fermentables; }
    public List<Hop> getHops() { return hops; }
    public void setHops(List<Hop> hops) { this.hops = hops; }
    public List<Yeast> getYeasts() { return yeasts; }
    public void setYeasts(List<Yeast> yeasts) { this.yeasts = yeasts; }
    public List<Misc> getMiscs() { return miscs; }
    public void setMiscs(List<Misc> miscs) { this.miscs = miscs; }
    public List<MashStep> getMashSteps() { return mashSteps; }
    public void setMashSteps(List<MashStep> mashSteps) { this.mashSteps = mashSteps; }
    public List<FermentationStep> getFermentationSteps() { return fermentationSteps; }
    public void setFermentationSteps(List<FermentationStep> fermentationSteps) { this.fermentationSteps = fermentationSteps; }
    public CarbonationProfile getCarbonationProfile() { return carbonationProfile; }
    public void setCarbonationProfile(CarbonationProfile carbonationProfile) { this.carbonationProfile = carbonationProfile; }
}
