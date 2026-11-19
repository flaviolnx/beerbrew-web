package com.beerbrew.web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "fermentation_steps")
public class FermentationStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int stepOrder;
    private String name; // e.g., Primary Fermentation, Diacetyl Rest, Dry Hop, Cold Crash
    private String stepType = "Hold"; // Hold, Ramp, Conditioning
    private double durationDays = 7.0;
    private double startTempC = 19.0;
    private double endTempC = 19.0;
    private String dryHopAddition = ""; // e.g., "50g Citra + 50g Mosaic on Day 4"
    private String notes = "";

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public int getStepOrder() { return stepOrder; }
    public void setStepOrder(int stepOrder) { this.stepOrder = stepOrder; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getStepType() { return stepType; }
    public void setStepType(String stepType) { this.stepType = stepType; }
    public double getDurationDays() { return durationDays; }
    public void setDurationDays(double durationDays) { this.durationDays = durationDays; }
    public double getStartTempC() { return startTempC; }
    public void setStartTempC(double startTempC) { this.startTempC = startTempC; }
    public double getEndTempC() { return endTempC; }
    public void setEndTempC(double endTempC) { this.endTempC = endTempC; }
    public String getDryHopAddition() { return dryHopAddition; }
    public void setDryHopAddition(String dryHopAddition) { this.dryHopAddition = dryHopAddition; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
