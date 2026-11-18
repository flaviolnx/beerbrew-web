package com.beerbrew.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bjcp_styles")
public class BjcpStyle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String categoryNumber;
    private String styleLetter;
    private String name;
    private String guide = "BJCP 2021";
    private double ogMin;
    private double ogMax;
    private double fgMin;
    private double fgMax;
    private double ibuMin;
    private double ibuMax;
    private double srmMin;
    private double srmMax;
    private double abvMin;
    private double abvMax;
    @Column(length = 2000)
    private String notes;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCategoryNumber() { return categoryNumber; }
    public void setCategoryNumber(String categoryNumber) { this.categoryNumber = categoryNumber; }
    public String getStyleLetter() { return styleLetter; }
    public void setStyleLetter(String styleLetter) { this.styleLetter = styleLetter; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getGuide() { return guide; }
    public void setGuide(String guide) { this.guide = guide; }
    public double getOgMin() { return ogMin; }
    public void setOgMin(double ogMin) { this.ogMin = ogMin; }
    public double getOgMax() { return ogMax; }
    public void setOgMax(double ogMax) { this.ogMax = ogMax; }
    public double getFgMin() { return fgMin; }
    public void setFgMin(double fgMin) { this.fgMin = fgMin; }
    public double getFgMax() { return fgMax; }
    public void setFgMax(double fgMax) { this.fgMax = fgMax; }
    public double getIbuMin() { return ibuMin; }
    public void setIbuMin(double ibuMin) { this.ibuMin = ibuMin; }
    public double getIbuMax() { return ibuMax; }
    public void setIbuMax(double ibuMax) { this.ibuMax = ibuMax; }
    public double getSrmMin() { return srmMin; }
    public void setSrmMin(double srmMin) { this.srmMin = srmMin; }
    public double getSrmMax() { return srmMax; }
    public void setSrmMax(double srmMax) { this.srmMax = srmMax; }
    public double getAbvMin() { return abvMin; }
    public void setAbvMin(double abvMin) { this.abvMin = abvMin; }
    public double getAbvMax() { return abvMax; }
    public void setAbvMax(double abvMax) { this.abvMax = abvMax; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
