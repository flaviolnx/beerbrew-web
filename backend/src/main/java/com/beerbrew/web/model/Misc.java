package com.beerbrew.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "miscs")
public class Misc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type = "Fining";
    private String useType = "Boil";
    private double amount;
    private String unit = "g";
    private double timeMinutes;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getUseType() { return useType; }
    public void setUseType(String useType) { this.useType = useType; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public double getTimeMinutes() { return timeMinutes; }
    public void setTimeMinutes(double timeMinutes) { this.timeMinutes = timeMinutes; }
}
