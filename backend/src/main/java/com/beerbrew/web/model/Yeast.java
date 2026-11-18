package com.beerbrew.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "yeasts")
public class Yeast {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String laboratory;
    private String productId;
    private String type = "Ale";
    private String form = "Dry";
    private double attenuationPercent = 75.0;
    private double minTempC = 18.0;
    private double maxTempC = 22.0;
    private String flocculation = "Medium";
    private double amountPackages = 1.0;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLaboratory() { return laboratory; }
    public void setLaboratory(String laboratory) { this.laboratory = laboratory; }
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getForm() { return form; }
    public void setForm(String form) { this.form = form; }
    public double getAttenuationPercent() { return attenuationPercent; }
    public void setAttenuationPercent(double attenuationPercent) { this.attenuationPercent = attenuationPercent; }
    public double getMinTempC() { return minTempC; }
    public void setMinTempC(double minTempC) { this.minTempC = minTempC; }
    public double getMaxTempC() { return maxTempC; }
    public void setMaxTempC(double maxTempC) { this.maxTempC = maxTempC; }
    public String getFlocculation() { return flocculation; }
    public void setFlocculation(String flocculation) { this.flocculation = flocculation; }
    public double getAmountPackages() { return amountPackages; }
    public void setAmountPackages(double amountPackages) { this.amountPackages = amountPackages; }
}
