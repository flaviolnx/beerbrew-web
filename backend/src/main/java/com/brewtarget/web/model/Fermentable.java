package com.brewtarget.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "fermentables")
public class Fermentable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double amountKg;
    private double yieldPercent = 80.0; // Extract potential (e.g., 80% for 2-Row)
    private double colorLovibond = 2.0;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getAmountKg() { return amountKg; }
    public void setAmountKg(double amountKg) { this.amountKg = amountKg; }
    public double getYieldPercent() { return yieldPercent; }
    public void setYieldPercent(double yieldPercent) { this.yieldPercent = yieldPercent; }
    public double getColorLovibond() { return colorLovibond; }
    public void setColorLovibond(double colorLovibond) { this.colorLovibond = colorLovibond; }
}