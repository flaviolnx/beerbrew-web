package com.beerbrew.web.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "brew_notes")
public class BrewNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long recipeId;
    private String recipeName;
    private LocalDate brewDate = LocalDate.now();
    private double targetOg;
    private double actualOg;
    private double targetFg;
    private double actualFg;
    private double targetVolumeLiters;
    private double actualVolumeLiters;
    private double actualEfficiencyPercent;
    @Column(length = 2000)
    private String notes;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getRecipeId() { return recipeId; }
    public void setRecipeId(Long recipeId) { this.recipeId = recipeId; }
    public String getRecipeName() { return recipeName; }
    public void setRecipeName(String recipeName) { this.recipeName = recipeName; }
    public LocalDate getBrewDate() { return brewDate; }
    public void setBrewDate(LocalDate brewDate) { this.brewDate = brewDate; }
    public double getTargetOg() { return targetOg; }
    public void setTargetOg(double targetOg) { this.targetOg = targetOg; }
    public double getActualOg() { return actualOg; }
    public void setActualOg(double actualOg) { this.actualOg = actualOg; }
    public double getTargetFg() { return targetFg; }
    public void setTargetFg(double targetFg) { this.targetFg = targetFg; }
    public double getActualFg() { return actualFg; }
    public void setActualFg(double actualFg) { this.actualFg = actualFg; }
    public double getTargetVolumeLiters() { return targetVolumeLiters; }
    public void setTargetVolumeLiters(double targetVolumeLiters) { this.targetVolumeLiters = targetVolumeLiters; }
    public double getActualVolumeLiters() { return actualVolumeLiters; }
    public void setActualVolumeLiters(double actualVolumeLiters) { this.actualVolumeLiters = actualVolumeLiters; }
    public double getActualEfficiencyPercent() { return actualEfficiencyPercent; }
    public void setActualEfficiencyPercent(double actualEfficiencyPercent) { this.actualEfficiencyPercent = actualEfficiencyPercent; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
