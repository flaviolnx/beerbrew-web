package com.beerbrew.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "water_profiles")
public class WaterProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double calciumPpm;
    private double bicarbonatePpm;
    private double sulfatePpm;
    private double chloridePpm;
    private double sodiumPpm;
    private double magnesiumPpm;
    private double ph = 7.0;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getCalciumPpm() { return calciumPpm; }
    public void setCalciumPpm(double calciumPpm) { this.calciumPpm = calciumPpm; }
    public double getBicarbonatePpm() { return bicarbonatePpm; }
    public void setBicarbonatePpm(double bicarbonatePpm) { this.bicarbonatePpm = bicarbonatePpm; }
    public double getSulfatePpm() { return sulfatePpm; }
    public void setSulfatePpm(double sulfatePpm) { this.sulfatePpm = sulfatePpm; }
    public double getChloridePpm() { return chloridePpm; }
    public void setChloridePpm(double chloridePpm) { this.chloridePpm = chloridePpm; }
    public double getSodiumPpm() { return sodiumPpm; }
    public void setSodiumPpm(double sodiumPpm) { this.sodiumPpm = sodiumPpm; }
    public double getMagnesiumPpm() { return magnesiumPpm; }
    public void setMagnesiumPpm(double magnesiumPpm) { this.magnesiumPpm = magnesiumPpm; }
    public double getPh() { return ph; }
    public void setPh(double ph) { this.ph = ph; }
}
