package com.beerbrew.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "fermentables")
public class Fermentable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type = "Grain";
    private double amountKg;
    private double yieldPercent = 80.0;
    private double colorLovibond = 2.0;
    private boolean addAfterBoil = false;
    private double inventoryKg = 0.0;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public double getAmountKg() { return amountKg; }
    public void setAmountKg(double amountKg) { this.amountKg = amountKg; }
    public double getYieldPercent() { return yieldPercent; }
    public void setYieldPercent(double yieldPercent) { this.yieldPercent = yieldPercent; }
    public double getColorLovibond() { return colorLovibond; }
    public void setColorLovibond(double colorLovibond) { this.colorLovibond = colorLovibond; }
    public boolean isAddAfterBoil() { return addAfterBoil; }
    public void setAddAfterBoil(boolean addAfterBoil) { this.addAfterBoil = addAfterBoil; }
    public double getInventoryKg() { return inventoryKg; }
    public void setInventoryKg(double inventoryKg) { this.inventoryKg = inventoryKg; }
}
