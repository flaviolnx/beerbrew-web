package com.beerbrew.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "inventory_items")
public class InventoryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    private String name;
    private double quantity;
    private String unit;
    private double alphaOrColorOrAtten;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getQuantity() { return quantity; }
    public void setQuantity(double quantity) { this.quantity = quantity; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public double getAlphaOrColorOrAtten() { return alphaOrColorOrAtten; }
    public void setAlphaOrColorOrAtten(double alphaOrColorOrAtten) { this.alphaOrColorOrAtten = alphaOrColorOrAtten; }
}
